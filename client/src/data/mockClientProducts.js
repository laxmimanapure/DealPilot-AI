// Realistic consumer products catalog for DealPilot AI Client Dashboard

export const CATEGORIES = [
  { id: 'all', name: 'All Categories', icon: 'Sparkles' },
  { id: 'electronics', name: 'Electronics', icon: 'Tv' },
  { id: 'smartphones', name: 'Smartphones', icon: 'Smartphone' },
  { id: 'laptops', name: 'Laptops & PCs', icon: 'Laptop' },
  { id: 'audio', name: 'Headphones & Audio', icon: 'Headphones' },
  { id: 'gaming', name: 'Gaming', icon: 'Gamepad2' },
  { id: 'fashion', name: 'Fashion & Shoes', icon: 'Shirt' },
  { id: 'accessories', name: 'Accessories', icon: 'Watch' },
  { id: 'home', name: 'Home & Kitchen', icon: 'Home' }
];

export const STORES = [
  'All Stores',
  'Amazon',
  'Flipkart',
  'Croma',
  'Reliance Digital',
  'Apple Store',
  'Nike Store'
];

export const MOCK_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones',
    brand: 'Sony',
    category: 'audio',
    currentPrice: 24999,
    originalPrice: 34990,
    discountPercent: 29,
    store: 'Amazon',
    rating: 4.8,
    reviewsCount: 4210,
    imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
    badge: 'DealPilot Pick',
    recommendationContext: 'Price dropped 29%',
    isPick: true,
    isTrending: true,
    isRecommended: true,
    isPriceDrop: true,
    priceDropAmount: 4500,
    previousPrice: 29499,
    availability: 'In Stock',
    aiReasoning: 'Price is 18% lower than the 90-day tracked average. Historical low detected across all major Indian electronics retailers.',
    priceHistory: [
      { date: 'May', price: 34990 },
      { date: 'Jun', price: 32490 },
      { date: 'Jul', price: 29990 },
      { date: 'Aug', price: 29499 },
      { date: 'Sep', price: 24999 }
    ]
  },
  {
    id: 'prod-2',
    name: 'Apple AirPods Pro (2nd Generation, MagSafe USB-C)',
    brand: 'Apple',
    category: 'audio',
    currentPrice: 19999,
    originalPrice: 24900,
    discountPercent: 20,
    store: 'Flipkart',
    rating: 4.9,
    reviewsCount: 8920,
    imageUrl: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80',
    badge: 'Price Drop',
    recommendationContext: 'Price dropped',
    isPick: false,
    isTrending: true,
    isRecommended: true,
    isPriceDrop: true,
    priceDropAmount: 4901,
    previousPrice: 24900,
    availability: 'In Stock',
    aiReasoning: 'Price reduced by ₹4,901 in early festive discount wave. Highly stable resale and warranty backing.',
    priceHistory: [
      { date: 'May', price: 24900 },
      { date: 'Jun', price: 24900 },
      { date: 'Jul', price: 22999 },
      { date: 'Aug', price: 22490 },
      { date: 'Sep', price: 19999 }
    ]
  },
  {
    id: 'prod-3',
    name: 'Keychron K2 Mechanical Wireless Keyboard (RGB, Hot-Swap)',
    brand: 'Keychron',
    category: 'electronics',
    currentPrice: 7499,
    originalPrice: 9999,
    discountPercent: 25,
    store: 'Croma',
    rating: 4.9,
    reviewsCount: 1420,
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    badge: 'Top Value',
    recommendationContext: 'Based on your interests',
    isPick: false,
    isTrending: true,
    isRecommended: true,
    isPriceDrop: false,
    priceDropAmount: 1500,
    previousPrice: 8999,
    availability: 'In Stock',
    aiReasoning: 'Consistent high review velocity with authentic tactile brown switches. Strong coupon match available.',
    priceHistory: [
      { date: 'May', price: 9999 },
      { date: 'Jun', price: 9499 },
      { date: 'Jul', price: 8999 },
      { date: 'Aug', price: 8499 },
      { date: 'Sep', price: 7499 }
    ]
  },
  {
    id: 'prod-4',
    name: 'Apple MacBook Air 13-inch M2 Chip (8GB Unified, 256GB SSD)',
    brand: 'Apple',
    category: 'laptops',
    currentPrice: 89990,
    originalPrice: 114900,
    discountPercent: 22,
    store: 'Reliance Digital',
    rating: 4.9,
    reviewsCount: 3105,
    imageUrl: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80',
    badge: 'Hot Deal',
    recommendationContext: 'Popular in your category',
    isPick: false,
    isTrending: true,
    isRecommended: true,
    isPriceDrop: true,
    priceDropAmount: 9910,
    previousPrice: 99900,
    availability: 'Few Left',
    aiReasoning: 'Sub-₹90K pricing for M2 series is rare outside corporate discounts. High energy efficiency.',
    priceHistory: [
      { date: 'May', price: 114900 },
      { date: 'Jun', price: 104900 },
      { date: 'Jul', price: 99900 },
      { date: 'Aug', price: 94900 },
      { date: 'Sep', price: 89990 }
    ]
  },
  {
    id: 'prod-5',
    name: 'Samsung Galaxy S25 Ultra 5G (Titanium Gray, 256GB)',
    brand: 'Samsung',
    category: 'smartphones',
    currentPrice: 119999,
    originalPrice: 134999,
    discountPercent: 11,
    store: 'Amazon',
    rating: 4.8,
    reviewsCount: 1650,
    imageUrl: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80',
    badge: 'Flagship Deal',
    recommendationContext: 'Great value',
    isPick: false,
    isTrending: true,
    isRecommended: false,
    isPriceDrop: false,
    priceDropAmount: 7000,
    previousPrice: 126999,
    availability: 'In Stock',
    aiReasoning: 'Effective ₹15,000 instant bank discount applies. S-Pen and AI transcription built-in.',
    priceHistory: [
      { date: 'May', price: 134999 },
      { date: 'Jun', price: 129999 },
      { date: 'Jul', price: 126999 },
      { date: 'Aug', price: 122999 },
      { date: 'Sep', price: 119999 }
    ]
  },
  {
    id: 'prod-6',
    name: 'Nike Air Max 90 Classic Running Shoes (Triple White)',
    brand: 'Nike',
    category: 'fashion',
    currentPrice: 7999,
    originalPrice: 10995,
    discountPercent: 27,
    store: 'Nike Store',
    rating: 4.7,
    reviewsCount: 5400,
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    badge: 'Street Style',
    recommendationContext: 'Price dropped',
    isPick: false,
    isTrending: false,
    isRecommended: true,
    isPriceDrop: true,
    priceDropAmount: 1500,
    previousPrice: 9499,
    availability: 'In Stock',
    aiReasoning: 'Authentic Max Air heel cushioning. Rare size availability at 27% markdown.',
    priceHistory: [
      { date: 'May', price: 10995 },
      { date: 'Jun', price: 10495 },
      { date: 'Jul', price: 9995 },
      { date: 'Aug', price: 9499 },
      { date: 'Sep', price: 7999 }
    ]
  },
  {
    id: 'prod-7',
    name: 'Dell UltraSharp 27-inch 4K USB-C Hub Monitor (U2723QE)',
    brand: 'Dell',
    category: 'electronics',
    currentPrice: 48999,
    originalPrice: 62000,
    discountPercent: 21,
    store: 'Croma',
    rating: 4.9,
    reviewsCount: 920,
    imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
    badge: 'Creator Pick',
    recommendationContext: 'Great value',
    isPick: false,
    isTrending: true,
    isRecommended: false,
    isPriceDrop: false,
    priceDropAmount: 4000,
    previousPrice: 52999,
    availability: 'In Stock',
    aiReasoning: 'IPS Black technology with 2000:1 contrast ratio and 90W single-cable USB-C power delivery.',
    priceHistory: [
      { date: 'May', price: 62000 },
      { date: 'Jun', price: 58000 },
      { date: 'Jul', price: 54999 },
      { date: 'Aug', price: 52999 },
      { date: 'Sep', price: 48999 }
    ]
  },
  {
    id: 'prod-8',
    name: 'Logitech MX Master 3S Wireless Performance Mouse',
    brand: 'Logitech',
    category: 'accessories',
    currentPrice: 8495,
    originalPrice: 10995,
    discountPercent: 23,
    store: 'Amazon',
    rating: 4.9,
    reviewsCount: 7800,
    imageUrl: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80',
    badge: 'Best Ergonomics',
    recommendationContext: 'Based on your interests',
    isPick: false,
    isTrending: false,
    isRecommended: true,
    isPriceDrop: true,
    priceDropAmount: 1500,
    previousPrice: 9995,
    availability: 'In Stock',
    aiReasoning: '8000 DPI sensor works on glass; quiet clicks and electromagnetic MagSpeed scroll wheel.',
    priceHistory: [
      { date: 'May', price: 10995 },
      { date: 'Jun', price: 10495 },
      { date: 'Jul', price: 9995 },
      { date: 'Aug', price: 9495 },
      { date: 'Sep', price: 8495 }
    ]
  },
  {
    id: 'prod-9',
    name: 'Bose QuietComfort 45 Bluetooth Wireless Headphones',
    brand: 'Bose',
    category: 'audio',
    currentPrice: 18990,
    originalPrice: 29900,
    discountPercent: 36,
    store: 'Flipkart',
    rating: 4.8,
    reviewsCount: 3400,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    badge: '36% OFF',
    recommendationContext: 'Price dropped',
    isPick: false,
    isTrending: true,
    isRecommended: true,
    isPriceDrop: true,
    priceDropAmount: 6000,
    previousPrice: 24990,
    availability: 'In Stock',
    aiReasoning: '36% discount is the steepest price cut recorded in 6 months for Bose QC line.',
    priceHistory: [
      { date: 'May', price: 29900 },
      { date: 'Jun', price: 28490 },
      { date: 'Jul', price: 26990 },
      { date: 'Aug', price: 24990 },
      { date: 'Sep', price: 18990 }
    ]
  }
];

