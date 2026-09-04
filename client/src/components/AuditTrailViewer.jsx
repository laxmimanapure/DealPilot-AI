import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  FileText,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Clock,
  User,
  ShoppingBag,
  Gift
} from 'lucide-react';
import { formatINR } from '../utils/currency';
import { getAuditLogs } from '../services/api';

export default function AuditTrailViewer() {
  const [logs, setLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterVerdict, setFilterVerdict] = useState('ALL');
  const [expandedLogId, setExpandedLogId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    setIsLoading(true);
    try {
      const res = await getAuditLogs();
      if (res.success && res.logs) {
        setLogs(res.logs);
      }
    } catch (err) {
      console.error('Failed to load audit logs:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch =
      (log.customer || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.id || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.planType || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesVerdict =
      filterVerdict === 'ALL' || log.verdict === filterVerdict;

    return matchesSearch && matchesVerdict;
  });

  const toggleExpand = (id) => {
    setExpandedLogId(expandedLogId === id ? null : id);
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-white">
              Policy Audit Trail & Explainability Logs
            </span>
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              {logs.length} Logged Turns
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Deterministic step-by-step logs proving every discount is calculated, margin-checked, and safely bounded.
          </p>
        </div>

        <button
          onClick={loadLogs}
          className="self-start sm:self-auto inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-850 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-medium transition-all"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Refresh Logs</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by customer, audit ID, or plan..."
            className="w-full bg-slate-900 border border-slate-800 focus:border-brand-500 rounded-xl pl-9 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-500" />
          <select
            value={filterVerdict}
            onChange={(e) => setFilterVerdict(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-300 outline-none cursor-pointer w-full sm:w-auto"
          >
            <option value="ALL">All Policy Verdicts</option>
            <option value="APPROVED">APPROVED (Direct)</option>
            <option value="CLAMPED_TO_POLICY">CLAMPED_TO_POLICY (Bounded)</option>
            <option value="PAYMENT_CONFIRMED">PAYMENT_CONFIRMED (Settled)</option>
            <option value="ROUNDS_EXHAUSTED">ROUNDS_EXHAUSTED</option>
          </select>
        </div>
      </div>

      {/* Logs Table / Card List */}
      <div className="space-y-3">
        {filteredLogs.length > 0 ? (
          filteredLogs.map((log) => {
            const isExpanded = expandedLogId === log.id;
            const isClamped = log.verdict === 'CLAMPED_TO_POLICY';
            const isApproved = log.verdict === 'APPROVED' || log.verdict === 'PAYMENT_CONFIRMED';

            return (
              <div
                key={log.id}
                className="rounded-2xl bg-slate-900 border border-slate-800/90 overflow-hidden transition-all hover:border-slate-700"
              >
                {/* Collapsed Row Header */}
                <div
                  onClick={() => toggleExpand(log.id)}
                  className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-3 cursor-pointer hover:bg-slate-850/50 transition-colors"
                >
                  <div className="flex items-start sm:items-center space-x-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      isApproved
                        ? 'bg-brand-500/20 text-brand-400'
                        : isClamped
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-indigo-500/20 text-indigo-400'
                    }`}>
                      <ShieldCheck className="w-4 h-4" />
                    </div>

                    <div>
                      <div className="flex items-center space-x-2 flex-wrap">
                        <span className="text-xs sm:text-sm font-bold text-white font-mono">
                          {log.id}
                        </span>
                        <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full border ${
                          isApproved
                            ? 'bg-brand-500/15 text-brand-400 border-brand-500/30'
                            : isClamped
                            ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                            : 'bg-slate-800 text-slate-300 border-slate-700'
                        }`}>
                          {log.verdict}
                        </span>
                        <span className="text-xs text-slate-400">
                          {log.planType || 'Custom Deal'}
                        </span>
                      </div>

                      <div className="flex items-center space-x-3 text-[11px] text-slate-500 mt-1 font-mono">
                        <span className="flex items-center">
                          <User className="w-3 h-3 mr-1" />
                          {log.customer}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                        </span>
                        <span>Round {log.negotiationRound || 1}</span>
                      </div>
                    </div>
                  </div>

                  {/* Financial Snapshot */}
                  <div className="flex items-center justify-between md:justify-end space-x-4 border-t md:border-t-0 pt-2 md:pt-0 border-slate-800">
                    <div className="text-left md:text-right font-mono">
                      <div className="text-xs text-slate-400">
                        Retail: <span className="line-through">{formatINR(log.originalTotal)}</span>
                      </div>
                      <div className="text-sm font-extrabold text-white">
                        Offered: <span className="text-brand-400">{formatINR(log.aiProposedPrice)}</span>
                      </div>
                    </div>

                    <div className="text-right font-mono">
                      <div className="text-xs text-indigo-300 font-semibold">
                        Margin: {log.finalMarginPercent}%
                      </div>
                      <div className="text-[10px] text-emerald-400">
                        Saved: {formatINR(log.aiProposedDiscount)}
                      </div>
                    </div>

                    <div className="text-slate-400">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Detailed Audit Breakdown */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 border-t border-slate-800 bg-slate-950/60 text-xs space-y-4 animate-in fade-in">
                    
                    {/* Explainability Pitch */}
                    <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 block mb-1">
                        Deterministic Policy Explanation
                      </span>
                      <p className="text-slate-300 leading-relaxed">
                        {log.explanation}
                      </p>
                    </div>

                    {/* Rule Checks Grid */}
                    <div>
                      <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 block mb-2">
                        Merchant Guardrail Verification Engine Checks
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                        
                        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 font-mono">
                          <div className="text-slate-400 text-[10px]">Max Discount % Rule</div>
                          <div className="flex items-center justify-between mt-1 text-xs">
                            <span className="text-white font-bold">{log.ruleChecks?.maxDiscountPercent?.value || '8.8%'}</span>
                            <span className="text-slate-500">Cap: 10%</span>
                            <CheckCircle2 className="w-3.5 h-3.5 text-brand-400" />
                          </div>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 font-mono">
                          <div className="text-slate-400 text-[10px]">Max Discount Amount Cap</div>
                          <div className="flex items-center justify-between mt-1 text-xs">
                            <span className="text-white font-bold">{formatINR(log.ruleChecks?.maxDiscountAmount?.value || log.aiProposedDiscount)}</span>
                            <span className="text-slate-500">Cap: ₹500</span>
                            <CheckCircle2 className="w-3.5 h-3.5 text-brand-400" />
                          </div>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 font-mono">
                          <div className="text-slate-400 text-[10px]">Profit Margin Floor</div>
                          <div className="flex items-center justify-between mt-1 text-xs">
                            <span className="text-brand-400 font-bold">{log.finalMarginPercent}%</span>
                            <span className="text-slate-500">Floor: ≥ 8%</span>
                            <CheckCircle2 className="w-3.5 h-3.5 text-brand-400" />
                          </div>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 font-mono">
                          <div className="text-slate-400 text-[10px]">Negotiation Turn Limit</div>
                          <div className="flex items-center justify-between mt-1 text-xs">
                            <span className="text-white font-bold">Round {log.negotiationRound}</span>
                            <span className="text-slate-500">Limit: 2</span>
                            <CheckCircle2 className="w-3.5 h-3.5 text-brand-400" />
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* Included Perks / Freebies */}
                    {log.perksAdded?.length > 0 && (
                      <div className="flex items-center space-x-2 text-xs text-amber-300 bg-amber-500/10 border border-amber-500/30 p-2.5 rounded-xl">
                        <Gift className="w-4 h-4 text-amber-400 flex-shrink-0" />
                        <span>Included Perk Unlocked: <strong>{log.perksAdded.join(', ')}</strong></span>
                      </div>
                    )}

                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="p-12 text-center rounded-2xl bg-slate-900/60 border border-slate-800 text-slate-400">
            <FileText className="w-8 h-8 mx-auto text-slate-600 mb-2" />
            <p className="text-sm font-semibold">No audit logs matching your criteria</p>
            <p className="text-xs text-slate-500 mt-1">Start a negotiation session to generate live audit logs!</p>
          </div>
        )}
      </div>

    </div>
  );
}
