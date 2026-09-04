import React, { useState, useEffect } from 'react';
import { 
  Sliders, 
  ShieldCheck, 
  Save, 
  CheckCircle2, 
  Lock, 
  DollarSign, 
  Percent,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { getMerchantRules, updateMerchantRules } from '../../services/api';
import { formatINR } from '../../utils/currency';

export default function MerchantGuardrails({ onRulesUpdated }) {
  const [rules, setRules] = useState({
    maxDiscountPercent: 10,
    maxDiscountAmount: 500,
    minProfitMarginPercent: 8,
    maxNegotiationRounds: 2,
    allowSubstitutions: true,
    allowBundlePerks: true,
    bundlePerksThreshold: 3500
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    loadRules();
  }, []);

  const loadRules = async () => {
    setIsLoading(true);
    try {
      const res = await getMerchantRules();
      if (res.success && res.rules) {
        setRules(res.rules);
      }
    } catch (err) {
      console.error('Failed to load merchant rules:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await updateMerchantRules(rules);
      if (res.success) {
        setSaveSuccess(true);
        if (onRulesUpdated) onRulesUpdated(rules);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (err) {
      alert('Failed to update merchant guardrails: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-brand-400 mb-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Deterministic System Constraints</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Policy Guardrail Configuration
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Configure hard mathematical limits that the AI negotiation agent cannot exceed under any circumstance.
          </p>
        </div>

        {saveSuccess && (
          <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold animate-in fade-in">
            <CheckCircle2 className="w-4 h-4" />
            <span>Guardrails synchronized live to backend</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Controls Form Column */}
        <div className="lg:col-span-8">
          <form onSubmit={handleSave} className="p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
            
            {/* Slider 1: Max Discount % */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-white flex items-center space-x-1.5">
                  <Percent className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Maximum Discount Percentage</span>
                </label>
                <span className="font-mono text-sm font-bold text-indigo-400">
                  {rules.maxDiscountPercent}%
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                step="1"
                value={rules.maxDiscountPercent}
                onChange={(e) => setRules({ ...rules, maxDiscountPercent: Number(e.target.value) })}
                className="w-full accent-indigo-500 bg-slate-950 rounded-lg cursor-pointer h-2"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>1% (Strict)</span>
                <span>Default: 10%</span>
                <span>25% (Aggressive)</span>
              </div>
            </div>

            {/* Slider 2: Max Discount Rupee Cap */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-white flex items-center space-x-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-brand-400" />
                  <span>Maximum Absolute Discount Cap (₹)</span>
                </label>
                <span className="font-mono text-sm font-bold text-brand-400">
                  {formatINR(rules.maxDiscountAmount)}
                </span>
              </div>
              <input
                type="range"
                min="100"
                max="2000"
                step="50"
                value={rules.maxDiscountAmount}
                onChange={(e) => setRules({ ...rules, maxDiscountAmount: Number(e.target.value) })}
                className="w-full accent-brand-500 bg-slate-950 rounded-lg cursor-pointer h-2"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>₹100 (Tight)</span>
                <span>Default: ₹500</span>
                <span>₹2,000 (Generous)</span>
              </div>
            </div>

            {/* Slider 3: Minimum Profit Margin % */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-white flex items-center space-x-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Non-Negotiable Profit Margin Floor</span>
                </label>
                <span className="font-mono text-sm font-bold text-emerald-400">
                  {rules.minProfitMarginPercent}%
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="30"
                step="1"
                value={rules.minProfitMarginPercent}
                onChange={(e) => setRules({ ...rules, minProfitMarginPercent: Number(e.target.value) })}
                className="w-full accent-emerald-500 bg-slate-950 rounded-lg cursor-pointer h-2"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>5% (Volume Floor)</span>
                <span>Default: 8%</span>
                <span>30% (High Margin Guard)</span>
              </div>
            </div>

            {/* Slider 4: Negotiation Round Limit */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-white">
                  Max Negotiation Turn Limit per Customer
                </label>
                <span className="font-mono text-sm font-bold text-amber-400">
                  {rules.maxNegotiationRounds} Rounds
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={rules.maxNegotiationRounds}
                onChange={(e) => setRules({ ...rules, maxNegotiationRounds: Number(e.target.value) })}
                className="w-full accent-amber-500 bg-slate-950 rounded-lg cursor-pointer h-2"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>1 Round</span>
                <span>Default: 2 Rounds</span>
                <span>5 Rounds</span>
              </div>
            </div>

            {/* Toggles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
              <label className="flex items-center space-x-3 text-xs text-slate-300 cursor-pointer p-3 rounded-xl bg-slate-950 border border-slate-800">
                <input
                  type="checkbox"
                  checked={rules.allowSubstitutions}
                  onChange={(e) => setRules({ ...rules, allowSubstitutions: e.target.checked })}
                  className="rounded bg-slate-900 border-slate-700 text-indigo-500"
                />
                <div>
                  <div className="font-semibold text-white">Allow Product Substitutions</div>
                  <div className="text-[11px] text-slate-500">Swap items to meet hard budget limits</div>
                </div>
              </label>

              <label className="flex items-center space-x-3 text-xs text-slate-300 cursor-pointer p-3 rounded-xl bg-slate-950 border border-slate-800">
                <input
                  type="checkbox"
                  checked={rules.allowBundlePerks}
                  onChange={(e) => setRules({ ...rules, allowBundlePerks: e.target.checked })}
                  className="rounded bg-slate-900 border-slate-700 text-indigo-500"
                />
                <div>
                  <div className="font-semibold text-white">Allow Complimentary Perks</div>
                  <div className="text-[11px] text-slate-500">Add cable clips/accessories when discount is clamped</div>
                </div>
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <div className="text-xs text-slate-500">
                Real-time active enforcement on API
              </div>
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center space-x-2 shadow-sm transition-all"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{isSaving ? 'Saving...' : 'Save & Enforce Guardrails'}</span>
              </button>
            </div>

          </form>
        </div>

        {/* Informational Side Column */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 text-xs">
            <h3 className="font-bold text-white text-sm flex items-center space-x-2">
              <Lock className="w-4 h-4 text-brand-400" />
              <span>How Guardrails Protect You</span>
            </h3>
            
            <p className="text-slate-400 leading-relaxed">
              DealPilot's AI reasoning layer is separated from execution by deterministic safety filters. When an AI negotiates with a buyer:
            </p>

            <div className="space-y-2 text-slate-300">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <strong className="text-white block mb-0.5">1. Hard Clamp Calculation</strong>
                <span>Any buyer offer exceeding {rules.maxDiscountPercent}% or {formatINR(rules.maxDiscountAmount)} is mathematically capped before counter-offer submission.</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <strong className="text-white block mb-0.5">2. Margin Invariant Check</strong>
                <span>If total price minus wholesale cost drops below {rules.minProfitMarginPercent}%, the offer is immediately rejected or alternative items are swapped.</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <strong className="text-white block mb-0.5">3. Explainable Audit Trail</strong>
                <span>All decisions are written to persistent JSON logs with exact mathematical proof.</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
