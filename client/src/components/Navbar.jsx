import React from 'react';
import { Sparkles, ShieldCheck, Store, ShoppingBag, FileText, Zap } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenDemoPresets }) {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo & Tagline */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('planner')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-indigo-500 flex items-center justify-center shadow-glow">
              <Sparkles className="w-5 h-5 text-slate-950 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-brand-400 bg-clip-text text-transparent">
                  DealPilot <span className="text-brand-400">AI</span>
                </span>
                <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/30">
                  Agentic Commerce
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                AI negotiates, but never without rules.
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center space-x-1 sm:space-x-2">
            <button
              onClick={() => setActiveTab('planner')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'planner'
                  ? 'bg-brand-500/15 text-brand-400 border border-brand-500/30 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Deal Pilot</span>
            </button>

            <button
              onClick={() => setActiveTab('merchant')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'merchant'
                  ? 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Store className="w-4 h-4" />
              <span>Merchant Hub</span>
            </button>

            <button
              onClick={() => setActiveTab('audit')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'audit'
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Audit Trail</span>
            </button>

            {/* Quick Demo Scenarios Trigger */}
            <button
              onClick={onOpenDemoPresets}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium bg-amber-500/15 text-amber-300 border border-amber-500/30 hover:bg-amber-500/25 transition-all animate-pulse-subtle"
            >
              <Zap className="w-4 h-4 text-amber-400 fill-amber-400/20" />
              <span className="hidden md:inline">Demo Scenarios</span>
              <span className="md:hidden">Demo</span>
            </button>
          </nav>

          {/* Merchant Guardrails Pill */}
          <div className="hidden lg:flex items-center space-x-2 bg-slate-800/70 border border-slate-700/60 rounded-full px-3 py-1 text-xs text-slate-300">
            <ShieldCheck className="w-4 h-4 text-brand-400" />
            <span className="font-mono text-slate-400">Rules: Max 10% | ₹500 Cap | 8% Min Margin</span>
          </div>

        </div>
      </div>
    </header>
  );
}
