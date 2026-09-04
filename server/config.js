import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  mongoUri: process.env.MONGODB_URI || '',
  jwtSecret: process.env.JWT_SECRET || 'dealpilot_fallback_dev_jwt_secret_2026',
  razorpayKeyId: process.env.RAZORPAY_KEY_ID || 'rzp_test_dealpilot_mock',
  razorpayKeySecret: process.env.RAZORPAY_KEY_SECRET || 'test_secret_dealpilot_mock',
  geminiApiKey: process.env.GEMINI_API_KEY || '',
  openaiApiKey: process.env.OPENAI_API_KEY || '',
  anthropicApiKey: process.env.ANTHROPIC_API_KEY || '',
};
