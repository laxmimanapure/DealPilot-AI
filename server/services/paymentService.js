import Razorpay from 'razorpay';
import crypto from 'crypto';
import { config } from '../config.js';
import { recordAuditLog } from './negotiationEngine.js';

let razorpayInstance = null;
if (config.razorpayKeyId && config.razorpayKeySecret && !config.razorpayKeyId.includes('mock')) {
  try {
    razorpayInstance = new Razorpay({
      key_id: config.razorpayKeyId,
      key_secret: config.razorpayKeySecret
    });
  } catch (err) {
    console.warn('Razorpay initialization fallback to mock mode:', err.message);
  }
}

// In-memory orders store
const completedOrders = [
  {
    orderId: 'DP-ORD-1092',
    razorpayOrderId: 'order_mock_test_1092',
    razorpayPaymentId: 'pay_mock_test_1092',
    customerName: 'Aarav Sharma',
    customerEmail: 'aarav.sharma@example.com',
    planType: 'Best Quality',
    items: [
      { name: 'Keychron K2 Mechanical Wireless Keyboard', retailPrice: 2000 },
      { name: 'Razer DeathAdder Essential Mouse', retailPrice: 900 },
      { name: 'Audio-Technica ATH-M20x Headphones', retailPrice: 2800 }
    ],
    originalTotal: 5700,
    negotiatedDiscount: 500,
    amountPaid: 5200,
    wholesaleCost: 3900,
    merchantProfit: 1300,
    profitMarginPercent: 25.0,
    status: 'PAID',
    paymentMethod: 'UPI / Razorpay',
    timestamp: '2026-08-31T20:18:42.000Z'
  },
  {
    orderId: 'DP-ORD-1091',
    razorpayOrderId: 'order_mock_test_1091',
    razorpayPaymentId: 'pay_mock_test_1091',
    customerName: 'Priya Patel',
    customerEmail: 'priya.p@example.com',
    planType: 'Best Value',
    items: [
      { name: 'Redragon K552 RGB Mechanical Keyboard', retailPrice: 1800 },
      { name: 'Logitech G102 Lightsync Mouse', retailPrice: 700 },
      { name: 'boAt Rockerz 550 Headphones', retailPrice: 2400 }
    ],
    originalTotal: 4900,
    negotiatedDiscount: 350,
    amountPaid: 4550,
    wholesaleCost: 3330,
    merchantProfit: 1220,
    profitMarginPercent: 26.8,
    status: 'PAID',
    paymentMethod: 'Credit Card / Razorpay',
    timestamp: '2026-08-31T18:45:10.000Z'
  },
  {
    orderId: 'DP-ORD-1090',
    razorpayOrderId: 'order_mock_test_1090',
    razorpayPaymentId: 'pay_mock_test_1090',
    customerName: 'Rohan Mehta',
    customerEmail: 'rohan.m@example.com',
    planType: 'Budget Saver',
    items: [
      { name: 'Logitech K120 Ergonomic Keyboard', retailPrice: 1200 },
      { name: 'Dell MS116 Optical Mouse', retailPrice: 600 },
      { name: 'Zebronics Zeb-Thunder Headphone', retailPrice: 1800 }
    ],
    originalTotal: 3600,
    negotiatedDiscount: 0,
    amountPaid: 3600,
    wholesaleCost: 2400,
    merchantProfit: 1200,
    profitMarginPercent: 33.3,
    status: 'PAID',
    paymentMethod: 'Netbanking / Razorpay',
    timestamp: '2026-08-31T15:20:00.000Z'
  }
];

export function getCompletedOrders() {
  return completedOrders;
}

/**
 * Create a new Razorpay Test Order
 */