export const MOCK_PRICE_ALERTS = [
  {
    id: 'alert-1',
    productId: 'prod-6',
    productName: 'Nike Air Max 90 Classic Running Shoes',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    brand: 'Nike',
    currentPrice: 7999,
    targetPrice: 7999,
    originalPrice: 10995,
    status: 'Target Met',
    active: true,
    createdDate: '3 days ago',
    store: 'Nike Store'
  },
  {
    id: 'alert-2',
    productId: 'prod-5',
    productName: 'Samsung Galaxy S25 Ultra 5G',
    imageUrl: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80',
    brand: 'Samsung',
    currentPrice: 119999,
    targetPrice: 112000,
    originalPrice: 134999,
    status: 'Watching',
    active: true,
    createdDate: '1 week ago',
    store: 'Amazon'
  },
  {
    id: 'alert-3',
    productId: 'prod-4',
    productName: 'Apple MacBook Air 13-inch M2',
    imageUrl: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80',
    brand: 'Apple',
    currentPrice: 89990,
    targetPrice: 85000,
    originalPrice: 114900,
    status: 'Watching',
    active: true,
    createdDate: '2 weeks ago',
    store: 'Reliance Digital'
  },
  {
    id: 'alert-4',
    productId: 'prod-7',
    productName: 'Dell UltraSharp 27-inch 4K Monitor',
    imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
    brand: 'Dell',
    currentPrice: 48999,
    targetPrice: 45000,
    originalPrice: 62000,
    status: 'Watching',
    active: false,
    createdDate: '1 month ago',
    store: 'Croma'
  }
];

