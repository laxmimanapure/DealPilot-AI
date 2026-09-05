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
  Package,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { formatINR } from '../utils/currency';
import { createPaymentOrder, verifyPaymentResponse } from '../services/api';
import PaymentReceipt from './PaymentReceipt';

/**
 * Loads the official Razorpay Checkout SDK dynamically if not already loaded
 */
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (typeof window !== 'undefined' && window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function CheckoutModal({
  isOpen,
  onClose,
  dealData,
  onPaymentSuccess
}) {
  if (!isOpen || !dealData) return null;

  // Resolved product & merchant details
  const resolvedProduct =
    dealData.resolvedProduct ||
    (dealData.items && dealData.items[0]) ||
    dealData.plan?.resolvedProduct ||
    dealData.plan ||
    {};
  const merchantName =
    dealData.merchantName ||
    dealData.soldBy ||
    dealData.plan?.soldBy ||
    'OmniTech Solutions';
  const merchantId =
    dealData.merchantId || dealData.plan?.merchantId || 'merchant-omni';
  const productName =
    resolvedProduct.name || dealData.plan?.title || 'Selected Marketplace Product';
  const productId =
    resolvedProduct.productId || resolvedProduct.id || 'prod_item';

  const [customerName, setCustomerName] = useState('Aarav Sharma');
  const [customerEmail, setCustomerEmail] = useState('aarav.sharma@example.com');
  const [customerPhone, setCustomerPhone] = useState('+91 98765 43210');
  const [customerAddress, setCustomerAddress] = useState('402, Green Glen Residency, Bellandur, Bengaluru, Karnataka - 560103');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [completedReceipt, setCompletedReceipt] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const finalAmount = Number(
    dealData.finalPrice ||
      dealData.finalAmount ||
      dealData.totalPrice ||
      5000
  );
  const originalTotal = Number(
    dealData.originalTotal ||
      dealData.subtotal ||
      dealData.totalPrice ||
      finalAmount
  );
  const discountAmount = Number(
    dealData.discountAmount || dealData.discount || 0
  );

  const handlePayNow = async (e) => {
    e?.preventDefault();
    setErrorMessage('');
    setIsProcessing(true);

    try {
      // 1. Ensure Razorpay Checkout script is loaded
      await loadRazorpayScript();
      if (!window.Razorpay) {
        throw new Error('Razorpay Checkout SDK failed to load');
      }

      // 2. Call backend to create Razorpay test order (in paise)
      const orderRes = await createPaymentOrder({
        amount: finalAmount,
        currency: 'INR',
        receipt: `dp_${Date.now()}`,
        notes: {
          merchantId,
          merchantName,
          product: productName,
          discount: discountAmount,
        },
      });

      if (!orderRes.success || !orderRes.order) {
        throw new Error(orderRes.error || orderRes.message || 'Unable to create Razorpay order');
      }

      const razorpayOrder = orderRes.order;
      const keyId = orderRes.keyId;

      if (!keyId) {
        throw new Error('Razorpay Key ID not configured. Please set RAZORPAY_KEY_ID in backend .env');
      }

      // 3. Configure official Razorpay Checkout modal
      const options = {
        key: keyId,
        amount: razorpayOrder.amount, // in paise
        currency: razorpayOrder.currency || 'INR',
        name: 'DealPilot',
        description: `${productName} — ${merchantName}`,
        image:
          resolvedProduct.imageUrl ||
          'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=200&q=80',
        order_id: razorpayOrder.id,
        prefill: {
          name: customerName,
          email: customerEmail,
          contact: customerPhone.replace(/[^0-9]/g, '') || '9876543210',
        },
        notes: {
          merchantId,
          merchantName,
          platform: 'DealPilot AI Agentic Commerce',
          mode: 'TEST_MODE',
        },
        theme: {
          color: '#10b981', // Emerald theme matching DealPilot
        },
        // 4. Handle test payment response
        handler: async function (response) {
          try {
            setIsProcessing(true);

            // Send signature and order details to backend for HMAC SHA256 verification
            const verifyRes = await verifyPaymentResponse({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderDetails: {
                clientId:
                  dealData.clientId || `client_${Date.now().toString().slice(-4)}`,
                customerName,
                customerEmail,
                customerPhone,
                customerAddress,
                merchantId,
                merchantName,
                items: [
                  {
                    productId,
                    productName,
                    quantity: 1,
                    originalPrice: originalTotal,
                    negotiatedPrice: finalAmount,
                  },
                ],
                subtotal: originalTotal,
                discount: discountAmount,
                discountAmount,
                finalAmount,
                finalPrice: finalAmount,
                originalTotal,
                wholesaleCost:
                  dealData.wholesaleCost || Math.round(finalAmount * 0.72),
                profitMarginPercent: dealData.profitMarginPercent || 25,
                paymentMethod: 'razorpay',
                paymentStatus: 'paid',
                round: dealData.round || 1,
                customerBudget: dealData.customerBudget || finalAmount,
                negotiation: {
                  enabled: Boolean(discountAmount > 0),
                  rounds: dealData.round || 1,
                  finalDiscount: discountAmount,
                  finalPrice: finalAmount,
                },
              },
            });

            if (verifyRes.success && verifyRes.order) {
              setCompletedReceipt(verifyRes.order);
              setPaymentCompleted(true);
              onPaymentSuccess?.(verifyRes.order);

              // Celebration confetti
              confetti({
                particleCount: 120,
                spread: 80,
                origin: { y: 0.6 },
              });
            } else {
              setErrorMessage('Payment verification failed. Please try again.');
            }
          } catch (verifyErr) {
            console.error('Payment verification error:', verifyErr);
            setErrorMessage('Payment verification failed. Please try again.');
          } finally {
            setIsProcessing(false);
          }
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
            setErrorMessage('Payment cancelled. Your order has not been charged.');
          },
        },
      };

      // 5. Open the Razorpay Checkout popup
      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.on('payment.failed', function (resp) {
        setIsProcessing(false);
        setErrorMessage(
          resp.error?.description ||
            'Payment failed. Please try again with another test payment method.'
        );
      });
      razorpayInstance.open();
    } catch (err) {
      console.error('Payment checkout error:', err);
      setIsProcessing(false);
      setErrorMessage(
        err.message || 'Payment processing encountered an issue. Please try again.'
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in print:p-0 print:bg-white print:static print:inset-auto print:block">
      <div
        className={`bg-[#0c1017] border border-white/[0.12] rounded-3xl w-full p-5 sm:p-8 shadow-2xl relative overflow-y-auto max-h-[92vh] text-white transition-all print:border-0 print:p-0 print:m-0 print:max-w-full print:max-h-none print:shadow-none print:bg-white print:text-black ${
          paymentCompleted ? 'max-w-3xl' : 'max-w-xl'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="no-print absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.05] transition-colors z-10"
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
                  <strong className="text-emerald-400 font-semibold">
                    {merchantName}
                  </strong>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>Verified Seller</span>
                </p>
              </div>
            </div>

            {/* Error Message Banner */}
            {errorMessage && (
              <div className="mb-4 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2.5 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Product Item Card */}
            <div className="p-4 rounded-2xl bg-[#07090e] border border-white/[0.08] mb-5 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  {resolvedProduct.imageUrl ? (
                    <img
                      src={resolvedProduct.imageUrl}
                      alt={productName}
                      className="w-12 h-12 rounded-xl object-cover border border-white/[0.08]"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-slate-400">
                      <Package className="w-6 h-6" />
                    </div>
                  )}
                  <div>
                    <h4 className="text-sm font-bold text-white leading-snug">
                      {productName}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Quantity: 1 • Seller:{' '}
                      <span className="text-slate-300">{merchantName}</span>
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
                  <span>Product Price</span>
                  <span className="font-mono text-slate-200">
                    {formatINR(originalTotal)}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Negotiated Savings</span>
                    <span className="font-mono">
                      - {formatINR(discountAmount)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-white font-bold text-sm pt-1.5 border-t border-white/[0.06]">
                  <span>Final Amount to Pay</span>
                  <span className="font-mono text-emerald-400">
                    {formatINR(finalAmount)}
                  </span>
                </div>
              </div>
            </div>

            {/* Customer Details Form */}
            <form onSubmit={handlePayNow} className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#07090e] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#07090e] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="text-xs">
                <label className="block text-slate-400 font-semibold mb-1">
                  Contact Phone (for Razorpay Test Notifications)
                </label>
                <input
                  type="text"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#07090e] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="text-xs">
                <label className="block text-slate-400 font-semibold mb-1">
                  Shipping / Billing Address
                </label>
                <input
                  type="text"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  placeholder="Street, Area, City, State, PIN"
                  className="w-full px-3.5 py-2.5 bg-[#07090e] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Pay Now Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-extrabold transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-2 mt-3 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-black" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Pay {formatINR(finalAmount)} Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-4 flex items-center justify-center space-x-2 text-[11px] text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Razorpay TEST MODE Payment Gateway • Safe & Verified</span>
            </div>
          </div>
        ) : (
          /* Detailed Print-Optimized Payment Receipt / Invoice */
          <PaymentReceipt
            order={completedReceipt}
            dealData={dealData}
            customerName={customerName}
            customerEmail={customerEmail}
            customerPhone={customerPhone}
            customerAddress={customerAddress}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
}
