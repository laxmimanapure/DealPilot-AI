import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  DollarSign, 
  Percent, 
  RefreshCw, 
  ShieldCheck, 
  AlertTriangle, 
  AlertCircle, 
  ArrowUpRight, 
  ShoppingBag, 
  Users, 
  Tag, 
  Package, 
  Sliders, 
  ArrowRight,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
} from 'chart.js';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import { formatINR } from '../../utils/currency';
import { getMerchantAnalytics } from '../../services/api';
import { 
  MOCK_TOP_PRODUCTS, 
  MOCK_NEEDS_ATTENTION_PRODUCTS, 
  MOCK_TIME_SERIES 
} from '../../data/mockMerchantData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

export default function MerchantAnalytics({ onNavigateTab }) {
  const [timeRange, setTimeRange] = useState('30D'); // '7D' | '30D' | '90D'
  const [activeMetric, setActiveMetric] = useState('revenue'); // 'revenue' | 'orders' | 'conversion' | 'aov' | 'margin'
  const [analytics, setAnalytics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    setIsLoading(true);
    try {
      const res = await getMerchantAnalytics();
      if (res && res.success) {
        setAnalytics(res);
      }
    } catch (err) {
      console.warn('Could not load live analytics, using fallback store telemetry:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const metrics = analytics?.metrics || {
    totalRevenue: 842500,
    totalProfit: 234215,
    totalDiscounts: 58200,
    avgMargin: 27.8,
    totalOrdersCount: 1284,
    conversionRate: 6.42,
    aov: 656
  };

  // Time series dataset based on current timeRange
  const seriesData = MOCK_TIME_SERIES[timeRange] || MOCK_TIME_SERIES['30D'];

  // Metric configurations for chart
  const metricConfigs = {
    revenue: {
      label: 'Gross Revenue (₹)',
      data: seriesData.revenue,
      borderColor: '#22c55e',
      backgroundColor: 'rgba(34, 197, 94, 0.12)',
      unit: '₹',
      formatter: (val) => formatINR(val)
    },
    orders: {
      label: 'Settled Orders',
      data: seriesData.orders,
      borderColor: '#6366f1',
      backgroundColor: 'rgba(99, 102, 241, 0.12)',
      unit: '',
      formatter: (val) => `${val} orders`
    },
    conversion: {
      label: 'Conversion Rate (%)',
      data: seriesData.revenue.map((_, i) => [5.8, 6.4, 6.2, 7.1, 6.8, 7.4, 6.9][i % 7]),
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59, 130, 246, 0.12)',
      unit: '%',
      formatter: (val) => `${val}%`
    },
    aov: {
      label: 'Average Order Value (₹)',
      data: seriesData.aov,
      borderColor: '#f59e0b',
      backgroundColor: 'rgba(245, 158, 11, 0.12)',
      unit: '₹',
      formatter: (val) => formatINR(val)
    },
    margin: {
      label: 'Gross Profit Margin (%)',
      data: seriesData.revenue.map((_, i) => [27.2, 28.1, 27.5, 28.6, 27.8, 29.0, 28.4][i % 7]),
      borderColor: '#10b981',
      backgroundColor: 'rgba(16, 185, 129, 0.12)',
      unit: '%',
      formatter: (val) => `${val}%`
    }
  };

  const currentConfig = metricConfigs[activeMetric];

  const mainChartData = {
    labels: seriesData.labels,
    datasets: [
      {
        fill: true,
        label: currentConfig.label,
        data: currentConfig.data,
        borderColor: currentConfig.borderColor,
        backgroundColor: currentConfig.backgroundColor,
        tension: 0.35,
        pointBackgroundColor: currentConfig.borderColor,
        pointBorderColor: '#0c1017',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6
      }
    ]
  };

  const mainChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#0c1017',
        borderColor: 'rgba(255, 255, 255, 0.15)',
        borderWidth: 1,
        titleColor: '#ffffff',
        bodyColor: '#94a3b8',
        padding: 10,
        boxPadding: 4,
        callbacks: {
          label: (context) => ` ${currentConfig.label}: ${currentConfig.formatter(context.parsed.y)}`
        }
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.04)' },
        ticks: { color: '#94a3b8', font: { size: 11 } }
      },
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.04)' },
        ticks: {
          color: '#94a3b8',
          font: { size: 11 },
          callback: (val) => {
            if (activeMetric === 'revenue') return `₹${(val / 1000).toFixed(0)}k`;
            if (activeMetric === 'conversion' || activeMetric === 'margin') return `${val}%`;
            return val;
          }
        }
      }
    }
  };

  // Capital breakdown & Profit share chart
  const doughnutData = {
    labels: ['Protected Profit (27.8%)', 'Wholesale Production Cost (65.3%)', 'AI Negotiation Concessions (6.9%)'],
    datasets: [
      {
        data: [234215, 550085, 58200],
        backgroundColor: ['#22c55e', '#3b82f6', '#f59e0b'],
        borderWidth: 0
      }
    ]
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: '#94a3b8', font: { size: 11 }, boxWidth: 12, padding: 16 }
      },
      tooltip: {
        backgroundColor: '#0c1017',
        borderColor: 'rgba(255, 255, 255, 0.15)',
        borderWidth: 1,
        titleColor: '#ffffff',
        bodyColor: '#94a3b8',
        callbacks: {
          label: (context) => ` ${context.label}: ${formatINR(context.raw)}`
        }
      }
    }
  };

  return (
    <div className="space-y-6">
      
      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#0c1017] border border-white/[0.08] shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Total Revenue ({timeRange})</span>
            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-bold text-white font-mono mt-2">
            {formatINR(metrics.totalRevenue)}
          </div>
          <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" />
            <span>+14.2% vs previous period</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#0c1017] border border-white/[0.08] shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Average Profit Margin</span>
            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-bold text-emerald-400 font-mono mt-2">
            {metrics.avgMargin}%
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Healthy (&ge; 25% target floor)
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#0c1017] border border-white/[0.08] shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Negotiation Conversion</span>
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
              <Users className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-bold text-indigo-400 font-mono mt-2">
            {metrics.conversionRate}%
          </div>
          <div className="text-[11px] text-indigo-400/80 mt-1">
            42.8% checkout abandonment recovered
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#0c1017] border border-white/[0.08] shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Average Order Value</span>
            <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
              <ShoppingBag className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-bold text-white font-mono mt-2">
            {formatINR(metrics.aov)}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Across {metrics.totalOrdersCount} purchases
          </div>
        </div>
      </div>

      {/* Main Interactive Performance Chart Section */}
      <div className="p-5 rounded-xl bg-[#0c1017] border border-white/[0.08] shadow-sm space-y-4">
        
        {/* Controls: Metric Switcher + Time Range */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
          
          {/* Metric Switcher */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-400 mr-2">Metric:</span>
            {[
              { id: 'revenue', label: 'Revenue' },
              { id: 'orders', label: 'Orders' },
              { id: 'conversion', label: 'Conversion %' },
              { id: 'aov', label: 'AOV' },
              { id: 'margin', label: 'Margin %' }
            ].map(m => (
              <button
                key={m.id}
                onClick={() => setActiveMetric(m.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeMetric === m.id
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-[#07090e] text-slate-400 hover:text-slate-200 border border-white/[0.06]'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* Time Range Selector & Sync */}
          <div className="flex items-center gap-2 self-start lg:self-auto">
            <div className="inline-flex rounded-lg bg-[#07090e] p-1 border border-white/[0.08]">
              {['7D', '30D', '90D'].map(t => (
                <button
                  key={t}
                  onClick={() => setTimeRange(t)}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                    timeRange === t
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <button
              onClick={loadAnalytics}
              className="p-1.5 rounded-lg bg-[#07090e] hover:bg-white/[0.05] border border-white/[0.08] text-slate-400 hover:text-white"
              title="Refresh Data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>

        </div>

        {/* Chart Container */}
        <div className="h-72 sm:h-80 w-full pt-2">
          <Line data={mainChartData} options={mainChartOptions} />
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-white/[0.04]">
          <span>Data resolution: Aggregated telemetry over {timeRange} window</span>
          <span className="font-mono text-emerald-400/80">Protected Profit Engine active</span>
        </div>
      </div>

      {/* Two Column Layout: Top Products & Financial Capital Composition */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Top 5 Products Ranked Table */}
        <div className="lg:col-span-7 p-5 rounded-xl bg-[#0c1017] border border-white/[0.08] shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>Top 5 Performing Products</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Ranked by settled gross revenue & volume</p>
            </div>
            <button
              onClick={() => onNavigateTab && onNavigateTab('inventory')}
              className="text-xs text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
            >
              <span>Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/[0.08] text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-2.5 px-3">#</th>
                  <th className="py-2.5 px-3">Product</th>
                  <th className="py-2.5 px-3 text-right">Revenue</th>
                  <th className="py-2.5 px-3 text-right">Sold</th>
                  <th className="py-2.5 px-3 text-right">Margin</th>
                  <th className="py-2.5 px-3 text-right">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {MOCK_TOP_PRODUCTS.map((prod) => (
                  <tr key={prod.rank} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-slate-500">
                      0{prod.rank}
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-semibold text-white truncate max-w-[200px]">
                        {prod.name}
                      </div>
                      <div className="text-[10px] text-slate-500">{prod.category}</div>
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-slate-200">
                      {formatINR(prod.revenue)}
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-slate-400">
                      {prod.unitsSold}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {prod.margin}%
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-emerald-400 font-semibold">
                      {prod.trend}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Capital Breakdown & Profit Composition Doughnut */}
        <div className="lg:col-span-5 p-5 rounded-xl bg-[#0c1017] border border-white/[0.08] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <PieChart className="w-4 h-4 text-emerald-400" />
                <span>Capital Distribution & Margins</span>
              </h3>
              <span className="text-[10px] font-mono text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Floor: 8%
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Realized split between wholesale procurement, conceded discounts, and net protected profit.
            </p>

            <div className="h-56 sm:h-64">
              <Doughnut data={doughnutData} options={doughnutOptions} />
            </div>
          </div>

          <div className="p-3 rounded-lg bg-[#07090e] border border-white/[0.06] text-xs text-slate-400 mt-4 flex items-center justify-between">
            <span>Discounts Conceded Under Policy:</span>
            <span className="font-mono text-amber-400 font-bold">{formatINR(metrics.totalDiscounts)}</span>
          </div>
        </div>

      </div>

      {/* "Needs Attention" Underperforming Products Section */}
      <div className="p-5 rounded-xl bg-[#0c1017] border border-white/[0.08] shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Items Needing Attention (Where Am I Losing Money?)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Catalog units with sub-optimal margins, elevated concession rates, or low turnover.
              </p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 self-start sm:self-auto">
            {MOCK_NEEDS_ATTENTION_PRODUCTS.length} Warnings Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {MOCK_NEEDS_ATTENTION_PRODUCTS.map(item => (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-[#07090e] border border-white/[0.08] hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">
                    {item.category}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    {item.status}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-white leading-snug">
                  {item.name}
                </h4>

                <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                  <div>
                    <span className="text-slate-500">Retail:</span>
                    <div className="font-mono text-white font-semibold">{formatINR(item.sellingPrice)}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Wholesale:</span>
                    <div className="font-mono text-slate-300">{formatINR(item.costPrice)}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Current Margin:</span>
                    <div className="font-mono text-amber-400 font-bold">{item.margin}%</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Stock Count:</span>
                    <div className="font-mono text-slate-200">{item.stock} units</div>
                  </div>
                </div>

                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  <strong className="text-slate-300">Diagnostic:</strong> {item.issue}
                </p>
              </div>

              <button
                onClick={() => onNavigateTab && onNavigateTab('inventory')}
                className="w-full py-2 px-3 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
              >
                <span>{item.actionText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