export const MOCK_NOTIFICATIONS = [
  {
    id: 'notif-1',
    title: '🎯 Target Met: Nike Air Max 90',
    message: 'Hit your ₹7,999 target price on Nike Store! Price dropped by ₹1,500 today.',
    time: '20m ago',
    unread: true,
    type: 'price_drop'
  },
  {
    id: 'notif-2',
    title: '⚡ 36% OFF: Bose QuietComfort 45',
    message: 'New lowest price detected on Flipkart (₹18,990). DealPilot recommendation score: 96/100.',
    time: '2h ago',
    unread: true,
    type: 'deal'
  },
  {
    id: 'notif-3',
    title: '💰 ₹4,901 Price Drop on AirPods Pro',
    message: 'Apple AirPods Pro 2nd Gen dropped from ₹24,900 to ₹19,999.',
    time: 'Yesterday',
    unread: false,
    type: 'price_drop'
  }
];

export const MOCK_SAVINGS_DATA = {
  totalSaved: 12450,
  dealsPurchasedCount: 5,
  averageDiscount: 24.6,
  biggestSaving: '42% OFF',
  monthlyTrend: [
    { month: 'Apr', amount: 1400 },
    { month: 'May', amount: 2200 },
    { month: 'Jun', amount: 1850 },
    { month: 'Jul', amount: 3100 },
    { month: 'Aug', amount: 3900 }
  ],
  transactions: [
    {
      id: 'TX-9021',
      date: '2026-09-02',
      product: 'The ₹5,000 Trio Setup (Keyboard + Mouse + Headphone)',
      store: 'DealPilot AI Direct',
      retailPrice: 5700,
      paidPrice: 4800,
      saved: 900,
      discount: '15.8%'
    },
    {
      id: 'TX-8910',
      date: '2026-08-24',
      product: 'Sony WH-1000XM5 Noise Canceling Headphones',
      store: 'Amazon India',
      retailPrice: 34990,
      paidPrice: 26990,
      saved: 8000,
      discount: '22.9%'
    },
    {
      id: 'TX-8742',
      date: '2026-08-10',
      product: 'Logitech MX Master 3S Performance Mouse',
      store: 'Amazon India',
      retailPrice: 10995,
      paidPrice: 8495,
      saved: 2500,
      discount: '22.7%'
    },
    {
      id: 'TX-8601',
      date: '2026-07-28',
      product: 'Braided Dual HDMI & Cable Organization Bundle',
      store: 'Croma',
      retailPrice: 2250,
      paidPrice: 1200,
      saved: 1050,
      discount: '46.7%'
    }
  ]
};
