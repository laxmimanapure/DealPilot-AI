import React from 'react';
import {
  Printer,
  Download,
  ArrowRight,
  CheckCircle2,
  Package,
  ShieldCheck,
  Store,
  MapPin,
  Clock,
  Truck,
  Tag,
  Sparkles,
  FileText,
  User,
  Phone,
  Mail,
  Receipt
} from 'lucide-react';
import { formatINR } from '../utils/currency';

// Verified merchant metadata registry for rich invoice details
const MERCHANT_REGISTRY = {
  'merchant-omni': {
    name: 'OmniTech Solutions',
    store: 'OmniTech Flagship Store',
    location: 'Andheri East, Mumbai, Maharashtra - 400069',
    contact: 'support@omnitech.in • +91 22 4589 1200',
    gstin: '27AABCO1234F1Z8',
  },
  'merchant-apex': {
    name: 'ApexTech Official Store',
    store: 'ApexTech Electronics Hub',
    location: 'Koramangala, Bengaluru, Karnataka - 560034',
    contact: 'sales@apextech.in • +91 80 3982 7100',
    gstin: '29AADCA8912G1Z3',
  },
  'merchant-cyber': {
    name: 'CyberPeripherals India',
    store: 'CyberPeripherals Depot',
    location: 'Nehru Place, New Delhi - 110019',
    contact: 'orders@cyberperipherals.in • +91 11 2645 8899',
    gstin: '07AAACC4567H1Z5',
  },
  'merchant-pro': {
    name: 'ProGear Direct',
    store: 'ProGear Tech Park Hub',
    location: 'HITEC City, Hyderabad, Telangana - 500081',
    contact: 'support@progeardirect.com • +91 40 6721 3400',
    gstin: '36AABCP7890J1Z2',
  },
};

