# DealPilot AI — Deployment, Environment & Testing 🚀🧪

This document provides setup instructions for local development, environment configuration, executing test suites, and cloud production deployment.

---

## 1. Prerequisites

* **Node.js**: v18.0.0 or higher
* **npm**: v9.0.0 or higher
* **MongoDB Atlas** (Optional — a resilient in-memory fallback is included for local testing)

---

## 2. Local Setup & Quickstart

### 2.1. Clone and Install
```bash
# Clone the repository
git clone https://github.com/laxmimanapure/DealPilot-AI.git
cd DealPilot-AI

# Install root, server, and client dependencies
npm run install:all
```

### 2.2. Running Both Frontend & Backend Concurrently
```bash
npm run dev
```
* **Frontend:** `http://localhost:5173`
* **Backend:** `http://localhost:5000`

### 2.3. Running Independently
* **Backend Only:**
  ```bash
  cd server
  npm run dev
  ```
* **Frontend Only:**
  ```bash
  cd client
  npm run dev
  ```

---

## 3. Environment Variables Reference

### Backend (`server/.env`)
Create `server/.env` based on `server/.env.example`:
```env
# MongoDB Atlas Connection URI
MONGODB_URI=mongodb+srv://<username>:<password>@dealpilotcluster.xxxxx.mongodb.net/dealpilot?retryWrites=true&w=majority

# JWT Secret for Signing Session Tokens
JWT_SECRET=dealpilot_secure_jwt_secret_key_2026

# Server Port & CORS Configuration
PORT=5000
CLIENT_ORIGIN=http://localhost:5173

# Razorpay Test Mode Credentials (Optional - mock mode active if omitted)
RAZORPAY_KEY_ID=rzp_test_dealpilot_hackathon
RAZORPAY_KEY_SECRET=your_razorpay_secret_key

# Optional External LLM Integration (OpenAI or Google Gemini)
GEMINI_API_KEY=
OPENAI_API_KEY=
```

> **Note on MongoDB Fallback:** If `MONGODB_URI` is omitted or unconfigured, the backend automatically runs in a local in-memory fallback mode so testing, evaluation, and hackathon judging never fail.

### Frontend (`client/.env`)
Create `client/.env` based on `client/.env.example`:
```env
# Express API Endpoint
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 4. Automated Verification Test Suites

DealPilot AI includes automated verification suites covering core logic, authentication, and end-to-end commerce flows.

### 4.1. Core Logic & Guardrails Verification
```bash
node test-system.js
```
* **What it verifies:**
  1. Natural Language Query parsing (budget and categories).
  2. Exact 3-tier recommendation pricing (₹5,700 / ₹4,900 / ₹3,600).
  3. Discount clamping to merchant policy ceiling (₹500 maximum discount).
  4. Margin floor protection ($25\%$ margin retained).
  5. Maximum round enforcement (stops after Round 2).

### 4.2. MongoDB & Full-Stack Authentication Suite (26 Tests)
```bash
npm run test:auth
```
* **What it verifies:**
  1. User registration with email validation and role assignment (`client` vs `merchant`).
  2. Password hashing via `bcryptjs`.
  3. JWT token generation and Bearer header parsing.
  4. Protected route verification (`/api/auth/me`).
  5. Fallback persistence synchronization.

### 4.3. E2E Marketplace Discovery & Purchase Flow (5 Steps)
```bash
npm run test:marketplace
```
* **What it verifies:**
  1. Marketplace-wide catalog search for category queries.
  2. Single-merchant tier resolution (ensures clean checkout).
  3. Server-enforced negotiation with zero margin data leakage to client.
  4. Order generation and signature verification.

---

## 5. Cloud Production Deployment

### 5.1. Backend Deployment (Render / Railway)
1. **Render:**
   * Create a new **Web Service**.
   * Root Directory: `server`
   * Build Command: `npm install`
   * Start Command: `npm start`
   * Environment Variables: Add `MONGODB_URI`, `JWT_SECRET`, `CLIENT_ORIGIN`.
2. **Railway:**
   * Deploy from GitHub repository, setting root directory to `server`.
   * Add environment variables in Railway project settings.

### 5.2. Frontend Deployment (Vercel / Netlify)
1. **Vercel:**
   * Import project repository.
   * Root Directory: `client`
   * Framework Preset: `Vite`
   * Build Command: `npm run build`
   * Output Directory: `dist`
   * Environment Variables: `VITE_API_BASE_URL` pointing to your deployed backend URL (e.g. `https://your-api.onrender.com/api`).
