import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const catalogPath = path.join(__dirname, '../server/data/catalog.json');

const merchants = [
  { id: 'merchant-omni', name: 'OmniTech Solutions' },
  { id: 'merchant-apex', name: 'ApexTech Official Store' },
  { id: 'merchant-cyber', name: 'CyberPeripherals India' },
  { id: 'merchant-pro', name: 'ProGear Direct' }
];

let catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));

// Filter out test artifact if needed
catalog = catalog.filter(item => item.id !== 'item_1788524939784');

// Explicit keyboard products matching the user prompt's exact marketplace scenario
const explicitPromptProducts = [
  {
    id: 'kb-apex-g413',
    productId: 'kb-apex-g413',
    merchantId: 'merchant-apex',
    merchantName: 'ApexTech Official Store',
    name: 'Logitech G413 Carbon Mechanical Backlit Gaming Keyboard',
    category: 'keyboard',
    tier: 'mid',
    brand: 'Logitech',
    sellingPrice: 4899,
    retailPrice: 4899,
    costPrice: 3900,
    rating: 4.7,
    reviewsCount: 1840,
    stock: 24,
    imageUrl: 'https://images.unsplash.com/photo-1595044426077-d36d9236d54a?auto=format&fit=crop&w=600&q=80',
    features: [
      'Romer-G Tactile Mechanical Switches',
      'Aircraft-Grade 5052 Aluminum Top Case',
      'USB Passthrough Port',
      'Precision Red Backlighting'
    ],
    specs: {
      'Switch Type': 'Romer-G Tactile',
      'Actuation Distance': '1.5 mm',
      'Cable Length': '1.8 m Braided',
      'Frame Material': 'Brushed Aluminum Alloy'
    },
    substituteIds: ['kb-cyber-k552', 'kb-cyber-gk18']
  },
  {
    id: 'kb-omni-g413',
    productId: 'kb-omni-g413',
    merchantId: 'merchant-omni',
    merchantName: 'OmniTech Solutions',
    name: 'Logitech G413 Carbon Mechanical Gaming Keyboard (Value Deal)',
    category: 'keyboard',
    tier: 'mid',
    brand: 'Logitech',
    sellingPrice: 4799,
    retailPrice: 4799,
    costPrice: 3800,
    rating: 4.8,
    reviewsCount: 2210,
    stock: 18,
    imageUrl: 'https://images.unsplash.com/photo-1595044426077-d36d9236d54a?auto=format&fit=crop&w=600&q=80',
    features: [
      'Romer-G Tactile Switches',
      'Brushed Aluminum-Magnesium Alloy',
      'Ultra-Fast 1ms Response Rate',
      'Gaming Keycaps Included'
    ],
    specs: {
      'Switch Type': 'Romer-G Tactile',
      'Actuation Distance': '1.5 mm',
      'Cable': 'USB 2.0 Passthrough',
      'Warranty': '2 Years Official'
    },
    substituteIds: ['kb-omni-k2', 'kb-cyber-k552']
  },
  {
    id: 'kb-omni-k2',
    productId: 'kb-omni-k2',
    merchantId: 'merchant-omni',
    merchantName: 'OmniTech Solutions',
    name: 'Keychron K2 Wireless Mechanical Keyboard (Version 2, RGB Hot-Swap)',
    category: 'keyboard',
    tier: 'premium',
    brand: 'Keychron',
    sellingPrice: 5499,
    retailPrice: 5499,
    costPrice: 4100,
    rating: 4.9,
    reviewsCount: 3420,
    stock: 12,
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80',
    features: [
      'Hot-Swappable Gateron G-Pro Brown Switches',
      'Wireless Bluetooth 5.1 & Wired Type-C',
      '4000 mAh Massive Battery (up to 240 hours)',
      'Mac & Windows Dedicated Layout Keys'
    ],
    specs: {
      'Switch Type': 'Gateron G Pro Brown (Tactile)',
      'Connectivity': 'Bluetooth 5.1 & USB-C',
      'Battery Capacity': '4000 mAh',
      'Keycaps': 'Double-shot ABS with OEM profile'
    },
    substituteIds: ['kb-omni-g413', 'kb-cyber-k552']
  },
  {
    id: 'kb-apex-k552',
    productId: 'kb-apex-k552',
    merchantId: 'merchant-apex',
    merchantName: 'ApexTech Official Store',
    name: 'Redragon K552 Kumara Rainbow Mechanical Keyboard',
    category: 'keyboard',
    tier: 'mid',
    brand: 'Redragon',
    sellingPrice: 3499,
    retailPrice: 3499,
    costPrice: 2600,
    rating: 4.5,
    reviewsCount: 1560,
    stock: 35,
    imageUrl: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=600&q=80',
    features: [
      'Custom Mechanical Dustproof Blue Switches',
      'Metal Alloy & ABS Construction',
      'Compact 87-Key Tenkeyless Design',
      'Gold Plated High-Speed USB Cable'
    ],
    specs: {
      'Switch Type': 'Outemu Blue Clicky',
      'Layout': 'Tenkeyless 87 Keys',
      'Backlighting': 'Rainbow Multi-Zone',
      'Connector': 'Gold-Plated USB'
    },
    substituteIds: ['kb-cyber-gk18']
  },
  {
    id: 'kb-cyber-k552',
    productId: 'kb-cyber-k552',
    merchantId: 'merchant-cyber',
    merchantName: 'CyberPeripherals India',
    name: 'Redragon K552 Kumara Mechanical TKL Keyboard (Special Deal)',
    category: 'keyboard',
    tier: 'budget',
    brand: 'Redragon',
    sellingPrice: 3299,
    retailPrice: 3299,
    costPrice: 2500,
    rating: 4.6,
    reviewsCount: 2980,
    stock: 40,
    imageUrl: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=600&q=80',
    features: [
      'Tactile Clicky Outemu Blue Switches',
      'Double-Shot Injection Molded Keycaps',
      'Splash-Proof Sturdy Metal Body',
      'N-Key Rollover Anti-Ghosting'
    ],
    specs: {
      'Switch Type': 'Dustproof Blue Clicky',
      'Form Factor': 'TKL 87 Keys',
      'Anti-Ghosting': 'Full 87 Keys',
      'Warranty': '1 Year Manufacturer'
    },
    substituteIds: ['kb-cyber-gk18', 'kb-omni-g413']
  },
  {
    id: 'kb-cyber-gk18',
    productId: 'kb-cyber-gk18',
    merchantId: 'merchant-cyber',
    merchantName: 'CyberPeripherals India',
    name: 'Cosmic Byte CB-GK-18 Firefly RGB Mechanical Keyboard',
    category: 'keyboard',
    tier: 'budget',
    brand: 'Cosmic Byte',
    sellingPrice: 2999,
    retailPrice: 2999,
    costPrice: 2200,
    rating: 4.4,
    reviewsCount: 3100,
    stock: 50,
    imageUrl: 'https://images.unsplash.com/photo-1595044426077-d36d9236d54a?auto=format&fit=crop&w=600&q=80',
    features: [
      'Outemu Red Linear Switches',
      'Per-Key RGB Lighting with Software Support',
      'Compact TKL Aluminum Frame',
      'Foldable Ergonomic Kickstand'
    ],
    specs: {
      'Switch Type': 'Outemu Red (Smooth Linear)',
      'Lighting': '16.8M Color RGB',
      'Key Rollover': 'Full Anti-Ghosting',
      'Weight': '780g'
    },
    substituteIds: ['kb-cyber-k552']
  }
];

// Prepend prompt products
const existingIds = new Set(explicitPromptProducts.map(p => p.id));
const existingFiltered = catalog.filter(c => !existingIds.has(c.id));

// Distribute remaining products across merchants realistically
existingFiltered.forEach((prod, index) => {
  const m = merchants[index % merchants.length];
  prod.productId = prod.id;
  prod.merchantId = prod.merchantId || m.id;
  prod.merchantName = prod.merchantName || m.name;
  prod.sellingPrice = prod.sellingPrice || prod.retailPrice || 1000;
  prod.retailPrice = prod.sellingPrice;
  prod.costPrice = prod.costPrice || Math.round(prod.sellingPrice * 0.72);
  prod.stock = prod.stock || (15 + (index % 30));
  if (!prod.specs) {
    prod.specs = {
      'Brand': prod.brand || 'DealPilot Partner',
      'Category': prod.category,
      'Warranty': '1 Year Standard'
    };
  }
});

const merged = [...explicitPromptProducts, ...existingFiltered];
fs.writeFileSync(catalogPath, JSON.stringify(merged, null, 2), 'utf8');
console.log(`Successfully updated catalog with ${merged.length} products across ${merchants.length} merchants.`);
