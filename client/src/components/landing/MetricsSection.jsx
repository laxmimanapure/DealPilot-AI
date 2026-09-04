import React from 'react';
import { 
  Zap, 
  Clock, 
  ShieldCheck, 
  Layers 
} from 'lucide-react';

export default function MetricsSection() {
  const metrics = [
    {
      value: '10x',
      label: 'Faster Analysis',
      sublabel: 'Automated multi-vendor deal signal evaluation in seconds',
      icon: Zap
    },
    {
      value: '24/7',
      label: 'AI-Powered Intelligence',
      sublabel: 'Continuous autonomous opportunity assessment and scoring',
      icon: Clock
    },
    {
      value: '92%',
      label: 'AI Confidence Metric',
      sublabel: 'Average multi-point algorithmic evaluation score on top deals',
      icon: ShieldCheck
    },
    {
      value: '1',
      label: 'Unified Workspace',
      sublabel: 'Consolidated opportunity discovery, negotiation, and analytics',
      icon: Layers
    }
  ];

  return (
    <section className="py-20 md:py-24 bg-slate-950 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-400 mb-3">
            <span>Product Value Metrics</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Designed for velocity and disciplined decisions.
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Measurable efficiency delivered directly to buyers and sellers on every opportunity.
          </p>
        </div>

        {/* 4 Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700/80 transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl font-extrabold text-white font-mono tracking-tight">
                    {m.value}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-brand-400">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-sm font-bold text-white mb-1">
                  {m.label}
                </div>
                <div className="text-xs text-slate-400 leading-relaxed">
                  {m.sublabel}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center text-xs text-slate-500 font-mono">
          * Architectural & performance benchmarks based on simulated multi-tier scenario evaluations.
        </div>

      </div>
    </section>
  );
}
