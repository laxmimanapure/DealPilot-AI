// Supplementary business datasets for DealPilot AI Merchant Command Center

export const MOCK_MERCHANT_DEALS = [
  {
    id: 'deal-101',
    name: 'Summer Electronics Bundle',
    products: ['Keychron K2 Mechanical Keyboard', 'Logitech G102 Lightsync Mouse'],
    discountPercent: 12,
    sellingPrice: 8499,
    costPrice: 5900,
    marginPercent: 30.6,
    status: 'Active',
    views: 12480,
    conversions: 842,
    revenue: 420000
  },
  {
    id: 'deal-102',
    name: 'Executive Studio Desktop Arm Kit',
    products: ['Dual Heavy-Duty Aluminium Gas Spring Arm', 'Reinforced Desk Clamp'],
    discountPercent: 10,
    sellingPrice: 11200,
    costPrice: 7800,
    marginPercent: 30.4,
    status: 'Active',
    views: 8940,
    conversions: 520,
    revenue: 291200
  },
  {
    id: 'deal-103',
    name: 'Student Budget Learning Essentials',
    products: ['Membrane Quiet Keyboard', 'Ergonomic USB Mouse'],
    discountPercent: 8,
    sellingPrice: 2199,
    costPrice: 1650,
    marginPercent: 25.0,
    status: 'Active',
    views: 15600,
    conversions: 1140,
    revenue: 250686
  },
  {
    id: 'deal-104',
    name: 'Audiophile Daily Listening Setup',
    products: ['Audio-Technica ATH-M20x', 'Braided Balanced Cable'],
    discountPercent: 15,
    sellingPrice: 6499,
    costPrice: 5300,
    marginPercent: 18.5,
    status: 'Paused',
    views: 6200,
    conversions: 210,
    revenue: 136479
  }
];

export const MOCK_TOP_PRODUCTS = [
  {
    rank: 1,
    name: 'Sony WH-1000XM5 Wireless Headphones',
    category: 'Audio',
    revenue: 499980,
    unitsSold: 20,
    conversion: '7.8%',
    margin: 28.5,
    trend: '+14%'
  },
  {
    rank: 2,
    name: 'Samsung Galaxy S25 Ultra 5G (256GB)',
    category: 'Smartphones',
    revenue: 359997,
    unitsSold: 3,
    conversion: '4.2%',
    margin: 26.2,
    trend: '+9%'
  },
  {
    rank: 3,
    name: 'Apple AirPods Pro (2nd Gen USB-C)',
    category: 'Audio',
    revenue: 299985,
    unitsSold: 15,
    conversion: '8.4%',
    margin: 25.0,
    trend: '+12%'
  },
  {
    rank: 4,
    name: 'Nike Air Max 90 Classic Running Shoes',
    category: 'Fashion',
    revenue: 199975,
    unitsSold: 25,
    conversion: '6.9%',
    margin: 31.2,
    trend: '+18%'
  },
  {
    rank: 5,
    name: 'Logitech MX Master 3S Wireless Mouse',
    category: 'Accessories',
    revenue: 169900,
    unitsSold: 20,
    conversion: '9.1%',
    margin: 27.4,
    trend: '+5%'
  }
];

export const MOCK_NEEDS_ATTENTION_PRODUCTS = [
  {
    id: 'att-1',
    name: 'Wireless Studio Monitor Headphones (Entry Series)',
    category: 'Audio',
    sellingPrice: 3200,
    costPrice: 2816,
    conversion: '1.8%',
    margin: 12.0,
    discount: '22%',
    stock: 45,
    issue: 'Sub-target margin & slow turnover',
    status: 'Review Pricing',
    actionText: 'Review Product'
  },
  {
    id: 'att-2',
    name: 'RGB Mechanical Tenkeyless Blue Switches',
    category: 'Keyboards',
    sellingPrice: 1800,
    costPrice: 1548,
    conversion: '2.1%',
    margin: 14.0,
    discount: '25%',
    stock: 8,
    issue: 'Low margin & stock nearing exhaustion',
    status: 'Critical Margin',
    actionText: 'Adjust Cost Floor'
  },
  {
    id: 'att-3',
    name: 'Ergonomic Vertical Wireless Mouse',
    category: 'Accessories',
    sellingPrice: 1499,
    costPrice: 1214,
    conversion: '1.4%',
    margin: 19.0,
    discount: '18%',
    stock: 62,
    issue: 'Low conversion despite promotional placement',
    status: 'Reposition Deal',
    actionText: 'Review Offer'
  }
];

