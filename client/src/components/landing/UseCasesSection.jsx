import React from 'react';
import { 
  Users, 
  Briefcase, 
  Target, 
  Compass,
  ArrowRight
} from 'lucide-react';

export default function UseCasesSection({ onExploreClient, onExploreMerchant }) {
  const personas = [
    {
      title: 'Sales Teams',
      role: 'Sellers',
      headline: 'Prioritize opportunities most likely to convert.',
      description: 'Close deals faster using bounded AI negotiation rules that prevent discounts from eating into mandatory profit margins.',
      tags: ['Margin Protection', 'Cart Recovery', 'Bounded Offers'],
      action: onExploreMerchant,
      actionText: 'For Sales & Sellers'
    },
    {
      title: 'Business Teams',
      role: 'Buyers',
      headline: 'Evaluate potential opportunities faster.',
      description: 'Input complex multi-item requirements and compare 3-tier configurations to identify the highest value per rupee spent.',
      tags: ['Requirement Parsing', '3-Tier Plans', 'Budget Fit'],
      action: onExploreClient,
      actionText: 'For Procurement'
    },
    {
      title: 'Deal Managers',
      role: 'Operators',
      headline: 'Keep every opportunity organized and actionable.',
      description: 'Track deals through clear pipeline stages, configure deterministic guardrail rules, and review verified transaction logs.',
      tags: ['Pipeline Tracking', 'Audit Explainability', 'Policy Controls'],
      action: onExploreMerchant,
      actionText: 'For Deal Managers'
    },
    {
      title: 'Founders & Decision Makers',
      role: 'Executives',
      headline: 'Get a clear view of where to focus next.',
      description: 'Gain instant macro visibility over sales velocity, conversion recovery, and algorithmic rule performance.',
      tags: ['Executive Analytics', 'Real-Time Insights', 'Zero Guesswork'],
      action: onExploreMerchant,
      actionText: 'For Founders'
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-slate-950/70 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-400 mb-3">
            <span>Target Roles</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Built for teams that make decisions.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
            Tailored workflows for every role across the entire opportunity and deal lifecycle.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {personas.map((p, idx) => (
            <div
              key={idx}
              className="p-7 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-400 font-mono">
                    {p.title}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-950 border border-slate-800 text-slate-400">
                    {p.role}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">
                  {p.headline}
                </h3>
                
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  {p.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {p.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-950 border border-slate-800 text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80">
                <button
                  onClick={p.action}
                  className="inline-flex items-center space-x-2 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white transition-colors"
                >
                  <span>{p.actionText}</span>
                  <ArrowRight className="w-4 h-4 text-brand-400" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
