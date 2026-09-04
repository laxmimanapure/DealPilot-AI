import React, { useState } from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  ShieldCheck, 
  AlertTriangle, 
  ArrowRight, 
  Zap, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  Sliders, 
  Package, 
  Tag, 
  Activity,
  Check,
  Percent
} from 'lucide-react';
import { formatINR } from '../../utils/currency';
import { MOCK_MERCHANT_INSIGHTS } from '../../data/mockMerchantData';

export default function MerchantAIInsights({ onNavigateTab }) {
  const [filterType, setFilterType] = useState('ALL'); // 'ALL' | 'OPPORTUNITY' | 'RISK' | 'RECOMMENDATION' | 'FORECAST'
  const [appliedActions, setAppliedActions] = useState({});
  const [toastMessage, setToastMessage] = useState(null);

  const handleAction = (item) => {
    setAppliedActions(prev => ({ ...prev, [item.id]: true }));
    setToastMessage(`Action triggered: "${item.actionLabel}"`);
    setTimeout(() => setToastMessage(null), 3500);

    // Route dynamically based on insight type or action label
    if (onNavigateTab) {
      if (item.actionLabel.toLowerCase().includes('bundle') || item.actionLabel.toLowerCase().includes('deal')) {
        setTimeout(() => onNavigateTab('deals'), 700);
      } else if (item.actionLabel.toLowerCase().includes('margin') || item.actionLabel.toLowerCase().includes('inventory') || item.actionLabel.toLowerCase().includes('cost')) {
        setTimeout(() => onNavigateTab('inventory'), 700);
      } else if (item.actionLabel.toLowerCase().includes('discount') || item.actionLabel.toLowerCase().includes('cap') || item.actionLabel.toLowerCase().includes('guardrail')) {
        setTimeout(() => onNavigateTab('guardrails'), 700);
      }
    }
  };

  const filteredInsights = MOCK_MERCHANT_INSIGHTS.filter(item => {
    if (filterType === 'ALL') return true;
    return item.type.toUpperCase() === filterType.toUpperCase();
  });

  const getTypeStyle = (type) => {
    switch (type.toUpperCase()) {
      case 'OPPORTUNITY':
        return {
          badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
          borderHover: 'hover:border-emerald-500/40',
          icon: Zap,
          iconColor: 'text-emerald-400',
          accentBg: 'bg-emerald-500/10'
        };
      case 'RISK':
        return {
          badge: 'bg-red-500/10 text-red-400 border-red-500/20',
          borderHover: 'hover:border-red-500/40',
          icon: AlertTriangle,
          iconColor: 'text-red-400',
          accentBg: 'bg-red-500/10'
        };
      case 'RECOMMENDATION':
        return {
          badge: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
          borderHover: 'hover:border-indigo-500/40',
          icon: Sparkles,
          iconColor: 'text-indigo-400',
          accentBg: 'bg-indigo-500/10'
        };
      case 'FORECAST':
        return {
          badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
          borderHover: 'hover:border-blue-500/40',
          icon: TrendingUp,
          iconColor: 'text-blue-400',
          accentBg: 'bg-blue-500/10'
        };
      default:
        return {
          badge: 'bg-slate-800 text-slate-300 border-slate-700',
          borderHover: 'hover:border-slate-600',
          icon: Activity,
          iconColor: 'text-slate-400',
          accentBg: 'bg-slate-800'
        };
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0c1017] border border-emerald-500/40 text-emerald-400 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-semibold animate-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Autonomous Guardrails & Mathematical Engine Banner */}
      <div className="p-5 rounded-xl bg-gradient-to-r from-emerald-950/20 via-[#0c1017] to-indigo-950/20 border border-emerald-500/20 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white">
                DealPilot AI Autonomous Margin Guardian
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Active & Enforcing
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Deterministic 10% discount cap & 25% gross margin floor safeguarded ₹58,200 in net profit this month.
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigateTab && onNavigateTab('guardrails')}
          className="px-3.5 py-2 rounded-lg bg-[#07090e] hover:bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:text-emerald-300 text-xs font-semibold flex items-center gap-1.5 self-start md:self-auto transition-all"
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Configure Guardrails</span>
        </button>
      </div>

      {/* Control Filter Bar */}
      <div className="p-4 rounded-xl bg-[#0c1017] border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-semibold text-slate-400 mr-2">Category:</span>
          {[
            { id: 'ALL', label: 'All Insights' },
            { id: 'OPPORTUNITY', label: 'Opportunities' },
            { id: 'RISK', label: 'Risks & Losses' },
            { id: 'RECOMMENDATION', label: 'Pricing Recommendations' },
            { id: 'FORECAST', label: 'Demand Forecasts' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                filterType === tab.id
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-[#07090e] text-slate-400 hover:text-slate-200 border border-white/[0.06]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <span className="text-xs text-slate-400">
          Showing <strong className="text-white">{filteredInsights.length}</strong> algorithmic findings
        </span>
      </div>

      {/* Insights Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredInsights.map(item => {
          const style = getTypeStyle(item.type);
          const IconComponent = style.icon;
          const isApplied = appliedActions[item.id];

          return (
            <div
              key={item.id}
              className={`p-5 rounded-xl bg-[#0c1017] border border-white/[0.08] ${style.borderHover} transition-all flex flex-col justify-between space-y-4 shadow-sm group`}
            >
              <div>
                
                {/* Header Badge & Impact */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`p-1.5 rounded-lg ${style.accentBg} ${style.iconColor}`}>
                      <IconComponent className="w-4 h-4" />
                    </span>
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider font-mono border ${style.badge}`}>
                      {item.type}
                    </span>
                  </div>

                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded font-mono ${
                    item.impact === 'High' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                  }`}>
                    {item.impact} Impact
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors leading-snug">
                  {item.title}
                </h3>

                {/* Algorithmic Reason / Diagnostic */}
                <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
                  {item.explanation}
                </p>
              </div>

              {/* Confidence & Action Strip */}
              <div className="pt-4 border-t border-white/[0.06] space-y-3">
                
                {/* Confidence Meter */}
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 text-[11px]">Algorithmic Confidence:</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 rounded-full bg-white/[0.08] overflow-hidden">
                      <div 
                        className="h-full bg-emerald-400 rounded-full transition-all"
                        style={{ width: `${item.confidence}%` }}
                      ></div>
                    </div>
                    <span className="font-mono font-bold text-emerald-400 text-xs">{item.confidence}%</span>
                  </div>
                </div>

                {/* Action CTA */}
                <button
                  onClick={() => handleAction(item)}
                  disabled={isApplied}
                  className={`w-full py-2.5 px-4 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    isApplied
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 cursor-default'
                      : 'bg-[#07090e] hover:bg-emerald-500 hover:text-black text-slate-200 border border-white/[0.08] hover:border-emerald-500'
                  }`}
                >
                  {isApplied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Recommendation Executed</span>
                    </>
                  ) : (
                    <>
                      <span>{item.actionLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>

              </div>
            </div>
          );
        })}
      </div>

      {/* Strategic Decision Explanations Footer */}
      <div className="p-4 rounded-xl bg-[#0c1017] border border-white/[0.08] flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>All insights are generated from real buyer negotiation session telemetry and deterministic inventory velocity.</span>
        </div>
        <button
          onClick={() => onNavigateTab && onNavigateTab('audit')}
          className="text-emerald-400 hover:underline font-semibold flex items-center gap-1"
        >
          <span>View Verification Logs</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
}