export const MOCK_MERCHANT_INSIGHTS = [
  {
    id: 'ins-1',
    type: 'OPPORTUNITY',
    title: 'Gaming Accessories Demand Spike',
    explanation: 'Category search volume and conversion for mechanical peripherals increased 18% over the past 5 days. Consider featuring a dedicated keyboard + mouse bundle.',
    confidence: 92,
    impact: 'High',
    actionLabel: 'Create Gaming Bundle'
  },
  {
    id: 'ins-2',
    type: 'RISK',
    title: '3 Products Approaching Margin Floor',
    explanation: 'Recent price matching on entry audio and keyboards pushed gross margins down to 12%–14%, which is below your store policy target of 25%.',
    confidence: 95,
    impact: 'High',
    actionLabel: 'Review Margins'
  },
  {
    id: 'ins-3',
    type: 'RECOMMENDATION',
    title: 'Reduce Discount on High-Conversion Audio',
    explanation: 'Sony WH-1000XM5 has sustained an 8.4% conversion rate with low price elasticity. Reducing discount by 3% will recover ₹18,400 in net profit without hurting sales.',
    confidence: 91,
    impact: 'Medium',
    actionLabel: 'Optimize Discount'
  },
  {
    id: 'ins-4',
    type: 'FORECAST',
    title: 'Anticipated Weekend Surge in Desk Accessories',
    explanation: 'Historical transaction trends indicate weekend orders peak between Friday evening and Sunday night. Ensure stock counts on desk arms and mats are maintained.',
    confidence: 88,
    impact: 'Medium',
    actionLabel: 'View Inventory'
  }
];

export const MOCK_BUSINESS_NOTIFICATIONS = [
  {
    id: 'bnotif-1',
    title: '⚠️ Low Stock Alert: Keychron K2',
    message: 'Only 3 units remaining in inventory. Reorder recommended.',
    time: '15m ago',
    type: 'inventory',
    unread: true
  },
  {
    id: 'bnotif-2',
    title: '🛡️ Policy Guardrail Clamp Applied',
    message: 'AI negotiation engine safely clamped a buyer offer to your 25% margin floor.',
    time: '1h ago',
    type: 'guardrail',
    unread: true
  },
  {
    id: 'bnotif-3',
    title: '💰 Large Order Completed: ₹11,200',
    message: 'Executive Studio Arm Kit purchased and verified via Razorpay.',
    time: '3h ago',
    type: 'order',
    unread: false
  },
  {
    id: 'bnotif-4',
    title: '📈 Conversion Spike on Audio Deals',
    message: 'Summer Electronics Bundle conversion rose to 6.8% this morning.',
    time: 'Yesterday',
    type: 'deal',
    unread: false
  }
];

export const MOCK_TIME_SERIES = {
  '7D': {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    revenue: [92000, 115000, 108000, 134000, 142000, 168000, 155000],
    orders: [142, 178, 165, 210, 224, 268, 245],
    aov: [647, 646, 654, 638, 633, 626, 632]
  },
  '30D': {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    revenue: [780000, 840000, 810000, 890000],
    orders: [1180, 1290, 1240, 1380],
    aov: [661, 651, 653, 644]
  },
  '90D': {
    labels: ['Month 1', 'Month 2', 'Month 3'],
    revenue: [2350000, 2620000, 2890000],
    orders: [3580, 3990, 4420],
    aov: [656, 656, 653]
  }
};
