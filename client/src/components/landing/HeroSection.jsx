import React from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp, 
  Sparkles,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { formatINR } from '../../utils/currency';

export default function HeroSection({ onOpenRoleSelect, onExploreClient, onExploreMerchant }) {
  return (
    <section id="product" className="relative min-h-[92vh] flex items-center pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden bg-[#050505]">
      
      {/* Subtle cinematic platinum ambient glow — ultra-minimal and moody */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Asymmetric 2-Column Hero Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Bold Minimal Typography & Action */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-left max-w-2xl">
            
            {/* Small Badge - Monochrome Platinum */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.1] text-[11px] font-semibold tracking-wider uppercase text-zinc-300 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span>AI-Powered Deal Intelligence</span>
            </div>

            {/* Main Headline — Pure Crisp Off-White & Platinum */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold text-white tracking-tight leading-[1.06]">
              Better Deals.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
                Smarter Decisions.
              </span>
            </h1>

            {/* Short Supporting Copy */}
            <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-lg font-normal">
              Discover, analyze, and act on better opportunities with AI-powered deal intelligence.
            </p>

            {/* Two Action Buttons Only */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={onOpenRoleSelect}
                className="inline-flex items-center justify-center space-x-2 bg-white text-black hover:bg-zinc-200 font-semibold px-6 py-3 rounded-full text-sm transition-all duration-150 active:scale-[0.98] shadow-lg shadow-white/5"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center space-x-2 bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white font-medium px-6 py-3 rounded-full text-sm border border-white/[0.1] transition-all"
              >
                <span>See How It Works</span>
              </a>
            </div>

            {/* Minimal Sub-Trust Note */}
            <div className="pt-2 flex items-center space-x-4 text-xs text-zinc-500">
              <span className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400" />
                <span>Client & Merchant Workspaces</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1.5">
                <Lock className="w-3.5 h-3.5 text-zinc-400" />
                <span>Deterministic Rules</span>
              </span>
            </div>

          </div>

          {/* Right Column: One Single Large Cinematic Product Visual */}
          <div className="lg:col-span-6 relative">
            
            {/* Cinematic Container Frame - Pure Monochrome Carbon */}
            <div className="relative rounded-3xl bg-[#0c0c0f]/95 border border-white/[0.12] shadow-2xl shadow-black/90 overflow-hidden backdrop-blur-xl p-6 sm:p-8 space-y-6">
              
              {/* Subtle top edge platinum specular highlight */}
              <div className="absolute top-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

              {/* Console Header */}
              <div className="flex items-center justify-between pb-5 border-b border-white/[0.06]">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-xl bg-white/[0.06] border border-white/[0.12] flex items-center justify-center text-white">
                    <Sparkles className="w-4 h-4 text-zinc-200" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono font-semibold uppercase tracking-wider text-zinc-400">
                      DealPilot AI
                    </div>
                    <div className="text-sm font-bold text-white tracking-tight">
                      Opportunity Analysis
                    </div>
                  </div>
                </div>

                <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/[0.06] text-zinc-200 border border-white/[0.12]">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  <span>Verified</span>
                </span>
              </div>

              {/* Large Focal Metrics Grid */}
              <div className="grid grid-cols-3 gap-3.5">
                
                {/* 92 Deal Score */}
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center">
                  <div className="text-[11px] font-medium text-zinc-400">Deal Score</div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-white mt-1 font-mono tracking-tight">
                    92
                  </div>
                  <div className="text-[10px] text-zinc-400 font-medium mt-1">High Potential</div>
                </div>

                {/* Expected Value */}
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center">
                  <div className="text-[11px] font-medium text-zinc-400">Expected Value</div>
                  <div className="text-xl sm:text-2xl font-bold text-white mt-2 font-mono tracking-tight">
                    {formatINR(48500)}
                  </div>
                  <div className="text-[10px] text-zinc-400 mt-1 flex items-center justify-center space-x-0.5">
                    <TrendingUp className="w-2.5 h-2.5 text-zinc-300" />
                    <span>+24% value</span>
                  </div>
                </div>

                {/* Risk Profile */}
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center">
                  <div className="text-[11px] font-medium text-zinc-400">Risk Profile</div>
                  <div className="text-xl sm:text-2xl font-extrabold text-white mt-2 tracking-wide font-mono">
                    LOW
                  </div>
                  <div className="text-[10px] text-zinc-400 mt-1">Protected</div>
                </div>

              </div>

              {/* Integrated AI Recommendation Panel */}
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-2 relative">
                <div className="flex items-center space-x-2 text-xs font-semibold text-zinc-300">
                  <span className="w-2 h-2 rounded-full bg-white" />
                  <span>AI Recommendation</span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-normal">
                  "Prioritize this opportunity. Strong value potential with low estimated risk."
                </p>
                <div className="pt-2 flex items-center justify-between text-[11px] text-zinc-500 border-t border-white/[0.04]">
                  <span>Algorithmic confidence: <strong className="text-zinc-200">94%</strong></span>
                  <span className="font-mono text-zinc-300">Margin floor ≥ 28%</span>
                </div>
              </div>

              {/* Console Footer Live Indicator */}
              <div className="flex items-center justify-between text-xs text-zinc-500 pt-1">
                <span className="font-mono text-[11px]">System Status: Autonomous Policy Active</span>
                <span className="text-zinc-400 text-[11px]">0-ms Latency Decisioning</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
