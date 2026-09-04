import React, { useState } from 'react';
import {
  Sparkles,
  Store,
  CreditCard,
  CheckCircle2,
  X,
  Printer,
  ShoppingBag,
  ArrowRight,
  RefreshCw,
  QrCode,
  Smartphone,
  ShieldCheck,
  Package
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { formatINR } from '../utils/currency';
import { createCheckoutOrder, verifyPayment } from '../services/api';

export default function CheckoutModal({
  isOpen,
  onClose,
  dealData,
  onPaymentSuccess
}) {
  if (!isOpen || !dealData) return null;

  // Resolved product & merchant
  const resolvedProduct = dealData.resolvedProduct || (dealData.items && dealData.items[0]) || dealData.plan?.resolvedProduct || dealData.plan || {};
  const merchantName = dealData.merchantName || dealData.soldBy || dealData.plan?.soldBy || 'OmniTech Solutions';
  const merchantId = dealData.merchantId || dealData.plan?.merchantId || 'merchant-omni';
  const productName = resolvedProduct.name || dealData.plan?.title || 'Selected Marketplace Product';
  const productId = resolvedProduct.productId || resolvedProduct.id || 'prod_item';

  const [customerName, setCustomerName] = useState('Aarav Sharma');
  const [customerEmail, setCustomerEmail] = useState('aarav.sharma@example.com');
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'netbanking'
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [completedReceipt, setCompletedReceipt] = useState(null);

  const finalAmount = Number(dealData.finalPrice || dealData.finalAmount || dealData.totalPrice || 5000);
  const originalTotal = Number(dealData.originalTotal || dealData.subtotal || dealData.totalPrice || finalAmount);
  const discountAmount = Number(dealData.discountAmount || dealData.discount || 0);

  const handlePay = async (e) => {
    e?.preventDefault();
    setIsProcessing(true);

    try {
      // 1. Create order on backend
      const orderRes = await createCheckoutOrder({
        amount: finalAmount,
        currency: 'INR',
        receipt: `rcpt_${Date.now()}`,
        notes: {
          merchantId,
          merchantName,
          product: productName,
          discount: discountAmount
        }
      });

      // 2. Simulate Razorpay Gateway Processing
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // 3. Verify Payment on backend (Exact schema in Requirement 10)
      const verifyRes = await verifyPayment({
        razorpayOrderId: orderRes.order?.id || `order_test_${Date.now()}`,
        razorpayPaymentId: `pay_test_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        razorpaySignature: 'mock_signature_valid',
        orderDetails: {
          clientId: `client_${Date.now().toString().slice(-4)}`,
          customerName,
          customerEmail,
          merchantId,
          merchantName,
          items: [
            {
              productId,
              productName,
              quantity: 1,
              originalPrice: originalTotal,
              negotiatedPrice: finalAmount
            }
          ],
          subtotal: originalTotal,
          discount: discountAmount,
          discountAmount,
          finalAmount,
          finalPrice: finalAmount,
          originalTotal,
          wholesaleCost: dealData.wholesaleCost || Math.round(finalAmount * 0.72),
          profitMarginPercent: dealData.profitMarginPercent || 25,
          paymentMethod: paymentMethod.toUpperCase() + ' (Razorpay Gateway)',
          round: dealData.round || 1,
          customerBudget: dealData.customerBudget || finalAmount,
          negotiation: {
            enabled: Boolean(discountAmount > 0),
            rounds: dealData.round || 1,
            finalDiscount: discountAmount,
            finalPrice: finalAmount
          }
        }
      });

      if (verifyRes.success && verifyRes.order) {
        setCompletedReceipt(verifyRes.order);
        setPaymentCompleted(true);
        onPaymentSuccess?.(verifyRes.order);

        // Confetti celebration
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    } catch (err) {
      console.error('Payment error:', err);
      alert('Payment processing encountered an issue. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-[#0c1017] border border-white/[0.12] rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden text-white">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.05] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!paymentCompleted ? (
          <div>
            {/* Header */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Single-Merchant Checkout
                </h2>
                <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                  <span>Sold by</span>
                  <strong className="text-emerald-400 font-semibold">{merchantName}</strong>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>Verified Seller</span>
                </p>
              </div>
            </div>

            {/* Resolved Item Card */}
            <div className="p-4 rounded-2xl bg-[#07090e] border border-white/[0.08] mb-5 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-slate-400">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white leading-snug">
                      {productName}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Quantity: 1 • Seller: <span className="text-slate-300">{merchantName}</span>
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-mono font-bold text-white text-base">
                    {formatINR(finalAmount)}
                  </div>
                  {discountAmount > 0 && (
                    <div className="text-[11px] font-mono text-slate-500 line-through">
                      {formatINR(originalTotal)}
                    </div>
                  )}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="pt-3 border-t border-white/[0.06] text-xs space-y-1.5 text-slate-400">
                <div className="flex justify-between">
                  <span>Listed Subtotal</span>
                  <span className="font-mono text-slate-200">{formatINR(originalTotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Negotiated Savings</span>
                    <span className="font-mono">- {formatINR(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-white font-bold text-sm pt-1.5 border-t border-white/[0.06]">
                  <span>Total Amount to Pay</span>
                  <span className="font-mono text-emerald-400">{formatINR(finalAmount)}</span>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handlePay} className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#07090e] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#07090e] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-400">Payment Channel (Razorpay)</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'upi', label: 'UPI / QR', icon: QrCode },
                    { id: 'card', label: 'Cards', icon: CreditCard },
                    { id: 'netbanking', label: 'NetBanking', icon: Smartphone }
                  ].map((m) => {
                    const Icon = m.icon;
                    return (
                      <button
                        type="button"
                        key={m.id}
                        onClick={() => setPaymentMethod(m.id)}
                        className={`p-2.5 rounded-xl border text-xs font-medium flex items-center justify-center space-x-2 transition-all ${
                          paymentMethod === m.id
                            ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400 font-bold'
                            : 'bg-[#07090e] border-white/[0.08] text-slate-400 hover:text-white'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{m.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-extrabold transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-2 mt-2 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-black" />
                    <span>Processing with Razorpay...</span>
                  </>
                ) : (
                  <>
                    <span>Pay {formatINR(finalAmount)} to {merchantName}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-4 flex items-center justify-center space-x-2 text-[11px] text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Direct single-merchant settlement verified via Razorpay</span>
            </div>
          </div>
        ) : (
          /* Receipt View */
          <div className="text-center py-4 space-y-5 animate-in zoom-in-95">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
                Order Confirmed
              </span>
              <h2 className="text-xl font-bold text-white tracking-tight mt-1">
                Thank you, {customerName}!
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Your purchase with <strong className="text-white">{merchantName}</strong> has been confirmed.
              </p>
            </div>

            {/* Receipt Summary */}
            <div className="p-4 rounded-2xl bg-[#07090e] border border-white/[0.08] text-left text-xs space-y-2">
              <div className="flex justify-between pb-2 border-b border-white/[0.06]">
                <span className="text-slate-400">Order ID</span>
                <span className="font-mono font-bold text-white">{completedReceipt?.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Seller</span>
                <span className="font-medium text-white">{completedReceipt?.merchantName || merchantName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Product</span>
                <span className="font-medium text-slate-200 truncate max-w-[200px]">{productName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Amount Paid</span>
                <span className="font-mono font-bold text-emerald-400 text-sm">{formatINR(completedReceipt?.finalAmount || finalAmount)}</span>
              </div>
              <div className="flex justify-between text-[11px] text-slate-500 pt-1">
                <span>Payment Gateway</span>
                <span>Razorpay Verified</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2.5 px-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Receipt</span>
              </button>

              <button
                onClick={onClose}
                className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold transition-all shadow-lg shadow-emerald-500/20"
              >
                Back to Deals
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
