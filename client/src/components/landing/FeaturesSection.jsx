import React from 'react';
import { 
  Search, 
  Gauge, 
  Lightbulb, 
  Sparkles, 
  GitCommit, 
  BarChart3,
  CheckCircle2,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 md:py-28 bg-slate-950 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-400 mb-3">
            <span>Comprehensive Toolset</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Everything you need to make smarter deals.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
            Eliminate guesswork with end-to-end intelligence built for modern buyers, founders, and merchants.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Feature 1 — Smart Deal Discovery */}
          <div className="p-6 sm:p-7 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all duration-200 flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-xl bg-slate-800 border border-slate-700/80 flex items-center justify-center text-brand-400 mb-5">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Smart Deal Discovery
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Find promising opportunities faster with intelligent deal discovery that matches exact budget limits and item requirements.
              </p>
            </div>
            <div className="mt-6 p-3 rounded-lg bg-slate-950 border border-slate-800/80 text-xs text-slate-300 flex items-center justify-between">
              <span className="text-slate-400">Search Mode:</span>
              <span className="font-mono text-brand-400 font-medium">Intent & Budget Aware</span>
            </div>
          </div>

          {/* Feature 2 — AI Deal Scoring */}
          <div className="p-6 sm:p-7 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all duration-200 flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-xl bg-slate-800 border border-slate-700/80 flex items-center justify-center text-brand-400 mb-5">
                <Gauge className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                AI Deal Scoring
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Automatically evaluate opportunities using intelligent multi-variable scoring and relevant deal signals.
              </p>
            </div>
            <div className="mt-6 p-3 rounded-lg bg-slate-950 border border-slate-800/80 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">Opportunity Index:</span>
              <span className="text-sm font-bold text-brand-400 font-mono">Deal Score 92/100</span>
            </div>
          </div>

          {/* Feature 3 — Opportunity Intelligence */}
          <div className="p-6 sm:p-7 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all duration-200 flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-xl bg-slate-800 border border-slate-700/80 flex items-center justify-center text-brand-400 mb-5">
                <Lightbulb className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Opportunity Intelligence
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Understand the potential value, risk factors, and underlying strengths of each opportunity before taking action.
              </p>
            </div>
            <div className="mt-6 p-3 rounded-lg bg-slate-950 border border-slate-800/80 text-xs text-slate-300 flex items-center justify-between">
              <span className="text-slate-400">Risk Profile:</span>
              <span className="inline-flex items-center space-x-1 text-emerald-400 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Low Risk</span>
              </span>
            </div>
          </div>

          {/* Feature 4 — AI Recommendations */}
          <div className="p-6 sm:p-7 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all duration-200 flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-xl bg-slate-800 border border-slate-700/80 flex items-center justify-center text-brand-400 mb-5">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                AI Recommendations
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Get actionable recommendations instead of simply looking at raw numbers and unorganized spreadsheets.
              </p>
            </div>
            <div className="mt-6 p-3 rounded-lg bg-slate-950 border border-slate-800/80 text-xs text-slate-300">
              <span className="font-semibold text-brand-400">AI Recommendation:</span>
              <p className="text-[11px] text-slate-400 mt-1">
                "Prioritize this opportunity. Strong value potential with low estimated risk."
              </p>
            </div>
          </div>

          {/* Feature 5 — Deal Pipeline */}
          <div className="p-6 sm:p-7 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all duration-200 flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-xl bg-slate-800 border border-slate-700/80 flex items-center justify-center text-brand-400 mb-5">
                <GitCommit className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Deal Pipeline
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Track opportunities through a clear and organized deal lifecycle from initial intake to final agreement.
              </p>
            </div>
            <div className="mt-6 p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
              <div className="flex items-center justify-between text-[10px] font-medium text-slate-400">
                <span className="px-1.5 py-0.5 rounded bg-slate-900 text-slate-300">New</span>
                <span>→</span>
                <span className="px-1.5 py-0.5 rounded bg-slate-900 text-slate-300">Reviewing</span>
                <span>→</span>
                <span className="px-1.5 py-0.5 rounded bg-slate-900 text-slate-300">Qualified</span>
                <span>→</span>
                <span className="px-1.5 py-0.5 rounded bg-brand-500/10 text-brand-400 font-bold">Won</span>
              </div>
            </div>
          </div>

          {/* Feature 6 — Analytics & Insights */}
          <div className="p-6 sm:p-7 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all duration-200 flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-xl bg-slate-800 border border-slate-700/80 flex items-center justify-center text-brand-400 mb-5">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Analytics & Insights
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Understand deal performance, recovery rates, and gross margin trends through visual Chart.js analytics.
              </p>
            </div>
            <div className="mt-6 p-3 rounded-lg bg-slate-950 border border-slate-800/80 text-xs text-slate-300 flex items-center justify-between">
              <span className="text-slate-400">Margin Protection:</span>
              <span className="text-emerald-400 font-mono font-bold">+27.8% Avg</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
