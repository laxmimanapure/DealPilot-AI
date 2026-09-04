import React, { useState } from 'react';
import { 
  Plus, 
  Tag, 
  Edit2, 
  Trash2, 
  Copy, 
  Power, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  X,
  Sparkles
} from 'lucide-react';
import { formatINR } from '../../utils/currency';
import { MOCK_MERCHANT_DEALS } from '../../data/mockMerchantData';

export default function MerchantDealsOffers() {
  const [deals, setDeals] = useState(MOCK_MERCHANT_DEALS);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingDeal, setEditingDeal] = useState(null);

  // New Deal Form State
  const [dealForm, setDealForm] = useState({
    name: '',
    products: 'Ergonomic Mechanical Keyboard + Wireless Mouse',
    discountPercent: 10,
    sellingPrice: 4999,
    costPrice: 3500,
    status: 'Active'
  });

  // Calculate live margin
  const liveMargin = dealForm.sellingPrice > 0 
    ? Math.round(((dealForm.sellingPrice - dealForm.costPrice) / dealForm.sellingPrice) * 1000) / 10
    : 0;

  const isMarginWarning = liveMargin < 25;
  const isMarginCritical = liveMargin < 8; // store policy floor

  const handleCreateDeal = (e) => {
    e.preventDefault();
    if (!dealForm.name.trim()) return;

    const newDeal = {
      id: `deal-${Date.now()}`,
      name: dealForm.name,
      products: dealForm.products.split('+').map(s => s.trim()),
      discountPercent: Number(dealForm.discountPercent),
      sellingPrice: Number(dealForm.sellingPrice),
      costPrice: Number(dealForm.costPrice),
      marginPercent: liveMargin,
      status: dealForm.status,
      views: 0,
      conversions: 0,
      revenue: 0
    };

    setDeals([newDeal, ...deals]);
    setIsCreateModalOpen(false);
    setDealForm({
      name: '',
      products: 'Ergonomic Mechanical Keyboard + Wireless Mouse',
      discountPercent: 10,
      sellingPrice: 4999,
      costPrice: 3500,
      status: 'Active'
    });
  };

  const handleToggleStatus = (id) => {
    setDeals(prev => prev.map(d => 
      d.id === id ? { ...d, status: d.status === 'Active' ? 'Paused' : 'Active' } : d
    ));
  };

  const handleDuplicate = (deal) => {
    const duplicated = {
      ...deal,
      id: `deal-${Date.now()}`,
      name: `${deal.name} (Copy)`,
      views: 0,
      conversions: 0,
      revenue: 0
    };
    setDeals([duplicated, ...deals]);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this promotional offer?')) {
      setDeals(prev => prev.filter(d => d.id !== id));
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400 mb-1">
            <Tag className="w-3.5 h-3.5" />
            <span>Promotion & Offer Engine</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Deals & Offers Management
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Create, monitor, and safeguard promotional bundles and automated deal discounts.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-white text-black text-xs font-bold hover:bg-neutral-200 transition-colors shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create Deal</span>
        </button>
      </div>

      {/* Deals Table */}
      <div className="rounded-2xl bg-[#0c1017] border border-white/[0.08] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#07090e] border-b border-white/[0.08] text-neutral-400 uppercase font-semibold text-[10px] tracking-wider">
              <tr>
                <th className="px-5 py-3">Deal Name</th>
                <th className="px-4 py-3">Included Products</th>
                <th className="px-4 py-3 text-right">Discount</th>
                <th className="px-4 py-3 text-right">Selling Price</th>
                <th className="px-4 py-3 text-right">Cost</th>
                <th className="px-4 py-3 text-right">Gross Margin</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-right">Performance</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06] text-neutral-300">
              {deals.map((deal) => {
                const isHealthy = deal.marginPercent >= 25;
                const isCritical = deal.marginPercent < 15;
                return (
                  <tr key={deal.id} className="hover:bg-neutral-850/40 transition-colors">
                    
                    {/* Deal Name */}
                    <td className="px-5 py-3.5 font-bold text-white">
                      {deal.name}
                    </td>

                    {/* Products */}
                    <td className="px-4 py-3.5 text-neutral-400 max-w-xs truncate">
                      {Array.isArray(deal.products) ? deal.products.join(', ') : deal.products}
                    </td>

                    {/* Discount */}
                    <td className="px-4 py-3.5 text-right font-mono text-neutral-300">
                      {deal.discountPercent}%
                    </td>

                    {/* Selling Price */}
                    <td className="px-4 py-3.5 text-right font-mono font-bold text-white">
                      {formatINR(deal.sellingPrice)}
                    </td>

                    {/* Cost */}
                    <td className="px-4 py-3.5 text-right font-mono text-neutral-400">
                      {formatINR(deal.costPrice)}
                    </td>

                    {/* Margin */}
                    <td className="px-4 py-3.5 text-right">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
                        isCritical
                          ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                          : isHealthy 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}>
                        {deal.marginPercent}%
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3.5 text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        deal.status === 'Active'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-neutral-800 text-neutral-400'
                      }`}>
                        {deal.status}
                      </span>
                    </td>

                    {/* Conversions & Revenue */}
                    <td className="px-4 py-3.5 text-right">
                      <div className="font-mono font-bold text-white">{formatINR(deal.revenue)}</div>
                      <div className="text-[10px] text-neutral-500 font-mono">{deal.conversions} orders</div>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3.5 text-right whitespace-nowrap space-x-1.5">
                      <button
                        onClick={() => handleToggleStatus(deal.id)}
                        className={`p-1.5 rounded-lg text-xs transition-colors ${
                          deal.status === 'Active'
                            ? 'text-neutral-400 hover:text-amber-400 hover:bg-neutral-800'
                            : 'text-neutral-400 hover:text-emerald-400 hover:bg-neutral-800'
                        }`}
                        title={deal.status === 'Active' ? 'Pause Deal' : 'Activate Deal'}
                      >
                        <Power className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleDuplicate(deal)}
                        className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                        title="Duplicate Deal"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleDelete(deal.id)}
                        className="p-1.5 rounded-lg text-neutral-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        title="Delete Deal"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Deal Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#0c1017] border border-white/[0.12] rounded-2xl max-w-md w-full p-6 text-white space-y-4 shadow-2xl relative">
            <button
              onClick={() => setIsCreateModalOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-lg text-neutral-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400">
              <Tag className="w-4 h-4" />
              <span>Promotion Engine</span>
            </div>
            <h3 className="text-lg font-bold text-white">Create New Offer Bundle</h3>

            <form onSubmit={handleCreateDeal} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-400 mb-1">Deal Title</label>
                <input
                  type="text"
                  required
                  value={dealForm.name}
                  onChange={(e) => setDealForm({ ...dealForm, name: e.target.value })}
                  placeholder="e.g. Ergonomic Creator Duo Bundle"
                  className="w-full px-3 py-2 rounded-xl bg-[#07090e] border border-white/[0.08] text-white focus:outline-none focus:border-white/[0.2]"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Included Products (Separated by '+')</label>
                <input
                  type="text"
                  required
                  value={dealForm.products}
                  onChange={(e) => setDealForm({ ...dealForm, products: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#07090e] border border-white/[0.08] text-white focus:outline-none focus:border-white/[0.2]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 mb-1">Selling Price (₹)</label>
                  <input
                    type="number"
                    min="100"
                    required
                    value={dealForm.sellingPrice}
                    onChange={(e) => setDealForm({ ...dealForm, sellingPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-[#07090e] border border-white/[0.08] text-white font-mono focus:outline-none focus:border-white/[0.2]"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1">Wholesale Cost (₹)</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={dealForm.costPrice}
                    onChange={(e) => setDealForm({ ...dealForm, costPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-[#07090e] border border-white/[0.08] text-white font-mono focus:outline-none focus:border-white/[0.2]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 mb-1">Discount %</label>
                  <input
                    type="number"
                    min="0"
                    max="50"
                    value={dealForm.discountPercent}
                    onChange={(e) => setDealForm({ ...dealForm, discountPercent: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-[#07090e] border border-white/[0.08] text-white font-mono focus:outline-none focus:border-white/[0.2]"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1">Initial Status</label>
                  <select
                    value={dealForm.status}
                    onChange={(e) => setDealForm({ ...dealForm, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#07090e] border border-white/[0.08] text-white focus:outline-none focus:border-white/[0.2]"
                  >
                    <option value="Active">Active</option>
                    <option value="Paused">Paused</option>
                  </select>
                </div>
              </div>

              {/* Real-time Estimated Margin Box */}
              <div className="p-3.5 rounded-xl bg-[#07090e] border border-white/[0.08] flex items-center justify-between text-xs">
                <span className="text-neutral-400">Estimated Gross Margin:</span>
                <div className="flex items-center space-x-2">
                  <span className={`font-mono font-bold text-sm ${
                    isMarginCritical ? 'text-red-400' : isMarginWarning ? 'text-amber-400' : 'text-emerald-400'
                  }`}>
                    {liveMargin}%
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    isMarginCritical 
                      ? 'bg-red-500/10 text-red-400 border border-red-500/20' 
                      : isMarginWarning 
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' 
                      : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  }`}>
                    {isMarginCritical ? 'Critical (Violates Floor)' : isMarginWarning ? 'Warning' : 'Healthy'}
                  </span>
                </div>
              </div>

              {isMarginCritical && (
                <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 text-xs flex items-center space-x-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                  <span>Notice: Margin is below store policy floor (8%). Backend guardrails will restrict negotiation.</span>
                </div>
              )}

              <div className="pt-2 flex justify-end space-x-2 border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-neutral-800 text-neutral-300 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-white text-black font-bold hover:bg-neutral-200 transition-colors"
                >
                  Create & Launch Deal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
