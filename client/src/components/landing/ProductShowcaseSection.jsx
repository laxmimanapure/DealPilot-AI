import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  BarChart3, 
  ShoppingBag, 
  Store,
  Layers,
  CheckCircle2,
  Sliders,
  DollarSign
} from 'lucide-react';
import { formatINR } from '../../utils/currency';

export default function ProductShowcaseSection({ onOpenRoleSelect, onExploreClient, onExploreMerchant }) {
  const [activeTab, setActiveTab] = useState('intelligence'); // 'intelligence' | 'pipeline' | 'analytics'

  return (
    <section className="py-20 md:py-28 bg-slate-950/70 border-b border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-400 mb-3">
            <span>Unified Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            One place for your entire deal workflow.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
            Experience the complete harmony of deal discovery, intelligent scoring, policy guardrails, and real-time analytics.
          </p>
        </div>

        {/* Feature Hotspot Callout Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
          <button
            onClick={() => setActiveTab('intelligence')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'intelligence'
                ? 'bg-brand-500 text-slate-950 shadow-md shadow-brand-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Deal Intelligence & Scoring
          </button>
          <button
            onClick={() => setActiveTab('pipeline')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'pipeline'
                ? 'bg-brand-500 text-slate-950 shadow-md shadow-brand-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Pipeline & 3-Tier Comparison
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'analytics'
                ? 'bg-brand-500 text-slate-950 shadow-md shadow-brand-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Analytics & Policy Guardrails
          </button>
        </div>

        {/* Product Showcase Window */}
        <div className="relative rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl shadow-black/50 overflow-hidden">
          
          {/* Top Frame Bar */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800 bg-slate-950/80">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-slate-700" />
              <div className="w-3 h-3 rounded-full bg-slate-700" />
              <div className="w-3 h-3 rounded-full bg-slate-700" />
              <span className="ml-3 text-xs text-slate-400 font-mono hidden sm:inline">
                dealpilot-ai://app.dealpilot.ai/live-session
              </span>
            </div>
            <div className="flex items-center space-x-3 text-xs text-slate-400">
              <span className="flex items-center space-x-1.5 text-brand-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Deterministic Rules Active</span>
              </span>
            </div>
          </div>

          {/* Dynamic Mockup Viewport */}
          <div className="p-6 sm:p-8 lg:p-10 min-h-[400px]">
            
            {activeTab === 'intelligence' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-mono text-brand-400 font-semibold uppercase">AI Intelligence Engine</span>
                    <h3 className="text-2xl font-bold text-white mt-1">Multi-Signal Deal Prioritization</h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 rounded-md text-xs font-bold bg-brand-500/10 text-brand-400 border border-brand-500/20">
                      Top Recommendation
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-5 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-xs text-slate-400 font-medium">Deal Score</div>
                    <div className="text-3xl font-extrabold text-brand-400 mt-1 font-mono">92/100</div>
                    <div className="text-xs text-slate-400 mt-2">Weighted quality & value density score</div>
                  </div>
                  <div className="p-5 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-xs text-slate-400 font-medium">Expected Value</div>
                    <div className="text-3xl font-extrabold text-white mt-1 font-mono">{formatINR(48500)}</div>
                    <div className="text-xs text-emerald-400 mt-2">+24% vs default customer expectation</div>
                  </div>
                  <div className="p-5 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-xs text-slate-400 font-medium">Risk Indicator</div>
                    <div className="text-2xl font-bold text-emerald-400 mt-1">Verified Low</div>
                    <div className="text-xs text-slate-400 mt-2">Wholesale floor protected at 28% margin</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start space-x-3">
                  <Sparkles className="w-5 h-5 text-brand-400 flex-shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm text-slate-300">
                    <strong>AI Recommendation Callout:</strong> "DealPilot evaluated 3 distinct variations and recommends moving forward with Tier 2 Value configuration. The proposed substitution closes the ₹800 budget gap without violating merchant margin thresholds."
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'pipeline' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-mono text-indigo-400 font-semibold uppercase">Opportunity Pipeline</span>
                    <h3 className="text-2xl font-bold text-white mt-1">3-Tier Plan Comparison & Negotiation</h3>
                  </div>
                  <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-950 border border-slate-800 text-slate-300">
                    Active Session: ₹5,000 Setup
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-xs font-bold text-indigo-300">💎 Best Quality</div>
                    <div className="text-xl font-bold text-white mt-2">{formatINR(5700)}</div>
                    <div className="text-xs text-amber-400 mt-1">₹700 over budget</div>
                    <div className="mt-3 text-[11px] text-slate-400">Mechanical switches, studio audio</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950 border border-brand-500/40 relative">
                    <div className="text-xs font-bold text-brand-400">⚖️ Best Value (Recommended)</div>
                    <div className="text-xl font-bold text-white mt-2">{formatINR(4900)}</div>
                    <div className="text-xs text-emerald-400 mt-1">₹100 under budget</div>
                    <div className="mt-3 text-[11px] text-slate-400">Optimal balance of top-rated items</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-xs font-bold text-emerald-300">💰 Budget Saver</div>
                    <div className="text-xl font-bold text-white mt-2">{formatINR(3600)}</div>
                    <div className="text-xs text-emerald-400 mt-1">₹1,400 under budget</div>
                    <div className="mt-3 text-[11px] text-slate-400">Essential reliable functionality</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                  <span>Safe AI Negotiation Layer:</span>
                  <span className="text-slate-200 font-mono">Max 10% Bounded Discount • Swap boAt Rockerz • Add Cable Clips Perk</span>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-mono text-emerald-400 font-semibold uppercase">Merchant Command Center</span>
                    <h3 className="text-2xl font-bold text-white mt-1">Analytics & Policy Guardrail Enforcement</h3>
                  </div>
                  <span className="px-3 py-1 rounded-md text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Margin Protection Active
                  </span>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-xs text-slate-400">Gross Revenue</div>
                    <div className="text-2xl font-bold text-white mt-1">{formatINR(13350)}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-xs text-slate-400">Protected Margin</div>
                    <div className="text-2xl font-bold text-emerald-400 mt-1">27.8%</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-xs text-slate-400">Cart Recovery</div>
                    <div className="text-2xl font-bold text-indigo-400 mt-1">42.8%</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-xs text-slate-400">Rule Checks</div>
                    <div className="text-2xl font-bold text-slate-200 mt-1">100% Passed</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span>Interactive Policy Sliders:</span>
                  <span className="text-slate-300 font-mono">Max Discount: 10% | Rupee Cap: ₹500 | Min Margin: 8% | Max Rounds: 2</span>
                </div>
              </div>
            )}

          </div>

          {/* Bottom Bar with CTA to Launch App */}
          <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-slate-400 text-center sm:text-left">
              Try the actual live DealPilot interactive application right in your browser.
            </div>
            <button
              onClick={onOpenRoleSelect}
              className="inline-flex items-center space-x-2 bg-brand-500 hover:bg-brand-400 text-slate-950 font-semibold px-4 py-2 rounded-lg text-xs sm:text-sm transition-all shadow-sm"
            >
              <span>Launch Live Interactive App</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