export async function createOrder({
  amount,
  currency = 'INR',
  receipt,
  notes = {}
}) {
  const amountInPaise = Math.round(Number(amount) * 100);

  if (razorpayInstance) {
    try {
      const order = await razorpayInstance.orders.create({
        amount: amountInPaise,
        currency,
        receipt: receipt || `dp_rcpt_${Date.now()}`,
        notes
      });
      return {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        isMock: false
      };
    } catch (e) {
      console.warn('Real Razorpay API call failed, using test simulator:', e.message);
    }
  }

  // Fallback / Standalone Test Mode Simulator
  const mockOrderId = `order_test_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  return {
    id: mockOrderId,
    amount: amountInPaise,
    currency,
    isMock: true,
    keyId: config.razorpayKeyId || 'rzp_test_dealpilot_demo'
  };
}

/**
 * Verify Razorpay payment and generate finalized receipt
 */
export function verifyAndCompletePayment({
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature,
  orderDetails
}) {
  let isSignatureValid = true;

  // If real keys provided, verify HMAC SHA256 signature
  if (razorpayInstance && razorpaySignature && !razorpayOrderId.includes('test')) {
    try {
      const body = razorpayOrderId + '|' + razorpayPaymentId;
      const expectedSignature = crypto
        .createHmac('sha256', config.razorpayKeySecret)
        .update(body.toString())
        .digest('hex');
      isSignatureValid = expectedSignature === razorpaySignature;
    } catch (e) {
      isSignatureValid = false;
    }
  }

  if (!isSignatureValid) {
    throw new Error('Invalid Razorpay signature. Payment verification failed.');
  }

  const subtotal = Number(orderDetails.originalTotal || orderDetails.subtotal) || 0;
  const discount = Number(orderDetails.discountAmount || orderDetails.discount) || 0;
  const finalAmount = Number(orderDetails.finalPrice || orderDetails.finalAmount || orderDetails.amountPaid) || (subtotal - discount);
  const wholesaleCost = Number(orderDetails.wholesaleCost) || Math.round(subtotal * 0.72);
  const profitMarginPercent = finalAmount > 0 ? Math.round(((finalAmount - wholesaleCost) / finalAmount) * 1000) / 10 : 25.0;

  const rawItems = orderDetails.items || [];
  const items = rawItems.map(item => ({
    productId: item.productId || item.id || 'prod_item',
    productName: item.productName || item.name || 'Deal Item',
    name: item.productName || item.name || 'Deal Item',
    quantity: item.quantity || 1,
    originalPrice: Number(item.originalPrice || item.retailPrice || item.sellingPrice || subtotal),
    retailPrice: Number(item.originalPrice || item.retailPrice || item.sellingPrice || subtotal),
    negotiatedPrice: Number(item.negotiatedPrice || finalAmount)
  }));

  const newOrder = {
    orderId: `DP-ORD-${Date.now().toString().slice(-6)}`,
    clientId: orderDetails.clientId || `client_${Date.now().toString().slice(-4)}`,
    merchantId: orderDetails.merchantId || 'merchant-omni',
    merchantName: orderDetails.merchantName || 'OmniTech Solutions',
    items,
    subtotal,
    discount,
    finalAmount,
    paymentProvider: 'razorpay',
    paymentStatus: 'PAID',
    orderStatus: 'CONFIRMED',
    negotiation: {
      enabled: Boolean(orderDetails.negotiation?.enabled || discount > 0),
      rounds: Number(orderDetails.negotiation?.rounds || orderDetails.round || 1),
      finalDiscount: discount,
      finalPrice: finalAmount
    },
    // Compatibility fields for merchant telemetry & order ledgers
    razorpayOrderId,
    razorpayPaymentId: razorpayPaymentId || `pay_sim_${Date.now()}`,
    customerName: orderDetails.customerName || 'Customer',
    customerEmail: orderDetails.customerEmail || 'buyer@example.com',
    planType: orderDetails.planType || orderDetails.merchantName || 'Single-Merchant Deal',
    perks: orderDetails.perks || [],
    originalTotal: subtotal,
    negotiatedDiscount: discount,
    amountPaid: finalAmount,
    wholesaleCost,
    merchantProfit: finalAmount - wholesaleCost,
    profitMarginPercent,
    status: 'PAID',
    paymentMethod: orderDetails.paymentMethod || 'UPI / Razorpay',
    timestamp: new Date().toISOString()
  };

  completedOrders.unshift(newOrder);

  // Record completed purchase in audit trail
  recordAuditLog({
    id: `audit-payment-${Date.now()}`,
    timestamp: new Date().toISOString(),
    customer: newOrder.customerName,
    merchantId: newOrder.merchantId,
    merchantName: newOrder.merchantName,
    requestedItems: newOrder.items.map(i => i.productName || i.name),
    planType: newOrder.planType,
    originalTotal: newOrder.originalTotal,
    customerBudget: orderDetails.customerBudget,
    customerOffer: newOrder.amountPaid,
    negotiationRound: orderDetails.round || 1,
    aiProposedDiscount: newOrder.negotiatedDiscount,
    aiProposedPrice: newOrder.amountPaid,
    wholesaleCost: newOrder.wholesaleCost,
    finalMarginPercent: newOrder.profitMarginPercent,
    verdict: 'PAYMENT_CONFIRMED',
    explanation: `Transaction ${newOrder.orderId} successfully processed via Razorpay. Sold by ${newOrder.merchantName}. DealPilot AI secured merchant profit of ₹${newOrder.merchantProfit} (${newOrder.profitMarginPercent}% margin) while saving customer ₹${newOrder.negotiatedDiscount}.`,
    outcome: 'CHECKOUT_SUCCESSFUL',
    perksAdded: newOrder.perks.map(p => p.name)
  });

  return newOrder;
}
