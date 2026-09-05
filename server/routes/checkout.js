import express from 'express';
import { createOrder, verifyAndCompletePayment, getCompletedOrders } from '../services/paymentService.js';
import { getRazorpayKeyId } from '../services/razorpay.js';

const router = express.Router();

// POST /api/checkout/create-order - Initialize Razorpay order
router.post('/create-order', async (req, res) => {
  try {
    const { amount, currency, receipt, notes } = req.body;
    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({ success: false, error: 'Valid amount is required' });
    }

    const orderRes = await createOrder({
      amount: Number(amount),
      currency: currency || 'INR',
      receipt,
      notes,
    });

    res.json({
      success: true,
      order: orderRes.order,
      keyId: orderRes.keyId || getRazorpayKeyId(),
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/checkout/verify - Verify payment & lock in deal
router.post('/verify', async (req, res) => {
  try {
    const razorpayOrderId = req.body.razorpayOrderId || req.body.razorpay_order_id;
    const razorpayPaymentId = req.body.razorpayPaymentId || req.body.razorpay_payment_id;
    const razorpaySignature = req.body.razorpaySignature || req.body.razorpay_signature;
    const orderDetails = req.body.orderDetails || req.body;

    if (!orderDetails) {
      return res.status(400).json({ success: false, error: 'Order details are required' });
    }

    const completedOrder = await verifyAndCompletePayment({
      razorpayOrderId: razorpayOrderId || `order_test_${Date.now()}`,
      razorpayPaymentId: razorpayPaymentId || `pay_rzp_${Date.now()}`,
      razorpaySignature,
      orderDetails,
    });

    res.json({
      success: true,
      order: completedOrder,
      message: 'Payment verified and deal successfully locked!',
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// GET /api/checkout/orders - List all orders
router.get('/orders', async (req, res) => {
  try {
    const orders = await getCompletedOrders();
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
