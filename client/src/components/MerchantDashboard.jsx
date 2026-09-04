import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Sliders,
  DollarSign,
  TrendingUp,
  Save,
  CheckCircle2,
  RefreshCw,
  BarChart3,
  PieChart,
  ShoppingBag,
  Percent,
  Lock,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { formatINR } from '../utils/currency';
import { getMerchantRules, updateMerchantRules, getMerchantAnalytics } from '../services/api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function MerchantDashboard({ onNavigateToAudit }) {
  const [rules, setRules] = useState({
    maxDiscountPercent: 10,
    maxDiscountAmount: 500,
    minProfitMarginPercent: 8,
    maxNegotiationRounds: 2,
    allowSubstitutions: true,
    allowBundlePerks: true,
    bundlePerksThreshold: 3500
  });

  const [analytics, setAnalytics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [rulesRes, analyticsRes] = await Promise.all([
        getMerchantRules(),
        getMerchantAnalytics()
      ]);
      if (rulesRes.success && rulesRes.rules) setRules(rulesRes.rules);
      if (analyticsRes.success) setAnalytics(analyticsRes);
    } catch (err) {
      console.error('Failed to load merchant data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveRules = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await updateMerchantRules(rules);
      if (res.success) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (err) {
      alert('Failed to update merchant rules: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const metrics = analytics?.metrics || {
    totalRevenue: 13350,
    totalProfit: 3720,
    totalDiscounts: 850,
    avgMargin: 27.8,
    totalOrdersCount: 3,
    abandonmentRecoveryRate: '42.8%',
    recoveredRevenue: 9750,
    activeCatalogCount: 42
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-white">
              Merchant Command Center
            </span>
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
              Live Guardrails
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Configure bounded negotiation rules, enforce profit margin floors, and view real-time conversion metrics.
          </p>
        </div>

        <button
          onClick={loadData}
          className="self-start sm:self-auto inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-850 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-medium transition-all"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Refresh Analytics</span>
        </button>
      </div>

      {/* KPI Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Total Revenue */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800/80 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Gross Revenue</span>
            <DollarSign className="w-4 h-4 text-brand-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono mt-2">
            {formatINR(metrics.totalRevenue)}
          </div>
          <div className="text-[11px] text-brand-400 mt-1 flex items-center">
            <ArrowUpRight className="w-3 h-3 mr-0.5" />
            <span>{metrics.totalOrdersCount} Completed Orders</span>
          </div>
        </div>

        {/* Metric 2: Protected Profit Margin */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800/80 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Protected Profit</span>
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono mt-2">
            {formatINR(metrics.totalProfit)}
          </div>
          <div className="text-[11px] text-indigo-300 mt-1">
            Avg {metrics.avgMargin}% Profit Margin (Floor: {rules.minProfitMarginPercent}%)
          </div>
        </div>

        {/* Metric 3: Abandonment Recovery */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800/80 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Cart Recovery</span>
            <TrendingUp className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono mt-2">
            {metrics.abandonmentRecoveryRate}
          </div>
          <div className="text-[11px] text-amber-300 mt-1">
            {formatINR(metrics.recoveredRevenue)} recovered from over-budget carts
          </div>
        </div>

        {/* Metric 4: Customer Discounts Given */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800/80 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Discounts Granted</span>
            <Percent className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono mt-2">
            {formatINR(metrics.totalDiscounts)}
          </div>
          <div className="text-[11px] text-emerald-300 mt-1">
            Capped safely at ₹{rules.maxDiscountAmount} per deal
          </div>
        </div>

      </div>

      {/* Main Grid: Rule Controls Form (Left) & Real-time Charts (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Interactive Policy Guardrails Configurator (5 Cols) */}
        <div className="lg:col-span-5 glass-panel rounded-3xl p-6 sm:p-7 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-brand-400" />
                <h3 className="text-lg font-bold text-white">Rule Guardrails Policy</h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">Real-time Sync</span>
            </div>

            <form onSubmit={handleSaveRules} className="mt-6 space-y-5">
              
              {/* Slider 1: Max Discount % */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-slate-300">
                  <span>1. Max Discount %</span>
                  <span className="text-brand-400 font-mono font-bold">{rules.maxDiscountPercent}%</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="25"
                  step="1"
                  value={rules.maxDiscountPercent}
                  onChange={(e) => setRules({ ...rules, maxDiscountPercent: Number(e.target.value) })}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-500"
                />
                <p className="text-[11px] text-slate-500">
                  AI will never offer a percentage discount greater than this cap.
                </p>
              </div>

              {/* Slider 2: Max Discount ₹ Cap */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-slate-300">
                  <span>2. Max Discount Amount (₹ Cap)</span>
                  <span className="text-brand-400 font-mono font-bold">₹{rules.maxDiscountAmount}</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="2500"
                  step="50"
                  value={rules.maxDiscountAmount}
                  onChange={(e) => setRules({ ...rules, maxDiscountAmount: Number(e.target.value) })}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-500"
                />
                <p className="text-[11px] text-slate-500">
                  Hard absolute rupee limit on total discount per transaction.
                </p>
              </div>

              {/* Slider 3: Min Profit Margin % */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-slate-300">
                  <span>3. Minimum Profit Margin Floor</span>
                  <span className="text-indigo-400 font-mono font-bold">{rules.minProfitMarginPercent}%</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="25"
                  step="1"
                  value={rules.minProfitMarginPercent}
                  onChange={(e) => setRules({ ...rules, minProfitMarginPercent: Number(e.target.value) })}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
                <p className="text-[11px] text-slate-500">
                  Protects wholesale margins: Price - Cost ≥ {rules.minProfitMarginPercent}%.
                </p>
              </div>

              {/* Slider 4: Max Negotiation Rounds */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-slate-300">
                  <span>4. Max Negotiation Rounds</span>
                  <span className="text-amber-400 font-mono font-bold">{rules.maxNegotiationRounds} Attempts</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={rules.maxNegotiationRounds}
                  onChange={(e) => setRules({ ...rules, maxNegotiationRounds: Number(e.target.value) })}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <p className="text-[11px] text-slate-500">
                  Limits conversational back-and-forth before locking final offer.
                </p>
              </div>

              {/* Toggles: Substitutions & Bundle Perks */}
              <div className="pt-2 border-t border-slate-800 space-y-3">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-xs text-slate-300 font-medium">Enable Intelligent Product Swaps</span>
                  <input
                    type="checkbox"
                    checked={rules.allowSubstitutions}
                    onChange={(e) => setRules({ ...rules, allowSubstitutions: e.target.checked })}
                    className="w-4 h-4 accent-brand-500 rounded cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-xs text-slate-300 font-medium">Auto-Bundle Value Perks (₹3,500+ carts)</span>
                  <input
                    type="checkbox"
                    checked={rules.allowBundlePerks}
                    onChange={(e) => setRules({ ...rules, allowBundlePerks: e.target.checked })}
                    className="w-4 h-4 accent-brand-500 rounded cursor-pointer"
                  />
                </label>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-400 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-glow-indigo transition-all disabled:opacity-50"
                >
                  {isSaving ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Saving Policy Rules...</span>
                    </>
                  ) : saveSuccess ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                      <span>Guardrails Updated Live!</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Update Merchant Guardrails</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>

        {/* Right Column: Chart.js Analytics (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Chart 1: Financial Overview */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-bold text-white text-sm sm:text-base">Financial Protection Breakdown</h4>
                <p className="text-xs text-slate-400">Net Revenue vs Protected Profit Margin vs Granted Discounts</p>
              </div>
              <BarChart3 className="w-5 h-5 text-slate-400" />
            </div>
            
            <div className="h-64 flex items-center justify-center">
              {analytics?.charts?.revenueBreakdown ? (
                <Bar
                  data={analytics.charts.revenueBreakdown}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                      y: { grid: { color: 'rgba(255,255,255,0.06)' }, ticks: { color: '#94a3b8' } },
                      x: { grid: { display: false }, ticks: { color: '#94a3b8' } }
                    }
                  }}
                />
              ) : (
                <div className="text-xs text-slate-500">Loading chart analytics...</div>
              )}
            </div>
          </div>

          {/* Chart 2 & 3: Doughnut & Category sales */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
              <div className="mb-2">
                <h5 className="font-bold text-white text-xs sm:text-sm">Negotiation Funnel Status</h5>
                <p className="text-[11px] text-slate-400">Deals Closed vs Clamped</p>
              </div>
              <div className="h-44 flex items-center justify-center">
                {analytics?.charts?.conversionData ? (
                  <Doughnut
                    data={analytics.charts.conversionData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: { position: 'bottom', labels: { color: '#94a3b8', font: { size: 10 } } }
                      }
                    }}
                  />
                ) : null}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
              <div>
                <h5 className="font-bold text-white text-xs sm:text-sm">Explainability & Audit Logs</h5>
                <p className="text-[11px] text-slate-400 mt-1">
                  Every negotiation round is mathematically logged with margin checks and policy verdicts.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 mt-3 text-xs text-slate-300 space-y-1.5 font-mono">
                <div className="text-brand-400 font-semibold">✓ 100% Deterministic Guardrails</div>
                <div>• Zero Uncontrolled Margin Loss</div>
                <div>• Full Real-time Audit Trail</div>
              </div>

              <button
                type="button"
                onClick={onNavigateToAudit}
                className="mt-3 w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center justify-center space-x-1 transition-all"
              >
                <span>Inspect Full Audit Trail</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
