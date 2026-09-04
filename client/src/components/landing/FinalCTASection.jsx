import React from 'react';
import { ArrowRight, ShoppingBag, Store } from 'lucide-react';

export default function FinalCTASection({ onExploreClient, onExploreMerchant }) {
  return (
    <section className="py-28 sm:py-36 bg-[#050505] border-t border-white/[0.06] text-center relative overflow-hidden">
      
      {/* Subtle platinum ambient touch */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Large Clean Heading — Pure Monochrome */}
        <h2 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.08]">
          Ready to make<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
            a smarter deal?
          </span>
        </h2>

        {/* Short Supporting Text */}
        <p className="mt-5 text-base sm:text-lg text-zinc-400 font-normal">
          Discover what DealPilot can do for you.
        </p>

        {/* Two Buttons Only */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onExploreClient}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-white text-black hover:bg-zinc-200 font-semibold px-7 py-3.5 rounded-full text-sm transition-all shadow-lg shadow-white/5 active:scale-[0.98]"
          >
            <ShoppingBag className="w-4 h-4 text-black" />
            <span>Explore as Client</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onExploreMerchant}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-white/[0.04] hover:bg-white/[0.08] text-zinc-200 hover:text-white font-medium px-7 py-3.5 rounded-full text-sm border border-white/[0.1] transition-all"
          >
            <Store className="w-4 h-4 text-zinc-300" />
            <span>Grow as Merchant</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
