import React from 'react';
import { 
  Check, 
  ArrowRight, 
  Sparkles, 
  HelpCircle 
} from 'lucide-react';

export default function PricingSection({ onOpenRoleSelect }) {
  const plans = [
    {
      name: 'Starter',
      role: 'For Individual Buyers & Small Teams',
      price: 'Free',
      period: 'Forever',
      description: 'Essential deal discovery, 3-tier smart planning, and basic AI comparisons.',
      features: [
        '3-tier shopping plan generation',
        'Natural language requirement intake',
        'Basic AI deal scoring (0-100)',
        'Budget gap identification',
        'Test mode simulated checkout'
      ],
      cta: 'Get Started Free',
      popular: false,
      buttonStyle: 'bg-slate-800 hover:bg-slate-700 text-white'
    },
    {
      name: 'Pro',
      role: 'For Growing Teams & Sellers',
      price: '₹2,499',
      period: 'per month',
      description: 'Advanced opportunity intelligence, safe bounded negotiation, and merchant analytics.',
      features: [
        'Everything in Starter',
        'Safe AI bounded negotiation engine',
        'Smart product swaps & bundle perks',
        'Merchant policy guardrail sliders',
        'Visual Chart.js analytics & recovery metrics',
        'Complete 100% explainable audit trail'
      ],
      cta: 'Start Pro Trial',
      popular: true,
      buttonStyle: 'bg-brand-500 hover:bg-brand-400 text-slate-950 font-semibold'
    },
    {
      name: 'Enterprise',
      role: 'For High-Volume Merchants & Enterprises',
      price: 'Custom',
      period: 'flexible billing',
      description: 'Tailored merchant margins, custom catalog synchronization, and dedicated support.',
      features: [
        'Everything in Pro',
        'Custom margin floor algorithms',
        'Unlimited catalog item indexing',
        'Multi-seat merchant team access',
        'Dedicated audit log export & webhooks',
        'Priority 24/7 technical onboarding'
      ],
      cta: 'Talk to the Team',
      popular: false,
      buttonStyle: 'bg-slate-800 hover:bg-slate-700 text-white'
    }
  ];

  return (
    <section id="pricing" className="py-20 md:py-28 bg-slate-950/70 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-400 mb-3">
            <span>Transparent Access</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Start Making Better Decisions
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
            Get access to DealPilot AI and start turning opportunities into actionable decisions.
          </p>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`p-7 sm:p-8 rounded-2xl flex flex-col justify-between transition-all duration-200 relative ${
                plan.popular
                  ? 'bg-slate-900 border-2 border-brand-500 shadow-xl shadow-brand-500/10'
                  : 'bg-slate-900/60 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-500 text-slate-950 text-xs font-black uppercase tracking-wider py-0.5 px-3 rounded-full shadow">
                  Most Popular
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  <span className="text-xs text-slate-400">{plan.role}</span>
                </div>
                
                <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                  {plan.description}
                </p>

                <div className="flex items-baseline space-x-2 mb-6 pb-6 border-b border-slate-800/80">
                  <span className="text-4xl font-black text-white font-mono">{plan.price}</span>
                  <span className="text-xs text-slate-400">{plan.period}</span>
                </div>

                <div className="space-y-3 mb-8">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Included capabilities:
                  </div>
                  {plan.features.map((feat, i) => (
                    <div key={i} className="flex items-start space-x-2.5 text-xs text-slate-300">
                      <Check className="w-4 h-4 text-brand-400 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <button
                  onClick={onOpenRoleSelect}
                  className={`w-full py-3 px-4 rounded-xl text-sm font-semibold transition-all flex items-center justify-center space-x-2 ${plan.buttonStyle}`}
                >
                  <span>{plan.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
