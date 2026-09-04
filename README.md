# DealPilot AI 🛍️🤖
### Smart Budget Planning & Safe AI Negotiation
**AI Growth & Agentic Commerce Hackathon**

> *"AI negotiates, but never without rules."*

---

## 🌟 Overview

**DealPilot AI** is an intelligent shopping and negotiation agent that bridges customer budget constraints with merchant profitability. A customer provides what products they need and their hard budget limit (e.g., *"I have ₹5,000 and need a keyboard, mouse, and headphones"*), and DealPilot immediately generates **three optimized shopping plans**.

When a customer's preferred plan exceeds their stated budget, DealPilot's **Safe AI Negotiation Layer** actively closes the gap within merchant-defined guardrails — applying bounded discounts, proposing intelligent product substitutions, and unlocking bonus bundle perks without ever risking merchant profit margins.

---

## 🎯 The Problem & The Solution

| Problem | How DealPilot AI Solves It |
| :--- | :--- |
| **Fixed Budget, Multiple Needs** | Customers shopping with a hard budget for multiple items get 3 tailored plans (💎 Best Quality, ⚖️ Best Value, 💰 Budget Saver) simultaneously. |
| **High Cart Abandonment** | When preferred items exceed budget, DealPilot safely negotiates discounts and swaps instead of letting the customer bounce. |
| **Merchant Profit Margin Risk** | Strict deterministic system-level guardrails enforce maximum discount percentages, rupee caps, and minimum profit margins that the AI cannot override. |
| **Lack of Transparency** | A real-time Merchant Audit Trail provides 100% explainability for every discount, margin check, and negotiation round. |

---

## ⚙️ Core Architecture & Guardrail Rules

```
┌────────────────────────────────────────────────────────┐
│                   Customer Request                     │
│  "I have ₹5000 and need a keyboard, mouse, headphones" │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│                     Planner Engine                     │
│ 💎 Best Quality (₹5,700)  ⚖️ Best Value (₹4,900)       │
│             💰 Budget Saver (₹3,600)                   │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│              Safe AI Negotiation Engine                │
│  • Max Discount: 10% per transaction                   │
│  • Max Discount Amount: ₹500 cap                       │
│  • Min Profit Margin: 8% on all deals                  │
│  • Max Negotiation Rounds: 2 attempts                  │
│  • Smart Product Substitutions & Bundle Perks          │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│               Razorpay Secure Checkout                 │
│         Test Mode Payment & Verified Receipts          │
└────────────────────────────────────────────────────────┘
```

---

## 🚀 Key Features

1. **3-Tier Smart Shopping Planner**:
   - 💎 **Best Quality**: Premium choices, mechanical switches, studio-grade audio.
   - ⚖️ **Best Value**: Optimal balance, top-rated features right at the budget target.
   - 💰 **Budget Saver**: Maximum savings, essential reliable functionality.

2. **Safe Rules-Bounded AI Negotiation Agent**:
   - Evaluates customer bids against live merchant guardrails.
   - Automatically clamps excessive discounts to policy limits (e.g. ₹500 max off).
   - Suggests intelligent item swaps (e.g. swap ₹2,800 headphones for ₹2,400 boAt Rockerz to hit ₹5,000 budget).
   - Live Guardrail Safety Inspector displaying real-time rule checks.

3. **Merchant Command Center & Analytics**:
   - Interactive policy sliders: Max Discount %, Rupee Cap, Margin Floor, and Round Limits.
   - Chart.js visual analytics: Gross Revenue, Protected Margin, Cart Abandonment Recovery, and Sales Volume.
   - Real-time rule synchronization.

4. **100% Explainable Audit Trail**:
   - Comprehensive logs for every negotiation round showing user offer, AI counter-bid, wholesale cost, profit margin %, and policy verdicts (`APPROVED`, `CLAMPED_TO_POLICY`, `ROUNDS_EXHAUSTED`).

5. **Razorpay Test Mode Checkout**:
   - Instant payment verification with simulated Razorpay test gateway and printable tax invoice.

6. **1-Click Hackathon Demo Scenarios**:
   - 🎯 **Hero Demo**: "The ₹5,000 Trio" (Keyboard + Mouse + Headphones)
   - 💼 **WFH Setup**: "₹12,000 Executive Studio" (Monitor + Webcam + Stand + Desk Mat)
   - 🎓 **Student Starter**: "₹3,500 Budget Essentials"

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons, Chart.js, React-Chartjs-2, Canvas-Confetti
- **Backend**: Node.js, Express.js, REST API
- **AI & Reasoning Layer**: Deterministic Rule & Margin Safety Engine + External LLM API ready
- **Payments**: Razorpay Test Mode Gateway & Signature Verification
- **Data Persistence**: JSON-based Seed Catalog (40+ items) & Audit Trail Engine

---

## 🏃 Quick Start Guide

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### 1. Install Dependencies
```bash
npm run install:all
```

### 2. Run Independently (Frontend & Backend Separated)

You can run frontend and backend in two separate terminal windows:

#### Terminal 1 — Backend Server (`server/`)
```bash
npm run server:dev
# Or navigate directly:
cd server
npm run dev
```
> Runs Express API + MongoDB Atlas on **`http://localhost:5000`**.

#### Terminal 2 — Frontend Application (`client/`)
```bash
npm run client:dev
# Or navigate directly:
cd client
npm run dev
```
> Runs Vite + React application on **`http://localhost:5173`**.

---

### 3. Run Both Concurrently (Single Command)
```bash
npm run dev
```

---

### 4. Run Automated Tests
```bash
# Test MongoDB & Full-Stack Authentication Suite (26 tests)
npm run test:auth

# Test Marketplace Discovery & Purchase Flow (5 E2E steps)
npm run test:marketplace
```

---

## 🏆 Hackathon Demo Flow for Judges

1. Open `http://localhost:5173`.
2. Click **"Demo Scenarios"** in the top navbar and select **"The ₹5,000 Trio"** (or type your own request).
3. Inspect the **3 generated plans** (💎 Best Quality ₹5,700, ⚖️ Best Value ₹4,900, 💰 Budget Saver ₹3,600).
4. Click **"Negotiate Budget Gap"** on the Best Quality plan.
5. Watch DealPilot AI negotiate:
   - Clamps the discount safely to **₹500** (₹5,200 total), protecting a **25% profit margin**.
   - Suggests swapping the headphone to reach **₹4,800** within budget.
   - Adds a complimentary **Braided Cable Clip Set** perk!
6. Click **"Accept Deal & Proceed to Razorpay"** and test the checkout.
7. Switch to the **Merchant Hub** and **Audit Trail** tabs to see the updated revenue, margin protection metrics, and mathematical explanation logs!
#   D e a l P i l o t - A I  
 