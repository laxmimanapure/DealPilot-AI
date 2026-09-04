import express from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import { UserService } from '../models/User.js';
import { getDbStatus } from '../db.js';

const router = express.Router();

const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

/**
 * Generate a signed JWT token
 */
function generateToken(user) {
  const secret = (config.jwtSecret || process.env.JWT_SECRET || 'dealpilot_fallback_dev_jwt_secret_2026').trim();
  const userId = user._id ? user._id.toString() : user.id;
  return jwt.sign(
    {
      userId,
      role: user.role,
    },
    secret,
    { expiresIn: '7d' }
  );
}

/**
 * Middleware to authenticate JWT Bearer Token
 */
export async function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Authentication token missing or malformed.',
    });
  }

  const secret = (config.jwtSecret || process.env.JWT_SECRET || 'dealpilot_fallback_dev_jwt_secret_2026').trim();

  try {
    const decoded = jwt.verify(token, secret);
    const user = await UserService.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'User session invalid. Account not found.',
      });
    }
    req.user = user;
    req.tokenPayload = decoded;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        error: 'Session expired. Please sign in again.',
      });
    }
    return res.status(401).json({
      success: false,
      error: 'Invalid authentication token.',
    });
  }
}

/**
 * POST /api/auth/register
 * Register a new Client or Merchant
 */
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role = 'client', storeName, merchantId } = req.body;

    // Validate name
    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Full name is required.',
      });
    }

    // Validate email
    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
      return res.status(400).json({
        success: false,
        error: 'A valid email address is required.',
      });
    }

    // Validate password length
    if (!password || typeof password !== 'string' || password.length < 6) {
      return res.status(400).json({
        success: false,
        error: 'Password must be at least 6 characters long.',
      });
    }

    // Validate role
    if (!['client', 'merchant'].includes(role)) {
      return res.status(400).json({
        success: false,
        error: 'Role must be either "client" or "merchant".',
      });
    }

    // Validate storeName for merchant role
    if (role === 'merchant' && (!storeName || typeof storeName !== 'string' || !storeName.trim())) {
      return res.status(400).json({
        success: false,
        error: 'Store name is required when registering as a merchant.',
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    // Check if email already registered
    const existingUser = await UserService.findByEmail(cleanEmail);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: 'An account with this email address already exists. Please sign in instead.',
      });
    }

    // Create user (password is hashed using bcrypt inside UserService)
    const newUser = await UserService.createUser({
      name: name.trim(),
      email: cleanEmail,
      password,
      role,
      storeName: storeName?.trim() || '',
      merchantId: merchantId?.trim() || (role === 'merchant' ? `merchant-${Date.now().toString(36)}` : ''),
    });

    const token = generateToken(newUser);

    return res.status(201).json({
      success: true,
      message: 'Account registered successfully.',
      token,
      user: {
        id: newUser._id || newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        storeName: newUser.storeName || '',
        merchantId: newUser.merchantId || '',
        createdAt: newUser.createdAt,
      },
    });
  } catch (err) {
    console.error('Registration Error:', err.message);
    return res.status(500).json({
      success: false,
      error: 'Failed to complete registration due to an unexpected server error.',
    });
  }
});

/**
 * POST /api/auth/login
 * Authenticate client or merchant with role enforcement
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required.',
      });
    }

    const cleanEmail = email.trim().toLowerCase();
    const user = await UserService.findByEmail(cleanEmail);

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password.',
      });
    }

    // Verify password with bcrypt
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password.',
      });
    }

    // Verify requested portal role matches user's actual registered role
    if (role && user.role !== role) {
      return res.status(403).json({
        success: false,
        error: `Unauthorized portal access. This account is registered as a "${user.role}" and cannot log into the "${role}" portal.`,
      });
    }

    const token = generateToken(user);
    const safeUser = user.toJSON ? user.toJSON() : { ...user };
    delete safeUser.password;

    return res.json({
      success: true,
      message: 'Authentication successful.',
      token,
      user: {
        id: safeUser._id || safeUser.id,
        name: safeUser.name,
        email: safeUser.email,
        role: safeUser.role,
        storeName: safeUser.storeName || '',
        merchantId: safeUser.merchantId || '',
        createdAt: safeUser.createdAt,
      },
    });
  } catch (err) {
    console.error('Login Error:', err.message);
    return res.status(500).json({
      success: false,
      error: 'Login failed due to an unexpected server error.',
    });
  }
});

/**
 * GET /api/auth/me
 * Return current authenticated user profile
 */
router.get('/me', authenticateToken, async (req, res) => {
  const safeUser = req.user.toJSON ? req.user.toJSON() : { ...req.user };
  delete safeUser.password;

  return res.json({
    success: true,
    user: {
      id: safeUser._id || safeUser.id,
      name: safeUser.name,
      email: safeUser.email,
      role: safeUser.role,
      storeName: safeUser.storeName || '',
      merchantId: safeUser.merchantId || '',
      createdAt: safeUser.createdAt,
    },
  });
});

/**
 * GET /api/auth/db-status
 * Inspect MongoDB Atlas connectivity status
 */
router.get('/db-status', (req, res) => {
  const status = getDbStatus();
  res.json({
    success: true,
    database: status,
  });
});

export default router;
