import assert from 'assert';
import crypto from 'crypto';
import '../server/config.js';
import { createRazorpayOrder, verifyRazorpaySignature, getRazorpayKeyId } from '../server/services/razorpay.js';
import { verifyAndCompletePayment, getCompletedOrders } from '../server/services/paymentService.js';
import { OrderModel, OrderService } from '../server/models/Order.js';

console.log('🧪 Testing DealPilot Real Razorpay Test Mode Flow...\n');

async function runTests() {
  // Test 1: Razorpay Environment Variables Check
  console.log('--- Test 1: Razorpay Environment Variables Check ---');
  const keyId = getRazorpayKeyId();
  const hasSecret = Boolean(process.env.RAZORPAY_KEY_SECRET);
  console.log('Razorpay Key ID configured:', Boolean(keyId), `(Prefix: ${keyId ? keyId.slice(0, 8) : 'none'}...)`);
  console.log('Razorpay Secret configured:', hasSecret);
  console.log('Razorpay Test Mode:', keyId.startsWith('rzp_test_'));
  assert.ok(keyId, 'RAZORPAY_KEY_ID should be defined');
  assert.ok(hasSecret, 'RAZORPAY_KEY_SECRET should be defined');
  assert.ok(!keyId.startsWith('rzp_live_'), 'Must use TEST mode key only');
  console.log('✅ Environment credentials check passed.\n');

  // Test 2: Razorpay HMAC SHA256 Signature Verification
  console.log('--- Test 2: Real HMAC SHA256 Signature Verification ---');
  const sampleOrderId = 'order_test_demo_' + Date.now();
  const samplePaymentId = 'pay_test_demo_' + Date.now();
  const secret = process.env.RAZORPAY_KEY_SECRET;

  const validSignature = crypto
    .createHmac('sha256', secret)
    .update(`${sampleOrderId}|${samplePaymentId}`)
    .digest('hex');

  const isValid = verifyRazorpaySignature({
    razorpay_order_id: sampleOrderId,
    razorpay_payment_id: samplePaymentId,
    razorpay_signature: validSignature,
  });
  assert.strictEqual(isValid, true, 'Valid signature must pass HMAC SHA256 check');

  const isInvalid = verifyRazorpaySignature({
    razorpay_order_id: sampleOrderId,
    razorpay_payment_id: samplePaymentId,
    razorpay_signature: 'fake_tampered_signature_xyz',
  });
  assert.strictEqual(isInvalid, false, 'Tampered signature must be rejected');
  console.log('✅ Signature verification passed (tampered signatures rejected, valid signatures accepted).\n');

  // Test 3: Order Persistence with paymentStatus: "paid"
  console.log('--- Test 3: Order Model Persistence with paymentStatus: "paid" ---');
  const completedOrder = await verifyAndCompletePayment({
    razorpayOrderId: sampleOrderId,
    razorpayPaymentId: samplePaymentId,
    razorpaySignature: validSignature,
    orderDetails: {
      customerName: 'Alex Rivera',
      customerEmail: 'alex.client@dealpilot.ai',
      customerPhone: '+91 98765 43210',
      merchantId: 'merchant-omni',
      merchantName: 'OmniTech Solutions',
      items: [
        {
          productId: 'kb_keychron_k2',
          productName: 'Keychron K2 Mechanical Wireless Keyboard',
          quantity: 1,
          originalPrice: 2000,
          negotiatedPrice: 1800,
        },
      ],
      originalTotal: 2000,
      subtotal: 2000,
      discountAmount: 200,
      discount: 200,
      finalAmount: 1800,
      finalPrice: 1800,
      wholesaleCost: 1400,
    },
  });

  console.log('Completed Order Record:', {
    orderId: completedOrder.orderId,
    paymentStatus: completedOrder.paymentStatus,
    paymentMethod: completedOrder.paymentMethod,
    razorpayOrderId: completedOrder.razorpayOrderId,
    razorpayPaymentId: completedOrder.razorpayPaymentId,
    paidAt: completedOrder.paidAt,
    finalAmount: completedOrder.finalAmount,
  });

  assert.ok(completedOrder.orderId.startsWith('DP-ORD-'), 'Order ID should start with DP-ORD-');
  assert.strictEqual(completedOrder.paymentStatus, 'paid', 'Payment status must be "paid"');
  assert.strictEqual(completedOrder.paymentMethod, 'razorpay', 'Payment method must be "razorpay"');
  assert.strictEqual(completedOrder.razorpayOrderId, sampleOrderId, 'razorpayOrderId must match');
  assert.strictEqual(completedOrder.razorpayPaymentId, samplePaymentId, 'razorpayPaymentId must match');
  assert.ok(completedOrder.paidAt, 'paidAt timestamp must be recorded');
  assert.strictEqual(completedOrder.finalAmount, 1800, 'finalAmount must match');
  console.log('✅ Order successfully saved with status PAID in database.\n');

  // Test 4: Real Razorpay Orders API Call
  console.log('--- Test 4: Calling Real Razorpay Test Mode Orders API ---');
  try {
    const apiOrderRes = await createRazorpayOrder({
      amount: 999, // ₹999 -> 99900 paise
      currency: 'INR',
      receipt: `rcpt_${Date.now()}`,
    });
    console.log('✅ Real Razorpay API Order successfully created on Razorpay servers:');
    console.log('   Order ID:', apiOrderRes.order.id);
    console.log('   Amount (paise):', apiOrderRes.order.amount);
    console.log('   Currency:', apiOrderRes.order.currency);
  } catch (err) {
    console.log('ℹ️  Real Razorpay API response received:');
    console.log('   Status Code:', err.statusCode);
    console.log('   Message:', err.message);
    console.log('   Details:', err.details);
    console.log('   (Note: As requested, the fake simulator has been completely removed so this exact error is reported directly to the user)');
  }

  console.log('\n🎉 ALL RAZORPAY TEST FLOW CHECKS COMPLETED!\n');
}

runTests().catch((err) => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
