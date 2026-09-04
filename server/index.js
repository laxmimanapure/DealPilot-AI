import express from 'express';
import cors from 'cors';
import { config } from './config.js';
import { connectDB } from './db.js';
import { seedDemoAccounts } from './models/User.js';
import plannerRoutes from './routes/planner.js';
import negotiateRoutes from './routes/negotiate.js';
import merchantRoutes from './routes/merchant.js';
import checkoutRoutes from './routes/checkout.js';
import authRoutes from './routes/auth.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Route Mounts
app.use('/api/auth', authRoutes);
app.use('/api/planner', plannerRoutes);
app.use('/api/negotiate', negotiateRoutes);
app.use('/api/merchant', merchantRoutes);
app.use('/api/checkout', checkoutRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'DealPilot AI Backend & Policy Engine',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Start Express Server
const PORT = config.port;
app.listen(PORT, async () => {
  console.log(`🚀 DealPilot AI Server running on http://localhost:${PORT}`);
  console.log(`🛡️  Merchant Policy Guardrails active: Max 10% discount, ₹500 cap, 8% min margin`);
  
  // Connect to MongoDB Atlas (or graceful dev fallback)
  await connectDB();
  
  // Seed demo accounts for seamless judging and 1-click test logins
  await seedDemoAccounts();
});
