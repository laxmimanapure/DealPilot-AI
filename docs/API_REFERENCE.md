# DealPilot AI — API Reference 📡

Complete specification of all REST API endpoints provided by the **DealPilot AI Backend** (running on `http://localhost:5000` by default).

All request and response bodies use JSON (`application/json`).

---

## 1. Authentication Endpoints (`/api/auth`)

### 1.1. Register User
Creates a new `client` or `merchant` user account with bcrypt password hashing.

* **Endpoint:** `POST /api/auth/register`
* **Headers:** `Content-Type: application/json`
* **Request Body:**
```json
{
  "name": "Alex Rivera",
  "email": "alex@example.com",
  "password": "securepassword123",
  "role": "client",
  "storeName": "Optional Store Name (for merchants)",
  "merchantId": "merchant-omni"
}
```
* **Response `(201 Created)`:**
```json
{
  "success": true,
  "message": "Account created successfully.",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64f123abc...",
    "name": "Alex Rivera",
    "email": "alex@example.com",
    "role": "client"
  }
}
```

---

### 1.2. Login
Authenticates an existing user and returns a signed 7-day JWT.

* **Endpoint:** `POST /api/auth/login`
* **Request Body:**
```json
{
  "email": "alex@example.com",
  "password": "securepassword123",
  "role": "client"
}
```
* **Response `(200 OK)`:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64f123abc...",
    "name": "Alex Rivera",
    "email": "alex@example.com",
    "role": "client"
  }
}
```

---

### 1.3. Get Authenticated User (`Me`)
Validates the current session from the JWT bearer token.

* **Endpoint:** `GET /api/auth/me`
* **Headers:** `Authorization: Bearer <token>`
* **Response `(200 OK)`:**
```json
{
  "success": true,
  "user": {
    "id": "64f123abc...",
    "name": "Alex Rivera",
    "email": "alex@example.com",
    "role": "client"
  }
}
```

---

### 1.4. Database Health Status
Returns MongoDB Atlas connection status or indicates local fallback mode.

* **Endpoint:** `GET /api/auth/db-status`
* **Response `(200 OK)`:**
```json
{
  "success": true,
  "db": {
    "configured": true,
    "connected": true,
    "readyState": 1,
    "status": "connected",
    "error": null
  }
}
```

---

## 2. Planner Engine Endpoints (`/api/planner`)

### 2.1. Generate 3-Tier Shopping Plans
Accepts a natural language query or structured parameters and returns 3 tiered recommendations (Best Quality 💎, Best Value ⚖️, Budget Saver 💰).

* **Endpoint:** `POST /api/planner/generate`
* **Request Body:**
```json
{
  "budget": 5000,
  "categories": ["keyboard", "mouse", "headphones"],
  "query": "I have ₹5000 and need a keyboard, mouse, and headphones"
}
```
* **Response `(200 OK)`:**
```json
{
  "success": true,
  "data": {
    "customerBudget": 5000,
    "requestedCategories": ["keyboard", "mouse", "headphones"],
    "plans": [
      {
        "id": "plan-best-quality",
        "type": "BEST_QUALITY",
        "title": "Best Quality",
        "badge": "💎 Premium Choice",
        "tagline": "Highest performance, top-grade materials & max ratings",
        "totalPrice": 5700,
        "isOverBudget": true,
        "budgetDelta": 700,
        "negotiationRecommended": true,
        "soldBy": "OmniTech Solutions",
        "merchantId": "merchant-omni",
        "items": [
          {
            "id": "kb_mech_01",
            "name": "Keychron K2 Mechanical Wireless Keyboard",
            "sellingPrice": 2000,
            "category": "keyboard"
          },
          {
            "id": "mouse_gam_01",
            "name": "Razer DeathAdder Essential Mouse",
            "sellingPrice": 900,
            "category": "mouse"
          },
          {
            "id": "audio_pro_01",
            "name": "Audio-Technica ATH-M20x Studio Headphones",
            "sellingPrice": 2800,
            "category": "headphones"
          }
        ]
      },
      {
        "id": "plan-best-value",
        "type": "BEST_VALUE",
        "title": "Best Value",
        "badge": "⚖️ Optimal Balance",
        "totalPrice": 4900,
        "isOverBudget": false,
        "budgetDelta": -100,
        "negotiationRecommended": false,
        "soldBy": "OmniTech Solutions",
        "items": [...]
      },
      {
        "id": "plan-budget-saver",
        "type": "BUDGET_SAVER",
        "title": "Budget Saver",
        "badge": "💰 Maximum Savings",
        "totalPrice": 3600,
        "isOverBudget": false,
        "budgetDelta": -1400,
        "negotiationRecommended": false,
        "soldBy": "CyberPeripherals India",
        "items": [...]
      }
    ]
  }
}
```

---

## 3. Safe AI Negotiation Endpoints (`/api/negotiate`)

### 3.1. Start Negotiation Session
Initializes an authoritative negotiation session bound to a specific merchant's policy.

* **Endpoint:** `POST /api/negotiate/start`
* **Request Body:**
```json
{
  "plan": { ... },
  "customerBudget": 5000,
  "merchantId": "merchant-omni",
  "customerName": "Alex Rivera"
}
```
* **Response `(200 OK)`:**
```json
{
  "success": true,
  "sessionId": "session_1757064800123",
  "merchantId": "merchant-omni",
  "merchantName": "OmniTech Solutions",
  "originalTotal": 5700,
  "customerBudget": 5000,
  "currentRound": 0,
  "maxRounds": 2,
  "allowSubstitutions": true,
  "allowBundlePerks": true
}
```

---

### 3.2. Submit Negotiation Turn
Evaluates a buyer's offer against merchant guardrails, applies clamping if necessary, suggests item swaps, and generates dialogue. Internal wholesale costs and profit margins are **100% shielded**.

* **Endpoint:** `POST /api/negotiate/turn`
* **Request Body:**
```json
{
  "sessionId": "session_1757064800123",
  "customerOffer": 4800,
  "customerMessage": "Can you bring this down to my ₹5,000 budget?",
  "selectedPlan": { ... },
  "merchantId": "merchant-omni",
  "swapItemId": null,
  "replacementItemId": null
}
```
* **Response `(200 OK)`:**
```json
{
  "success": true,
  "data": {
    "sessionId": "session_1757064800123",
    "merchantId": "merchant-omni",
    "merchantName": "OmniTech Solutions",
    "round": 1,
    "maxRounds": 2,
    "originalTotal": 5700,
    "offeredPrice": 5200,
    "discountAmount": 500,
    "discountPercent": 8.8,
    "customerOffer": 4800,
    "verdict": "COUNTER_OFFER_CLAMPED",
    "isFinalRound": false,
    "canAccept": true,
    "perks": [
      {
        "id": "perk_cable_clip",
        "name": "Braided Cable Organizer Clip Set",
        "retailPrice": 399
      }
    ],
    "aiMessage": "🤝 I reviewed your request! While I couldn't reach all the way down to ₹4,800 due to merchant margin safety rules, I secured our maximum allowable discount of ₹500 (8.8% off), bringing your total down from ₹5,700 to ₹5,200.\n\n💡 Smart Alternative Strategy: If you need to hit your exact ₹5,000 target, we can swap Audio-Technica ATH-M20x with boAt Rockerz 550, bringing your bundle price down to ₹4,800!\n\n🎁 Bonus Added: Because your order qualifies, I've bundled in a free Braided Cable Organizer Clip Set!",
    "currentItems": [...]
  }
}
```

---

## 4. Merchant Operations Endpoints (`/api/merchant`)

### 4.1. Get Merchant Rules
* **Endpoint:** `GET /api/merchant/rules`
* **Response `(200 OK)`:**
```json
{
  "success": true,
  "rules": {
    "merchantId": "merchant-omni",
    "merchantName": "OmniTech Solutions",
    "maxDiscountPercent": 10,
    "maxDiscountAmount": 500,
    "minProfitMarginPercent": 18,
    "maxNegotiationRounds": 2,
    "allowSubstitutions": true,
    "allowBundlePerks": true,
    "bundlePerksThreshold": 3500
  }
}
```

### 4.2. Update Merchant Rules
* **Endpoint:** `PUT /api/merchant/rules`
* **Request Body:**
```json
{
  "maxDiscountPercent": 12,
  "maxDiscountAmount": 600,
  "minProfitMarginPercent": 15,
  "maxNegotiationRounds": 3,
  "allowSubstitutions": true,
  "allowBundlePerks": true,
  "bundlePerksThreshold": 3000
}
```
* **Response `(200 OK)`:**
```json
{
  "success": true,
  "rules": { ... }
}
```

### 4.3. Get Explainable Audit Trail
Returns full mathematical audit records of every negotiation turn for merchant verification.

* **Endpoint:** `GET /api/merchant/audit-trail`
* **Response `(200 OK)`:**
```json
{
  "success": true,
  "logs": [
    {
      "id": "audit-1757064821000-482",
      "timestamp": "2026-09-05T14:30:00.000Z",
      "customer": "Alex Rivera",
      "merchantId": "merchant-omni",
      "merchantName": "OmniTech Solutions",
      "originalTotal": 5700,
      "customerBudget": 5000,
      "customerOffer": 4800,
      "negotiationRound": 1,
      "aiProposedDiscount": 500,
      "aiProposedPrice": 5200,
      "wholesaleCost": 3900,
      "finalMarginPercent": 25.0,
      "ruleChecks": {
        "maxDiscountPercent": { "limit": "10%", "value": "8.8%", "passed": true },
        "maxDiscountAmount": { "limit": "₹500", "value": "₹500", "passed": true },
        "minProfitMargin": { "limit": "18%", "value": "25.0%", "passed": true },
        "maxRounds": { "limit": 2, "value": 1, "passed": true }
      },
      "verdict": "COUNTER_OFFER_CLAMPED",
      "outcome": "COUNTER_OFFER_CLAMPED"
    }
  ]
}
```

### 4.4. Get Merchant Financial Analytics
Returns aggregated KPIs and pre-formatted Chart.js datasets.

* **Endpoint:** `GET /api/merchant/analytics`
* **Response `(200 OK)`:**
```json
{
  "success": true,
  "metrics": {
    "totalRevenue": 13350,
    "totalProfit": 3720,
    "totalDiscounts": 850,
    "avgMargin": 27.9,
    "totalOrdersCount": 3,
    "negotiatedOrdersCount": 2,
    "abandonmentRecoveryRate": "42.8%",
    "recoveredRevenue": 9750,
    "activeCatalogCount": 42
  },
  "charts": {
    "revenueBreakdown": { "labels": [...], "datasets": [...] },
    "conversionData": { "labels": [...], "datasets": [...] },
    "categoryData": { "labels": [...], "datasets": [...] }
  }
}
```

### 4.5. Catalog Management (CRUD)
* `GET /api/merchant/catalog`: Retrieve all products.
* `POST /api/merchant/catalog`: Add a new product.
* `PUT /api/merchant/catalog/:id`: Update product pricing or metadata.
* `DELETE /api/merchant/catalog/:id`: Delete a product from inventory.

---

## 5. Checkout & Razorpay Settlement (`/api/checkout`)

### 5.1. Create Razorpay Test Order
* **Endpoint:** `POST /api/checkout/create-order`
* **Request Body:**
```json
{
  "amount": 5200,
  "receipt": "rcpt_alex_123",
  "notes": {
    "planType": "Best Quality",
    "merchantId": "merchant-omni"
  }
}
```
* **Response `(200 OK)`:**
```json
{
  "success": true,
  "order": {
    "id": "order_mock_test_17570648392",
    "amount": 520000,
    "currency": "INR",
    "status": "created"
  },
  "keyId": "rzp_test_dealpilot_hackathon"
}
```

### 5.2. Verify Payment & Settle Order
Verifies Razorpay HMAC SHA256 signature and records completed purchase with wholesale cost and profit metrics.

* **Endpoint:** `POST /api/checkout/verify`
* **Request Body:**
```json
{
  "razorpayOrderId": "order_mock_test_17570648392",
  "razorpayPaymentId": "pay_mock_test_17570648392",
  "razorpaySignature": "mock_signature_test_verified",
  "dealData": {
    "customerName": "Alex Rivera",
    "customerEmail": "alex@example.com",
    "merchantId": "merchant-omni",
    "merchantName": "OmniTech Solutions",
    "finalPrice": 5200,
    "originalTotal": 5700,
    "discountAmount": 500,
    "items": [...]
  }
}
```
* **Response `(200 OK)`:**
```json
{
  "success": true,
  "message": "Payment verified and order recorded successfully.",
  "order": {
    "orderId": "DP-ORD-1093",
    "amountPaid": 5200,
    "status": "PAID",
    "taxInvoice": {
      "invoiceNumber": "INV-2026-1093",
      "date": "2026-09-05T14:32:00.000Z",
      "gstin": "27AABCO1234F1Z8",
      "taxableAmount": 4406.78,
      "cgst": 396.61,
      "sgst": 396.61,
      "total": 5200.00
    }
  }
}
```
