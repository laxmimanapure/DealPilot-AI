import React, { useState } from 'react';
import { 
  Search, 
  Cpu, 
  Gauge, 
  CheckSquare, 
  Activity, 
  ArrowRight,
  Sparkles,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';

export default function SolutionSection() {
  const [activeStage, setActiveStage] = useState(0);

  const stages = [
    {
      id: 'discover',
      step: '01',
      title: 'Discover',
      tagline: 'Opportunity Intake',
      icon: Search,
      description: 'Ingest and aggregate opportunities across catalogs, vendor quotes, and budget constraints into a unified schema.',
      preview: {
        badge: 'Intake Engine',
        headline: 'Natural Language Requirements Ingestion',
        metricLabel: 'Catalog Items Parsed',
        metricValue: '42 items indexed',
        details: 'Evaluates customer budget limit against multi-category options simultaneously.'
      }
    },
    {
      id: 'analyze',
      step: '02',
      title: 'Analyze',
      tagline: 'Signal Processing',
      icon: Cpu,
      description: 'Evaluate wholesale margins, discount ceilings, warranty terms, and substitution trade-offs automatically.',
      preview: {
        badge: 'Deterministic Safety',
        headline: 'Margin & Policy Boundary Verification',
        metricLabel: 'Minimum Margin Floor',
        metricValue: 'Protected at ≥ 8%',
        details: 'Runs rule engine to verify non-negotiable floor before proposing counter-offers.'
      }
    },
    {
      id: 'score',
      step: '03',
      title: 'Score',
      tagline: 'Multi-Signal Index',
      icon: Gauge,
      description: 'Generate objective 0-100 Deal Scores factoring in budget alignment, value density, and merchant guardrails.',
      preview: {
        badge: 'Intelligence Metric',
        headline: 'Multi-Dimensional Opportunity Rating',
        metricLabel: 'Weighted Deal Score',
        metricValue: '92 / 100',
        details: 'Scores quality, feature density, customer price fit, and merchant profitability.'
      }
    },
    {
      id: 'decide',
      step: '04',
      title: 'Decide',
      tagline: 'Actionable Advice',
      icon: CheckSquare,
      description: 'Synthesize complex deal data into a single clear recommendation: prioritize, negotiate within bounds, or pass.',
      preview: {
        badge: 'Autonomous Copilot',
        headline: 'Explainable Next-Step Recommendation',
        metricLabel: 'Confidence Level',
        metricValue: '94% Confidence',
        details: 'Recommends exact bounded counter-offers or product swaps to hit the budget.'
      }
    },
    {
      id: 'track',
      step: '05',
      title: 'Track',
      tagline: 'Lifecycle Audit',
      icon: Activity,
      description: 'Monitor post-negotiation conversion, margin outcomes, and verifiable payment audit trails continuously.',
      preview: {
        badge: 'Audit Trail',
        headline: 'Mathematical Transaction Verification',
        metricLabel: 'Receipt State',
        metricValue: '100% Verified',
        details: 'Full cryptographic audit log showing every rule check, discount applied, and margin protected.'
      }
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-slate-950/70 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-xs font-semibold text-brand-400 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The DealPilot Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Meet your AI-powered deal copilot.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
            DealPilot brings opportunity discovery, intelligent analysis, prioritization, and decision-making into one streamlined workflow.
          </p>
        </div>

        {/* Workflow Horizontal Navigation on Desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3 mb-8">
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            const isCurrent = activeStage === idx;
            return (
              <button
                key={stage.id}
                onClick={() => setActiveStage(idx)}
                className={`text-left p-4 rounded-xl border transition-all duration-200 relative overflow-hidden ${
                  isCurrent
                    ? 'bg-slate-900 border-brand-500/50 shadow-md shadow-brand-500/5'
                    : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-900/50 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-mono text-xs font-bold ${isCurrent ? 'text-brand-400' : 'text-slate-500'}`}>
                    {stage.step}
                  </span>
                  <Icon className={`w-4 h-4 ${isCurrent ? 'text-brand-400' : 'text-slate-500'}`} />
                </div>
                <div className={`text-sm font-bold ${isCurrent ? 'text-white' : 'text-slate-300'}`}>
                  {stage.title}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5 truncate">
                  {stage.tagline}
                </div>
                {isCurrent && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-500" />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Stage Interactive Showcase Card */}
        <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Description Column */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded text-xs font-semibold bg-brand-500/10 text-brand-400 border border-brand-500/20">
                <span>Stage {stages[activeStage].step} — {stages[activeStage].tagline}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                {stages[activeStage].title}: {stages[activeStage].preview.headline}
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {stages[activeStage].description}
              </p>
              <div className="pt-2 text-xs text-slate-400 flex items-center space-x-4">
                <span className="flex items-center space-x-1.5 text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-brand-400" />
                  <span>Rule-bounded execution</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1.5 text-slate-300">
                  <TrendingUp className="w-4 h-4 text-brand-400" />
                  <span>Zero guesswork</span>
                </span>
              </div>
            </div>

            {/* Right UI Preview Column */}
            <div className="lg:col-span-6">
              <div className="rounded-xl bg-slate-950 border border-slate-800 p-5 sm:p-6 space-y-4 shadow-inner">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    {stages[activeStage].preview.badge}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    status: active
                  </span>
                </div>
                <div>
                  <div className="text-xs font-medium text-slate-400">{stages[activeStage].preview.metricLabel}</div>
                  <div className="text-2xl font-extrabold text-white mt-1">
                    {stages[activeStage].preview.metricValue}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800/80 text-xs text-slate-300">
                  {stages[activeStage].preview.details}
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
