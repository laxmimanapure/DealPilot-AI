import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  FileCode, 
  Server,
  CheckCircle2
} from 'lucide-react';

export default function SecuritySection() {
  const securityPillars = [
    {
      icon: ShieldCheck,
      title: 'Deterministic Policy Guardrails',
      description: 'AI negotiations are strictly bounded by hardcoded merchant policy thresholds. The system algorithmically clamps discounts, rupee caps, and minimum profit margins.'
    },
    {
      icon: Lock,
      title: 'Role-Segregated Access',
      description: 'Strict authorization boundaries separate Client discovery workflows from Merchant administration, preventing cross-tenant access and unauthorized operations.'
    },
    {
      icon: FileCode,
      title: '100% Explainable Audit Trail',
      description: 'Every negotiation round, discount proposal, and margin check is logged with mathematical precision, providing complete explainability for compliance.'
    },
    {
      icon: Server,
      title: 'Reliable Modern Infrastructure',
      description: 'Built with resilient Node.js and Express REST services, isolated state management, and tamper-resistant Razorpay payment signature verification.'
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-slate-950 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-400 mb-3">
            <Lock className="w-3.5 h-3.5 text-brand-400" />
            <span>Safety & Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Your data. Your decisions. Your control.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
            AI talks. The system controls the money. Grounded in deterministic constraints rather than unpredictable probabilistic actions.
          </p>
        </div>

        {/* 4 Security Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {securityPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all duration-200"
              >
                <div className="w-11 h-11 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-center text-brand-400 mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {pillar.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Security Bottom Note */}
        <div className="mt-12 p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 max-w-3xl mx-auto flex items-center justify-center text-center text-xs text-slate-400">
          <span className="inline-flex items-center space-x-1 text-slate-300">
            <ShieldCheck className="w-4 h-4 text-brand-400 mr-1.5" />
            <strong>Core Philosophy:</strong> "Never let generative AI execute financial transactions without deterministic validation."
          </span>
        </div>

      </div>
    </section>
  );
}
