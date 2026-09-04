import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Sliders, 
  AlertTriangle, 
  CheckCircle2, 
  DollarSign, 
  Activity, 
  Clock, 
  Package
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { formatINR } from '../../utils/currency';
import { getMerchantAnalytics } from '../../services/api';
import { 
  MOCK_MERCHANT_DEALS, 
  MOCK_TIME_SERIES 
} from '../../data/mockMerchantData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function MerchantOverview({ 
  user, 
  onNavigateTab,
  timeRange = '30D',
  setTimeRange
}) {
  const [activeMetric, setActiveMetric] = useState('revenue'); // 'revenue' | 'orders' | 'aov'
  const [analyticsData, setAnalyticsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const merchantName = user?.name || 'OmniTech Solutions';

  useEffect(() => {
    loadLiveAnalytics();
  }, []);

  const loadLiveAnalytics = async () => {
    setIsLoading(true);
    try {
      const res = await getMerchantAnalytics();
      if (res.success && res.metrics) {
        setAnalyticsData(res.metrics);
      }
    } catch (e) {
      console.warn('Live analytics load fallback:', e.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Compute blended KPI numbers (combines baseline scale with live completed orders)
  const liveRevenueDelta = analyticsData?.totalRevenue || 0;
  const liveOrdersDelta = analyticsData?.totalOrdersCount || 0;

  const kpis = {
    revenue: 842500 + liveRevenueDelta,
    revenueChange: '+12.8%',
    orders: 1284 + liveOrdersDelta,
    ordersChange: '+8.4%',
    conversionRate: '6.42%',
    conversionChange: '+1.2%',
    grossMargin: analyticsData?.avgMargin ? `${analyticsData.avgMargin}%` : '27.8%',
    grossMarginChange: '+3.1%',
    marginStatus: 'Healthy'
  };

  const activeSeries = MOCK_TIME_SERIES[timeRange] || MOCK_TIME_SERIES['30D'];

  // Chart configuration
  const chartData = {
    labels: activeSeries.labels,
    datasets: [
      {
        label: activeMetric === 'revenue' 
          ? 'Gross Revenue (₹)' 
          : activeMetric === 'orders' 
          ? 'Total Orders' 
          : 'Average Order Value (₹)',
        data: activeMetric === 'revenue' 
          ? activeSeries.revenue 
          : activeMetric === 'orders' 
          ? activeSeries.orders 
          : activeSeries.aov,
        borderColor: '#22c55e',
        backgroundColor: 'rgba(34, 197, 94, 0.08)',
        fill: true,
        tension: 0.35,
        borderWidth: 2,
        pointBackgroundColor: '#22c55e',
        pointRadius: 4,
        pointHoverRadius: 6
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#0c1017',
        titleColor: '#ffffff',
        bodyColor: '#94a3b8',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        padding: 10,
        callbacks: {
          label: (ctx) => {
            const val = ctx.parsed.y;
            return activeMetric === 'orders' ? `Orders: ${val}` : `Amount: ${formatINR(val)}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.04)' },
        ticks: { color: '#64748b', font: { size: 11 } }
      },
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.04)' },
        ticks: {
          color: '#64748b',
          font: { size: 11 },
          callback: (val) => activeMetric === 'orders' ? val : `₹${(val / 1000).toFixed(0)}k`
        }
      }
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* 1. Greeting Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-white/[0.08]">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Good afternoon, {merchantName}
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Here's how your business is performing today.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onNavigateTab('deals')}
            className="px-3.5 py-2 rounded-xl bg-white text-black text-xs font-bold hover:bg-neutral-200 transition-colors shadow-sm"
          >
            + Manage Deals
          </button>
          <button
            onClick={() => onNavigateTab('guardrails')}
            className="px-3.5 py-2 rounded-xl bg-[#0c1017] hover:bg-neutral-900 border border-white/[0.08] text-xs font-semibold text-neutral-300 hover:text-white transition-colors flex items-center space-x-1.5"
          >
            <Sliders className="w-3.5 h-3.5 text-emerald-400" />
            <span>Policy Guardrails</span>
          </button>
        </div>
      </div>

      {/* 2. Four Primary Business KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Revenue */}
        <div className="p-4 rounded-2xl bg-[#0c1017] border border-white/[0.08]">
          <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
            Revenue
          </div>
          <div className="text-xl sm:text-2xl font-bold text-white font-mono mt-1">
            {formatINR(kpis.revenue)}
          </div>
          <div className="flex items-center space-x-1 text-[11px] text-emerald-400 font-medium mt-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{kpis.revenueChange}</span>
            <span className="text-neutral-500 font-normal">vs previous period</span>
          </div>
        </div>

        {/* Orders */}
        <div className="p-4 rounded-2xl bg-[#0c1017] border border-white/[0.08]">
          <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
            Orders
          </div>
          <div className="text-xl sm:text-2xl font-bold text-white font-mono mt-1">
            {kpis.orders.toLocaleString()}
          </div>
          <div className="flex items-center space-x-1 text-[11px] text-emerald-400 font-medium mt-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{kpis.ordersChange}</span>
            <span className="text-neutral-500 font-normal">vs previous period</span>
          </div>
        </div>

        {/* Conversion Rate */}
        <div className="p-4 rounded-2xl bg-[#0c1017] border border-white/[0.08]">
          <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
            Conversion Rate
          </div>
          <div className="text-xl sm:text-2xl font-bold text-white font-mono mt-1">
            {kpis.conversionRate}
          </div>
          <div className="flex items-center space-x-1 text-[11px] text-emerald-400 font-medium mt-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{kpis.conversionChange}</span>
            <span className="text-neutral-500 font-normal">vs previous period</span>
          </div>
        </div>

        {/* Gross Margin */}
        <div className="p-4 rounded-2xl bg-[#0c1017] border border-white/[0.08]">
          <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider flex items-center justify-between">
            <span>Gross Margin</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {kpis.marginStatus}
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-white font-mono mt-1">
            {kpis.grossMargin}
          </div>
          <div className="flex items-center space-x-1 text-[11px] text-emerald-400 font-medium mt-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{kpis.grossMarginChange}</span>
            <span className="text-neutral-500 font-normal">Protected</span>
          </div>
        </div>

      </div>

      {/* 3. Revenue Performance (Chart.js Line Graph) */}
      <div className="p-6 rounded-3xl bg-[#0c1017] border border-white/[0.08] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">Revenue Performance</h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Net sales velocity and order throughput across selected timeframe
            </p>
          </div>

          <div className="flex items-center space-x-3">
            {/* Metric Switcher */}
            <div className="flex items-center bg-[#07090e] border border-white/[0.08] rounded-xl p-0.5 text-xs font-medium">
              <button
                onClick={() => setActiveMetric('revenue')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  activeMetric === 'revenue' ? 'bg-neutral-800 text-white font-bold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Revenue
              </button>
              <button
                onClick={() => setActiveMetric('orders')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  activeMetric === 'orders' ? 'bg-neutral-800 text-white font-bold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Orders
              </button>
              <button
                onClick={() => setActiveMetric('aov')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  activeMetric === 'aov' ? 'bg-neutral-800 text-white font-bold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                AOV
              </button>
            </div>
          </div>
        </div>

        {/* Chart Canvas */}
        <div className="h-64 w-full pt-2">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* 4. Deal Performance Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">Deal Performance</h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Active promotional offers ranked by sales conversion and net margin
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('deals')}
            className="text-xs text-neutral-400 hover:text-white transition-colors"
          >
            Manage all deals →
          </button>
        </div>

        <div className="rounded-2xl bg-[#0c1017] border border-white/[0.08] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#07090e] border-b border-white/[0.08] text-neutral-400 uppercase font-semibold text-[10px] tracking-wider">
                <tr>
                  <th className="px-5 py-3">Deal</th>
                  <th className="px-4 py-3 text-right">Views</th>
                  <th className="px-4 py-3 text-right">Conversions</th>
                  <th className="px-4 py-3 text-right">Revenue</th>
                  <th className="px-4 py-3 text-right">Margin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06] text-neutral-300">
                {MOCK_MERCHANT_DEALS.map((deal) => {
                  const isHealthy = deal.marginPercent >= 25;
                  return (
                    <tr key={deal.id} className="hover:bg-neutral-850/40 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="font-bold text-white">{deal.name}</div>
                        <div className="text-[10px] text-neutral-500 truncate max-w-xs">{deal.products.join(' + ')}</div>
                      </td>
                      <td className="px-4 py-3.5 text-right font-mono text-neutral-400">
                        {deal.views.toLocaleString()}
                      </td>
                      <td className="px-4 py-3.5 text-right font-mono font-bold text-white">
                        {deal.conversions.toLocaleString()}
                      </td>
                      <td className="px-4 py-3.5 text-right font-mono font-bold text-white">
                        {formatINR(deal.revenue)}
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
                          isHealthy 
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}>
                          {deal.marginPercent}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 5. Split Section: AI Business Advisor & Margin Protection */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* DealPilot AI Advisor Panel */}
        <div className="p-5 rounded-3xl bg-[#0c1017] border border-white/[0.08] flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                <Sparkles className="w-4 h-4" />
                <span>DealPilot AI Advisor</span>
              </div>
              <span className="text-[10px] font-mono font-bold text-neutral-400 bg-[#07090e] px-2 py-0.5 rounded border border-white/[0.08]">
                Confidence: 91%
              </span>
            </div>

            <h4 className="text-sm font-bold text-white">Opportunity Detected</h4>
            <p className="text-xs text-neutral-300 leading-relaxed">
              "Your wireless audio category has strong conversion but declining margins. Consider reducing discounts by 3–5% on high-demand products."
            </p>
          </div>

          <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs">
            <span className="text-neutral-400">
              Potential Impact: <strong className="text-emerald-400 font-medium">High Margin Recovery (+₹18,400)</strong>
            </span>
            <button
              onClick={() => onNavigateTab('insights')}
              className="inline-flex items-center space-x-1 font-bold text-white hover:text-emerald-400 transition-colors"
            >
              <span>Review Recommendation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Margin Protection Card */}
        <div className="p-5 rounded-3xl bg-[#0c1017] border border-white/[0.08] flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-neutral-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Margin Protection</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Healthy (27.8% Avg)
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-3 rounded-xl bg-[#07090e] border border-white/[0.06]">
                <div className="text-[10px] text-neutral-400">Protected Deals</div>
                <div className="text-lg font-bold text-white font-mono mt-0.5">18 Active</div>
              </div>
              <div className="p-3 rounded-xl bg-[#07090e] border border-white/[0.06]">
                <div className="text-[10px] text-amber-400">Requires Attention</div>
                <div className="text-lg font-bold text-amber-300 font-mono mt-0.5">3 Deals Below 25%</div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs">
            <span className="text-neutral-400 text-[11px]">
              Policy floor: Min 8% margin enforced by backend
            </span>
            <button
              onClick={() => onNavigateTab('guardrails')}
              className="inline-flex items-center space-x-1 font-bold text-white hover:text-emerald-400 transition-colors"
            >
              <span>Review Guardrails</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* 6. AI Negotiation Activity */}
      <div className="p-5 rounded-3xl bg-[#0c1017] border border-white/[0.08] space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">AI Negotiation Activity</h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Autonomous conversational negotiations bounded strictly by merchant policy
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('audit')}
            className="text-xs text-neutral-400 hover:text-white transition-colors"
          >
            Audit Trail →
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-1">
          <div className="p-3.5 rounded-2xl bg-[#07090e] border border-white/[0.06]">
            <div className="text-[10px] text-neutral-400 uppercase font-semibold">Negotiations</div>
            <div className="text-xl font-bold text-white font-mono mt-1">142</div>
            <span className="text-[10px] text-neutral-500">Total sessions</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#07090e] border border-white/[0.06]">
            <div className="text-[10px] text-neutral-400 uppercase font-semibold">Acceptance</div>
            <div className="text-xl font-bold text-emerald-400 font-mono mt-1">38%</div>
            <span className="text-[10px] text-neutral-500">Offer closed</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#07090e] border border-white/[0.06]">
            <div className="text-[10px] text-neutral-400 uppercase font-semibold">Revenue Generated</div>
            <div className="text-xl font-bold text-white font-mono mt-1">₹84,200</div>
            <span className="text-[10px] text-neutral-500">Via negotiated plans</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#07090e] border border-white/[0.06]">
            <div className="text-[10px] text-neutral-400 uppercase font-semibold">Protected Margin</div>
            <div className="text-xl font-bold text-emerald-400 font-mono mt-1">26.4%</div>
            <span className="text-[10px] text-neutral-500">Above 8% store floor</span>
          </div>
        </div>
      </div>

    </div>
  );
}
