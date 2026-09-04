import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp, 
  AlertCircle,
  Clock,
  Layers
} from 'lucide-react';
import { formatINR } from '../../utils/currency';

export default function AIIntelligenceSection({ onExploreClient }) {
  const [selectedScenario, setSelectedScenario] = useState('hardware');

  const scenarios = {
    hardware: {
      name: 'Hardware & Workstation Bundle',
      potential: 'High',
      risk: 'Low',
      confidence: '94%',
      value: 48500,
      margin: '28.4%',
      recommendation: 'Prioritize this opportunity for the next review cycle. Strong expected value and favorable risk indicators suggest a high probability of success.',
      signals: ['Budget alignment: 98%', 'Vendor margin: Protected at 28%', 'Inventory check: In Stock']
    },
    cloud: {
      name: 'SaaS Tooling & Cloud Setup',
      potential: 'Very High',
      risk: 'Low',
      confidence: '96%',
      value: 72000,
      margin: '34.0%',
      recommendation: 'Immediate approval recommended. Multi-seat volume discount unlocks ₹12,500 total savings with zero margin leakage.',
      signals: ['Annual prepayment discount applied', 'Seats: 25 verified', 'Policy compliance: 100%']
    }
  };

  const current = scenarios[selectedScenario];

  const benefits = [
    'Understand deal potential with multi-point algorithmic evaluation',
    'Identify risk signals and margin vulnerabilities before commitment',
    'Prioritize opportunities based on verified expected value',
    'Generate actionable insights and bounded counter-offers',
    'Make decisions faster without tedious spreadsheet comparisons'
  ];

  return (
    <section id="ai-intelligence" className="py-20 md:py-28 bg-slate-950/80 border-b border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-xs font-semibold text-brand-400 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Intelligent Decisioning</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            AI that doesn't just analyze. It helps you decide.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
            DealPilot AI transforms complex deal data into clear recommendations, helping you focus on the opportunities that matter most.
          </p>
        </div>

        {/* Large Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Side: Bullet Points & Narrative */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-xl font-bold text-white">
              Smarter signals. Actionable clarity.
            </h3>
            
            <div className="space-y-4">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-brand-500/15 text-brand-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm text-slate-300 leading-relaxed">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-800/80">
              <div className="text-xs text-slate-400 mb-2 font-medium">Switch sample evaluation:</div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedScenario('hardware')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedScenario === 'hardware'
                      ? 'bg-slate-800 text-white border border-slate-700'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Hardware Setup
                </button>
                <button
                  onClick={() => setSelectedScenario('cloud')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedScenario === 'cloud'
                      ? 'bg-slate-800 text-white border border-slate-700'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  SaaS Software
                </button>
              </div>
            </div>
          </div>

          {/* Right Side: Realistic AI Insight Panel */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-xl shadow-black/30 relative">
              
              {/* Top Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-800 gap-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-brand-400 uppercase tracking-wider">DealPilot AI</div>
                    <h4 className="text-lg font-bold text-white">{current.name}</h4>
                  </div>
                </div>
                <span className="self-start sm:self-auto px-2.5 py-1 rounded text-xs font-mono font-medium bg-slate-950 border border-slate-800 text-slate-300">
                  Analysis #DP-942
                </span>
              </div>

              {/* 3 Metric Badges */}
              <div className="grid grid-cols-3 gap-3 my-6">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 text-center">
                  <div className="text-xs text-slate-400">Potential</div>
                  <div className="text-base sm:text-lg font-bold text-brand-400 mt-1">{current.potential}</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 text-center">
                  <div className="text-xs text-slate-400">Risk</div>
                  <div className="text-base sm:text-lg font-bold text-emerald-400 mt-1">{current.risk}</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 text-center">
                  <div className="text-xs text-slate-400">Confidence</div>
                  <div className="text-base sm:text-lg font-bold text-indigo-300 mt-1">{current.confidence}</div>
                </div>
              </div>

              {/* AI Recommendation Quote Box */}
              <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 relative">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-brand-400" />
                  <span>AI Recommendation</span>
                </div>
                <blockquote className="text-sm text-slate-200 leading-relaxed italic">
                  "{current.recommendation}"
                </blockquote>
              </div>

              {/* Verified Signals */}
              <div className="mt-5 space-y-1.5">
                <div className="text-xs font-semibold text-slate-400">Validated Decision Signals:</div>
                <div className="flex flex-wrap gap-2">
                  {current.signals.map((sig, i) => (
                    <span key={i} className="inline-flex items-center space-x-1 text-xs px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 text-slate-300">
                      <CheckCircle2 className="w-3 h-3 text-brand-400" />
                      <span>{sig}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-5 border-t border-slate-800 flex items-center justify-between">
                <div className="text-xs text-slate-400">
                  Expected Value: <strong className="text-white font-mono text-sm">{formatINR(current.value)}</strong>
                </div>
                <button
                  onClick={onExploreClient}
                  className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-semibold text-brand-400 hover:text-brand-300 transition-colors"
                >
                  <span>View Full Analysis</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
