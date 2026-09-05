# DealPilot AI — Client & Shopper Experience Guide 🛍️🤖

This guide explains how shoppers interact with **DealPilot AI** to find the best gear within their budget, negotiate price gaps with AI, swap items, and complete orders with Razorpay.

---

## 1. Natural Language Shopping & Budget Planning

Instead of manually browsing hundreds of filters, a shopper enters their budget and requirements in conversational English:

> *"I have ₹5,000 and need a keyboard, mouse, and headphones."*

### Auto-Detection Capabilities:
* **Budget Extraction:** Recognizes ₹5,000, 5000, 5k, "budget of 5000", etc.
* **Category Parsing:** Detects keyboards, mice, headphones, monitors, webcams, desk mats, mics, stands, and speakers.
* **1-Click Presets:** For fast testing, shoppers can click presets like **"The ₹5,000 Trio"**, **"Executive Studio (₹12,000)"**, or **"Budget Essentials (₹3,500)"**.

---

## 2. Understanding the 3 Shopping Tiers

DealPilot AI evaluates available inventory across merchants and produces three distinct plans:

```
┌──────────────────────────┬──────────────────────────┬──────────────────────────┐
│     💎 BEST QUALITY      │      ⚖️ BEST VALUE       │     💰 BUDGET SAVER      │
│  Keychron + DeathAdder   │   Redragon + Logitech    │    Logitech + Dell       │
│      + Audio-Technica    │       + boAt 550         │       + Zebronics        │
│         ₹5,700           │         ₹4,900           │         ₹3,600           │
│    (Over budget by ₹700) │    (Under budget by ₹100)│   (Under budget by ₹1,400)│
└────────────┬─────────────┴──────────────────────────┴──────────────────────────┘
             │
             ▼
    [Negotiate Budget Gap]
```

### 💎 Best Quality Plan
* **Goal:** Maximum specifications, mechanical switches, metal frames, studio-grade audio.
* **Status:** Often slightly above the shopper's hard budget limit.
* **Action:** Clicking **"Negotiate Budget Gap"** activates DealPilot AI to work with the merchant's rules and safely discount the items.

### ⚖️ Best Value Plan
* **Goal:** Optimal specification-to-price ratio. Features top customer-reviewed gear right near the budget target.
* **Action:** Ready for instant direct checkout with no negotiation needed.

### 💰 Budget Saver Plan
* **Goal:** Reliable everyday essentials that pass build-quality thresholds at the lowest possible total price.
* **Action:** Direct checkout leaving extra cash in the shopper's pocket.

---

## 3. Safe AI Negotiation Experience

When a shopper chooses to negotiate:

1. **Interactive Chat Dialog:**
   * The shopper sees the listed price (e.g. ₹5,700) and enters a proposed offer (e.g. ₹4,800).
2. **Deterministic Response:**
   * DealPilot evaluates the offer against the merchant's guardrails.
   * If the offer is beyond allowable policy, the AI explains the policy boundary and counter-offers the maximum safe discount (e.g. ₹5,200).
3. **Smart Item Swapping (Substitution Strategy):**
   * If the buyer cannot afford ₹5,200, DealPilot suggests swapping one item (e.g. swapping the ₹2,800 Audio-Technica headphones for ₹2,400 boAt Rockerz) to bring the package to **₹4,800**, meeting their exact target!
4. **Perks & Bonuses:**
   * For orders exceeding qualifying thresholds, the AI attaches free bonuses (such as a *Braided Cable Organizer Clip Set*).
5. **Accept & Lock:**
   * Once satisfied, clicking **"Accept Deal & Proceed to Checkout"** locks the negotiated price for payment.

---

## 4. Checkout & Payment Settlement

* **Simulated & Live Razorpay Gateway:** Supports UPI, Cards, and Netbanking in test mode.
* **Instant Tax Invoice:** Upon successful payment verification, the shopper receives a printable GST-compliant tax invoice with itemized line items and applied discounts.
* **Client Dashboard Features:**
  * **Saved Deals:** Bookmarks favorite plans.
  * **Price Drop Alerts:** Sets alerts when gear drops below threshold prices.
  * **Order History:** Tracks completed purchases and generated receipts.
