import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Store,
  X,
  Send,
  ArrowRight,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Tag,
  Lock,
  Building2,
  ShoppingBag
} from 'lucide-react';
import { formatINR } from '../utils/currency';
import { submitNegotiationTurn } from '../services/api';

export default function NegotiationModal({
  isOpen,
  onClose,
  plan,
  customerBudget,
  onProceedToCheckout
}) {
  if (!isOpen || !plan) return null;

  // Extract resolved product & merchant from plan
  const resolvedProduct = plan.resolvedProduct || (plan.items && plan.items[0]) || plan;
  const merchantName = plan.soldBy || plan.merchantName || plan.resolvedMerchant?.merchantName || 'OmniTech Solutions';
  const merchantId = plan.merchantId || plan.resolvedMerchant?.merchantId || 'merchant-omni';
  const originalPrice = Number(plan.totalPrice || resolvedProduct.sellingPrice || resolvedProduct.retailPrice || 5000);

  const [sessionId, setSessionId] = useState(`deal_sess_${Date.now()}`);
  const [messages, setMessages] = useState([]);
  const [userOfferInput, setUserOfferInput] = useState(customerBudget || Math.max(originalPrice - 500, 1000));
  const [userMessageInput, setUserMessageInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentNegotiationState, setCurrentNegotiationState] = useState(null);
  const [round, setRound] = useState(1);
  const [maxRounds, setMaxRounds] = useState(3);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Initialize negotiation turn on open
  useEffect(() => {
    if (isOpen && plan) {
      const initialSessId = `deal_sess_${Date.now()}`;
      setSessionId(initialSessId);
      setRound(1);
      
      const initialOffer = customerBudget || Math.max(originalPrice - 500, 1000);
      setUserOfferInput(initialOffer);

      handleSendTurn(
        initialOffer,
        `I have a budget of ₹${initialOffer.toLocaleString('en-IN')}. Can you give me a better price on this?`,
        initialSessId
      );
    }
  }, [isOpen, plan]);

  const handleSendTurn = async (offerAmount, customMsg = '', sessId = sessionId) => {
    setIsLoading(true);

    if (customMsg) {
      setMessages(prev => [
        ...prev,
        {
          sender: 'user',
          text: customMsg,
          offer: offerAmount,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }

    try {
      const response = await submitNegotiationTurn({
        sessionId: sessId,
        customerOffer: Number(offerAmount),
        customerMessage: customMsg,
        selectedPlan: plan,
        merchantId,
        productId: resolvedProduct.productId || resolvedProduct.id
      });

      if (response.success && response.data) {
        const data = response.data;
        setCurrentNegotiationState(data);
        setRound(data.round);
        if (data.maxRounds) setMaxRounds(data.maxRounds);

        setMessages(prev => [
          ...prev,
          {
            sender: 'ai',
            text: data.aiMessage,
            data: data,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }
    } catch (err) {
      console.error('Negotiation error:', err);
      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: `I consulted with ${merchantName}. We can offer our best verified deal for this item right now.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
      setUserMessageInput('');
    }
  };

  const handleAcceptDeal = () => {
    const finalPrice = currentNegotiationState ? currentNegotiationState.offeredPrice : originalPrice;
    const discountAmount = currentNegotiationState ? currentNegotiationState.discountAmount : 0;

    onProceedToCheckout({
      plan,
      resolvedProduct,
      merchantId,
      merchantName,
      originalTotal: originalPrice,
      subtotal: originalPrice,
      discountAmount,
      discount: discountAmount,
      finalPrice,
      finalAmount: finalPrice,
      round,
      items: [
        {
          productId: resolvedProduct.productId || resolvedProduct.id,
          productName: resolvedProduct.name,
          quantity: 1,
          originalPrice,
          negotiatedPrice: finalPrice
        }
      ],
      negotiation: {
        enabled: true,
        rounds: round,
        finalDiscount: discountAmount,
        finalPrice
      }
    });
  };

  const latestOfferedPrice = currentNegotiationState?.offeredPrice || originalPrice;
  const latestDiscount = currentNegotiationState?.discountAmount || 0;
  const isFinalRound = currentNegotiationState?.isFinalRound || round >= maxRounds;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0c1017] border border-white/[0.12] rounded-3xl max-w-4xl w-full h-[90vh] flex flex-col shadow-2xl overflow-hidden relative text-white">
        
        {/* Top Header: Merchant & Round Information */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#07090e]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Negotiating with <span className="text-emerald-400">{merchantName}</span>
                </h3>
                <span className="px-2.5 py-0.5 text-[11px] font-mono font-bold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Round {round} of {maxRounds}
                </span>
                {isFinalRound && (
                  <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    <span>Final Offer</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-0.5 truncate max-w-md">
                Product: <span className="text-slate-200 font-medium">{resolvedProduct.name}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.05] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3-Column Price Strip (Requirement 14) */}
        <div className="grid grid-cols-3 divide-x divide-white/[0.06] bg-[#07090e] border-b border-white/[0.08] text-center py-3">
          <div>
            <div className="text-[11px] uppercase font-semibold text-slate-500">Current Listed Price</div>
            <div className="text-base sm:text-lg font-bold font-mono text-slate-300 line-through mt-0.5">
              {formatINR(originalPrice)}
            </div>
          </div>

          <div>
            <div className="text-[11px] uppercase font-semibold text-slate-500">Your Offer</div>
            <div className="text-base sm:text-lg font-bold font-mono text-white mt-0.5">
              {formatINR(userOfferInput)}
            </div>
          </div>

          <div className="bg-emerald-500/[0.03]">
            <div className="text-[11px] uppercase font-semibold text-emerald-400">AI Counter Offer</div>
            <div className="text-base sm:text-lg font-extrabold font-mono text-emerald-400 mt-0.5">
              {formatINR(latestOfferedPrice)}
            </div>
          </div>
        </div>

        {/* Conversation Thread */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-emerald-500 text-black font-medium rounded-tr-none'
                    : 'bg-[#07090e] text-slate-200 border border-white/[0.08] rounded-tl-none space-y-2'
                }`}
              >
                <div className="whitespace-pre-line">{msg.text}</div>
                <div
                  className={`text-[10px] font-mono mt-1 text-right ${
                    msg.sender === 'user' ? 'text-black/60' : 'text-slate-500'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-[#07090e] border border-white/[0.08] rounded-2xl rounded-tl-none p-4 flex items-center space-x-2 text-slate-400 text-xs">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                <span>Evaluating offer against {merchantName} policy...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Action & Input Footer */}
        <div className="p-4 border-t border-white/[0.08] bg-[#07090e] space-y-3">
          
          {/* Quick Counter Offer Buttons if not final round */}
          {!isFinalRound && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-semibold text-slate-400">Quick Adjust:</span>
              {[
                customerBudget || originalPrice - 300,
                originalPrice - 500,
                originalPrice - 700
              ]
                .filter(amt => amt > 500 && amt < originalPrice)
                .map((amt, i) => (
                  <button
                    key={i}
                    disabled={isLoading}
                    onClick={() => {
                      setUserOfferInput(amt);
                      handleSendTurn(amt, `How about ₹${amt.toLocaleString('en-IN')}?`);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-300 hover:text-white text-xs font-mono font-medium transition-colors"
                  >
                    Offer {formatINR(amt)}
                  </button>
                ))}
            </div>
          )}

          {/* User Input & Send */}
          {!isFinalRound ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!userOfferInput || isLoading) return;
                handleSendTurn(userOfferInput, userMessageInput || `I'd like to counter with ₹${Number(userOfferInput).toLocaleString('en-IN')}.`);
              }}
              className="flex items-center gap-2"
            >
              <div className="relative w-32 sm:w-40">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-mono">₹</span>
                <input
                  type="number"
                  value={userOfferInput}
                  onChange={(e) => setUserOfferInput(e.target.value)}
                  placeholder="Offer in ₹"
                  className="w-full pl-7 pr-3 py-2.5 text-xs bg-[#0c1017] border border-white/[0.08] rounded-xl text-white font-mono placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <input
                type="text"
                value={userMessageInput}
                onChange={(e) => setUserMessageInput(e.target.value)}
                placeholder="Optional message to seller..."
                className="flex-1 px-4 py-2.5 text-xs bg-[#0c1017] border border-white/[0.08] rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />

              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Counter</span>
              </button>

              <button
                type="button"
                onClick={handleAcceptDeal}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-1.5"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Accept & Checkout ({formatINR(latestOfferedPrice)})</span>
              </button>
            </form>
          ) : (
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
              <div className="text-xs text-slate-300">
                <strong className="text-white">Negotiation Concluded:</strong> Final verified price is locked at <span className="font-mono font-bold text-emerald-400">{formatINR(latestOfferedPrice)}</span> (saved {formatINR(latestDiscount)}).
              </div>
              <button
                onClick={handleAcceptDeal}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-1.5"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Lock In Deal & Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
