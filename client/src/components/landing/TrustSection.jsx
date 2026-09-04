import React from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  BarChart3, 
  Cpu, 
  CheckCircle2, 
  Lock 
} from 'lucide-react';

export default function TrustSection() {
  const trustPoints = [
    {
      icon: CheckCircle2,
      title: 'Trusted by Modern Teams',
      description: 'Built for forward-thinking businesses and smart consumers demanding verified deal clarity.'
    },
    {
      icon: Lock,
      title: 'Secure & Scalable',
      description: 'Deterministic policy guardrails guarantee hard budget caps and immutable profit margins.'
    },
    {
      icon: Sparkles,
      title: 'AI-Powered Insights',
      description: 'Intelligent scoring models evaluate opportunities multi-dimensionally in real time.'
    },
    {
      icon: BarChart3,
      title: 'Data-Driven Decisions',
      description: 'Every decision backed by explainable mathematical audit logs and empirical market signals.'
    }
  ];

  return (
    <section className="py-16 md:py-20 border-b border-slate-800/80 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Built to help teams make decisions with confidence.
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Engineered with strict algorithmic boundaries so intelligence remains accurate, safe, and explainable.
          </p>
        </div>

        {/* 4 Trust Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {trustPoints.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index}
                className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700/80 transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-brand-400 mb-3.5">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
