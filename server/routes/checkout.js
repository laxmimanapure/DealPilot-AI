import express from 'express';
import { createOrder, verifyAndCompletePayment, getCompletedOrders } from '../services/paymentService.js';

const router = express.Router();

// POST /api/checkout/create-order - Initialize Razorpay order
router.post('/create-order', async (req, res) => {
  try {
    const { amount, currency, receipt, notes } = req.body;
    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, error: 'Valid amount is required' });
    }

    const order = await createOrder({
      amount,
      currency: currency || 'INR',
      receipt,
      notes
    });

    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/checkout/verify - Verify payment & lock in deal
router.post('/verify', (req, res) => {
  try {
    const {
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      orderDetails
    } = req.body;

    if (!orderDetails) {
      return res.status(400).json({ success: false, error: 'Order details are required' });
    }

    const completedOrder = verifyAndCompletePayment({
      razorpayOrderId: razorpayOrderId || `order_sim_${Date.now()}`,
      razorpayPaymentId: razorpayPaymentId || `pay_sim_${Date.now()}`,
      razorpaySignature,
      orderDetails
    });

    res.json({
      success: true,
      order: completedOrder,
      message: 'Payment verified and deal successfully locked!'
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// GET /api/checkout/orders - List all orders
router.get('/orders', (req, res) => {
  try {
    const orders = getCompletedOrders();
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
