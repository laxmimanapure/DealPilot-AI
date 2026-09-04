# DealPilot AI — Frontend Application (Client)

Standalone React + Vite single-page application for **DealPilot AI**, featuring the Client Marketplace Discovery, AI Deal Copilot, Merchant Operations Dashboard, and Full-Stack Authentication.

---

## 🚀 Independent Quickstart

Run this frontend completely independently from the backend:

```bash
# 1. Navigate to client directory
cd client

# 2. Install dependencies
npm install

# 3. Configure backend target (Optional, defaults to http://localhost:5000/api)
cp .env.example .env

# 4. Start Vite development server
npm run dev
```

The frontend will start at **`http://localhost:5173`**.

---

## ⚙️ Environment Configuration (`client/.env`)

| Variable | Default | Description |
| :--- | :--- | :--- |
| `VITE_API_BASE_URL` | `http://localhost:5000/api` | The URL of the DealPilot Express backend API. |

To connect this frontend to a remote/production backend (e.g. deployed on Render/Railway):
```env
VITE_API_BASE_URL=https://your-backend-service.onrender.com/api
```

---

## 🛠️ Available Scripts

Inside the `client/` folder:

* **`npm run dev`**: Starts Vite dev server with hot-module replacement (HMR) at `http://localhost:5173`.
* **`npm run build`**: Compiles and bundles production assets into `dist/`.
* **`npm run preview`**: Serves the local production build to verify bundles.

---

## 🚢 Independent Deployment

This frontend is a 100% static single-page app and can be deployed to:
* **Vercel**: Import the `client` directory as the project root, output directory `dist`.
* **Netlify**: Build command `npm run build`, publish directory `dist`.
* **Cloudflare Pages**: Framework preset `Vite`, build output `dist`.
