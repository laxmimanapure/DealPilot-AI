import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function HowItWorksSection() {
  const steps = [
    { num: '01', title: 'Discover', desc: 'Find and aggregate opportunities across catalogs.' },
    { num: '02', title: 'Analyze', desc: 'Evaluate signals, margins, and policy boundaries.' },
    { num: '03', title: 'Decide', desc: 'Generate objective scores and clear recommendations.' },
    { num: '04', title: 'Act', desc: 'Safely negotiate and execute with verified checkout.' }
  ];

  return (
    <section id="how-it-works" className="py-24 sm:py-32 bg-[#050505] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16 text-left">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-semibold tracking-wider uppercase text-zinc-400 mb-4">
            <span>Simple Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            From opportunity to action.
          </h2>
        </div>

        {/* 4 Minimal Steps: Pure Monochrome */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-20">
          {steps.map((step) => (
            <div
              key={step.num}
              className="p-6 rounded-3xl bg-[#0c0c0f] border border-white/[0.08] flex flex-col justify-between hover:border-white/20 transition-colors"
            >
              <div>
                <span className="font-mono text-3xl font-extrabold text-white block mb-4">
                  {step.num}
                </span>
                <h3 className="text-lg font-bold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Compact AI Value Statement & Elegant Monochrome Insight Card */}
        <div className="rounded-3xl bg-[#0c0c0f] border border-white/[0.1] p-8 sm:p-12 max-w-4xl mx-auto shadow-2xl shadow-black/80">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left Statement */}
            <div className="md:col-span-6 space-y-3 text-left">
              <div className="inline-flex items-center space-x-2 text-zinc-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-white" />
                <span>Intelligence Behind Every Decision</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Intelligence behind every decision.
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-normal">
                DealPilot turns complex deal signals into clear, actionable recommendations.
              </p>
            </div>

            {/* Right Compact Card */}
            <div className="md:col-span-6">
              <div className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                  <span className="text-xs font-bold text-white font-mono">DEALPILOT AI</span>
                  <span className="text-[10px] text-zinc-400 uppercase font-semibold">Active Model</span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400">Opportunity Score</span>
                    <span className="font-mono font-bold text-white">92/100</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400">Risk Profile</span>
                    <span className="font-semibold text-white">Low</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400">Confidence</span>
                    <span className="font-mono font-bold text-white">94%</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/[0.06] text-xs">
                  <div className="text-[10px] uppercase tracking-wider font-semibold text-zinc-500 mb-1">
                    Recommendation
                  </div>
                  <p className="text-zinc-200 font-medium">
                    Prioritize this opportunity. Strong value potential with low estimated risk.
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
