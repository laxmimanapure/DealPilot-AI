import React, { useState, useEffect } from 'react';
import {
  Search,
  Sparkles,
  Store,
  ShieldCheck,
  ArrowRight,
  Zap,
  Tag,
  Star,
  CheckCircle2,
  RefreshCw,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import { formatINR } from '../../utils/currency';
import { generatePlans } from '../../services/api';

export default function ClientMarketplaceDiscovery({
  onSelectProductForDeal,
  onStartNegotiation,
  onDirectCheckout
}) {
  const [searchInput, setSearchInput] = useState('I have ₹5,000 for a keyboard');
  const [isLoading, setIsLoading] = useState(false);
  const [plansResult, setPlansResult] = useState(null);

  useEffect(() => {
    // Run initial search on mount
    handleSearch('I have ₹5,000 for a keyboard');
  }, []);

  const handleSearch = async (queryToRun) => {
    const q = queryToRun || searchInput;
    if (!q.trim()) return;

    setIsLoading(true);
    try {
      const res = await generatePlans({ query: q });
      if (res.success && res.data) {
        setPlansResult(res.data);
      }
    } catch (err) {
      console.error('Failed to search marketplace:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePresetClick = (presetText) => {
    setSearchInput(presetText);
    handleSearch(presetText);
  };

  const getTierBadgeStyle = (type) => {
    switch (type) {
      case 'BEST_QUALITY':
        return {
          containerBorder: 'border-emerald-500/30 hover:border-emerald-500/60',
          badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
          accent: 'text-emerald-400',
          btnBg: 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-emerald-500/20'
        };
      case 'BEST_VALUE':
        return {
          containerBorder: 'border-blue-500/30 hover:border-blue-500/60',
          badgeBg: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
          accent: 'text-blue-400',
          btnBg: 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20'
        };
      case 'BUDGET_SAVER':
        return {
          containerBorder: 'border-amber-500/30 hover:border-amber-500/60',
          badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
          accent: 'text-amber-400',
          btnBg: 'bg-white hover:bg-neutral-200 text-black shadow-white/10'
        };
      default:
        return {
          containerBorder: 'border-white/[0.08] hover:border-white/[0.2]',
          badgeBg: 'bg-white/[0.05] text-slate-300 border-white/[0.08]',
          accent: 'text-white',
          btnBg: 'bg-white text-black'
        };
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Search Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0c1017] border border-white/[0.08] shadow-sm relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Cross-Merchant Deal Engine</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            What are you looking for?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            State your budget and what you need. DealPilot automatically scans all verified merchants across the marketplace and ranks the best options.
          </p>

          {/* Search Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="flex flex-col sm:flex-row items-center gap-2.5 pt-2"
          >
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="e.g. 'I have ₹5,000 for a keyboard' or 'Wireless mouse under 3000'"
                className="w-full pl-11 pr-4 py-3 text-xs sm:text-sm bg-[#07090e] border border-white/[0.12] rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 shadow-inner"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs sm:text-sm font-bold transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-black" />
                  <span>Scanning Merchants...</span>
                </>
              ) : (
                <>
                  <span>Find Best Deals</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Example Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-400">
            <span className="text-[11px] font-semibold text-slate-500">Popular searches:</span>
            {[
              'I have ₹5,000 for a keyboard',
              'Wireless mouse under 3000',
              'Looking for headphones under 6000',
              'Gaming monitor with ₹15,000 budget'
            ].map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => handlePresetClick(chip)}
                className="px-3 py-1 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-slate-300 hover:text-white transition-colors text-[11px]"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations Section */}
      {plansResult && (
        <div className="space-y-4">
          
          {/* Status Telemetry */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <span>Marketplace Recommendations</span>
                <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-md bg-white/[0.05] text-slate-300 border border-white/[0.08]">
                  Target: {formatINR(plansResult.customerBudget)}
                </span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Pool of eligible products evaluated across all verified marketplace merchants.
              </p>
            </div>

            <div className="text-[11px] text-slate-500 font-medium">
              3 Distinct Recommendation Tiers
            </div>
          </div>

          {/* 3 Clean Recommendation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {plansResult.plans.map((plan) => {
              const product = plan.resolvedProduct || (plan.items && plan.items[0]) || {};
              const merchant = plan.resolvedMerchant || { merchantName: plan.soldBy || 'OmniTech Solutions' };
              const styles = getTierBadgeStyle(plan.type);

              return (
                <div
                  key={plan.id}
                  className={`p-6 rounded-3xl bg-[#0c1017] border ${styles.containerBorder} transition-all flex flex-col justify-between space-y-5 shadow-sm group relative`}
                >
                  <div className="space-y-3.5">
                    
                    {/* Top Tier Badge & Tagline */}
                    <div className="flex items-center justify-between">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider font-mono border ${styles.badgeBg}`}>
                        {plan.title}
                      </span>

                      {plan.budgetDelta > 0 ? (
                        <span className="text-[11px] font-mono text-amber-400 font-semibold">
                          Negotiable
                        </span>
                      ) : (
                        <span className="text-[11px] font-mono text-emerald-400 font-semibold">
                          In Budget
                        </span>
                      )}
                    </div>

                    {/* Product Image Preview */}
                    <div className="aspect-[16/10] rounded-2xl bg-[#07090e] border border-white/[0.06] overflow-hidden flex items-center justify-center relative">
                      {product.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="text-slate-600 text-xs">Product Preview</div>
                      )}
                    </div>

                    {/* Product Title */}
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-emerald-400 transition-colors leading-snug line-clamp-2">
                        {product.name}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-1">
                        {product.brand} • Rating {product.rating}★
                      </p>
                    </div>

                    {/* Price & Merchant Line (Requirement 3 & 12) */}
                    <div className="p-3.5 rounded-2xl bg-[#07090e] border border-white/[0.06] space-y-1.5">
                      <div className="flex items-baseline justify-between">
                        <span className="text-xs text-slate-400 font-medium">Marketplace Price:</span>
                        <span className="text-lg sm:text-xl font-extrabold font-mono text-white">
                          {formatINR(plan.totalPrice)}
                        </span>
                      </div>

                      {/* Sold by [Merchant Name] */}
                      <div className="flex items-center justify-between text-xs pt-1 border-t border-white/[0.04]">
                        <span className="text-slate-500">Seller:</span>
                        <span className="font-semibold text-emerald-400 flex items-center gap-1 truncate max-w-[160px]">
                          <Store className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span className="truncate">{merchant.merchantName}</span>
                        </span>
                      </div>
                    </div>

                    {/* Tier Highlight / Explanation */}
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                      {plan.highlight}
                    </p>
                  </div>

                  {/* Primary CTA: View Deal (Resolves to ONE product + ONE merchant) */}
                  <div className="pt-2">
                    <button
                      onClick={() => onSelectProductForDeal(product, plan)}
                      className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 ${styles.btnBg}`}
                    >
                      <span>View Deal</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      )}

    </div>
  );
}
