import Razorpay from 'razorpay';
import crypto from 'crypto';
import '../config.js'; // Guarantees server/.env is loaded

// Startup check for Razorpay credentials (without logging secrets)
if (!process.env.RAZORPAY_KEY_ID) {
  console.error('❌ RAZORPAY_KEY_ID is missing from environment variables');
}
if (!process.env.RAZORPAY_KEY_SECRET) {
  console.error('❌ RAZORPAY_KEY_SECRET is missing from environment variables');
}

const isTestKey = (process.env.RAZORPAY_KEY_ID || '').startsWith('rzp_test_');
const isLiveKey = (process.env.RAZORPAY_KEY_ID || '').startsWith('rzp_live_');

if (isLiveKey) {
  console.error('⚠️ WARNING: Live Razorpay key detected! Only rzp_test_ keys should be used for this buildathon.');
}

console.log('💳 Razorpay Key configured:', Boolean(process.env.RAZORPAY_KEY_ID));
console.log('💳 Razorpay Test Mode:', isTestKey);

// Razorpay SDK client instance
let razorpayClient = null;

function getRazorpayInstance() {
  if (!razorpayClient) {
    const key_id = process.env.RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    if (!key_id || !key_secret) {
      const err = new Error('Razorpay credentials missing. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in server/.env');
      err.statusCode = 500;
      throw err;
    }

    razorpayClient = new Razorpay({
      key_id,
      key_secret,
    });
  }
  return razorpayClient;
}

/**
 * Returns public Razorpay Key ID (safe for frontend)
 */
export function getRazorpayKeyId() {
  return process.env.RAZORPAY_KEY_ID || '';
}

/**
 * Create REAL Razorpay Order (TEST MODE)
 * Converts amount from Rupees to paise (₹999 -> 99900 paise)
 * NO fake fallback simulator - calls official Razorpay API directly.
 */
export async function createRazorpayOrder({ amount, currency = 'INR', receipt, notes = {} }) {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    const msg = 'Razorpay credentials missing. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in server/.env';
    console.error('❌ Razorpay order creation failed:', msg);
    const err = new Error(msg);
    err.statusCode = 500;
    throw err;
  }

  if (!amount || Number(amount) <= 0) {
    const err = new Error('Valid order amount is required.');
    err.statusCode = 400;
    throw err;
  }

  // Convert Rupees to paise (Razorpay expects paise)
  const amountInPaise = Math.round(Number(amount) * 100);
  const orderReceipt = receipt || `dp_${Date.now()}`;

  const razorpay = getRazorpayInstance();

  try {
    const razorpayOrder = await razorpay.orders.create({
      amount: amountInPaise,
      currency: currency || 'INR',
      receipt: orderReceipt,
      notes: {
        platform: 'DealPilot',
        environment: 'TEST_MODE',
        ...notes,
      },
    });

    console.log(`✅ Real Razorpay TEST Order created successfully: ${razorpayOrder.id} (${razorpayOrder.amount} paise)`);

    return {
      success: true,
      order: razorpayOrder,
      keyId: process.env.RAZORPAY_KEY_ID,
    };
  } catch (error) {
    console.error('Razorpay API failed:', error);
    console.error('Message:', error?.message || error?.error?.description || error?.description);
    console.error('Response:', error?.response?.data || error?.error);
    console.error('Status:', error?.statusCode || error?.response?.status);

    const is401 = error?.statusCode === 401 || error?.response?.status === 401;
    let errorMessage = error?.error?.description || error?.description || error?.message || 'Unable to create Razorpay order';
    if (is401) {
      errorMessage = 'Razorpay Authentication failed (HTTP 401). Your RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET in server/.env is invalid or does not match an active key pair in your Razorpay Dashboard.';
    }
    const customErr = new Error(errorMessage);
    customErr.statusCode = error?.statusCode || error?.response?.status || 500;
    customErr.details = error?.error || error?.response?.data || null;
    throw customErr;
  }
}

/**
 * Verify Razorpay Payment Signature using HMAC SHA256 and RAZORPAY_KEY_SECRET
 * text = razorpay_order_id + "|" + razorpay_payment_id
 */
export function verifyRazorpaySignature({
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
}) {
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    console.error('Signature verification failed: Missing required parameters', {
      hasOrderId: Boolean(razorpay_order_id),
      hasPaymentId: Boolean(razorpay_payment_id),
      hasSignature: Boolean(razorpay_signature),
    });
    return false;
  }

  if (!process.env.RAZORPAY_KEY_SECRET) {
    console.error('Signature verification failed: RAZORPAY_KEY_SECRET is missing from environment');
    return false;
  }

  const text = `${razorpay_order_id}|${razorpay_payment_id}`;
  const generatedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(text)
    .digest('hex');

  const isValid = generatedSignature === razorpay_signature;

  if (!isValid) {
    console.error('❌ Razorpay signature verification failed!');
    console.error('Generated signature did not match the received razorpay_signature.');
  } else {
    console.log(`✅ Razorpay signature verified successfully for Payment ID: ${razorpay_payment_id}`);
  }

  return isValid;
}

export default {
  getRazorpayKeyId,
  createRazorpayOrder,
  verifyRazorpaySignature,
};
