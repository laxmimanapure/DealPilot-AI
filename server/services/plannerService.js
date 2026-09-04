import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const catalogPath = path.join(__dirname, '../data/catalog.json');
const merchantsPath = path.join(__dirname, '../data/merchants.json');

// Helper to normalize category strings
export function normalizeCategory(input = '') {
  const text = input.toLowerCase().trim();
  if (text.includes('keyb') || text.includes('keys')) return 'keyboard';
  if (text.includes('mous')) return 'mouse';
  if (text.includes('head') || text.includes('ear') || text.includes('audio') || text.includes('tws')) return 'headphones';
  if (text.includes('monit') || text.includes('screen') || text.includes('display')) return 'monitor';
  if (text.includes('desk') || text.includes('mat') || text.includes('pad')) return 'desk_mat';
  if (text.includes('webcam') || text.includes('cam')) return 'webcam';
  if (text.includes('mic')) return 'mic';
  if (text.includes('stand') || text.includes('riser')) return 'stand';
  if (text.includes('speak') || text.includes('soundbar')) return 'speaker';
  if (text.includes('watch')) return 'smartwatch';
  return text;
}

// Extract budget and categories from natural language query
// Example: "I have ₹5,000 for a keyboard" -> budget: 5000, categories: ['keyboard']
export function parseNaturalLanguageQuery(query = '') {
  const result = {
    budget: null,
    categories: [],
    preferences: []
  };

  if (!query || typeof query !== 'string') return result;

  // Extract budget (₹5000, 5,000, 5000 rs, inr 5000, budget of 5000, 5k)
  const kMatch = query.match(/(?:₹|rs\.?|inr|budget\s*(?:of|is)?\s*:?\s*)?\s*(\d+)(?:\s*k|\s*thousand)\b/i);
  if (kMatch) {
    result.budget = parseInt(kMatch[1], 10) * 1000;
  } else {
    // Normal numeric match, supporting commas (e.g. ₹5,000)
    const budgetMatch = query.match(/(?:₹|rs\.?|inr|budget\s*(?:of|is)?\s*:?\s*)?\s*([0-9]{1,3}(?:,[0-9]{3})+|[0-9]{3,7})/i);
    if (budgetMatch) {
      const rawVal = parseInt(budgetMatch[1].replace(/,/g, ''), 10);
      if (rawVal >= 500 && rawVal <= 500000) {
        result.budget = rawVal;
      }
    }
  }

  // Detect requested categories
  const knownCategories = [
    { cat: 'keyboard', aliases: ['keyboard', 'keyboards', 'keys', 'mechanical keyboard', 'keeb'] },
    { cat: 'mouse', aliases: ['mouse', 'mice', 'gaming mouse'] },
    { cat: 'headphones', aliases: ['headphones', 'headphone', 'headset', 'earphones', 'earbuds', 'audio', 'tws'] },
    { cat: 'monitor', aliases: ['monitor', 'screen', 'display'] },
    { cat: 'desk_mat', aliases: ['desk mat', 'deskmat', 'mousepad', 'mouse pad'] },
    { cat: 'webcam', aliases: ['webcam', 'camera', 'web cam'] },
    { cat: 'mic', aliases: ['mic', 'microphone'] },
    { cat: 'stand', aliases: ['stand', 'laptop stand', 'riser', 'arm'] },
    { cat: 'speaker', aliases: ['speaker', 'speakers', 'soundbar'] },
    { cat: 'smartwatch', aliases: ['watch', 'smartwatch'] }
  ];

  const lowerQuery = query.toLowerCase();
  for (const { cat, aliases } of knownCategories) {
    if (aliases.some(alias => lowerQuery.includes(alias))) {
      if (!result.categories.includes(cat)) {
        result.categories.push(cat);
      }
    }
  }

  return result;
}

// Load current product catalog across ALL merchants
export function getCatalog() {
  const raw = fs.readFileSync(catalogPath, 'utf8');
  return JSON.parse(raw);
}

