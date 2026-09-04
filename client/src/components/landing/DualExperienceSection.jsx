import React from 'react';
import { 
  ShoppingBag, 
  Store, 
  ArrowRight, 
  Sparkles, 
  TrendingUp, 
  ShieldCheck, 
  BarChart3,
  Check
} from 'lucide-react';
import { formatINR } from '../../utils/currency';

export default function DualExperienceSection({ onExploreClient, onExploreMerchant }) {
  return (
    <section id="experiences" className="py-24 sm:py-32 bg-[#08080a] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header — Short & Powerful */}
        <div className="max-w-2xl mb-16 text-left">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-semibold tracking-wider uppercase text-zinc-400 mb-4">
            <span>Dual Workspaces</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            One Platform.<br />
            Two Powerful Experiences.
          </h2>
          <p className="mt-4 text-base text-zinc-400 font-normal">
            One intelligent platform, designed differently for buyers and businesses.
          </p>
        </div>

        {/* Two Large Visual Cards Grid - Pure Monochrome */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          
          {/* CLIENT CARD — Minimal Platinum Approachable */}
          <div className="rounded-3xl bg-[#0c0c0f] border border-white/[0.08] hover:border-white/25 p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 group shadow-2xl shadow-black/80">
            <div className="space-y-6">
              
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-white/[0.06] border border-white/[0.12] flex items-center justify-center text-white">
                  <ShoppingBag className="w-5 h-5 text-zinc-200" />
                </div>
                <span className="text-[11px] font-semibold text-zinc-400 font-mono tracking-wider uppercase">
                  For Buyers & Teams
                </span>
              </div>

              {/* Title & Copy */}
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Client
                </h3>
                <h4 className="text-lg font-semibold text-zinc-200 mt-1">
                  Find deals that fit you.
                </h4>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                  Discover, compare, negotiate, and purchase with AI assistance.
                </p>
              </div>

              {/* Approachable Monochrome UI Preview */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3.5">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.04]">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-white">Recommended Deal</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/[0.06] text-zinc-200 border border-white/[0.1]">
                        Best Match
                      </span>
                    </div>
                    <div className="text-[11px] text-zinc-400 mt-0.5">Ergonomic Setup • 3 Items</div>
                  </div>
                  <div className="text-right font-mono">
                    <div className="text-lg font-bold text-white">94/100</div>
                    <div className="text-[10px] text-zinc-500">Deal Score</div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400">Potential Savings:</span>
                  <span className="font-mono font-bold text-white">{formatINR(1250)} saved</span>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] text-xs text-zinc-300">
                  <strong className="text-white">AI Recommendation:</strong> "Switch to Best Value tier to get mechanical switches within your exact ₹5,000 budget."
                </div>
              </div>

            </div>

            {/* CTA */}
            <div className="mt-8 pt-6 border-t border-white/[0.06]">
              <button
                onClick={onExploreClient}
                className="w-full inline-flex items-center justify-center space-x-2 bg-white/[0.04] hover:bg-white text-zinc-200 hover:text-black font-semibold py-3 px-5 rounded-2xl text-sm transition-all duration-200 border border-white/[0.08]"
              >
                <span>Explore as Client</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* MERCHANT CARD — Analytical Platinum */}
          <div className="rounded-3xl bg-[#0c0c0f] border border-white/[0.08] hover:border-white/25 p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 group shadow-2xl shadow-black/80">
            <div className="space-y-6">
              
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-white/[0.06] border border-white/[0.12] flex items-center justify-center text-white">
                  <Store className="w-5 h-5 text-zinc-200" />
                </div>
                <span className="text-[11px] font-semibold text-zinc-400 font-mono tracking-wider uppercase">
                  For Sellers & Operators
                </span>
              </div>

              {/* Title & Copy */}
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Merchant
                </h3>
                <h4 className="text-lg font-semibold text-zinc-200 mt-1">
                  Make your deals perform better.
                </h4>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                  Manage offers, protect margins, and understand performance with AI.
                </p>
              </div>

              {/* Analytical Monochrome UI Preview */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3.5">
                <div className="grid grid-cols-3 gap-2 pb-3 border-b border-white/[0.04] text-center">
                  <div className="p-2 rounded-xl bg-white/[0.02]">
                    <div className="text-[10px] text-zinc-400">Revenue</div>
                    <div className="text-sm font-bold text-white font-mono mt-0.5">{formatINR(13350)}</div>
                  </div>
                  <div className="p-2 rounded-xl bg-white/[0.02]">
                    <div className="text-[10px] text-zinc-400">Recovery</div>
                    <div className="text-sm font-bold text-white font-mono mt-0.5">42.8%</div>
                  </div>
                  <div className="p-2 rounded-xl bg-white/[0.02]">
                    <div className="text-[10px] text-zinc-400">Margin</div>
                    <div className="text-sm font-bold text-white font-mono mt-0.5">27.8%</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] text-xs text-zinc-300">
                  <strong className="text-white">AI Business Insight:</strong> "Your 'Premium Package' deal is performing 27% better than your average offer."
                </div>

                <div className="flex items-center justify-between text-[11px] text-zinc-500 font-mono">
                  <span>Guardrail Policy:</span>
                  <span className="text-zinc-300">Max 10% | ₹500 Cap</span>
                </div>
              </div>

            </div>

            {/* CTA */}
            <div className="mt-8 pt-6 border-t border-white/[0.06]">
              <button
                onClick={onExploreMerchant}
                className="w-full inline-flex items-center justify-center space-x-2 bg-white/[0.04] hover:bg-white text-zinc-200 hover:text-black font-semibold py-3 px-5 rounded-2xl text-sm transition-all duration-200 border border-white/[0.08]"
              >
                <span>Grow as Merchant</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
