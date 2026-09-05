import mongoose from 'mongoose';
import { isMongoConnected } from '../db.js';

// MongoDB Schema for DealPilot Orders
const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    clientId: {
      type: String,
      default: '',
    },
    customerName: {
      type: String,
      required: true,
      trim: true,
    },
    customerEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    customerPhone: {
      type: String,
      default: '',
      trim: true,
    },
    merchantId: {
      type: String,
      default: 'merchant-omni',
    },
    merchantName: {
      type: String,
      default: 'OmniTech Solutions',
    },
    items: [
      {
        productId: String,
        productName: String,
        name: String,
        quantity: { type: Number, default: 1 },
        originalPrice: Number,
        retailPrice: Number,
        negotiatedPrice: Number,
      },
    ],
    subtotal: {
      type: Number,
      required: true,
    },
    originalTotal: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    discountAmount: {
      type: Number,
      default: 0,
    },
    finalAmount: {
      type: Number,
      required: true,
    },
    amountPaid: {
      type: Number,
      required: true,
    },
    wholesaleCost: {
      type: Number,
      default: 0,
    },
    merchantProfit: {
      type: Number,
      default: 0,
    },
    profitMarginPercent: {
      type: Number,
      default: 0,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'paid',
    },
    paymentMethod: {
      type: String,
      default: 'razorpay',
    },
    razorpayOrderId: {
      type: String,
      default: '',
    },
    razorpayPaymentId: {
      type: String,
      default: '',
    },
    razorpaySignature: {
      type: String,
      default: '',
    },
    paidAt: {
      type: Date,
      default: Date.now,
    },
    orderStatus: {
      type: String,
      default: 'CONFIRMED',
    },
    status: {
      type: String,
      default: 'PAID',
    },
    planType: {
      type: String,
      default: 'Single-Merchant Deal',
    },
    perks: {
      type: Array,
      default: [],
    },
    negotiation: {
      enabled: { type: Boolean, default: false },
      rounds: { type: Number, default: 1 },
      finalDiscount: { type: Number, default: 0 },
      finalPrice: { type: Number, default: 0 },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    timestamp: {
      type: String,
      default: () => new Date().toISOString(),
    },
  },
  {
    timestamps: true,
  }
);

export const OrderModel = mongoose.model('Order', orderSchema);

