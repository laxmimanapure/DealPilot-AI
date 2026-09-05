# DealPilot AI — Merchant Guardrails & Audit Trail 🛡️⚖️

This document details the merchant-side controls, safety boundaries, margin floor protection, and the 100% explainable audit log architecture.

---

## 1. The Merchant Safety Philosophy

In conventional commerce chatbots, allowing an LLM to freely bargain with customers frequently results in:
* **Hallucinated Discounts:** Models giving away 80% discounts because of prompt injection or emotional pleading.
* **Negative Gross Margin Sales:** Selling below wholesale acquisition costs.
* **Zero Policy Enforceability:** Store owners have no deterministic guarantee over pricing rules.

DealPilot AI replaces free-form LLM pricing with an **authoritative, server-enforced guardrail layer**. The language model is used solely for natural conversation formatting, while the financial calculation is 100% deterministic code.

---

## 2. Guardrail Configuration Parameters

Merchants can configure their store's parameters in real-time through the **Merchant Command Center** (`/merchant/dashboard`):

| Parameter | Default | Range / Type | Description |
| :--- | :---: | :---: | :--- |
| **`maxDiscountPercent`** | $10\%$ | $0\% - 50\%$ | The maximum percentage discount permitted on any single transaction. |
| **`maxDiscountAmount`** | ₹500 | ₹0 - ₹10,000 | The hard rupee ceiling for discounts, regardless of order value. |
| **`minProfitMarginPercent`** | $18\%$ | $5\% - 50\%$ | The minimum allowable gross profit margin on wholesale cost. |
| **`maxNegotiationRounds`** | 2 rounds | 1 - 5 rounds | The maximum number of counter-offer rounds before an offer is locked. |
| **`allowSubstitutions`** | `true` | Boolean | Whether DealPilot may suggest alternative products to meet budgets. |
| **`allowBundlePerks`** | `true` | Boolean | Whether DealPilot may offer complimentary perks to close deals. |
| **`bundlePerksThreshold`** | ₹3,500 | ₹500 - ₹50,000 | Minimum order subtotal required to qualify for complimentary perks. |

---

## 3. Mathematical Margin Protection

Before any price is returned to the buyer, the backend calculates:

```javascript
// Calculate wholesale cost of all items in current bundle
const wholesaleCost = items.reduce((sum, item) => sum + item.costPrice, 0);

// Calculate the minimum price required to achieve the merchant's margin floor
const minAllowedPriceByMargin = Math.ceil(wholesaleCost / (1 - (policy.minProfitMarginPercent / 100)));

// Cap discount by margin headroom
const maxDiscountAllowedByMargin = Math.max(0, originalTotal - minAllowedPriceByMargin);

// Absolute discount ceiling
const effectiveMaxDiscount = Math.min(
  (originalTotal * policy.maxDiscountPercent) / 100,
  policy.maxDiscountAmount,
  maxDiscountAllowedByMargin
);
```

### Safety Example:
* Listed Price: ₹5,700
* Wholesale Cost: ₹3,900
* Merchant Policy: Max 10%, ₹500 Cap, Min 18% Margin.

1. $10\%$ of ₹5,700 = **₹570**
2. Fixed Rupee Cap = **₹500**
3. Margin Floor (18%): Minimum Price = $\lceil 3900 / (1 - 0.18) \rceil = \lceil 3900 / 0.82 \rceil =$ **₹4,757**
   * Maximum discount allowed by margin = $5700 - 4757 =$ **₹943**
4. Effective Max Discount = $\min(570, 500, 943) =$ **₹500**.
5. Resulting Safe Price = $5700 - 500 =$ **₹5,200** (delivering a protected **25.0% profit margin**).

---

## 4. Explainable Audit Trail

Every negotiation attempt generates an immutable entry in the merchant's audit trail (`/api/merchant/audit-trail`).

### 4.1. Audit Record Schema
```typescript
interface AuditRecord {
  id: string;                      // Unique transaction audit UUID
  timestamp: string;               // ISO 8601 timestamp
  customer: string;                // Customer display name
  merchantId: string;              // Store identifier
  merchantName: string;            // Store display name
  requestedItems: string[];        // Array of item names in bundle
  planType: string;                // "Best Quality" | "Best Value" | "Budget Saver"
  originalTotal: number;           // Original catalog price (₹)
  customerBudget: number;          // Customer's declared budget (₹)
  customerOffer: number;           // Customer's proposed counter-bid (₹)
  negotiationRound: number;        // Current round (1, 2, ...)
  aiProposedDiscount: number;      // Approved or clamped discount amount (₹)
  aiProposedPrice: number;         // Safe final price offered (₹)
  wholesaleCost: number;           // Wholesale acquisition cost (₹)
  finalMarginPercent: number;      // Protected margin percentage (e.g. 25.0%)
  ruleChecks: {
    maxDiscountPercent: RuleVerdict;
    maxDiscountAmount: RuleVerdict;
    minProfitMargin: RuleVerdict;
    maxRounds: RuleVerdict;
  };
  verdict: VerdictState;
  explanation: string;
  outcome: string;
  perksAdded: string[];
}
```

### 4.2. Verdict States
* **`APPROVED`**: The customer's offer is within this round's allowable concession limits.
* **`COUNTER_OFFER_CLAMPED`**: The customer's offer was too low; the discount was safely clamped to the round's maximum allowance.
* **`FINAL_OFFER_CLAMPED`**: The final round concession limit was reached; price is locked.
* **`FULL_PRICE_ACCEPTED`**: The customer bid at or above retail price.
* **`ROUNDS_EXHAUSTED`**: The buyer attempted to continue negotiating past the maximum allowed rounds.

---

## 5. Live Merchant Analytics Dashboard

The Merchant Hub provides real-time financial tracking powered by Chart.js:

1. **Net Revenue & Protected Profit:** Shows total sales volume, net profits protected by guardrails, and total discounts awarded to customers.
2. **Abandoned Cart Recovery Rate:** Measures how many orders were recovered from customers whose original requests were over budget.
3. **Guardrail Clamping Activity:** Tracks how often customer bids were bounded by policy, proving the return on investment of the safety engine.
