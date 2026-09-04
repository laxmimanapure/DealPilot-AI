import React from 'react';
import { Sparkles } from 'lucide-react';

export default function LandingFooter() {
  return (
    <footer className="bg-[#040406] text-zinc-500 text-xs border-t border-white/[0.06] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-white/[0.04]">
          
          {/* Left: Brand & Tagline */}
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 rounded-md bg-white/[0.08] flex items-center justify-center text-white">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm font-bold text-white tracking-tight">
                DealPilot <span className="text-zinc-400 font-medium">AI</span>
              </span>
            </div>
            <p className="text-zinc-500 text-xs">
              Smarter deals. Better decisions.
            </p>
          </div>

          {/* Right: Minimal Navigation */}
          <div className="flex flex-wrap items-center gap-6 text-xs">
            <a href="#product" className="hover:text-white transition-colors">Product</a>
            <a href="#experiences" className="hover:text-white transition-colors">Experiences</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
            <span className="cursor-default hover:text-white transition-colors">Privacy</span>
            <span className="cursor-default hover:text-white transition-colors">Terms</span>
          </div>

        </div>

        {/* Bottom */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-zinc-500">
          <span>© 2026 DealPilot AI. All rights reserved.</span>
          <span className="text-zinc-400">AI-Powered Deal Intelligence</span>
        </div>
      </div>
    </footer>
  );
}
