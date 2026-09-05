import express from 'express';
import { createOrder, verifyAndCompletePayment, getCompletedOrders } from '../services/paymentService.js';
import { getRazorpayKeyId } from '../services/razorpay.js';

const router = express.Router();

/**
 * POST /api/payment/create-order
 * Initializes a REAL Razorpay order in paise for the requested rupee amount
 */
router.post('/create-order', async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt, notes } = req.body;

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Unable to create Razorpay order',
        error: 'A valid payment amount is required.',
      });
    }

    const orderRes = await createOrder({
      amount: Number(amount),
      currency,
      receipt: receipt || `dealpilot_${Date.now()}`,
      notes,
    });

    res.json({
      success: true,
      order: orderRes.order,
      keyId: orderRes.keyId || getRazorpayKeyId(),
    });
  } catch (err) {
    console.error('Payment order creation error:', err);
    res.status(err.statusCode || 500).json({
      success: false,
      message: 'Unable to create Razorpay order',
      error: err.message || 'Failed to initialize payment order with Razorpay.',
      details: err.details || null,
    });
  }
});

/**
 * POST /api/payment/verify
 * Securely verifies Razorpay HMAC SHA256 signature and records order as PAID
 */
router.post('/verify', async (req, res) => {
  try {
    const razorpay_order_id = req.body.razorpay_order_id || req.body.razorpayOrderId;
    const razorpay_payment_id = req.body.razorpay_payment_id || req.body.razorpayPaymentId;
    const razorpay_signature = req.body.razorpay_signature || req.body.razorpaySignature;
    const orderDetails = req.body.orderDetails || req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: 'Payment verification failed',
        error: 'Missing Razorpay order ID, payment ID, or signature.',
      });
    }

    const completedOrder = await verifyAndCompletePayment({
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      orderDetails,
    });

    res.json({
      success: true,
      message: 'Payment verified and deal successfully confirmed!',
      order: completedOrder,
    });
  } catch (err) {
    console.error('Payment signature verification error:', err);
    res.status(400).json({
      success: false,
      message: 'Payment verification failed. Invalid signature.',
      error: err.message || 'Signature verification failed.',
    });
  }
});

/**
 * GET /api/payment/orders
 * Returns all completed orders
 */
router.get('/orders', async (req, res) => {
  try {
    const orders = await getCompletedOrders();
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
