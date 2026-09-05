const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

/**
 * DealPilot AI API Client
 */
export async function generatePlans({ budget, categories, query, preferences }) {
  const res = await fetch(`${API_BASE}/planner/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ budget, categories, query, preferences })
  });
  if (!res.ok) throw new Error('Failed to generate plans');
  return res.json();
}

export async function parseQuery(query) {
  const res = await fetch(`${API_BASE}/planner/parse-query`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query })
  });
  if (!res.ok) throw new Error('Failed to parse query');
  return res.json();
}

export async function getCatalog() {
  const res = await fetch(`${API_BASE}/planner/catalog`);
  if (!res.ok) throw new Error('Failed to fetch catalog');
  return res.json();
}

export async function startNegotiation({ plan, customerBudget, customerName }) {
  const res = await fetch(`${API_BASE}/negotiate/start`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ plan, customerBudget, customerName })
  });
  if (!res.ok) throw new Error('Failed to start negotiation');
  return res.json();
}

export async function submitNegotiationTurn({
  sessionId,
  customerOffer,
  customerMessage,
  selectedPlan,
  merchantId,
  productId,
  swapItemId,
  replacementItemId
}) {
  const res = await fetch(`${API_BASE}/negotiate/turn`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sessionId,
      customerOffer,
      customerMessage,
      selectedPlan,
      merchantId: merchantId || selectedPlan?.merchantId || selectedPlan?.resolvedMerchant?.merchantId,
      productId: productId || selectedPlan?.productId || selectedPlan?.resolvedProduct?.id,
      swapItemId,
      replacementItemId
    })
  });
  if (!res.ok) throw new Error('Failed to process negotiation turn');
  return res.json();
}

export async function getMerchantRules() {
  const res = await fetch(`${API_BASE}/merchant/rules`);
  if (!res.ok) throw new Error('Failed to fetch merchant rules');
  return res.json();
}

export async function updateMerchantRules(rules) {
  const res = await fetch(`${API_BASE}/merchant/rules`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(rules)
  });
  if (!res.ok) throw new Error('Failed to update merchant rules');
  return res.json();
}

export async function getAuditLogs() {
  const res = await fetch(`${API_BASE}/merchant/audit-trail`);
  if (!res.ok) throw new Error('Failed to fetch audit logs');
  return res.json();
}

export async function getMerchantAnalytics() {
  const res = await fetch(`${API_BASE}/merchant/analytics`);
  if (!res.ok) throw new Error('Failed to fetch merchant analytics');
  return res.json();
}

export async function createPaymentOrder({ amount, currency = 'INR', receipt, notes }) {
  const res = await fetch(`${API_BASE}/payment/create-order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount, currency, receipt, notes })
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || 'Failed to create payment order');
  }
  return res.json();
}

export async function verifyPaymentResponse({
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
  orderDetails
}) {
  const res = await fetch(`${API_BASE}/payment/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderDetails
    })
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || 'Payment verification failed');
  }
  return res.json();
}

export async function createCheckoutOrder({ amount, currency = 'INR', receipt, notes }) {
  return createPaymentOrder({ amount, currency, receipt, notes });
}

export async function verifyPayment({ razorpayOrderId, razorpayPaymentId, razorpaySignature, orderDetails }) {
  return verifyPaymentResponse({
    razorpay_order_id: razorpayOrderId,
    razorpay_payment_id: razorpayPaymentId,
    razorpay_signature: razorpaySignature,
    orderDetails
  });
}

export async function getCompletedOrders() {
  const res = await fetch(`${API_BASE}/checkout/orders`);
  if (!res.ok) throw new Error('Failed to fetch orders');
  return res.json();
}

export async function addCatalogProduct(item) {
  const res = await fetch(`${API_BASE}/merchant/catalog`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item)
  });
  if (!res.ok) throw new Error('Failed to add catalog item');
  return res.json();
}

export async function updateCatalogProduct(id, item) {
  const res = await fetch(`${API_BASE}/merchant/catalog/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item)
  });
  if (!res.ok) throw new Error('Failed to update catalog item');
  return res.json();
}

export async function deleteCatalogProduct(id) {
  const res = await fetch(`${API_BASE}/merchant/catalog/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Failed to delete catalog item');
  return res.json();
}

/* =========================================================================
   AUTHENTICATION & SESSION STORAGE HELPERS
   ========================================================================= */

const AUTH_TOKEN_KEY = 'dealpilot_token';
const AUTH_USER_KEY = 'dealpilot_user';

export function setAuthToken(token) {
  if (token) {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  } else {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }
}

export function getAuthToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function setCurrentUser(user) {
  if (user) {
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(AUTH_USER_KEY);
  }
}

export function getStoredUser() {
  try {
    const raw = localStorage.getItem(AUTH_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearAuth() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
}

export async function loginUser({ email, password, role }) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, role }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Login failed. Please check your credentials.');
  }
  if (data.token) {
    setAuthToken(data.token);
  }
  if (data.user) {
    setCurrentUser(data.user);
  }
  return data;
}

export async function registerUser({ name, email, password, role = 'client', storeName = '', merchantId = '' }) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, role, storeName, merchantId }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Registration failed. Please check your inputs.');
  }
  if (data.token) {
    setAuthToken(data.token);
  }
  if (data.user) {
    setCurrentUser(data.user);
  }
  return data;
}

export async function getCurrentUser(token) {
  const activeToken = token || getAuthToken();
  if (!activeToken) {
    clearAuth();
    return null;
  }
  const res = await fetch(`${API_BASE}/auth/me`, {
    headers: {
      'Authorization': `Bearer ${activeToken}`,
    },
  });
  if (!res.ok) {
    clearAuth();
    return null;
  }
  const data = await res.json();
  if (data.user) {
    setCurrentUser(data.user);
  }
  return data.user;
}
