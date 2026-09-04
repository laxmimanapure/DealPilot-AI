import React from 'react';
import { 
  Layers, 
  Clock, 
  TrendingDown, 
  AlertTriangle 
} from 'lucide-react';

export default function ProblemSection() {
  const problems = [
    {
      icon: Layers,
      title: 'Information Overload',
      description: 'Important deal information is scattered across different tools, spreadsheets, emails, and conversations, obscuring the true picture.'
    },
    {
      icon: Clock,
      title: 'Manual Analysis',
      description: 'Teams spend too much time manually comparing opportunities, calculating margin trade-offs, and evaluating potential outcomes.'
    },
    {
      icon: TrendingDown,
      title: 'Missed Opportunities',
      description: 'Without intelligent prioritization and safe negotiation mechanisms, high-value deals stall or get lost in abandoned carts.'
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-slate-950 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-400 mb-3">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>The Challenge</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Too many opportunities. Not enough clarity.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
            Finding a deal is easy. Knowing which one is actually worth pursuing is harder.
          </p>
        </div>

        {/* 3 Problem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {problems.map((prob, idx) => {
            const Icon = prob.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-center text-amber-400 mb-6 group-hover:border-amber-500/30 transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {prob.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {prob.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-800/60 text-xs text-slate-500 font-mono">
                  Pain Point 0{idx + 1}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
