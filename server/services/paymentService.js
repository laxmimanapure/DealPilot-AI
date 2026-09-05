import { recordAuditLog } from './negotiationEngine.js';
import { createRazorpayOrder, verifyRazorpaySignature, getRazorpayKeyId } from './razorpay.js';
import { OrderService } from '../models/Order.js';

/**
 * Returns all completed orders (from MongoDB Atlas or cached store)
 */
export async function getCompletedOrders() {
  return await OrderService.getAll();
}

/**
 * Create a new Razorpay Test Order
 */
export async function createOrder({ amount, currency = 'INR', receipt, notes = {} }) {
  return await createRazorpayOrder({ amount, currency, receipt, notes });
}

/**
 * Verify Razorpay payment and generate finalized order receipt stored in MongoDB
 */
export async function verifyAndCompletePayment({
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature,
  orderDetails = {},
}) {
  // 1. Authoritative Backend Signature Verification using HMAC SHA256
  const isSignatureValid = verifyRazorpaySignature({
    razorpay_order_id: razorpayOrderId,
    razorpay_payment_id: razorpayPaymentId,
    razorpay_signature: razorpaySignature,
  });

  if (!isSignatureValid) {
    throw new Error('Invalid Razorpay payment signature. Payment verification failed.');
  }

  // 2. Compute order financials and pricing safely
  const subtotal = Number(orderDetails.originalTotal || orderDetails.subtotal) || 0;
  const discount = Number(orderDetails.discountAmount || orderDetails.discount) || 0;
  const finalAmount =
    Number(orderDetails.finalPrice || orderDetails.finalAmount || orderDetails.amountPaid) ||
    subtotal - discount;
  const wholesaleCost = Number(orderDetails.wholesaleCost) || Math.round(subtotal * 0.72);
  const profitMarginPercent =
    finalAmount > 0
      ? Math.round(((finalAmount - wholesaleCost) / finalAmount) * 1000) / 10
      : 25.0;

  const rawItems = orderDetails.items || [];
  const items = rawItems.map((item) => ({
    productId: item.productId || item.id || 'prod_item',
    productName: item.productName || item.name || 'Deal Item',
    name: item.productName || item.name || 'Deal Item',
    quantity: item.quantity || 1,
    originalPrice: Number(item.originalPrice || item.retailPrice || item.sellingPrice || subtotal),
    retailPrice: Number(item.originalPrice || item.retailPrice || item.sellingPrice || subtotal),
    negotiatedPrice: Number(item.negotiatedPrice || finalAmount),
  }));

  const orderId = `DP-ORD-${Date.now().toString().slice(-6)}`;
  const paidAt = new Date();

  const newOrderData = {
    orderId,
    clientId: orderDetails.clientId || `client_${Date.now().toString().slice(-4)}`,
    merchantId: orderDetails.merchantId || 'merchant-omni',
    merchantName: orderDetails.merchantName || 'OmniTech Solutions',
    customerName: orderDetails.customerName || 'Customer',
    customerEmail: orderDetails.customerEmail || 'buyer@example.com',
    customerPhone: orderDetails.customerPhone || '',
    items,
    subtotal,
    originalTotal: subtotal,
    discount,
    discountAmount: discount,
    finalAmount,
    amountPaid: finalAmount,
    wholesaleCost,
    merchantProfit: finalAmount - wholesaleCost,
    profitMarginPercent,
    paymentStatus: 'paid',
    paymentMethod: 'razorpay',
    razorpayOrderId,
    razorpayPaymentId: razorpayPaymentId || `pay_rzp_${Date.now()}`,
    razorpaySignature: razorpaySignature || '',
    paidAt,
    orderStatus: 'CONFIRMED',
    status: 'PAID',
    planType: orderDetails.planType || orderDetails.merchantName || 'Single-Merchant Deal',
    perks: orderDetails.perks || [],
    negotiation: {
      enabled: Boolean(orderDetails.negotiation?.enabled || discount > 0),
      rounds: Number(orderDetails.negotiation?.rounds || orderDetails.round || 1),
      finalDiscount: discount,
      finalPrice: finalAmount,
    },
    timestamp: paidAt.toISOString(),
  };

  // 3. Persist to MongoDB Atlas via OrderService
  const savedOrder = await OrderService.create(newOrderData);

  // 4. Record completed purchase in explainable audit trail
  recordAuditLog({
    id: `audit-payment-${Date.now()}`,
    timestamp: new Date().toISOString(),
    customer: savedOrder.customerName,
    merchantId: savedOrder.merchantId,
    merchantName: savedOrder.merchantName,
    requestedItems: savedOrder.items.map((i) => i.productName || i.name),
    planType: savedOrder.planType,
    originalTotal: savedOrder.originalTotal,
    customerBudget: orderDetails.customerBudget,
    customerOffer: savedOrder.amountPaid,
    negotiationRound: orderDetails.round || 1,
    aiProposedDiscount: savedOrder.discountAmount,
    aiProposedPrice: savedOrder.amountPaid,
    wholesaleCost: savedOrder.wholesaleCost,
    finalMarginPercent: savedOrder.profitMarginPercent,
    verdict: 'PAYMENT_CONFIRMED',
    explanation: `Transaction ${savedOrder.orderId} successfully processed via Razorpay. Sold by ${savedOrder.merchantName}. DealPilot AI secured merchant profit of ₹${savedOrder.merchantProfit} (${savedOrder.profitMarginPercent}% margin) while saving customer ₹${savedOrder.discountAmount}.`,
    outcome: 'CHECKOUT_SUCCESSFUL',
    perksAdded: (savedOrder.perks || []).map((p) => p.name || p),
  });

  return savedOrder;
}

export default {
  getCompletedOrders,
  createOrder,
  verifyAndCompletePayment,
};
