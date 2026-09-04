import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { isMongoConnected } from '../db.js';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
  },
  role: {
    type: String,
    enum: {
      values: ['client', 'merchant'],
      message: 'Role must be either "client" or "merchant"',
    },
    default: 'client',
  },
  storeName: {
    type: String,
    trim: true,
    default: '',
  },
  merchantId: {
    type: String,
    trim: true,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Transform to strip password hash on serialization
userSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password;
    delete ret.__v;
    return ret;
  },
});

// Pre-save hook: Hash password with 10 salt rounds if modified
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Instance method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export const UserModel = mongoose.models.User || mongoose.model('User', userSchema);

// In-Memory fallback store for development when MongoDB is not connected
const inMemoryUsers = new Map();

export async function seedDemoAccounts() {
  const demoUsers = [
    {
      name: 'Alex Rivera',
      email: 'alex.client@dealpilot.ai',
      password: 'demo1234',
      role: 'client',
    },
    {
      name: 'Sarah Chen',
      email: 'sarah.merchant@dealpilot.ai',
      password: 'merchant1234',
      role: 'merchant',
      storeName: 'OmniTech Enterprise Solutions',
      merchantId: 'merchant-omni',
    },
  ];

  if (isMongoConnected()) {
    try {
      for (const demo of demoUsers) {
        const existing = await UserModel.findOne({ email: demo.email.toLowerCase() });
        if (!existing) {
          await UserModel.create(demo);
          console.log(`👤 Seeded MongoDB demo account: ${demo.email} (${demo.role})`);
        }
      }
    } catch (err) {
      console.error('Error seeding demo accounts in MongoDB:', err.message);
    }
  } else {
    // Seed in memory
    for (const demo of demoUsers) {
      const emailLower = demo.email.toLowerCase();
      if (!inMemoryUsers.has(emailLower)) {
        const hashedPassword = await bcrypt.hash(demo.password, 10);
        inMemoryUsers.set(emailLower, {
          _id: 'mock-user-' + Math.random().toString(36).substring(2, 9),
          name: demo.name,
          email: emailLower,
          password: hashedPassword,
          role: demo.role,
          storeName: demo.storeName || '',
          merchantId: demo.merchantId || '',
          createdAt: new Date(),
        });
        console.log(`👤 Seeded fallback demo account: ${demo.email} (${demo.role})`);
      }
    }
  }
}

// Universal Auth DB Service (Works with MongoDB Atlas or Fallback seamlessly)
export const UserService = {
  async findByEmail(email) {
    const emailLower = email.trim().toLowerCase();
    if (isMongoConnected()) {
      return await UserModel.findOne({ email: emailLower });
    }
    const memUser = inMemoryUsers.get(emailLower);
    if (!memUser) return null;
    return {
      ...memUser,
      async comparePassword(candidatePassword) {
        return bcrypt.compare(candidatePassword, memUser.password);
      },
      toJSON() {
        const copy = { ...memUser };
        delete copy.password;
        return copy;
      },
    };
  },

  async findById(id) {
    if (isMongoConnected()) {
      return await UserModel.findById(id).select('-password');
    }
    for (const user of inMemoryUsers.values()) {
      if (user._id === id) {
        const copy = { ...user };
        delete copy.password;
        return copy;
      }
    }
    return null;
  },

  async createUser({ name, email, password, role, storeName, merchantId }) {
    const emailLower = email.trim().toLowerCase();
    if (isMongoConnected()) {
      const user = new UserModel({
        name: name.trim(),
        email: emailLower,
        password,
        role,
        storeName: storeName?.trim() || '',
        merchantId: merchantId?.trim() || '',
      });
      await user.save();
      return user.toJSON();
    }

    // In-memory fallback
    const hashedPassword = await bcrypt.hash(password, 10);
    const id = 'user-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7);
    const newUser = {
      _id: id,
      name: name.trim(),
      email: emailLower,
      password: hashedPassword,
      role: role || 'client',
      storeName: storeName?.trim() || '',
      merchantId: merchantId?.trim() || '',
      createdAt: new Date(),
    };
    inMemoryUsers.set(emailLower, newUser);

    const safeUser = { ...newUser };
    delete safeUser.password;
    return safeUser;
  },
};
