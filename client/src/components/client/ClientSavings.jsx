import React, { useState } from 'react';
import { 
  TrendingUp, 
  PiggyBank, 
  CheckCircle2, 
  Receipt, 
  ArrowUpRight, 
  ShoppingBag,
  ExternalLink,
  Printer
} from 'lucide-react';
import { formatINR } from '../../utils/currency';
import { MOCK_SAVINGS_DATA } from '../../data/mockClientProducts';

export default function ClientSavings({ onNavigateTab }) {
  const savings = MOCK_SAVINGS_DATA;
  const maxMonthly = Math.max(...savings.monthlyTrend.map(m => m.amount));

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400 mb-1">
            <PiggyBank className="w-3.5 h-3.5" />
            <span>Financial Benefit Ledger</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            My DealPilot Savings
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Total money kept in your pocket through price tracking, merchant discounts, and AI deal negotiations.
          </p>
        </div>

        <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center space-x-3 self-start sm:self-auto">
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider block">
              Cumulative Saved
            </span>
            <span className="text-xl font-black text-emerald-400 font-mono">
              {formatINR(savings.totalSaved)}
            </span>
          </div>
        </div>
      </div>

      {/* 4 Clean Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800">
          <span className="text-xs text-neutral-400">Total Saved</span>
          <div className="text-2xl font-bold text-white font-mono mt-1">
            {formatINR(savings.totalSaved)}
          </div>
          <span className="text-[11px] text-emerald-400 font-medium">Verified savings</span>
        </div>

        <div className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800">
          <span className="text-xs text-neutral-400">Deals Purchased</span>
          <div className="text-2xl font-bold text-white font-mono mt-1">
            {savings.dealsPurchasedCount}
          </div>
          <span className="text-[11px] text-neutral-400">Via DealPilot</span>
        </div>

        <div className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800">
          <span className="text-xs text-neutral-400">Average Discount</span>
          <div className="text-2xl font-bold text-white font-mono mt-1">
            {savings.averageDiscount}%
          </div>
          <span className="text-[11px] text-neutral-400">Off retail price</span>
        </div>

        <div className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800">
          <span className="text-xs text-neutral-400">Best Single Deal</span>
          <div className="text-2xl font-bold text-white font-mono mt-1">
            {savings.biggestSaving}
          </div>
          <span className="text-[11px] text-emerald-400 font-medium">Saved ₹8,000 on Sony</span>
        </div>

      </div>

      {/* Clean Savings Trend Chart */}
      <div className="p-6 rounded-3xl bg-neutral-900/90 border border-neutral-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Monthly Savings Trend</h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Consistent monthly growth from smart shopping alerts
            </p>
          </div>
          <span className="text-xs font-semibold text-emerald-400 flex items-center space-x-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+28% vs last month</span>
          </span>
        </div>

        {/* Clean SVG / Bar Visual */}
        <div className="pt-6 pb-2">
          <div className="flex items-end justify-between h-36 gap-3 sm:gap-6 px-2">
            {savings.monthlyTrend.map((item, idx) => {
              const heightPercent = Math.max(15, Math.round((item.amount / maxMonthly) * 100));
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-[11px] font-mono text-neutral-400 group-hover:text-emerald-400 transition-colors">
                    {formatINR(item.amount)}
                  </span>
                  <div 
                    className="w-full max-w-[48px] rounded-t-xl bg-neutral-800 group-hover:bg-emerald-500/80 transition-all duration-300 relative"
                    style={{ height: `${heightPercent}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10 rounded-t-xl" />
                  </div>
                  <span className="text-xs font-medium text-neutral-400">{item.month}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Verified Purchases & Savings Ledger */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">Recent Purchases & Savings</h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Official records of discounts locked through DealPilot
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('discover')}
            className="text-xs text-neutral-400 hover:text-white transition-colors"
          >
            Find more deals →
          </button>
        </div>

        <div className="rounded-2xl bg-neutral-900 border border-neutral-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-950/90 border-b border-neutral-800 text-neutral-400 font-semibold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-5 py-3">Transaction</th>
                  <th className="px-4 py-3">Store</th>
                  <th className="px-4 py-3">Retail Price</th>
                  <th className="px-4 py-3">Final Paid</th>
                  <th className="px-4 py-3">You Saved</th>
                  <th className="px-4 py-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60 text-neutral-300">
                {savings.transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-neutral-850/50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="font-bold text-white">{tx.product}</div>
                      <div className="text-[10px] text-neutral-500 font-mono">{tx.id} • {tx.date}</div>
                    </td>
                    <td className="px-4 py-3.5 text-neutral-300">
                      {tx.store}
                    </td>
                    <td className="px-4 py-3.5 font-mono line-through text-neutral-500">
                      {formatINR(tx.retailPrice)}
                    </td>
                    <td className="px-4 py-3.5 font-mono font-bold text-white">
                      {formatINR(tx.paidPrice)}
                    </td>
                    <td className="px-4 py-3.5 font-mono text-emerald-400 font-bold">
                      +{formatINR(tx.saved)} ({tx.discount})
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Verified</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
}
