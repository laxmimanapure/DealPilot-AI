import React from 'react';
import { 
  Sparkles, 
  TrendingDown, 
  Bookmark, 
  ShoppingBag, 
  ShieldCheck, 
  Zap, 
  CheckCircle2,
  ArrowRight 
} from 'lucide-react';
import RequestBuilder from '../RequestBuilder';
import PlanComparison from '../PlanComparison';
import { formatINR } from '../../utils/currency';

export default function ClientOverview({
  user,
  plansResult,
  isLoadingPlans,
  onGeneratePlans,
  currentBudget,
  currentCategories,
  currentPrompt,
  onStartNegotiation,
  onDirectCheckout,
  onOpenDemoPresets,
  savedCount = 4
}) {
  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Client Welcome Hero Card */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-slate-850 to-emerald-950/40 border border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-semibold border border-brand-500/30 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Purchase & Budget Copilot</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
            Welcome back, {user?.name || 'Shopper'}! <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-brand-400 via-emerald-300 to-indigo-400 bg-clip-text text-transparent">
              Smart Deals Tailored to Your Exact Budget.
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2.5 leading-relaxed max-w-2xl">
            Input the products you need and your hard budget limit. DealPilot generates 3 optimized shopping plans — then safely negotiates with sellers to close budget gaps.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-5">
            <button
              onClick={onOpenDemoPresets}
              className="inline-flex items-center space-x-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold px-4 py-2 rounded-xl border border-amber-500/40 text-xs transition-all"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Try Hero Demo (₹5,000 Setup)</span>
            </button>
            <div className="flex items-center space-x-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-brand-400" />
              <span>Safe bounded discounts • Verified Razorpay checkout</span>
            </div>
          </div>
        </div>
      </div>

      {/* Client KPI Badges */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Recommended for You</span>
            <div className="w-8 h-8 rounded-lg bg-brand-500/10 flex items-center justify-center text-brand-400">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-black text-white">
            14 Deals
          </div>
          <div className="mt-1 text-xs text-brand-400 font-medium">
            3 top recommendations active
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Saved Deals</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
              <Bookmark className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-black text-white">
            {savedCount} Saved
          </div>
          <div className="mt-1 text-xs text-slate-400">
            Bookmarked opportunities
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Potential Savings</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <TrendingDown className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-black text-emerald-400 font-mono">
            {formatINR(1250)}
          </div>
          <div className="mt-1 text-xs text-slate-400">
            Average discount per bundle
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Active Opportunities</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-black text-white">
            3 Plans
          </div>
          <div className="mt-1 text-xs text-amber-400 font-medium">
            Ready for safe negotiation
          </div>
        </div>

      </div>

      {/* Integrated Existing RequestBuilder Component */}
      <RequestBuilder
        onGeneratePlans={onGeneratePlans}
        isLoading={isLoadingPlans}
        initialBudget={currentBudget}
        initialCategories={currentCategories}
        initialPrompt={currentPrompt}
      />

      {/* Integrated Existing PlanComparison Component */}
      {plansResult && (
        <PlanComparison
          plans={plansResult.plans}
          customerBudget={plansResult.customerBudget}
          onStartNegotiation={onStartNegotiation}
          onDirectCheckout={onDirectCheckout}
        />
      )}

      {/* 4-Stage Customer Process Infographic */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800">
        <h3 className="text-center text-base sm:text-lg font-bold text-white mb-6">
          How DealPilot AI Works for Clients in 4 Simple Stages
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
            <div className="w-8 h-8 rounded-lg bg-brand-500/20 text-brand-400 font-black text-xs flex items-center justify-center mb-3">
              01
            </div>
            <h4 className="font-bold text-white text-sm">1. Customer Request</h4>
            <p className="text-xs text-slate-400 mt-1">
              Input items needed, total budget, and preferences in natural language.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 font-black text-xs flex items-center justify-center mb-3">
              02
            </div>
            <h4 className="font-bold text-white text-sm">2. Planner Engine</h4>
            <p className="text-xs text-slate-400 mt-1">
              Generates 3 tailored plans: 💎 Best Quality, ⚖️ Best Value, and 💰 Budget Saver.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 font-black text-xs flex items-center justify-center mb-3">
              03
            </div>
            <h4 className="font-bold text-white text-sm">3. Safe AI Negotiation</h4>
            <p className="text-xs text-slate-400 mt-1">
              Closes budget gaps using bounded discounts & swaps under strict merchant safety rules.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 font-black text-xs flex items-center justify-center mb-3">
              04
            </div>
            <h4 className="font-bold text-white text-sm">4. Razorpay Checkout</h4>
            <p className="text-xs text-slate-400 mt-1">
              Instant test-mode payment verification with official tax invoices and receipts.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}
