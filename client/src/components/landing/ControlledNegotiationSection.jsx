import React from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Sliders,
  CheckCircle2,
  Lock,
  ShoppingBag,
  Store,
  Layers,
  Scale,
  Award,
  Wallet
} from 'lucide-react';

export default function ControlledNegotiationSection({ onExploreClient, onExploreMerchant }) {
  return (
    <section
      id="how-dealpilot-works"
      className="py-20 sm:py-28 bg-[#070709] border-t border-white/[0.06] text-zinc-100 relative overflow-hidden"
    >
      {/* Subtle platinum ambient glow matching DealPilot theme */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-white/[0.015] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20 sm:space-y-28">

        {/* ========================================================================= */}
        {/* 1. HOW DEALPILOT WORKS (3-STEP FLOW)                                      */}
        {/* ========================================================================= */}
        <div className="space-y-12">
          {/* Section Header */}
          <div className="max-w-3xl text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-semibold tracking-wider uppercase text-zinc-400 mb-4">
              <Sparkles className="w-3 h-3 text-zinc-300" />
              <span>How DealPilot Works</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              AI-Powered Shopping +<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
                Controlled Negotiation
              </span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-zinc-400 font-normal">
              A transparent 3-step engine where buyers set intent, choose objective strategies, and let AI negotiate within strict merchant limits.
            </p>
          </div>

          {/* 3-Step Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Step 01: Tell Us What You Need */}
            <div className="p-7 sm:p-8 rounded-3xl bg-[#0c0c0f] border border-white/[0.08] hover:border-white/20 transition-all flex flex-col justify-between shadow-2xl shadow-black/80">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-3xl sm:text-4xl font-extrabold text-white">
                    01
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    Tell Us What You Need
                  </h3>
                  <p className="text-sm font-medium text-zinc-300 mt-1">
                    “Set your product requirement and budget.”
                  </p>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed">
                  Start with simple natural intent. Enter your budget, product categories, or specific brand preferences.
                </p>

                {/* Minimal preview mockup */}
                <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-2 text-xs">
                  <div className="flex items-center justify-between text-zinc-400">
                    <span>Shopper Intent:</span>
                    <span className="text-white font-medium">“Full Desk Setup”</span>
                  </div>
                  <div className="flex items-center justify-between text-zinc-400">
                    <span>Target Budget:</span>
                    <span className="font-mono text-white font-semibold">₹5,000</span>
                  </div>
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-white/[0.04] text-[11px] text-zinc-500 font-mono">
                Shopper: “I have a need + a budget.”
              </div>
            </div>

            {/* Step 02: Choose Your Strategy */}
            <div className="p-7 sm:p-8 rounded-3xl bg-[#0c0c0f] border border-white/[0.08] hover:border-white/20 transition-all flex flex-col justify-between shadow-2xl shadow-black/80">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-3xl sm:text-4xl font-extrabold text-white">
                    02
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300">
                    <Layers className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    Choose Your Strategy
                  </h3>
                  <p className="text-sm font-medium text-zinc-300 mt-1">
                    DealPilot gives you three transparent options:
                  </p>
                </div>

                {/* 3 Distinct Minimal Strategy Pills */}
                <div className="space-y-2.5 pt-1">
                  {/* Best Quality */}
                  <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-white/20 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Award className="w-3.5 h-3.5 text-zinc-200" />
                        <span className="text-xs font-bold text-white">Best Quality</span>
                      </div>
                      <span className="text-[10px] uppercase font-mono tracking-wider px-1.5 py-0.5 rounded bg-white/[0.06] text-zinc-300">
                        Top Specs
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-400 mt-1">
                      Prioritize the best overall product experience.
                    </p>
                  </div>

                  {/* Best Value */}
                  <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.14] transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Scale className="w-3.5 h-3.5 text-white" />
                        <span className="text-xs font-bold text-white">Best Value</span>
                      </div>
                      <span className="text-[10px] uppercase font-mono tracking-wider px-1.5 py-0.5 rounded bg-white/10 text-white font-semibold">
                        Balanced
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-300 mt-1">
                      Balance price, quality, and verified features.
                    </p>
                  </div>

                  {/* Budget Saver */}
                  <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-white/20 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Wallet className="w-3.5 h-3.5 text-zinc-300" />
                        <span className="text-xs font-bold text-white">Budget Saver</span>
                      </div>
                      <span className="text-[10px] uppercase font-mono tracking-wider px-1.5 py-0.5 rounded bg-white/[0.06] text-zinc-400">
                        Savings
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-400 mt-1">
                      Stay as close as possible to your budget limit.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-white/[0.04] text-[11px] text-zinc-500 font-mono">
                DealPilot: “Here are 3 transparent ways to buy.”
              </div>
            </div>

            {/* Step 03: Let AI Negotiate */}
            <div className="p-7 sm:p-8 rounded-3xl bg-[#0c0c0f] border border-white/[0.08] hover:border-white/20 transition-all flex flex-col justify-between shadow-2xl shadow-black/80">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-3xl sm:text-4xl font-extrabold text-white">
                    03
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300">
                    <Sliders className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    Let AI Negotiate
                  </h3>
                  <p className="text-sm font-medium text-zinc-300 mt-1">
                    “DealPilot negotiates within merchant-defined limits to find a better deal.”
                  </p>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed">
                  The AI evaluates multi-merchant pricing, checks margin floors, and negotiates verified counter-offers without manual back-and-forth.
                </p>

                {/* Status card */}
                <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400">Negotiation Engine:</span>
                    <span className="text-zinc-200 font-mono font-semibold">Active</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400">Merchant Limits:</span>
                    <span className="text-zinc-300 font-medium">Strictly Enforced</span>
                  </div>
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-white/[0.04] text-[11px] text-zinc-500 font-mono">
                AI: “I negotiate within allowed boundaries.”
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* VISUAL FLOW RIBBON                                                        */}
        {/* ========================================================================= */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0c0c0f] border border-white/[0.08] shadow-2xl shadow-black/80">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            
            {/* Entity Pipeline: Shopper -> DealPilot AI -> Merchant */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-semibold text-white">
              <span className="px-3.5 py-1.5 rounded-xl bg-white/[0.05] border border-white/[0.1]">
                Shopper
              </span>
              <ArrowRight className="w-4 h-4 text-zinc-500" />
              <span className="px-3.5 py-1.5 rounded-xl bg-white/[0.1] border border-white/[0.2] text-white flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-zinc-200" />
                <span>DealPilot AI</span>
              </span>
              <ArrowRight className="w-4 h-4 text-zinc-500" />
              <span className="px-3.5 py-1.5 rounded-xl bg-white/[0.05] border border-white/[0.1]">
                Merchant
              </span>
            </div>

            {/* Subtle Divider on desktop */}
            <div className="hidden lg:block w-px h-8 bg-white/[0.08]" />

            {/* Process Pipeline: Need + Budget -> Strategy -> Controlled Negotiation -> Better Deal */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 text-[11px] sm:text-xs font-mono text-zinc-400">
              <span className="text-zinc-300 font-medium">Need + Budget</span>
              <span className="text-zinc-600">→</span>
              <span className="text-zinc-300 font-medium">Strategy</span>
              <span className="text-zinc-600">→</span>
              <span className="text-white font-semibold">Controlled Negotiation</span>
              <span className="text-zinc-600">→</span>
              <span className="text-white font-bold underline decoration-white/30 underline-offset-4">
                Better Deal
              </span>
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. BUILT FOR BOTH SIDES OF COMMERCE                                       */}
        {/* ========================================================================= */}
        <div className="space-y-10">
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-semibold tracking-wider uppercase text-zinc-400 mb-4">
              <span>Two-Sided Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Built for Both Sides of Commerce
            </h2>
            <p className="mt-3 text-sm sm:text-base text-zinc-400 font-normal">
              DealPilot is not just a shopping assistant. It balances transparent buyer savings with total merchant control.
            </p>
          </div>

          {/* Two-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            
            {/* For Shoppers */}
            <div className="p-8 sm:p-10 rounded-3xl bg-[#0c0c0f] border border-white/[0.08] hover:border-white/20 transition-all flex flex-col justify-between shadow-2xl shadow-black/80 space-y-6">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-lg bg-white/[0.05] border border-white/[0.08] text-xs font-semibold text-zinc-300">
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>For Shoppers</span>
                  </div>
                  <span className="text-[11px] font-mono text-zinc-500">Need + Budget</span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    Shop smarter. Spend with confidence.
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-1 italic font-mono">
                    “I tell DealPilot what I need and what I can spend.”
                  </p>
                </div>

                <ul className="space-y-3 pt-2 text-sm text-zinc-300">
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                    <span><strong>Tell DealPilot what you need:</strong> Express your intent in simple words.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                    <span><strong>Set your budget:</strong> AI respects your upper spending limit.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                    <span><strong>Compare transparent strategies:</strong> Quality, Value, or Budget Saver.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                    <span><strong>Let AI negotiate:</strong> Unlock verified deals without manual haggling.</span>
                  </li>
                </ul>
              </div>

              {onExploreClient && (
                <div className="pt-4 border-t border-white/[0.06]">
                  <button
                    onClick={onExploreClient}
                    className="inline-flex items-center space-x-2 text-xs font-semibold text-white hover:text-zinc-300 transition-colors"
                  >
                    <span>Launch Shopper Experience</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* For Merchants */}
            <div className="p-8 sm:p-10 rounded-3xl bg-[#0c0c0f] border border-white/[0.08] hover:border-white/20 transition-all flex flex-col justify-between shadow-2xl shadow-black/80 space-y-6">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-lg bg-white/[0.05] border border-white/[0.08] text-xs font-semibold text-zinc-300">
                    <Store className="w-3.5 h-3.5" />
                    <span>For Merchants</span>
                  </div>
                  <span className="text-[11px] font-mono text-zinc-500">Full Rule Control</span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    Automate negotiation without losing control.
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-1 italic font-mono">
                    “Merchants decide exactly how much flexibility AI has.”
                  </p>
                </div>

                {/* 3 Simple Merchant Controls */}
                <div className="space-y-3 pt-2">
                  <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-xs space-y-1">
                    <div className="flex items-center justify-between font-semibold text-white">
                      <span className="flex items-center space-x-1.5">
                        <Lock className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Discount Cap</span>
                      </span>
                      <span className="font-mono text-zinc-400">Max Discount Limit</span>
                    </div>
                    <p className="text-zinc-400">Maximum discount the AI can ever offer on any catalog product.</p>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-xs space-y-1">
                    <div className="flex items-center justify-between font-semibold text-white">
                      <span className="flex items-center space-x-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Margin Floor</span>
                      </span>
                      <span className="font-mono text-zinc-400">Minimum Margin %</span>
                    </div>
                    <p className="text-zinc-400">Minimum acceptable profit margin that AI cannot breach under any condition.</p>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-xs space-y-1">
                    <div className="flex items-center justify-between font-semibold text-white">
                      <span className="flex items-center space-x-1.5">
                        <Sliders className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Negotiation Limits</span>
                      </span>
                      <span className="font-mono text-zinc-400">Rounds & Behavior</span>
                    </div>
                    <p className="text-zinc-400">Rules controlling negotiation rounds, concession pacing, and counter-offers.</p>
                  </div>
                </div>
              </div>

              {onExploreMerchant && (
                <div className="pt-4 border-t border-white/[0.06]">
                  <button
                    onClick={onExploreMerchant}
                    className="inline-flex items-center space-x-2 text-xs font-semibold text-white hover:text-zinc-300 transition-colors"
                  >
                    <span>Configure Merchant Policy</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. KEY DIFFERENTIATOR CALLOUT: "AI that negotiates within boundaries"     */}
        {/* ========================================================================= */}
        <div className="rounded-3xl bg-gradient-to-b from-white/[0.05] to-white/[0.01] border border-white/[0.12] p-8 sm:p-12 shadow-2xl shadow-black/90 relative overflow-hidden">
          
          {/* Subtle top edge specular highlight */}
          <div className="absolute top-0 left-16 right-16 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

          <div className="max-w-4xl mx-auto space-y-8 text-center sm:text-left">
            
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.1] text-[11px] font-semibold uppercase tracking-wider text-zinc-300">
                <Lock className="w-3 h-3 text-white" />
                <span>Deterministic Core Principle</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                “AI that negotiates within boundaries.”
              </h3>
              <p className="text-sm sm:text-base text-zinc-300 max-w-2xl leading-relaxed">
                DealPilot doesn't give AI unlimited pricing authority. Merchants define the boundaries — DealPilot operates within them.
              </p>
            </div>

            {/* Visual Boundary Architecture Diagram */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              
              {/* Merchant Rules */}
              <div className="p-5 rounded-2xl bg-[#0c0c0f] border border-white/[0.08] text-left space-y-2.5">
                <div className="flex items-center space-x-2 text-xs font-bold text-white uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-zinc-400" />
                  <span>Merchant Rules</span>
                </div>
                <div className="space-y-1.5 text-xs text-zinc-300 font-mono">
                  <div className="flex items-center space-x-2">
                    <span className="text-zinc-500">→</span>
                    <span>Discount Cap</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-zinc-500">→</span>
                    <span>Margin Floor</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-zinc-500">→</span>
                    <span>Negotiation Limit</span>
                  </div>
                </div>
              </div>

              {/* DealPilot AI */}
              <div className="p-5 rounded-2xl bg-[#0c0c0f] border border-white/[0.14] text-left space-y-2.5 shadow-lg">
                <div className="flex items-center space-x-2 text-xs font-bold text-white uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>DealPilot AI</span>
                </div>
                <div className="space-y-1.5 text-xs text-zinc-200">
                  <div className="flex items-center space-x-2 font-mono">
                    <span className="text-zinc-400">→</span>
                    <span>Negotiates within allowed range</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 pt-1 leading-snug">
                    Deterministic enforcement guarantees pricing safety and transparent offers.
                  </p>
                </div>
              </div>

              {/* Shopper */}
              <div className="p-5 rounded-2xl bg-[#0c0c0f] border border-white/[0.08] text-left space-y-2.5">
                <div className="flex items-center space-x-2 text-xs font-bold text-white uppercase tracking-wider">
                  <ShoppingBag className="w-4 h-4 text-zinc-400" />
                  <span>Shopper</span>
                </div>
                <div className="space-y-1.5 text-xs text-zinc-300 font-mono">
                  <div className="flex items-center space-x-2">
                    <span className="text-zinc-500">→</span>
                    <span className="text-white font-semibold">Gets a better deal</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 pt-1 leading-snug">
                    Unlocks genuine savings with zero risk of broken merchant agreements.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
