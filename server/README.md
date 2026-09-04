# DealPilot AI — Backend API & Negotiation Policy Engine (Server)

Standalone Node.js / Express API server for **DealPilot AI**, powering MongoDB Atlas persistence, JWT authentication, multi-merchant catalog discovery, authoritative price negotiation, and Razorpay settlements.

---

## 🚀 Independent Quickstart

Run this backend API server completely independently from the frontend:

```bash
# 1. Navigate to server directory
cd server

# 2. Install dependencies
npm install

# 3. Configure environment variables (MongoDB Atlas & JWT)
cp .env.example .env

# 4. Start the server
npm run dev
# or for production:
npm start
```

The backend server will start at **`http://localhost:5000`**.

---

## ⚙️ Environment Configuration (`server/.env`)

```env
# MongoDB Atlas Connection String
MONGODB_URI=mongodb+srv://<username>:<password>@dealpilotcluster.xxxxx.mongodb.net/dealpilot?retryWrites=true&w=majority

# JWT Token Secret
JWT_SECRET=your_secure_random_jwt_secret_key

# Port & Allowed Client Origin for CORS
PORT=5000
CLIENT_ORIGIN=http://localhost:5173
```

> **Note**: If `MONGODB_URI` is not provided, the server runs in a development in-memory fallback mode so testing and judging never fail.

---

## 🛠️ Available Scripts

Inside the `server/` folder:

* **`npm start`**: Starts Express API server with `node index.js`.
* **`npm run dev`**: Starts Express API server in watch mode (`node --watch index.js`).

---

## 📡 API Endpoints Reference

| Prefix | Method | Description |
| :--- | :--- | :--- |
| `/api/auth/register` | `POST` | Register client or merchant account (`bcryptjs` hash) |
| `/api/auth/login` | `POST` | Authenticate and issue JWT token (strict RBAC) |
| `/api/auth/me` | `GET` | Return authenticated user from JWT Bearer token |
| `/api/auth/db-status` | `GET` | Check live MongoDB Atlas connection status |
| `/api/planner/generate` | `POST` | Marketplace-wide discovery & 3-tier product ranking |
| `/api/negotiate/start` | `POST` | Initialize merchant-specific negotiation session |
| `/api/negotiate/turn` | `POST` | Authoritative counter-offer evaluation (zero leak) |
| `/api/checkout/create-order` | `POST` | Create Razorpay order for single merchant |
| `/api/checkout/verify` | `POST` | Verify payment signature and record settled order |
| `/api/merchant/rules` | `GET/PUT` | Retrieve and update merchant margin guardrails |
| `/api/merchant/analytics`| `GET` | Live merchant performance metrics and KPIs |

---

## 🚢 Independent Deployment

This backend can be deployed independently to:
* **Render**: Web Service, Root directory `server`, build command `npm install`, start command `npm start`.
* **Railway**: Deploy `server` directory, configure environment variables.
* **Fly.io / AWS EC2 / DigitalOcean**: Deploy container or Node.js environment.
