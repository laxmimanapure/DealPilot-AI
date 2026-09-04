import React from 'react';
import { 
  ShoppingBag, 
  Store, 
  ArrowRight, 
  X, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export default function RoleSelectModal({ 
  isOpen, 
  onClose, 
  onSelectClient, 
  onSelectMerchant,
  isStandalone = false 
}) {
  if (!isOpen && !isStandalone) return null;

  const content = (
    <div className="max-w-3xl w-full mx-auto p-6 sm:p-10 rounded-3xl bg-[#0c0c0f] border border-white/[0.12] shadow-2xl shadow-black/90 relative text-zinc-100">
      
      {/* Close button if modal */}
      {!isStandalone && (
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors"
          aria-label="Close Role Selection"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {/* Header */}
      <div className="text-center max-w-lg mx-auto mb-10">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.1] text-xs font-semibold text-zinc-300 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-white" />
          <span>Tailored Workspaces</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          How will you use DealPilot?
        </h2>
        <p className="mt-2 text-sm text-zinc-400">
          Choose your role to access your dedicated workspace and tools.
        </p>
      </div>

      {/* Two Large Role Cards - Pure Monochrome Platinum */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        
        {/* CLIENT OPTION */}
        <div 
          onClick={onSelectClient}
          className="group cursor-pointer rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/30 p-6 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 shadow-lg"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-white/[0.06] border border-white/[0.12] flex items-center justify-center text-white mb-5 group-hover:scale-105 transition-transform">
              <ShoppingBag className="w-6 h-6 text-zinc-200" />
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1 font-mono">
              For Buyers & Teams
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Client
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed mb-4">
              Find, compare, and evaluate the best deals for you with AI assistance.
            </p>
            <div className="space-y-1.5 text-xs text-zinc-300">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                <span>3-Tier Plan Comparison</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                <span>AI Budget Optimization</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                <span>Safe Discount Negotiation</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-white/[0.06]">
            <button
              onClick={(e) => { e.stopPropagation(); onSelectClient(); }}
              className="w-full inline-flex items-center justify-center space-x-2 bg-white text-black hover:bg-zinc-200 font-semibold py-3 px-4 rounded-xl text-sm transition-all"
            >
              <span>Continue as Client</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* MERCHANT OPTION */}
        <div 
          onClick={onSelectMerchant}
          className="group cursor-pointer rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/30 p-6 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 shadow-lg"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-white/[0.06] border border-white/[0.12] flex items-center justify-center text-white mb-5 group-hover:scale-105 transition-transform">
              <Store className="w-6 h-6 text-zinc-200" />
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1 font-mono">
              For Sellers & Operators
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Merchant
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed mb-4">
              List, manage, and optimize your deals and offers with policy guardrails.
            </p>
            <div className="space-y-1.5 text-xs text-zinc-300">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                <span>Margin Floor Protection</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                <span>Sales & Recovery Analytics</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                <span>Mathematical Audit Logs</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-white/[0.06]">
            <button
              onClick={(e) => { e.stopPropagation(); onSelectMerchant(); }}
              className="w-full inline-flex items-center justify-center space-x-2 bg-white text-black hover:bg-zinc-200 font-semibold py-3 px-4 rounded-xl text-sm transition-all"
            >
              <span>Continue as Merchant</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );

  if (isStandalone) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col justify-center items-center px-4 py-12">
        <div className="mb-6">
          <button
            onClick={onClose}
            className="inline-flex items-center space-x-2 text-xs text-zinc-400 hover:text-white transition-colors"
          >
            <span>← Back to DealPilot Home</span>
          </button>
        </div>
        {content}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      {content}
    </div>
  );
}
