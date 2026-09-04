import React from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  Clock 
} from 'lucide-react';
import { formatINR } from '../../utils/currency';

export default function ClientRecommendations({ onStartNegotiation, onDirectCheckout }) {
  const recommendations = [
    {
      id: 'rec-1',
      title: 'Top Recommendation: Mechanical Switch WFH Setup',
      matchScore: 96,
      budgetFit: '100% within your ₹5,000 target',
      currentPrice: 4900,
      originalPrice: 6200,
      savings: 1300,
      confidence: '95% AI Confidence',
      reasoning: 'The brown switches offer tactile precision without acoustic distraction on calls. Combined with a 2400 DPI mouse, this bundle delivers highest durability per rupee.',
      items: ['Ant Esports MK1200 Brown', 'Logitech G102 Lightsync', 'Cosmic Byte GS410 Audio'],
      actionLabel: 'Negotiate for Free Cable Clips'
    },
    {
      id: 'rec-2',
      title: 'Alternative Swap: Bluetooth Wireless Nomad Duo',
      matchScore: 92,
      budgetFit: '₹1,400 under budget (High savings)',
      currentPrice: 3600,
      originalPrice: 4500,
      savings: 900,
      confidence: '92% AI Confidence',
      reasoning: 'Sacrifices mechanical switches for multi-device Bluetooth switching. Perfect if mobility and battery endurance outweigh competitive gaming specs.',
      items: ['Portronics Bubble Wireless Keys', 'Zebronics Dash Rechargeable', 'boAt BassHeads 900'],
      actionLabel: 'Direct Checkout at ₹3,600'
    },
    {
      id: 'rec-3',
      title: 'Premium Upgrade: Studio Pro Audiophile Configuration',
      matchScore: 90,
      budgetFit: '₹700 over budget (Negotiable)',
      currentPrice: 5700,
      originalPrice: 7100,
      savings: 1400,
      confidence: '89% AI Confidence',
      reasoning: 'Includes braided detachable cables and studio-grade 50mm neodymium audio drivers. Merchant has room to absorb a ₹500 bounded discount.',
      items: ['Redragon K552 RGB Mechanical', 'Razer DeathAdder Essential', 'OneOdio Pro-10 Studio Audio'],
      actionLabel: 'Negotiate Gap with AI'
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-2 text-xs font-semibold text-brand-400 mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Personalized Decision Intelligence</span>
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          AI Recommendations for You
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Algorithmically ranked opportunities optimized against your current budget and item constraints.
        </p>
      </div>

      {/* Recommendations List */}
      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <div
            key={rec.id}
            className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700/80 transition-all duration-200 space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400 flex-shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-brand-400 font-mono">Rank #{index + 1}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-xs text-slate-400 font-medium">{rec.confidence}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mt-0.5">
                    {rec.title}
                  </h3>
                </div>
              </div>

              <div className="flex items-baseline space-x-3 sm:self-center">
                <span className="text-2xl font-black text-white font-mono">{formatINR(rec.currentPrice)}</span>
                <span className="text-xs text-slate-500 line-through font-mono">{formatINR(rec.originalPrice)}</span>
                <span className="text-xs font-bold text-emerald-400">Save {formatINR(rec.savings)}</span>
              </div>
            </div>

            {/* AI Reasoning Box */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/90 text-xs text-slate-300 leading-relaxed">
              <strong className="text-brand-400 block mb-1">Why DealPilot Recommends This:</strong>
              {rec.reasoning}
            </div>

            {/* Items Included */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-400 font-medium">Included:</span>
              {rec.items.map((item, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 text-slate-200"
                >
                  {item}
                </span>
              ))}
            </div>

            {/* Actions Bar */}
            <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center space-x-2 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-brand-400" />
                <span>{rec.budgetFit}</span>
              </div>

              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <button
                  onClick={() => onStartNegotiation({
                    id: rec.id,
                    title: rec.title,
                    name: rec.title,
                    totalPrice: rec.currentPrice,
                    retailPrice: rec.currentPrice,
                    wholesaleCost: Math.round(rec.currentPrice * 0.7),
                    costPrice: Math.round(rec.currentPrice * 0.7),
                    profitMarginPercent: 30,
                    items: rec.items.map((it, i) => {
                      const itemPrice = Math.round(rec.currentPrice / rec.items.length);
                      return {
                        id: `${rec.id}-it-${i}`,
                        name: it,
                        category: 'peripherals',
                        price: itemPrice,
                        retailPrice: itemPrice,
                        costPrice: Math.round(itemPrice * 0.7),
                        wholesaleCost: Math.round(itemPrice * 0.7)
                      };
                    })
                  })}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Negotiate Bounded Gap</span>
                </button>
                <button
                  onClick={() => onDirectCheckout({
                    id: rec.id,
                    title: rec.title,
                    name: rec.title,
                    totalPrice: rec.currentPrice,
                    retailPrice: rec.currentPrice,
                    wholesaleCost: Math.round(rec.currentPrice * 0.7),
                    costPrice: Math.round(rec.currentPrice * 0.7),
                    profitMarginPercent: 30,
                    items: rec.items.map((it, i) => {
                      const itemPrice = Math.round(rec.currentPrice / rec.items.length);
                      return {
                        id: `${rec.id}-it-${i}`,
                        name: it,
                        category: 'peripherals',
                        price: itemPrice,
                        retailPrice: itemPrice,
                        costPrice: Math.round(itemPrice * 0.7),
                        wholesaleCost: Math.round(itemPrice * 0.7)
                      };
                    })
                  })}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-white hover:bg-neutral-200 text-black text-xs font-bold flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <span>Accept & Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
