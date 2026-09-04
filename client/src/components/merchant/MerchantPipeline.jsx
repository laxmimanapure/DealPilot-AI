import React, { useState } from 'react';
import { 
  GitCommit, 
  Plus, 
  Sparkles, 
  ShieldCheck, 
  TrendingUp, 
  X, 
  Check, 
  DollarSign, 
  Tag, 
  ArrowRight,
  Clock,
  Layers
} from 'lucide-react';
import { formatINR } from '../../utils/currency';

export default function MerchantPipeline() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newDealTitle, setNewDealTitle] = useState('');
  const [newDealPrice, setNewDealPrice] = useState(5000);
  const [newDealMargin, setNewDealMargin] = useState(25);
  const [selectedStage, setSelectedStage] = useState('New');

  const [pipelineDeals, setPipelineDeals] = useState([
    {
      id: 'OPP-101',
      title: 'The ₹5,000 Trio Setup',
      client: 'Alex Rivera',
      value: 5700,
      targetBudget: 5000,
      margin: 25.4,
      stage: 'Negotiation',
      confidence: 94,
      items: ['Firefly Keyboard', 'G102 Mouse', 'Rockerz 550']
    },
    {
      id: 'OPP-102',
      title: 'Executive Studio Setup',
      client: 'Priya Sharma',
      value: 12500,
      targetBudget: 12000,
      margin: 31.0,
      stage: 'Reviewing',
      confidence: 92,
      items: ['24-inch IPS Monitor', 'Webcam 1080p', 'Gas Spring Arm']
    },
    {
      id: 'OPP-103',
      title: 'Student Budget Essentials',
      client: 'Rahul Verma',
      value: 3600,
      targetBudget: 3500,
      margin: 22.8,
      stage: 'Qualified',
      confidence: 96,
      items: ['Quiet Keyboard', 'Ergo USB Mouse', 'Foam Mat']
    },
    {
      id: 'OPP-104',
      title: 'High-Fidelity Audio Station',
      client: 'Vikram Mehta',
      value: 6499,
      targetBudget: 6000,
      margin: 28.5,
      stage: 'Won',
      confidence: 98,
      items: ['Studio Headphones', 'USB-C DAC Dongle']
    },
    {
      id: 'OPP-105',
      title: 'Enterprise Wireless Desk Fleet',
      client: 'Kavita Iyer (Design Lead)',
      value: 28000,
      targetBudget: 25000,
      margin: 34.2,
      stage: 'New',
      confidence: 89,
      items: ['5x Bluetooth Keyboard', '5x Precision Mouse']
    }
  ]);

  const stages = ['New', 'Reviewing', 'Qualified', 'Negotiation', 'Won'];

  const handleCreateDeal = (e) => {
    e.preventDefault();
    if (!newDealTitle) return;

    const newDeal = {
      id: `OPP-${Math.floor(100 + Math.random() * 900)}`,
      title: newDealTitle,
      client: 'Direct Inquiry',
      value: Number(newDealPrice),
      targetBudget: Math.round(Number(newDealPrice) * 0.9),
      margin: Number(newDealMargin),
      stage: selectedStage,
      confidence: 90,
      items: ['Custom Selected Catalog Package']
    };

    setPipelineDeals([newDeal, ...pipelineDeals]);
    setNewDealTitle('');
    setNewDealPrice(5000);
    setIsCreateModalOpen(false);
  };

  const moveDealStage = (dealId, nextStage) => {
    setPipelineDeals((prev) =>
      prev.map((d) => (d.id === dealId ? { ...d, stage: nextStage } : d))
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header & Create Deal Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-indigo-400 mb-1">
            <GitCommit className="w-3.5 h-3.5" />
            <span>Opportunity Flow</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Deal Pipeline & Lifecycle
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Track opportunities across 5 stages from initial intake to agreement.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Deal Offer</span>
        </button>
      </div>

      {/* 5-Column Kanban Pipeline Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-4">
        {stages.map((stage) => {
          const stageDeals = pipelineDeals.filter((d) => d.stage === stage);
          const stageValue = stageDeals.reduce((sum, d) => sum + d.value, 0);

          return (
            <div
              key={stage}
              className="rounded-2xl bg-slate-900/70 border border-slate-800 p-4 flex flex-col justify-between min-h-[480px]"
            >
              <div>
                {/* Stage Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                  <div className="flex items-center space-x-2">
                    <span className={`w-2 h-2 rounded-full ${
                      stage === 'Won' ? 'bg-emerald-400' :
                      stage === 'Negotiation' ? 'bg-amber-400' : 'bg-indigo-400'
                    }`} />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">{stage}</span>
                  </div>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-950 text-slate-400">
                    {stageDeals.length}
                  </span>
                </div>

                <div className="text-[11px] text-slate-400 mb-3 font-mono">
                  Stage Value: <strong className="text-slate-200">{formatINR(stageValue)}</strong>
                </div>

                {/* Cards in this Stage */}
                <div className="space-y-3">
                  {stageDeals.map((deal) => (
                    <div
                      key={deal.id}
                      className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/90 hover:border-slate-700 transition-all space-y-2 text-xs group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] text-slate-500 font-semibold">{deal.id}</span>
                        <span className="text-[10px] text-brand-400 font-mono font-bold">{deal.confidence}% match</span>
                      </div>

                      <div className="font-semibold text-slate-200 group-hover:text-indigo-300 transition-colors leading-tight">
                        {deal.title}
                      </div>

                      <div className="text-[11px] text-slate-400 truncate">
                        Buyer: {deal.client}
                      </div>

                      <div className="flex items-baseline justify-between pt-1 border-t border-slate-800/60 text-xs">
                        <span className="font-mono font-bold text-white">{formatINR(deal.value)}</span>
                        <span className="text-emerald-400 font-mono text-[11px]">{deal.margin}% margin</span>
                      </div>

                      {/* Stage Advancement Quick Controls */}
                      <div className="pt-2 flex items-center justify-between text-[10px] text-slate-500">
                        <span>Move:</span>
                        <div className="flex space-x-1">
                          {stages.map((s) => (
                            s !== stage && (
                              <button
                                key={s}
                                onClick={() => moveDealStage(deal.id, s)}
                                className="px-1.5 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800"
                                title={`Move to ${s}`}
                              >
                                {s.charAt(0)}
                              </button>
                            )
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}

                  {stageDeals.length === 0 && (
                    <div className="p-6 text-center text-xs text-slate-600 border border-dashed border-slate-800 rounded-xl">
                      No deals currently in {stage}
                    </div>
                  )}
                </div>
              </div>

              {/* Column Footer */}
              <div className="pt-3 border-t border-slate-800/80 text-[10px] text-slate-500 text-center font-mono">
                Auto-policed by rules
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Deal Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">Create New Merchant Deal Offer</h3>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateDeal} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Deal Title / Package Name</label>
                <input
                  type="text"
                  required
                  value={newDealTitle}
                  onChange={(e) => setNewDealTitle(e.target.value)}
                  placeholder="e.g. Ergonomic Studio Desk Package"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">List Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={newDealPrice}
                    onChange={(e) => setNewDealPrice(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Wholesale Margin %</label>
                  <input
                    type="number"
                    required
                    min="8"
                    max="60"
                    value={newDealMargin}
                    onChange={(e) => setNewDealMargin(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Initial Stage</label>
                <select
                  value={selectedStage}
                  onChange={(e) => setSelectedStage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                >
                  {stages.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold"
                >
                  Publish to Pipeline
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
