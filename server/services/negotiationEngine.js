import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rulesPath = path.join(__dirname, '../data/merchantRules.json');
const merchantsPath = path.join(__dirname, '../data/merchants.json');
const auditLogPath = path.join(__dirname, '../data/auditLog.json');
const catalogPath = path.join(__dirname, '../data/catalog.json');

// In-memory active negotiation sessions
const activeSessions = new Map();

// Helper to get all merchants
export function getAllMerchants() {
  try {
    const raw = fs.readFileSync(merchantsPath, 'utf8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

// Helper to get a specific merchant's negotiation policy
export function getMerchantPolicy(merchantId = 'merchant-omni') {
  const merchants = getAllMerchants();
  const matched = merchants.find(m => m.id === merchantId || m.slug === merchantId);

  // If merchant is OmniTech, also check if custom rules were saved in merchantRules.json
  if (merchantId === 'merchant-omni') {
    try {
      const raw = fs.readFileSync(rulesPath, 'utf8');
      const custom = JSON.parse(raw);
      return {
        merchantId: 'merchant-omni',
        merchantName: matched ? matched.name : 'OmniTech Solutions',
        maxDiscountPercent: Number(custom.maxDiscountPercent) || 10,
        maxDiscountAmount: Number(custom.maxDiscountAmount) || 500,
        minProfitMarginPercent: Number(custom.minProfitMarginPercent) || 18,
        maxNegotiationRounds: Number(custom.maxNegotiationRounds) || 3,
        allowSubstitutions: Boolean(custom.allowSubstitutions),
        allowBundlePerks: Boolean(custom.allowBundlePerks),
        bundlePerksThreshold: Number(custom.bundlePerksThreshold) || 3500
      };
    } catch (e) {
      // fallback to merchants.json entry below
    }
  }

  if (matched && matched.policy) {
    return {
      merchantId: matched.id,
      merchantName: matched.name,
      ...matched.policy
    };
  }

  // Fallback defaults
  return {
    merchantId: 'merchant-omni',
    merchantName: 'OmniTech Solutions',
    maxDiscountPercent: 10,
    maxDiscountAmount: 500,
    minProfitMarginPercent: 18,
    maxNegotiationRounds: 3,
    allowSubstitutions: true,
    allowBundlePerks: true,
    bundlePerksThreshold: 3500
  };
}

// Backward compatible helper for default merchant rules (used by Merchant Dashboard)
export function getMerchantRules() {
  return getMerchantPolicy('merchant-omni');
}

// Update merchant rules for current logged-in store (OmniTech)
export function updateMerchantRules(newRules) {
  const current = getMerchantRules();
  const updated = { ...current, ...newRules, lastUpdated: new Date().toISOString() };
  fs.writeFileSync(rulesPath, JSON.stringify(updated, null, 2), 'utf8');
  return updated;
}

// Helper to get all audit logs
export function getAuditLogs() {
  try {
    const raw = fs.readFileSync(auditLogPath, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    return [];
  }
}

// Append new audit log
export function recordAuditLog(entry) {
  const logs = getAuditLogs();
  logs.unshift(entry);
  if (logs.length > 500) logs.pop();
  try {
    fs.writeFileSync(auditLogPath, JSON.stringify(logs, null, 2), 'utf8');
  } catch (err) {
    console.error('Failed to write audit log:', err);
  }
}

// Helper to get catalog item
export function findCatalogItem(itemId) {
  try {
    const raw = fs.readFileSync(catalogPath, 'utf8');
    const catalog = JSON.parse(raw);
    return catalog.find(i => i.id === itemId || i.productId === itemId);
  } catch (e) {
    return null;
  }
}

/**
 * Initialize or retrieve a negotiation session
 */
export function initSession({ sessionId, plan, customerBudget, customerName = 'Customer', merchantId, productId }) {
  const resolvedMerchantId = merchantId || plan.merchantId || plan.resolvedMerchant?.merchantId || 'merchant-omni';
  const policy = getMerchantPolicy(resolvedMerchantId);

  const session = {
    sessionId,
    customerName,
    merchantId: resolvedMerchantId,
    merchantName: policy.merchantName,
    productId: productId || (plan.resolvedProduct ? plan.resolvedProduct.id : plan.id),
    plan,
    currentItems: plan.items ? [...plan.items] : (plan.resolvedProduct ? [plan.resolvedProduct] : []),
    customerBudget: Number(customerBudget),
    roundsCompleted: 0,
    history: [],
    status: 'ACTIVE',
    createdAt: new Date().toISOString()
  };
  activeSessions.set(sessionId, session);
  return session;
}

export function getSession(sessionId) {
  return activeSessions.get(sessionId);
}

/**
 * Process a customer negotiation turn and evaluate strictly against the resolved merchant's policy.
 * Authoritative: Backend strictly enforces boundaries and never exposes cost/margin data to client.
 */
export function evaluateNegotiationTurn({
  sessionId,
  customerOffer,
  customerMessage = '',
  selectedPlan,
  merchantId = null,
  productId = null,
  swapItemId = null,
  replacementItemId = null
}) {
  let session = activeSessions.get(sessionId);

  if (!session && selectedPlan) {
    session = initSession({
      sessionId,
      plan: selectedPlan,
      merchantId: merchantId || selectedPlan.merchantId || selectedPlan.resolvedMerchant?.merchantId,
      productId: productId || selectedPlan.productId || selectedPlan.resolvedProduct?.id,
      customerBudget: selectedPlan.budgetDelta > 0 ? selectedPlan.totalPrice - selectedPlan.budgetDelta : selectedPlan.totalPrice
    });
  }

  if (!session) {
    throw new Error('Negotiation session not found. Please start a new session.');
  }

  // Resolve authoritative merchant policy
  const activeMerchantId = merchantId || session.merchantId || 'merchant-omni';
  const policy = getMerchantPolicy(activeMerchantId);
  session.merchantId = activeMerchantId;
  session.merchantName = policy.merchantName;

  // Handle item swap if requested
  if (swapItemId && replacementItemId) {
    const repItem = findCatalogItem(replacementItemId);
    if (repItem) {
      session.currentItems = session.currentItems.map(item => (item.id === swapItemId || item.productId === swapItemId) ? repItem : item);
    }
  }

  session.roundsCompleted += 1;
  const currentRound = session.roundsCompleted;
  const maxRounds = policy.maxNegotiationRounds || 3;
  const isFinalRound = currentRound >= maxRounds;

  // Calculate pricing basis
  const originalTotal = session.currentItems.reduce((sum, item) => sum + (Number(item.sellingPrice) || Number(item.retailPrice) || Number(item.price) || 0), 0) || Number(session.plan?.totalPrice) || 1000;
  const wholesaleCost = session.currentItems.reduce((sum, item) => sum + (Number(item.costPrice) || Number(item.wholesaleCost) || Math.round((Number(item.sellingPrice) || Number(item.retailPrice) || 0) * 0.72)), 0) || Number(session.plan?.wholesaleCost) || Math.round(originalTotal * 0.72);

  // Parse user offer
  let proposedOffer = Number(customerOffer);
  if (isNaN(proposedOffer) || proposedOffer <= 0) {
    proposedOffer = session.customerBudget || Math.round(originalTotal * 0.9);
  }

  // Calculate allowable discounts according to THIS merchant's policy
  // 1. Percentage limit
  const maxAllowedByPercent = (originalTotal * policy.maxDiscountPercent) / 100;
  // 2. Fixed amount limit
  const maxAllowedDiscount = Math.min(policy.maxDiscountAmount, maxAllowedByPercent);
  // 3. Minimum profit margin limit
  const minAllowedPriceByMargin = Math.ceil(wholesaleCost / (1 - (policy.minProfitMarginPercent / 100)));
  const maxDiscountAllowedByMargin = Math.max(0, originalTotal - minAllowedPriceByMargin);

  // Absolute ceiling for this merchant
  const effectiveMaxDiscount = Math.min(maxAllowedDiscount, maxDiscountAllowedByMargin);
  const minimumSafePrice = originalTotal - effectiveMaxDiscount;

  let approvedDiscount = 0;
  let finalOfferedPrice = originalTotal;
  let verdict = 'APPROVED';
  let isClamped = false;

  // Progressive step-by-step negotiation across rounds (Requirement 8):
  // Round 1: Offer initial discount concession (e.g. ~55% of allowable discount)
  // Round 2: Step down closer (~80% of allowable discount)
  // Final Round: Grant maximum allowable discount (down to minimumSafePrice)
  let roundMaxDiscount = effectiveMaxDiscount;
  if (!isFinalRound) {
    if (currentRound === 1 && maxRounds >= 2) {
      roundMaxDiscount = Math.round(effectiveMaxDiscount * 0.55);
    } else if (currentRound === 2 && maxRounds >= 3) {
      roundMaxDiscount = Math.round(effectiveMaxDiscount * 0.82);
    }
  }

  const roundMinimumPrice = originalTotal - roundMaxDiscount;

  if (proposedOffer >= originalTotal) {
    approvedDiscount = 0;
    finalOfferedPrice = originalTotal;
    verdict = 'FULL_PRICE_ACCEPTED';
  } else if (proposedOffer >= roundMinimumPrice) {
    // Customer offer is within this round's allowable threshold
    approvedDiscount = originalTotal - proposedOffer;
    finalOfferedPrice = proposedOffer;
    verdict = 'APPROVED';
  } else {
    // Customer offer exceeds allowable limit -> Clamp to safe price for this round
    approvedDiscount = roundMaxDiscount;
    finalOfferedPrice = roundMinimumPrice;
    isClamped = true;
    verdict = isFinalRound ? 'FINAL_OFFER_CLAMPED' : 'COUNTER_OFFER_CLAMPED';
  }

  // Calculate margin for internal merchant audit
  const finalMarginPercent = Math.round(((finalOfferedPrice - wholesaleCost) / finalOfferedPrice) * 1000) / 10;
  const actualDiscountPercent = Math.round((approvedDiscount / originalTotal) * 1000) / 10;

  // Internal audit logging (100% mathematical explainability for merchant verification)
  const auditEntry = {
    id: `audit-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    timestamp: new Date().toISOString(),
    customer: session.customerName,
    merchantId: activeMerchantId,
    merchantName: policy.merchantName,
    requestedItems: session.currentItems.map(i => i.name),
    planType: session.plan?.title || session.plan?.name || 'Cross-Merchant Deal',
    originalTotal,
    customerBudget: session.customerBudget,
    customerOffer: proposedOffer,
    negotiationRound: currentRound,
    aiProposedDiscount: approvedDiscount,
    aiProposedPrice: finalOfferedPrice,
    wholesaleCost,
    finalMarginPercent,
    ruleChecks: {
      maxDiscountPercent: { limit: `${policy.maxDiscountPercent}%`, value: `${actualDiscountPercent}%`, passed: actualDiscountPercent <= policy.maxDiscountPercent + 0.01 },
      maxDiscountAmount: { limit: `₹${policy.maxDiscountAmount}`, value: `₹${approvedDiscount}`, passed: approvedDiscount <= policy.maxDiscountAmount },
      minProfitMargin: { limit: `${policy.minProfitMarginPercent}%`, value: `${finalMarginPercent}%`, passed: finalMarginPercent >= policy.minProfitMarginPercent },
      maxRounds: { limit: maxRounds, value: currentRound, passed: currentRound <= maxRounds }
    },
    verdict,
    explanation: `${policy.merchantName} policy (max ${policy.maxDiscountPercent}%, ₹${policy.maxDiscountAmount} cap, min ${policy.minProfitMarginPercent}% margin) applied. Round ${currentRound}/${maxRounds} offering ₹${finalOfferedPrice} (-₹${approvedDiscount}).`,
    outcome: isFinalRound ? 'FINAL_OFFER_LOCKED' : (isClamped ? 'COUNTER_OFFER_CLAMPED' : 'COUNTER_OFFER_MADE'),
    perksAdded: []
  };
  recordAuditLog(auditEntry);

  // Return CLIENT-SAFE payload:
  // ZERO exposure of wholesaleCost, costPrice, profitMarginPercent, or internal rule limits!
  const clientSafePayload = {
    sessionId,
    merchantId: activeMerchantId,
    merchantName: policy.merchantName,
    productId: session.productId,
    productName: session.currentItems[0]?.name || session.plan?.title,
    status: isFinalRound ? 'FINAL_OFFER' : 'COUNTER_OFFER',
    round: currentRound,
    maxRounds,
    originalTotal,
    currentPrice: finalOfferedPrice,
    offeredPrice: finalOfferedPrice,
    discountAmount: approvedDiscount,
    discountPercent: actualDiscountPercent,
    customerOffer: proposedOffer,
    currentItems: session.currentItems.map(item => ({
      id: item.id || item.productId,
      productId: item.id || item.productId,
      name: item.name,
      category: item.category,
      brand: item.brand,
      sellingPrice: item.sellingPrice || item.retailPrice,
      retailPrice: item.sellingPrice || item.retailPrice,
      imageUrl: item.imageUrl,
      specs: item.specs
    })),
    perks: [],
    verdict,
    isFinalRound,
    canAccept: true
  };

  session.history.push({
    round: currentRound,
    customerOffer: proposedOffer,
    customerMessage,
    response: clientSafePayload
  });

  return clientSafePayload;
}