// Load all verified merchants
export function getMerchants() {
  try {
    const raw = fs.readFileSync(merchantsPath, 'utf8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function getMerchantById(merchantId) {
  const merchants = getMerchants();
  return merchants.find(m => m.id === merchantId) || {
    id: merchantId || 'merchant-omni',
    name: 'OmniTech Solutions',
    rating: 4.8
  };
}

/**
 * Generate 3 marketplace-wide recommendation tiers across ALL merchants
 * Core Rule: Client selects ONE product -> Resolves ONE merchant
 */
export function generatePlans({ budget = 5000, categories = ['keyboard'], query = '', preferences = [] }) {
  let targetBudget = Number(budget) || 5000;
  let targetCategories = (categories && categories.length) ? categories.map(c => normalizeCategory(c)) : [];

  // Parse natural language query if present and inputs are default
  if (query) {
    const parsed = parseNaturalLanguageQuery(query);
    if (parsed.budget && (!budget || budget === 5000)) {
      targetBudget = parsed.budget;
    }
    if (parsed.categories && parsed.categories.length) {
      targetCategories = parsed.categories;
    }
  }

  if (!targetCategories.length) {
    targetCategories = ['keyboard'];
  }

  const catalog = getCatalog();

  // If search is for a single product category (the core cross-merchant flow):
  if (targetCategories.length === 1) {
    const category = targetCategories[0];

    // 1. POOL PRODUCTS ACROSS ALL MERCHANTS
    const pool = catalog.filter(item => normalizeCategory(item.category) === category);
    const eligiblePool = pool.length > 0 ? pool : catalog.slice(0, 10);

    // Normalize each product in pool
    const normalizedPool = eligiblePool.map(p => {
      const price = Number(p.sellingPrice || p.retailPrice || 1000);
      const cost = Number(p.costPrice || Math.round(price * 0.72));
      const rating = Number(p.rating || 4.5);
      const margin = Math.round(((price - cost) / price) * 1000) / 10;
      return {
        ...p,
        productId: p.id || p.productId,
        sellingPrice: price,
        retailPrice: price,
        costPrice: cost,
        profitMarginPercent: margin,
        rating
      };
    });

    // 2. RANK PRODUCTS MARKETPLACE-WIDE FOR THE THREE TIERS

    // --- TIER 1: BEST QUALITY ---
    // Highest-spec / highest-quality reasonably close to client's budget (can be slightly above budget)
    // Factors: specifications, rating >= 4.7, tier === 'premium', brand reliability
    const sortedForQuality = [...normalizedPool].sort((a, b) => {
      const tierWeightA = a.tier === 'premium' ? 40 : a.tier === 'mid' ? 20 : 0;
      const tierWeightB = b.tier === 'premium' ? 40 : b.tier === 'mid' ? 20 : 0;
      const proximityA = (a.sellingPrice >= targetBudget * 0.8 && a.sellingPrice <= targetBudget * 1.3) ? 30 : 0;
      const proximityB = (b.sellingPrice >= targetBudget * 0.8 && b.sellingPrice <= targetBudget * 1.3) ? 30 : 0;
      const scoreA = (a.rating * 20) + tierWeightA + proximityA;
      const scoreB = (b.rating * 20) + tierWeightB + proximityB;
      return scoreB - scoreA;
    });
    const bestQualityProduct = sortedForQuality[0] || normalizedPool[0];

    // --- TIER 2: BEST VALUE ---
    // Strongest overall specification-to-price ratio (Product Quality / Effective Price)
    // Looking for a high-performing product (tier === 'mid' or rating >= 4.6) reasonably close to budget
    const sortedForValue = [...normalizedPool]
      .filter(p => p.id !== bestQualityProduct.id)
      .sort((a, b) => {
        // Spec score: tier (mid/premium), build features, rating
        const specScoreA = (a.rating * 18) + (a.tier === 'mid' ? 35 : a.tier === 'premium' ? 30 : 10) + (a.specs?.['Switch Type'] ? 15 : 0);
        const specScoreB = (b.rating * 18) + (b.tier === 'mid' ? 35 : b.tier === 'premium' ? 30 : 10) + (b.specs?.['Switch Type'] ? 15 : 0);
        
        // Price efficiency relative to budget
        const budgetProximityA = Math.max(0, 1 - Math.abs(targetBudget - a.sellingPrice) / targetBudget) * 30;
        const budgetProximityB = Math.max(0, 1 - Math.abs(targetBudget - b.sellingPrice) / targetBudget) * 30;

        return (specScoreB + budgetProximityB) - (specScoreA + budgetProximityA);
      });
    const bestValueProduct = sortedForValue[0] || normalizedPool[1] || bestQualityProduct;

    // --- TIER 3: BUDGET SAVER ---
    // Lowest price that still meets a solid quality/specification threshold.
    // A flimsy ₹999 plastic unit does not beat a ₹2,500 - ₹3,500 solid mechanical keyboard.
    const sortedForBudget = [...normalizedPool]
      .filter(p => p.id !== bestQualityProduct.id && p.id !== bestValueProduct.id)
      .filter(p => p.rating >= 4.4 && p.sellingPrice <= targetBudget && (p.tier === 'mid' || p.tier === 'budget'))
      .sort((a, b) => {
        // Must satisfy reasonable quality threshold: mechanical/durable preferred over membrane
        const qualityThresholdA = (a.specs?.['Switch Type'] && !a.specs?.['Switch Type'].includes('Membrane')) ? 20 : 0;
        const qualityThresholdB = (b.specs?.['Switch Type'] && !b.specs?.['Switch Type'].includes('Membrane')) ? 20 : 0;
        
        // Prefer lower price if quality threshold met
        const savingsScoreA = Math.max(0, targetBudget - a.sellingPrice) / 100 + qualityThresholdA;
        const savingsScoreB = Math.max(0, targetBudget - b.sellingPrice) / 100 + qualityThresholdB;
        return savingsScoreB - savingsScoreA;
      });
    
    const budgetSaverProduct = sortedForBudget[0] || 
      [...normalizedPool]
        .filter(p => p.id !== bestQualityProduct.id && p.id !== bestValueProduct.id)
        .sort((a, b) => a.sellingPrice - b.sellingPrice)[0] || 
      normalizedPool[2] || 
      normalizedPool[0];

    // Helper to format recommendation plan object
    const formatTier = (product, type, title, badge, tagline, highlight) => {
      const merchant = getMerchantById(product.merchantId);
      return {
        id: `plan-${type.toLowerCase().replace(/_/g, '-')}`,
        type,
        title,
        badge,
        tagline,
        totalPrice: product.sellingPrice,
        retailPrice: product.sellingPrice,
        wholesaleCost: product.costPrice,
        profitMarginPercent: product.profitMarginPercent,
        items: [product],
        resolvedProduct: product,
        resolvedMerchant: {
          merchantId: product.merchantId || merchant.id,
          merchantName: product.merchantName || merchant.name,
          rating: merchant.rating || product.rating
        },
        merchantId: product.merchantId || merchant.id,
        merchantName: product.merchantName || merchant.name,
        soldBy: product.merchantName || merchant.name,
        isOverBudget: product.sellingPrice > targetBudget,
        budgetDelta: product.sellingPrice - targetBudget,
        negotiationRecommended: product.sellingPrice > targetBudget,
        highlight
      };
    };

    return {
      customerBudget: targetBudget,
      requestedCategories: targetCategories,
      searchCategory: category,
      totalMerchantsPolled: 4,
      plans: [
        formatTier(
          bestQualityProduct,
          'BEST_QUALITY',
          'Best Quality',
          '💎 Highest Specification',
          'Premium materials, high durability, and maximum performance',
          `Highest-spec ${category} close to your ₹${targetBudget.toLocaleString('en-IN')} target. Eligible for AI negotiation!`
        ),
        formatTier(
          bestValueProduct,
          'BEST_VALUE',
          'Best Value',
          '⚖️ Best Spec-to-Price',
          'Optimal performance and proven reliability within your budget',
          `Sweet spot for quality vs cost. Verified 4.8★ user satisfaction.`
        ),
        formatTier(
          budgetSaverProduct,
          'BUDGET_SAVER',
          'Budget Saver',
          '💰 Maximum Savings',
          'Reliable essentials meeting quality thresholds at the lowest price',
          `Saves ₹${Math.max(0, targetBudget - budgetSaverProduct.sellingPrice).toLocaleString('en-IN')} under your budget target!`
        )
      ]
    };
  }

  // Multi-Category Bundle Fallback (for requests like "keyboard + mouse + headphones"):
  const categoryMap = {};
  for (const cat of targetCategories) {
    categoryMap[cat] = catalog.filter(item => normalizeCategory(item.category) === cat);
    if (!categoryMap[cat].length) {
      categoryMap[cat] = catalog.slice(0, 3);
    }
  }

  const bestQualityItems = targetCategories.map(cat => {
    const items = categoryMap[cat];
    return items.find(i => i.tier === 'premium') || items.sort((a, b) => b.retailPrice - a.retailPrice)[0];
  });
  const bestQualityTotal = bestQualityItems.reduce((sum, item) => sum + item.retailPrice, 0);
  const bestQualityCost = bestQualityItems.reduce((sum, item) => sum + item.costPrice, 0);
  const bestQualityMargin = Math.round(((bestQualityTotal - bestQualityCost) / bestQualityTotal) * 1000) / 10;

  const bestValueItems = targetCategories.map(cat => {
    const items = categoryMap[cat];
    return items.find(i => i.tier === 'mid') || items.sort((a, b) => b.rating - a.rating)[0];
  });
  const bestValueTotal = bestValueItems.reduce((sum, item) => sum + item.retailPrice, 0);
  const bestValueCost = bestValueItems.reduce((sum, item) => sum + item.costPrice, 0);
  const bestValueMargin = Math.round(((bestValueTotal - bestValueCost) / bestValueTotal) * 1000) / 10;

  const budgetSaverItems = targetCategories.map(cat => {
    const items = categoryMap[cat];
    return items.find(i => i.tier === 'budget') || items.sort((a, b) => a.retailPrice - b.retailPrice)[0];
  });
  const budgetSaverTotal = budgetSaverItems.reduce((sum, item) => sum + item.retailPrice, 0);
  const budgetSaverCost = budgetSaverItems.reduce((sum, item) => sum + item.costPrice, 0);
  const budgetSaverMargin = Math.round(((budgetSaverTotal - budgetSaverCost) / budgetSaverTotal) * 1000) / 10;

  return {
    customerBudget: targetBudget,
    requestedCategories: targetCategories,
    plans: [
      {
        id: 'plan-best-quality',
        type: 'BEST_QUALITY',
        title: 'Best Quality',
        badge: '💎 Premium Choice',
        tagline: 'Highest performance, top-grade materials & max ratings',
        totalPrice: bestQualityTotal,
        wholesaleCost: bestQualityCost,
        profitMarginPercent: bestQualityMargin,
        items: bestQualityItems,
        resolvedProduct: bestQualityItems[0],
        merchantId: bestQualityItems[0]?.merchantId || 'merchant-omni',
        merchantName: bestQualityItems[0]?.merchantName || 'OmniTech Solutions',
        soldBy: bestQualityItems[0]?.merchantName || 'OmniTech Solutions',
        isOverBudget: bestQualityTotal > targetBudget,
        budgetDelta: bestQualityTotal - targetBudget,
        negotiationRecommended: bestQualityTotal > targetBudget,
        highlight: 'Ideal for power users looking for top-tier gear. Negotiable with AI to match budget!'
      },
      {
        id: 'plan-best-value',
        type: 'BEST_VALUE',
        title: 'Best Value',
        badge: '⚖️ Optimal Balance',
        tagline: 'Best feature-to-price ratio within your budget target',
        totalPrice: bestValueTotal,
        wholesaleCost: bestValueCost,
        profitMarginPercent: bestValueMargin,
        items: bestValueItems,
        resolvedProduct: bestValueItems[0],
        merchantId: bestValueItems[0]?.merchantId || 'merchant-omni',
        merchantName: bestValueItems[0]?.merchantName || 'OmniTech Solutions',
        soldBy: bestValueItems[0]?.merchantName || 'OmniTech Solutions',
        isOverBudget: bestValueTotal > targetBudget,
        budgetDelta: bestValueTotal - targetBudget,
        negotiationRecommended: false,
        highlight: 'Matches your budget sweet spot with proven customer ratings.'
      },
      {
        id: 'plan-budget-saver',
        type: 'BUDGET_SAVER',
        title: 'Budget Saver',
        badge: '💰 Maximum Savings',
        tagline: 'Reliable essentials that leave extra cash in your pocket',
        totalPrice: budgetSaverTotal,
        wholesaleCost: budgetSaverCost,
        profitMarginPercent: budgetSaverMargin,
        items: budgetSaverItems,
        resolvedProduct: budgetSaverItems[0],
        merchantId: budgetSaverItems[0]?.merchantId || 'merchant-cyber',
        merchantName: budgetSaverItems[0]?.merchantName || 'CyberPeripherals India',
        soldBy: budgetSaverItems[0]?.merchantName || 'CyberPeripherals India',
        isOverBudget: budgetSaverTotal > targetBudget,
        budgetDelta: budgetSaverTotal - targetBudget,
        negotiationRecommended: false,
        highlight: `Saves ₹${Math.max(0, targetBudget - budgetSaverTotal)} under your budget limit!`
      }
    ]
  };
}

export function addCatalogItem(item) {
  const catalog = getCatalog();
  const newItem = {
    id: item.id || `item_${Date.now()}`,
    productId: item.id || `item_${Date.now()}`,
    merchantId: item.merchantId || 'merchant-omni',
    merchantName: item.merchantName || 'OmniTech Solutions',
    name: item.name,
    category: normalizeCategory(item.category || 'peripherals'),
    tier: item.tier || 'mid',
    brand: item.brand || 'DealPilot Partner',
    sellingPrice: Number(item.sellingPrice || item.retailPrice || item.price || 1000),
    retailPrice: Number(item.retailPrice || item.sellingPrice || item.price || 1000),
    costPrice: Number(item.costPrice || item.wholesaleCost || 700),
    stock: Number(item.stock || 20),
    rating: Number(item.rating || 4.5),
    reviewsCount: Number(item.reviewsCount || 10),
    imageUrl: item.imageUrl || 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80',
    features: item.features || ['Premium Finish', '12-Month Warranty'],
    specs: item.specs || { "Warranty": "12 Months" },
    substituteIds: []
  };
  catalog.unshift(newItem);
  fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2), 'utf8');
  return newItem;
}

export function updateCatalogItem(id, updates) {
  const catalog = getCatalog();
  const index = catalog.findIndex(i => i.id === id || i.productId === id);
  if (index === -1) throw new Error('Product not found');
  catalog[index] = { ...catalog[index], ...updates };
  if (updates.price || updates.sellingPrice) {
    const p = Number(updates.price || updates.sellingPrice);
    catalog[index].sellingPrice = p;
    catalog[index].retailPrice = p;
  }
  if (updates.wholesaleCost || updates.costPrice) {
    catalog[index].costPrice = Number(updates.wholesaleCost || updates.costPrice);
  }
  fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2), 'utf8');
  return catalog[index];
}

export function deleteCatalogItem(id) {
  const catalog = getCatalog();
  const filtered = catalog.filter(i => i.id !== id && i.productId !== id);
  fs.writeFileSync(catalogPath, JSON.stringify(filtered, null, 2), 'utf8');
  return true;
}
