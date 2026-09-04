import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  Bookmark, 
  Check, 
  ArrowRight, 
  Tag, 
  ShieldCheck,
  Zap,
  Filter
} from 'lucide-react';
import { formatINR } from '../../utils/currency';

export default function ClientDeals({ onStartNegotiation, onDirectCheckout, onToggleSave, savedIds = [] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const dealsCatalog = [
    {
      id: 'deal-1',
      title: 'Ergonomic Developer Workstation Bundle',
      category: 'workstation',
      items: ['Mechanical Keyboard (Brown Switches)', 'Wireless Precision Mouse', 'Active Noise-Cancelling Headphones'],
      originalPrice: 6200,
      dealPrice: 4900,
      savings: 1300,
      score: 95,
      match: '98% Match',
      tag: 'Best Value',
      merchant: 'OmniTech Solutions',
      warranty: '24 Months'
    },
    {
      id: 'deal-2',
      title: 'Executive Dual-Monitor Setup Package',
      category: 'displays',
      items: ['24-inch IPS 75Hz Monitor', 'Aluminium Adjustable Arm', 'Braided HDMI 2.1 Cable'],
      originalPrice: 14500,
      dealPrice: 11999,
      savings: 2501,
      score: 92,
      match: '94% Match',
      tag: 'High Value',
      merchant: 'Apex Displays India',
      warranty: '36 Months'
    },
    {
      id: 'deal-3',
      title: 'Content Creator Audio & Video Studio',
      category: 'studio',
      items: ['Cardioid USB Condenser Mic', '1080p 60FPS Webcam', 'Adjustable Ring Light Stand'],
      originalPrice: 8900,
      dealPrice: 7200,
      savings: 1700,
      score: 91,
      match: '91% Match',
      tag: 'Creator Choice',
      merchant: 'Acoustic Labs',
      warranty: '12 Months'
    },
    {
      id: 'deal-4',
      title: 'Minimalist Wireless Desk Essentials',
      category: 'peripherals',
      items: ['Low-profile Bluetooth Keyboard', 'Silent Optical Mouse', 'Vegan Leather Desk Mat'],
      originalPrice: 4200,
      dealPrice: 3400,
      savings: 800,
      score: 89,
      match: '93% Match',
      tag: 'Budget Saver',
      merchant: 'ModDesk Accessories',
      warranty: '12 Months'
    },
    {
      id: 'deal-5',
      title: 'High-Fidelity Audiophile Daily Trio',
      category: 'audio',
      items: ['Over-Ear Studio Headphones', 'Hi-Res USB-C DAC Dongle', 'Braided Balanced Cable'],
      originalPrice: 7800,
      dealPrice: 6499,
      savings: 1301,
      score: 94,
      match: '96% Match',
      tag: 'Top Audio',
      merchant: 'SonicWave Systems',
      warranty: '24 Months'
    },
    {
      id: 'deal-6',
      title: 'Student Budget Learning Essentials',
      category: 'peripherals',
      items: ['Membrane Quiet Keyboard', 'Ergo USB Mouse', 'Comfort Foam Wrist Rest'],
      originalPrice: 2800,
      dealPrice: 2199,
      savings: 601,
      score: 88,
      match: '90% Match',
      tag: 'Max Economy',
      merchant: 'CampusTech Goods',
      warranty: '12 Months'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Deals' },
    { id: 'workstation', label: 'Workstation' },
    { id: 'displays', label: 'Monitors' },
    { id: 'studio', label: 'Studio & Video' },
    { id: 'peripherals', label: 'Peripherals' },
    { id: 'audio', label: 'Audio' }
  ];

  const filteredDeals = dealsCatalog.filter((d) => {
    const matchesCat = selectedCategory === 'all' || d.category === selectedCategory;
    const matchesSearch = d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          d.items.some(i => i.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          d.merchant.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Explore Curated Opportunities
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Browse active seller packages pre-evaluated by DealPilot AI.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative max-w-sm w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search deals, merchants, or items..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCategory(c.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              selectedCategory === c.id
                ? 'bg-brand-500 text-slate-950 font-semibold'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Deals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDeals.map((deal) => {
          const isSaved = savedIds.includes(deal.id);
          return (
            <div
              key={deal.id}
              className="rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700/80 p-5 sm:p-6 flex flex-col justify-between transition-all duration-200 group"
            >
              <div>
                
                {/* Header Tag & Bookmark */}
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-brand-500/10 text-brand-400 border border-brand-500/20">
                    {deal.tag}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold text-slate-300">
                      Score: <strong className="text-brand-400">{deal.score}</strong>
                    </span>
                    <button
                      onClick={() => onToggleSave(deal.id)}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        isSaved
                          ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/40'
                          : 'bg-slate-950 text-slate-500 hover:text-slate-300 border-slate-800'
                      }`}
                      title={isSaved ? 'Remove from saved' : 'Save opportunity'}
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h3 className="text-base font-bold text-white mb-2 group-hover:text-brand-300 transition-colors">
                  {deal.title}
                </h3>
                
                <div className="text-xs text-slate-400 mb-3 flex items-center justify-between">
                  <span>Seller: <strong>{deal.merchant}</strong></span>
                  <span>{deal.warranty} warranty</span>
                </div>

                {/* Bundle Items List */}
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1.5 mb-4 text-xs text-slate-300">
                  <div className="text-[10px] uppercase font-semibold text-slate-500">Includes {deal.items.length} items:</div>
                  {deal.items.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-2 truncate">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-400" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Pricing Details */}
                <div className="flex items-baseline justify-between pt-2 border-t border-slate-800/60 mb-4">
                  <div>
                    <span className="text-lg sm:text-xl font-bold text-white font-mono">
                      {formatINR(deal.dealPrice)}
                    </span>
                    <span className="text-xs text-slate-500 line-through ml-2 font-mono">
                      {formatINR(deal.originalPrice)}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-emerald-400">
                    Save {formatINR(deal.savings)}
                  </span>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => onStartNegotiation({
                    id: deal.id,
                    title: deal.title,
                    name: deal.title,
                    totalPrice: deal.dealPrice,
                    retailPrice: deal.dealPrice,
                    wholesaleCost: Math.round(deal.dealPrice * 0.72),
                    costPrice: Math.round(deal.dealPrice * 0.72),
                    profitMarginPercent: 28,
                    items: deal.items.map((it, i) => {
                      const itemPrice = Math.round(deal.dealPrice / deal.items.length);
                      return {
                        id: `${deal.id}-it-${i}`,
                        name: it,
                        category: deal.category || 'tech',
                        price: itemPrice,
                        retailPrice: itemPrice,
                        costPrice: Math.round(itemPrice * 0.72),
                        wholesaleCost: Math.round(itemPrice * 0.72)
                      };
                    })
                  })}
                  className="w-full py-2 px-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold transition-colors flex items-center justify-center space-x-1"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Negotiate</span>
                </button>
                <button
                  onClick={() => onDirectCheckout({
                    id: deal.id,
                    title: deal.title,
                    name: deal.title,
                    totalPrice: deal.dealPrice,
                    retailPrice: deal.dealPrice,
                    wholesaleCost: Math.round(deal.dealPrice * 0.72),
                    costPrice: Math.round(deal.dealPrice * 0.72),
                    profitMarginPercent: 28,
                    items: deal.items.map((it, i) => {
                      const itemPrice = Math.round(deal.dealPrice / deal.items.length);
                      return {
                        id: `${deal.id}-it-${i}`,
                        name: it,
                        category: deal.category || 'tech',
                        price: itemPrice,
                        retailPrice: itemPrice,
                        costPrice: Math.round(itemPrice * 0.72),
                        wholesaleCost: Math.round(itemPrice * 0.72)
                      };
                    })
                  })}
                  className="w-full py-2 px-3 rounded-xl bg-white hover:bg-neutral-200 text-black text-xs font-bold transition-colors flex items-center justify-center space-x-1"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
