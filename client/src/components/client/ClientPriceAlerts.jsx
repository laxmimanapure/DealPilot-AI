import React, { useState } from 'react';
import { 
  Bell, 
  Plus, 
  Trash2, 
  Edit2, 
  CheckCircle2, 
  Clock, 
  TrendingDown, 
  AlertCircle,
  ExternalLink,
  Power
} from 'lucide-react';
import { formatINR } from '../../utils/currency';

export default function ClientPriceAlerts({
  alerts,
  onToggleAlertStatus,
  onDeleteAlert,
  onEditAlert,
  onCreateNewAlert,
  onViewProductById
}) {
  const [filter, setFilter] = useState('all'); // 'all' | 'active' | 'met'

  const filteredAlerts = alerts.filter((alert) => {
    if (filter === 'active') return alert.active;
    if (filter === 'met') return alert.status === 'Target Met';
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-amber-400 mb-1">
            <Bell className="w-3.5 h-3.5" />
            <span>Price Watch Center</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Price Alerts ({alerts.length})
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Automated price trackers checking major retail stores 24/7 for your target pricing.
          </p>
        </div>

        <button
          onClick={onCreateNewAlert}
          className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-white text-black text-xs font-bold hover:bg-neutral-200 transition-colors self-start sm:self-auto shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>New Price Alert</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 border-b border-neutral-800/80 pb-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            filter === 'all'
              ? 'bg-neutral-800 text-white font-bold'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          All Alerts ({alerts.length})
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            filter === 'active'
              ? 'bg-neutral-800 text-white font-bold'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          Watching ({alerts.filter(a => a.active).length})
        </button>
        <button
          onClick={() => setFilter('met')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            filter === 'met'
              ? 'bg-neutral-800 text-white font-bold'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          Target Met ({alerts.filter(a => a.status === 'Target Met').length})
        </button>
      </div>

      {/* Alerts List */}
      {filteredAlerts.length === 0 ? (
        <div className="py-20 text-center rounded-2xl bg-neutral-900/40 border border-neutral-800/80 space-y-3">
          <Bell className="w-10 h-10 text-neutral-600 mx-auto" />
          <h3 className="text-base font-semibold text-white">No alerts found</h3>
          <p className="text-xs text-neutral-400 max-w-sm mx-auto">
            Create an alert for any product you're considering and DealPilot will notify you as soon as the price falls.
          </p>
          <button
            onClick={onCreateNewAlert}
            className="px-4 py-2 rounded-xl bg-white text-black text-xs font-bold hover:bg-neutral-200 transition-colors"
          >
            Create Your First Alert
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredAlerts.map((alert) => {
            const isMet = alert.status === 'Target Met' || alert.currentPrice <= alert.targetPrice;
            const diff = alert.currentPrice - alert.targetPrice;

            return (
              <div
                key={alert.id}
                className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 hover:border-neutral-700/80 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                {/* Product & Store info */}
                <div className="flex items-center space-x-4 min-w-0">
                  <img
                    src={alert.imageUrl}
                    alt=""
                    className="w-14 h-14 object-cover rounded-xl border border-neutral-800 flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center space-x-2 text-[11px] text-neutral-400 mb-0.5">
                      <span>{alert.brand}</span>
                      <span>•</span>
                      <span>{alert.store}</span>
                      <span>•</span>
                      <span className="text-neutral-500">Created {alert.createdDate}</span>
                    </div>
                    <h3 
                      onClick={() => onViewProductById(alert.productId)}
                      className="text-sm font-bold text-white truncate cursor-pointer hover:underline"
                    >
                      {alert.productName}
                    </h3>
                    <div className="flex items-center space-x-3 text-xs mt-1">
                      <span className="text-neutral-400">
                        Current: <strong className="text-white font-mono">{formatINR(alert.currentPrice)}</strong>
                      </span>
                      <span>•</span>
                      <span className="text-emerald-400">
                        Target: <strong className="font-mono">{formatINR(alert.targetPrice)}</strong>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status and Action Buttons */}
                <div className="flex items-center space-x-3 self-end sm:self-center">
                  
                  {/* Status Badge */}
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 ${
                    isMet
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      : alert.active
                      ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                      : 'bg-neutral-800 text-neutral-400'
                  }`}>
                    {isMet ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Target Met!</span>
                      </>
                    ) : alert.active ? (
                      <>
                        <Clock className="w-3.5 h-3.5" />
                        <span>Watching (₹{diff} away)</span>
                      </>
                    ) : (
                      <span>Paused</span>
                    )}
                  </span>

                  {/* Toggle Active */}
                  <button
                    onClick={() => onToggleAlertStatus(alert.id)}
                    className={`p-2 rounded-xl border text-xs transition-colors ${
                      alert.active
                        ? 'bg-neutral-800 border-neutral-700 text-emerald-400 hover:bg-neutral-750'
                        : 'bg-neutral-900 border-neutral-800 text-neutral-500 hover:text-neutral-300'
                    }`}
                    title={alert.active ? 'Pause alert' : 'Activate alert'}
                  >
                    <Power className="w-3.5 h-3.5" />
                  </button>

                  {/* Edit Target */}
                  <button
                    onClick={() => onEditAlert(alert)}
                    className="p-2 rounded-xl bg-neutral-800 border border-neutral-700 text-neutral-400 hover:text-white transition-colors"
                    title="Edit target price"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => onDeleteAlert(alert.id)}
                    className="p-2 rounded-xl bg-neutral-800 border border-neutral-700 text-neutral-400 hover:text-red-400 transition-colors"
                    title="Delete alert"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