// In-Memory fallback store when MongoDB is not active or for initial development data
const initialSeedOrders = [
  {
    orderId: 'DP-ORD-1092',
    razorpayOrderId: 'order_mock_test_1092',
    razorpayPaymentId: 'pay_mock_test_1092',
    customerName: 'Aarav Sharma',
    customerEmail: 'aarav.sharma@example.com',
    customerPhone: '+91 98765 43210',
    planType: 'Best Quality',
    merchantId: 'merchant-omni',
    merchantName: 'OmniTech Solutions',
    items: [
      { name: 'Keychron K2 Mechanical Wireless Keyboard', productName: 'Keychron K2 Mechanical Wireless Keyboard', retailPrice: 2000, quantity: 1 },
      { name: 'Razer DeathAdder Essential Mouse', productName: 'Razer DeathAdder Essential Mouse', retailPrice: 900, quantity: 1 },
      { name: 'Audio-Technica ATH-M20x Headphones', productName: 'Audio-Technica ATH-M20x Headphones', retailPrice: 2800, quantity: 1 },
    ],
    originalTotal: 5700,
    subtotal: 5700,
    discountAmount: 500,
    discount: 500,
    amountPaid: 5200,
    finalAmount: 5200,
    wholesaleCost: 3900,
    merchantProfit: 1300,
    profitMarginPercent: 25.0,
    paymentStatus: 'paid',
    paymentMethod: 'razorpay',
    paidAt: new Date('2026-08-31T20:18:42.000Z'),
    status: 'PAID',
    orderStatus: 'CONFIRMED',
    timestamp: '2026-08-31T20:18:42.000Z',
  },
  {
    orderId: 'DP-ORD-1091',
    razorpayOrderId: 'order_mock_test_1091',
    razorpayPaymentId: 'pay_mock_test_1091',
    customerName: 'Priya Patel',
    customerEmail: 'priya.p@example.com',
    customerPhone: '+91 98123 45678',
    planType: 'Best Value',
    merchantId: 'merchant-omni',
    merchantName: 'OmniTech Solutions',
    items: [
      { name: 'Redragon K552 RGB Mechanical Keyboard', productName: 'Redragon K552 RGB Mechanical Keyboard', retailPrice: 1800, quantity: 1 },
      { name: 'Logitech G102 Lightsync Mouse', productName: 'Logitech G102 Lightsync Mouse', retailPrice: 700, quantity: 1 },
      { name: 'boAt Rockerz 550 Headphones', productName: 'boAt Rockerz 550 Headphones', retailPrice: 2400, quantity: 1 },
    ],
    originalTotal: 4900,
    subtotal: 4900,
    discountAmount: 350,
    discount: 350,
    amountPaid: 4550,
    finalAmount: 4550,
    wholesaleCost: 3330,
    merchantProfit: 1220,
    profitMarginPercent: 26.8,
    paymentStatus: 'paid',
    paymentMethod: 'razorpay',
    paidAt: new Date('2026-08-31T18:45:10.000Z'),
    status: 'PAID',
    orderStatus: 'CONFIRMED',
    timestamp: '2026-08-31T18:45:10.000Z',
  },
  {
    orderId: 'DP-ORD-1090',
    razorpayOrderId: 'order_mock_test_1090',
    razorpayPaymentId: 'pay_mock_test_1090',
    customerName: 'Rohan Mehta',
    customerEmail: 'rohan.m@example.com',
    customerPhone: '+91 97654 32109',
    planType: 'Budget Saver',
    merchantId: 'merchant-cyber',
    merchantName: 'CyberPeripherals India',
    items: [
      { name: 'Logitech K120 Ergonomic Keyboard', productName: 'Logitech K120 Ergonomic Keyboard', retailPrice: 1200, quantity: 1 },
      { name: 'Dell MS116 Optical Mouse', productName: 'Dell MS116 Optical Mouse', retailPrice: 600, quantity: 1 },
      { name: 'Zebronics Zeb-Thunder Headphone', productName: 'Zebronics Zeb-Thunder Headphone', retailPrice: 1800, quantity: 1 },
    ],
    originalTotal: 3600,
    subtotal: 3600,
    discountAmount: 0,
    discount: 0,
    amountPaid: 3600,
    finalAmount: 3600,
    wholesaleCost: 2400,
    merchantProfit: 1200,
    profitMarginPercent: 33.3,
    paymentStatus: 'paid',
    paymentMethod: 'razorpay',
    paidAt: new Date('2026-08-31T15:20:00.000Z'),
    status: 'PAID',
    orderStatus: 'CONFIRMED',
    timestamp: '2026-08-31T15:20:00.000Z',
  },
];

let inMemoryOrders = [...initialSeedOrders];

/**
 * Universal DealPilot Order Service
 * Handles MongoDB Atlas persistence with seamless fallback synchronization
 */
export const OrderService = {
  async create(orderData) {
    // Normalization
    const normalized = {
      ...orderData,
      paymentStatus: orderData.paymentStatus || 'paid',
      paymentMethod: orderData.paymentMethod || 'razorpay',
      paidAt: orderData.paidAt || new Date(),
      status: 'PAID',
      orderStatus: 'CONFIRMED',
    };

    // Save in-memory store
    inMemoryOrders.unshift(normalized);

    // If MongoDB Atlas is connected, persist to MongoDB
    if (isMongoConnected()) {
      try {
        const doc = await OrderModel.create(normalized);
        console.log(`📦 Saved Order ${normalized.orderId} to MongoDB Atlas (Status: ${normalized.paymentStatus})`);
        return doc.toObject();
      } catch (err) {
        console.error('Error saving order to MongoDB Atlas:', err.message);
      }
    }

    return normalized;
  },

  async getAll() {
    if (isMongoConnected()) {
      try {
        const mongoOrders = await OrderModel.find().sort({ createdAt: -1 }).lean();
        if (mongoOrders && mongoOrders.length > 0) {
          return mongoOrders;
        }
      } catch (err) {
        console.error('Error fetching orders from MongoDB:', err.message);
      }
    }
    return inMemoryOrders;
  },

  async findByOrderId(orderId) {
    if (isMongoConnected()) {
      try {
        const doc = await OrderModel.findOne({ orderId }).lean();
        if (doc) return doc;
      } catch (err) {
        console.error('Error finding order in MongoDB:', err.message);
      }
    }
    return inMemoryOrders.find((o) => o.orderId === orderId) || null;
  },
};
