import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Receipt, 
  ShieldCheck, 
  ExternalLink, 
  Clock, 
  Sparkles,
  Printer,
  FileText,
  RefreshCw,
  ShoppingBag,
  X
} from 'lucide-react';
import { formatINR } from '../../utils/currency';
import { getCompletedOrders } from '../../services/api';

export default function ClientHistory() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const res = await getCompletedOrders();
      if (res.success && res.orders) {
        setOrders(res.orders);
      }
    } catch (err) {
      console.error('Failed to load orders:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-neutral-400 mb-1">
            <Receipt className="w-3.5 h-3.5 text-white" />
            <span>Verified Order History</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Purchase History & Invoices
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Track confirmed purchases, verified AI negotiation discounts, and official payment receipts.
          </p>
        </div>

        <button
          onClick={fetchOrders}
          disabled={isLoading}
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-xs text-neutral-300 transition-colors self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Refresh Records</span>
        </button>
      </div>

      {/* Orders List */}
      {isLoading ? (
        <div className="p-12 text-center text-neutral-500 rounded-2xl bg-neutral-900/40 border border-neutral-800/80">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-neutral-400" />
          <p className="text-xs">Syncing verified payment records from ledger...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-neutral-900/40 border border-neutral-800/80 space-y-3">
          <ShoppingBag className="w-10 h-10 text-neutral-600 mx-auto" />
          <h3 className="text-sm font-semibold text-white">No Orders Yet</h3>
          <p className="text-xs text-neutral-400 max-w-sm mx-auto">
            When you complete a deal via AI negotiation or direct checkout, your official invoice and warranty record will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const items = order.items || [];
            const isNegotiated = (order.negotiatedDiscount || 0) > 0;
            const originalPrice = order.originalTotal || (order.amountPaid + (order.negotiatedDiscount || 0));

            return (
              <div
                key={order.orderId || order.razorpayOrderId}
                className="p-6 rounded-2xl bg-neutral-900/80 border border-neutral-800 hover:border-neutral-700/80 transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-800/80">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs font-bold text-white bg-neutral-800 px-2 py-0.5 rounded">
                        {order.orderId}
                      </span>
                      <span className="text-neutral-600">•</span>
                      <span className="text-xs text-neutral-400">
                        {order.timestamp ? new Date(order.timestamp).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Recent'}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white mt-1">
                      {order.planType || 'Custom Deal Package'}
                    </h3>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{order.status || 'Paid & Verified'}</span>
                    </span>
                    <button
                      onClick={() => setSelectedInvoice(order)}
                      className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Invoice</span>
                    </button>
                  </div>
                </div>

                {/* Items Purchased & Financials */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs font-semibold text-neutral-400 mb-2">Package Contents:</div>
                    <ul className="space-y-1 text-xs text-neutral-300">
                      {items.map((item, idx) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                          <span className="truncate">{typeof item === 'string' ? item : item.name}</span>
                        </li>
                      ))}
                    </ul>

                    {order.perks && order.perks.length > 0 && (
                      <div className="mt-3 inline-flex items-center space-x-1.5 text-xs text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-lg">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span>Unlocked Perk: {order.perks[0].name || order.perks[0].badge}</span>
                      </div>
                    )}
                  </div>

                  {/* Financial Breakdown */}
                  <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/80 space-y-1.5 text-xs">
                    <div className="flex justify-between text-neutral-400">
                      <span>List Total:</span>
                      <span className="font-mono line-through">{formatINR(originalPrice)}</span>
                    </div>
                    {isNegotiated && (
                      <div className="flex justify-between text-emerald-400 font-medium">
                        <span>AI Negotiation Savings:</span>
                        <span className="font-mono">- {formatINR(order.negotiatedDiscount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-white font-bold text-sm pt-2 border-t border-neutral-800/80">
                      <span>Final Paid:</span>
                      <span className="font-mono text-white">{formatINR(order.amountPaid)}</span>
                    </div>
                    <div className="text-[11px] text-neutral-500 pt-1 font-mono flex items-center justify-between">
                      <span>Ref: {order.razorpayPaymentId}</span>
                      <span>{order.paymentMethod || 'Razorpay Gateway'}</span>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Printable Invoice Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in">
          <div className="bg-neutral-900 border border-neutral-700 rounded-2xl max-w-lg w-full p-6 text-white space-y-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedInvoice(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Invoice Header */}
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400">DealPilot AI Invoice</span>
                <h3 className="text-xl font-bold text-white">{selectedInvoice.orderId}</h3>
              </div>
              <div className="text-right text-xs text-neutral-400">
                <div>Date: {new Date(selectedInvoice.timestamp || Date.now()).toLocaleDateString()}</div>
                <div className="text-emerald-400 font-medium">Status: Paid</div>
              </div>
            </div>

            {/* Customer & Payment Info */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-neutral-500 block">Billed To:</span>
                <span className="font-semibold text-white">{selectedInvoice.customerName || 'DealPilot Client'}</span>
                <span className="block text-neutral-400">{selectedInvoice.customerEmail || 'client@dealpilot.ai'}</span>
              </div>
              <div>
                <span className="text-neutral-500 block">Payment Method:</span>
                <span className="font-semibold text-white">{selectedInvoice.paymentMethod || 'Razorpay Gateway'}</span>
                <span className="block font-mono text-neutral-400 text-[11px] truncate">{selectedInvoice.razorpayPaymentId}</span>
              </div>
            </div>

            {/* Invoice Table */}
            <div className="border border-neutral-800 rounded-xl overflow-hidden text-xs">
              <div className="bg-neutral-950 p-2.5 font-semibold text-neutral-400 flex justify-between border-b border-neutral-800">
                <span>Description</span>
                <span>Amount</span>
              </div>
              <div className="divide-y divide-neutral-850 p-2 space-y-2">
                {(selectedInvoice.items || []).map((it, idx) => (
                  <div key={idx} className="flex justify-between text-neutral-300 pt-1">
                    <span className="truncate pr-2">{typeof it === 'string' ? it : it.name}</span>
                    <span className="font-mono text-neutral-400">
                      {typeof it === 'object' && it.retailPrice ? formatINR(it.retailPrice) : 'Included'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Total Math */}
            <div className="space-y-1.5 text-xs border-t border-neutral-800 pt-3">
              <div className="flex justify-between text-neutral-400">
                <span>List Subtotal:</span>
                <span className="font-mono">{formatINR(selectedInvoice.originalTotal || selectedInvoice.amountPaid)}</span>
              </div>
              {(selectedInvoice.negotiatedDiscount || 0) > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>AI Negotiation Discount:</span>
                  <span className="font-mono">- {formatINR(selectedInvoice.negotiatedDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between text-white font-bold text-base pt-2 border-t border-neutral-800">
                <span>Total Paid:</span>
                <span className="font-mono">{formatINR(selectedInvoice.amountPaid)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-2 pt-2">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-white text-black text-xs font-bold hover:bg-neutral-200 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Invoice</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
