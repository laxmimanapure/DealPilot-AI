import React, { useState } from 'react';
import { Sparkles, ShieldAlert, CheckCircle2, ArrowRight, TrendingUp, DollarSign, Star, Info, ShoppingCart } from 'lucide-react';
import { formatINR } from '../utils/currency';

export default function PlanComparison({
  plans = [],
  customerBudget = 5000,
  onStartNegotiation,
  onDirectCheckout
}) {
  const [viewMode, setViewMode] = useState('cards'); // 'cards' | 'table'

  if (!plans || plans.length === 0) return null;

  return (
    <div className="space-y-6">
      
      {/* Section Header & View Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xl sm:text-2xl font-black text-white">
              Generated 3 Smart Shopping Plans
            </span>
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              Budget: {formatINR(customerBudget)}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Compare premium quality, balanced value, and maximum savings — or negotiate any plan with AI.
          </p>
        </div>

        <div className="flex items-center space-x-2 self-start sm:self-auto bg-slate-900 border border-slate-800 p-1 rounded-xl">
          <button
            onClick={() => setViewMode('cards')}
            className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${
              viewMode === 'cards'
                ? 'bg-brand-500/20 text-brand-300 border border-brand-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Card View
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${
              viewMode === 'table'
                ? 'bg-brand-500/20 text-brand-300 border border-brand-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Comparison Matrix
          </button>
        </div>
      </div>

      {/* Cards View */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const isBestQuality = plan.type === 'BEST_QUALITY';
            const isBestValue = plan.type === 'BEST_VALUE';
            const isBudgetSaver = plan.type === 'BUDGET_SAVER';

            let borderStyle = 'border-slate-800 hover:border-slate-700';
            let badgeBg = 'bg-slate-800 text-slate-300 border-slate-700';
            let accentGradient = 'from-slate-900 via-slate-900 to-slate-950';

            if (isBestQuality) {
              borderStyle = 'border-indigo-500/40 hover:border-indigo-500/70 shadow-glow-indigo';
              badgeBg = 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40';
              accentGradient = 'from-indigo-950/40 via-slate-900 to-slate-900';
            } else if (isBestValue) {
              borderStyle = 'border-brand-500/40 hover:border-brand-500/70 shadow-glow';
              badgeBg = 'bg-brand-500/20 text-brand-300 border-brand-500/40';
              accentGradient = 'from-emerald-950/40 via-slate-900 to-slate-900';
            } else if (isBudgetSaver) {
              borderStyle = 'border-amber-500/40 hover:border-amber-500/70 shadow-glow-gold';
              badgeBg = 'bg-amber-500/20 text-amber-300 border-amber-500/40';
              accentGradient = 'from-amber-950/30 via-slate-900 to-slate-900';
            }

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl border ${borderStyle} bg-gradient-to-b ${accentGradient} p-6 flex flex-col justify-between transition-all duration-300 hover:scale-[1.01]`}
              >
                {/* Popular / Recommended Tag */}
                {isBestQuality && plan.isOverBudget && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-indigo-600 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg flex items-center space-x-1">
                    <Sparkles className="w-3 h-3" />
                    <span>AI Negotiation Target</span>
                  </div>
                )}
                {isBestValue && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-brand-600 text-[10px] font-bold uppercase tracking-wider text-slate-950 shadow-lg flex items-center space-x-1">
                    <Star className="w-3 h-3 fill-slate-950" />
                    <span>Recommended Balance</span>
                  </div>
                )}

                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${badgeBg}`}>
                      {plan.badge}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {plan.items.length} Items
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mt-3">
                    {plan.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 min-h-[32px]">
                    {plan.tagline}
                  </p>

                  {/* Price & Budget Delta Banner */}
                  <div className="mt-4 p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-slate-400 block uppercase tracking-wider font-semibold">Total Price</span>
                      <span className="text-2xl font-black text-white font-mono">
                        {formatINR(plan.totalPrice)}
                      </span>
                    </div>

                    <div className="text-right">
                      {plan.budgetDelta > 0 ? (
                        <div className="inline-flex flex-col items-end">
                          <span className="text-[10px] uppercase tracking-wider font-bold text-rose-400 bg-rose-500/10 border border-rose-500/30 px-2 py-0.5 rounded-full">
                            + {formatINR(plan.budgetDelta)} Over
                          </span>
                          <span className="text-[10px] text-slate-400 mt-0.5">Eligible for AI Deal</span>
                        </div>
                      ) : (
                        <div className="inline-flex flex-col items-end">
                          <span className="text-[10px] uppercase tracking-wider font-bold text-brand-400 bg-brand-500/10 border border-brand-500/30 px-2 py-0.5 rounded-full">
                            {formatINR(Math.abs(plan.budgetDelta))} Savings
                          </span>
                          <span className="text-[10px] text-slate-400 mt-0.5">Within Budget</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="mt-5 space-y-3">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                      Included Hardware
                    </span>
                    {plan.items.map((item, idx) => (
                      <div
                        key={item.id || idx}
                        className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/60 hover:border-slate-700/80 transition-all flex items-start justify-between gap-2"
                      >
                        <div className="flex items-start space-x-2.5">
                          <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-slate-800 border border-slate-700/50">
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="w-full h-full object-cover"
                              onError={(e) => { e.target.style.display = 'none'; }}
                            />
                          </div>
                          <div>
                            <h4 className="text-xs font-semibold text-white line-clamp-1">
                              {item.name}
                            </h4>
                            <div className="flex items-center space-x-2 text-[10px] text-slate-400 mt-0.5">
                              <span className="capitalize">{item.category}</span>
                              <span>•</span>
                              <span className="flex items-center text-amber-400">
                                <Star className="w-2.5 h-2.5 fill-amber-400 mr-0.5" />
                                {item.rating}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right flex-shrink-0">
                          <span className="text-xs font-bold text-slate-200 font-mono">
                            {formatINR(item.retailPrice)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Card CTA Actions */}
                <div className="mt-6 pt-4 border-t border-slate-800/80 space-y-2">
                  {/* Primary CTA: Negotiate Deal */}
                  <button
                    onClick={() => onStartNegotiation(plan)}
                    className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md ${
                      isBestQuality
                        ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-400 hover:to-indigo-500 text-white shadow-glow-indigo'
                        : isBestValue
                        ? 'bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-400 hover:to-brand-500 text-slate-950 shadow-glow'
                        : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                    }`}
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{plan.budgetDelta > 0 ? 'Negotiate Budget Gap' : 'Negotiate Extra Perks'}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </button>

                  {/* Secondary CTA: Direct Checkout */}
                  <button
                    onClick={() => onDirectCheckout(plan)}
                    className="w-full flex items-center justify-center space-x-1.5 py-2 px-3 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all border border-transparent hover:border-slate-800"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>Buy at Listed Price ({formatINR(plan.totalPrice)})</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        /* Matrix Table View */
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/90 shadow-xl">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-4 px-6">Feature / Category</th>
                {plans.map(p => (
                  <th key={p.id} className="py-4 px-6 text-center font-bold text-white">
                    {p.badge}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {/* Total Price Row */}
              <tr className="bg-slate-800/30 font-semibold">
                <td className="py-4 px-6 text-white font-bold">Total Price</td>
                {plans.map(p => (
                  <td key={p.id} className="py-4 px-6 text-center font-mono font-bold text-base text-white">
                    {formatINR(p.totalPrice)}
                    <span className={`block text-[10px] font-normal ${p.budgetDelta > 0 ? 'text-rose-400' : 'text-brand-400'}`}>
                      {p.budgetDelta > 0 ? `+${formatINR(p.budgetDelta)} over budget` : `${formatINR(Math.abs(p.budgetDelta))} saved`}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Items Breakdown Rows */}
              {plans[0]?.items.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-850/50">
                  <td className="py-3.5 px-6 font-medium capitalize text-slate-400">
                    {item.category}
                  </td>
                  {plans.map(p => {
                    const planItem = p.items[idx];
                    return (
                      <td key={p.id} className="py-3.5 px-6 text-center">
                        <div className="font-semibold text-white">{planItem?.name}</div>
                        <div className="text-slate-400 font-mono text-xs">{formatINR(planItem?.retailPrice)}</div>
                      </td>
                    );
                  })}
                </tr>
              ))}

              {/* Action Row */}
              <tr className="bg-slate-950/50">
                <td className="py-4 px-6 font-bold text-white">Action</td>
                {plans.map(p => (
                  <td key={p.id} className="py-4 px-6 text-center">
                    <button
                      onClick={() => onStartNegotiation(p)}
                      className="px-4 py-2 rounded-xl bg-brand-500 text-slate-950 font-bold text-xs hover:bg-brand-400 transition-all"
                    >
                      Negotiate {p.title}
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}