export default function PaymentReceipt({
  order,
  dealData = {},
  customerName = 'Aarav Sharma',
  customerEmail = 'aarav.sharma@example.com',
  customerPhone = '+91 98765 43210',
  customerAddress = '402, Green Glen Residency, Bellandur, Bengaluru, Karnataka - 560103',
  onClose,
}) {
  // Normalize order data
  const orderId = order?.orderId || `DP-ORD-${Date.now().toString().slice(-6)}`;
  const merchantId = order?.merchantId || dealData.merchantId || 'merchant-omni';
  const merchantInfo = MERCHANT_REGISTRY[merchantId] || {
    name: order?.merchantName || dealData.merchantName || 'OmniTech Solutions',
    store: `${order?.merchantName || dealData.merchantName || 'OmniTech'} Store`,
    location: 'Bengaluru, Karnataka - 560001',
    contact: 'support@dealpilot.ai • +91 1800-DEAL-PILOT',
    gstin: '29AABCO9999F1Z0',
  };

  const merchantName = merchantInfo.name;
  const storeName = merchantInfo.store;

  // Format order date & time
  const orderDateObj = order?.paidAt ? new Date(order.paidAt) : new Date();
  const formattedDate = orderDateObj.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  const formattedTime = orderDateObj.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  // Calculate pricing & taxes accurately
  const subtotal = Number(order?.subtotal || order?.originalTotal || dealData.originalTotal || 5000);
  const discountAmount = Number(order?.discountAmount || order?.discount || dealData.discountAmount || 0);
  const finalAmount = Number(order?.finalAmount || order?.amountPaid || dealData.finalPrice || (subtotal - discountAmount));
  
  // 18% GST calculation (included in retail total)
  const gstRate = 0.18;
  const taxableAmount = Math.round((finalAmount / (1 + gstRate)) * 100) / 100;
  const gstAmount = Math.round((finalAmount - taxableAmount) * 100) / 100;
  const cgst = Math.round((gstAmount / 2) * 100) / 100;
  const sgst = Math.round((gstAmount / 2) * 100) / 100;

  // Items list
  const rawItems = order?.items && order.items.length > 0
    ? order.items
    : dealData.items && dealData.items.length > 0
    ? dealData.items
    : [
        {
          name: dealData.resolvedProduct?.name || dealData.plan?.title || 'Selected Marketplace Item',
          productName: dealData.resolvedProduct?.name || dealData.plan?.title || 'Selected Marketplace Item',
          quantity: 1,
          originalPrice: subtotal,
          negotiatedPrice: finalAmount,
        },
      ];

  const razorpayPaymentId = order?.razorpayPaymentId || 'pay_test_verified';
  const razorpayOrderId = order?.razorpayOrderId || 'order_test_verified';
  const paymentReference = `DP-TXN-${orderId.replace(/[^0-9]/g, '') || '10928'}`;

  // Deal savings calculation
  const hasDiscount = discountAmount > 0;
  const discountPercent = subtotal > 0 ? Math.round((discountAmount / subtotal) * 100) : 0;

  // Handlers
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Set document title so browsers name the saved PDF cleanly
    const prevTitle = document.title;
    document.title = `DealPilot_Invoice_${orderId}`;
    window.print();
    setTimeout(() => {
      document.title = prevTitle;
    }, 1000);
  };

  return (
    <div className="text-left w-full max-w-2xl mx-auto space-y-6">
      {/* Top Action Bar (Screen Only) */}
      <div className="no-print flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/[0.08]">
        <div className="flex items-center space-x-2.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              Payment Successful 🎉
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-[10px] font-mono text-emerald-400 font-bold uppercase">
                PAID
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Transaction verified via Razorpay Test Mode
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrint}
            className="px-3.5 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] text-xs font-bold text-white flex items-center space-x-1.5 transition-colors shadow-sm"
          >
            <Printer className="w-3.5 h-3.5 text-emerald-400" />
            <span>Print Receipt</span>
          </button>

          <button
            onClick={handleDownload}
            className="px-3.5 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] text-xs font-bold text-white flex items-center space-x-1.5 transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PRINTABLE A4 INVOICE ROOT CONTAINER */}
      {/* ========================================================================= */}
      <div
        id="print-invoice-root"
        className="bg-[#07090e] border border-white/[0.08] rounded-3xl p-6 sm:p-8 space-y-6 text-slate-100 shadow-xl print:bg-white print:text-black print:border-0 print:p-0 print:m-0 print:shadow-none"
      >
        {/* 1. RECEIPT HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-white/[0.08] print:border-black/20 gap-4">
          <div>
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-black font-black text-lg">
                ✈️
              </div>
              <span className="text-2xl font-black tracking-tight text-white print:text-black">
                DEALPILOT
              </span>
            </div>
            <p className="text-xs text-slate-400 print:text-slate-600 mt-1 font-medium">
              AI-Powered Deal Discovery & Smart Shopping
            </p>
          </div>

          <div className="text-left sm:text-right">
            <span className="inline-block px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 print:border-emerald-600 print:text-emerald-700 font-mono text-xs font-extrabold uppercase tracking-wider mb-1">
              PAYMENT RECEIPT / INVOICE
            </span>
            <div className="font-mono text-sm font-bold text-white print:text-black">
              Invoice: {orderId}
            </div>
            <div className="text-xs text-slate-400 print:text-slate-600 mt-0.5">
              Date: {formattedDate}, {formattedTime}
            </div>
          </div>
        </div>

        {/* 2. CUSTOMER & MERCHANT INFORMATION (2-COLUMN GRID) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1 text-xs">
          {/* Customer Details */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] print:bg-slate-50 print:border-slate-200 space-y-2">
            <div className="flex items-center space-x-2 font-bold uppercase tracking-wider text-[11px] text-emerald-400 print:text-emerald-700">
              <User className="w-3.5 h-3.5" />
              <span>Customer Information</span>
            </div>
            <div className="space-y-1 text-slate-300 print:text-slate-800">
              <div className="font-semibold text-white print:text-black text-sm">
                {customerName || 'Not provided'}
              </div>
              <div className="flex items-center space-x-1.5 text-slate-400 print:text-slate-600">
                <Mail className="w-3 h-3 shrink-0" />
                <span>{customerEmail || 'Not provided'}</span>
              </div>
              <div className="flex items-center space-x-1.5 text-slate-400 print:text-slate-600">
                <Phone className="w-3 h-3 shrink-0" />
                <span>{customerPhone || 'Not provided'}</span>
              </div>
              <div className="flex items-start space-x-1.5 text-slate-400 print:text-slate-600 pt-1">
                <MapPin className="w-3 h-3 shrink-0 mt-0.5" />
                <span>{customerAddress || 'Not provided'}</span>
              </div>
            </div>
          </div>

          {/* Merchant Details */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] print:bg-slate-50 print:border-slate-200 space-y-2">
            <div className="flex items-center space-x-2 font-bold uppercase tracking-wider text-[11px] text-emerald-400 print:text-emerald-700">
              <Store className="w-3.5 h-3.5" />
              <span>Merchant & Seller Details</span>
            </div>
            <div className="space-y-1 text-slate-300 print:text-slate-800">
              <div className="font-semibold text-white print:text-black text-sm">
                {merchantName}
              </div>
              <div className="text-slate-400 print:text-slate-600">
                Store: <span className="text-slate-200 print:text-black font-medium">{storeName}</span>
              </div>
              <div className="text-slate-400 print:text-slate-600">
                GSTIN: <span className="font-mono text-slate-300 print:text-slate-800">{merchantInfo.gstin}</span>
              </div>
              <div className="text-slate-400 print:text-slate-600">
                Contact: <span>{merchantInfo.contact}</span>
              </div>
              <div className="text-slate-400 print:text-slate-600 truncate">
                Address: <span>{merchantInfo.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. ORDER DETAILS (ITEMIZED TABLE) */}
        <div className="space-y-2">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 print:text-slate-700 flex items-center space-x-1.5">
            <Package className="w-3.5 h-3.5 text-emerald-400" />
            <span>Purchased Items & Package Details</span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/[0.08] print:border-slate-300">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-white/[0.03] print:bg-slate-100 text-slate-400 print:text-slate-700 border-b border-white/[0.08] print:border-slate-300">
                  <th className="py-2.5 px-3 font-semibold">Item</th>
                  <th className="py-2.5 px-3 font-semibold">Merchant</th>
                  <th className="py-2.5 px-3 font-semibold text-center">Qty</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Price</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04] print:divide-slate-200">
                {rawItems.map((item, idx) => {
                  const itemPrice = Number(item.retailPrice || item.originalPrice || item.sellingPrice || subtotal);
                  const itemName = item.productName || item.name || 'Deal Item';
                  return (
                    <tr key={idx} className="hover:bg-white/[0.01] print:hover:bg-transparent">
                      <td className="py-3 px-3">
                        <div className="font-semibold text-white print:text-black">
                          {itemName}
                        </div>
                        <div className="text-[10px] text-slate-500 print:text-slate-600 font-mono">
                          ID: {item.productId || `PROD-${idx + 1}`}
                        </div>
                      </td>
                      <td className="py-3 px-3 text-slate-400 print:text-slate-700">
                        {merchantName}
                      </td>
                      <td className="py-3 px-3 text-center text-slate-300 print:text-black font-mono">
                        {item.quantity || 1}
                      </td>
                      <td className="py-3 px-3 text-right font-mono text-slate-300 print:text-black">
                        {formatINR(itemPrice)}
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-white print:text-black">
                        {formatINR(itemPrice * (item.quantity || 1))}
                      </td>
                    </tr>
                  );
                })}

                {/* Bundle Perks if applied */}
                {(order?.perks || dealData.perks || []).map((perk, pIdx) => (
                  <tr key={`perk-${pIdx}`} className="bg-emerald-500/[0.04] print:bg-emerald-50">
                    <td className="py-2.5 px-3" colSpan={3}>
                      <span className="inline-flex items-center gap-1.5 text-emerald-400 print:text-emerald-700 font-medium">
                        <Sparkles className="w-3 h-3 shrink-0" />
                        Bonus Perk: {perk.name || perk} (Unlocked by DealPilot)
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-slate-500 print:text-slate-400 line-through">
                      ₹399
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-400 print:text-emerald-700">
                      FREE
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. PRICE BREAKDOWN & MATHEMATICAL CALCULATION */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
          {/* Deal & Savings Highlights */}
          {hasDiscount ? (
            <div className="p-4 rounded-2xl bg-emerald-500/[0.05] border border-emerald-500/20 print:bg-emerald-50 print:border-emerald-200 text-xs space-y-2">
              <div className="flex items-center space-x-1.5 font-bold text-emerald-400 print:text-emerald-800 uppercase tracking-wider text-[11px]">
                <Tag className="w-3.5 h-3.5" />
                <span>DealPilot Savings Applied</span>
              </div>
              <div className="space-y-1 text-slate-300 print:text-slate-800">
                <div className="flex justify-between">
                  <span className="text-slate-400 print:text-slate-600">Deal Model:</span>
                  <span className="font-semibold text-white print:text-black">
                    {order?.planType || dealData.plan?.title || 'Safe AI Negotiation'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 print:text-slate-600">Original Listed Total:</span>
                  <span className="font-mono text-slate-400 print:text-slate-600 line-through">{formatINR(subtotal)}</span>
                </div>
                <div className="flex justify-between text-emerald-400 print:text-emerald-700 font-bold">
                  <span>Total Savings ({discountPercent}% Off):</span>
                  <span className="font-mono">- {formatINR(discountAmount)}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-emerald-500/20 text-white print:text-black font-semibold">
                  <span>Deal Price:</span>
                  <span className="font-mono text-emerald-400 print:text-emerald-700">{formatINR(finalAmount)}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] print:bg-slate-50 print:border-slate-200 text-xs space-y-2">
              <div className="font-bold text-slate-300 print:text-slate-700 uppercase tracking-wider text-[11px] flex items-center space-x-1.5">
                <Tag className="w-3.5 h-3.5 text-emerald-400" />
                <span>Order Value Breakdown</span>
              </div>
              <p className="text-slate-400 print:text-slate-600">
                Single-merchant direct order fulfilling complete package requirements with verified pricing.
              </p>
            </div>
          )}

          {/* Detailed Price Calculation Box */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] print:bg-slate-50 print:border-slate-200 text-xs space-y-2">
            <div className="flex justify-between text-slate-400 print:text-slate-600">
              <span>Subtotal:</span>
              <span className="font-mono text-slate-200 print:text-black font-semibold">{formatINR(subtotal)}</span>
            </div>

            {hasDiscount && (
              <div className="flex justify-between text-emerald-400 print:text-emerald-700 font-medium">
                <span>Negotiated Discount:</span>
                <span className="font-mono">- {formatINR(discountAmount)}</span>
              </div>
            )}

            <div className="flex justify-between text-slate-400 print:text-slate-600">
              <span>Standard Shipping:</span>
              <span className="font-mono text-emerald-400 print:text-emerald-700 font-semibold">FREE</span>
            </div>

            <div className="flex justify-between text-slate-400 print:text-slate-600">
              <span>Tax/GST (18% Included):</span>
              <span className="font-mono text-slate-300 print:text-slate-800">
                {formatINR(gstAmount)} <span className="text-[10px] text-slate-500">(CGST: {formatINR(cgst)}, SGST: {formatINR(sgst)})</span>
              </span>
            </div>

            <div className="flex justify-between text-slate-400 print:text-slate-600">
              <span>Other Platform Charges:</span>
              <span className="font-mono text-slate-300 print:text-slate-800">₹0.00</span>
            </div>

            <div className="pt-2 border-t border-white/[0.1] print:border-slate-300 flex justify-between items-baseline">
              <span className="font-extrabold text-sm text-white print:text-black uppercase">
                Total Amount Paid:
              </span>
              <span className="font-mono text-lg font-black text-emerald-400 print:text-emerald-800">
                {formatINR(finalAmount)}
              </span>
            </div>
          </div>
        </div>

        {/* 5. PAYMENT & TRANSACTION VERIFICATION BOX */}
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] print:bg-slate-50 print:border-slate-200 text-xs space-y-2.5">
          <div className="flex items-center justify-between pb-2 border-b border-white/[0.06] print:border-slate-200">
            <span className="font-bold uppercase tracking-wider text-[11px] text-emerald-400 print:text-emerald-700 flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>Razorpay Verified Payment Information</span>
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 print:text-emerald-700 font-bold font-mono text-[10px]">
              STATUS: PAID
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-slate-300 print:text-slate-800">
            <div>
              <span className="text-slate-400 print:text-slate-600">Payment Gateway:</span>{' '}
              <strong className="text-white print:text-black">Razorpay (Test Mode)</strong>
            </div>
            <div>
              <span className="text-slate-400 print:text-slate-600">Currency:</span>{' '}
              <strong className="text-white print:text-black">Indian Rupee (INR ₹)</strong>
            </div>
            <div>
              <span className="text-slate-400 print:text-slate-600">Razorpay Payment ID:</span>{' '}
              <span className="font-mono text-emerald-400 print:text-emerald-700 font-semibold truncate">
                {razorpayPaymentId}
              </span>
            </div>
            <div>
              <span className="text-slate-400 print:text-slate-600">Razorpay Order ID:</span>{' '}
              <span className="font-mono text-slate-300 print:text-slate-800 font-semibold truncate">
                {razorpayOrderId}
              </span>
            </div>
            <div>
              <span className="text-slate-400 print:text-slate-600">Transaction Date:</span>{' '}
              <span>{formattedDate}, {formattedTime}</span>
            </div>
            <div>
              <span className="text-slate-400 print:text-slate-600">Payment Reference:</span>{' '}
              <span className="font-mono">{paymentReference}</span>
            </div>
          </div>
        </div>

        {/* 6. DELIVERY & SHIPPING INFORMATION */}
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] print:bg-slate-50 print:border-slate-200 text-xs space-y-2">
          <div className="flex items-center space-x-1.5 font-bold uppercase tracking-wider text-[11px] text-slate-300 print:text-slate-700">
            <Truck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Delivery & Shipping Information</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-400 print:text-slate-600">
            <div>
              <span>Delivery Address:</span>{' '}
              <span className="text-slate-200 print:text-black font-medium">{customerAddress || 'Not provided'}</span>
            </div>
            <div>
              <span>Expected Delivery:</span>{' '}
              <span className="text-slate-200 print:text-black font-medium">2–4 Business Days (Insured Express)</span>
            </div>
            <div>
              <span>Shipping Carrier:</span>{' '}
              <span className="text-slate-200 print:text-black font-medium">DealPilot Verified Express Surface</span>
            </div>
            <div>
              <span>Delivery Tracking:</span>{' '}
              <span className="font-mono text-emerald-400 print:text-emerald-700 font-semibold">
                TRK-{orderId.replace(/[^0-9]/g, '') || '9281'}IN
              </span>
            </div>
          </div>
        </div>

        {/* 7. ORDER TIMELINE */}
        <div className="pt-2">
          <div className="flex items-center space-x-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 print:text-slate-700 mb-2.5">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Order Fulfillment Timeline</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
            <div className="p-2 rounded-xl bg-white/[0.02] print:bg-slate-50 border border-white/[0.06] print:border-slate-200">
              <div className="text-emerald-400 print:text-emerald-700 font-bold mb-0.5">✓ Order Placed</div>
              <div className="text-[10px] text-slate-400 print:text-slate-600 font-mono">{formattedTime}</div>
            </div>
            <div className="p-2 rounded-xl bg-white/[0.02] print:bg-slate-50 border border-white/[0.06] print:border-slate-200">
              <div className="text-emerald-400 print:text-emerald-700 font-bold mb-0.5">✓ Payment Initiated</div>
              <div className="text-[10px] text-slate-400 print:text-slate-600 font-mono">{formattedTime}</div>
            </div>
            <div className="p-2 rounded-xl bg-white/[0.02] print:bg-slate-50 border border-white/[0.06] print:border-slate-200">
              <div className="text-emerald-400 print:text-emerald-700 font-bold mb-0.5">✓ Payment Verified</div>
              <div className="text-[10px] text-slate-400 print:text-slate-600 font-mono">{formattedTime}</div>
            </div>
            <div className="p-2 rounded-xl bg-white/[0.02] print:bg-slate-50 border border-white/[0.06] print:border-slate-200">
              <div className="text-emerald-400 print:text-emerald-700 font-bold mb-0.5">✓ Order Confirmed</div>
              <div className="text-[10px] text-slate-400 print:text-slate-600 font-mono">Instant</div>
            </div>
          </div>
        </div>

        {/* 8. RECEIPT FOOTER */}
        <div className="pt-4 border-t border-white/[0.08] print:border-slate-300 text-center text-[11px] text-slate-400 print:text-slate-600 space-y-1">
          <p className="font-semibold text-slate-300 print:text-black">
            Thank you for shopping with DealPilot!
          </p>
          <p>
            Your payment has been successfully verified via Razorpay. For queries, contact{' '}
            <span className="text-emerald-400 print:text-emerald-700 font-medium">support@dealpilot.ai</span> or call{' '}
            <span className="font-mono text-slate-300 print:text-black">+91 1800-DEAL-PILOT</span>.
          </p>
          <p className="text-[10px] text-slate-500 print:text-slate-500 italic pt-1">
            "This receipt is generated electronically and does not require a physical signature."
          </p>
        </div>
      </div>

      {/* BOTTOM ACTION BUTTONS (Screen Only) */}
      <div className="no-print flex items-center justify-end space-x-3 pt-2">
        <button
          onClick={handlePrint}
          className="py-3 px-5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] text-xs font-bold text-white flex items-center space-x-2 transition-colors"
        >
          <Printer className="w-4 h-4 text-emerald-400" />
          <span>Print Receipt</span>
        </button>

        <button
          onClick={handleDownload}
          className="py-3 px-5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] text-xs font-bold text-white flex items-center space-x-2 transition-colors"
        >
          <Download className="w-4 h-4 text-emerald-400" />
          <span>Download PDF</span>
        </button>

        <button
          onClick={onClose}
          className="py-3 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-black transition-all shadow-lg shadow-emerald-500/20 flex items-center space-x-2"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
