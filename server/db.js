import mongoose from 'mongoose';
import { config } from './config.js';

let isConnected = false;
let connectionError = null;

export async function connectDB() {
  const uri = (config.mongoUri || process.env.MONGODB_URI || '').trim();

  // If completely missing or empty placeholder
  if (!uri || uri === '<MY_MONGODB_ATLAS_CONNECTION_STRING>') {
    console.log('MongoDB: MONGODB_URI not configured. Running in development in-memory/JSON fallback mode.');
    console.log(' MongoDB: To connect MongoDB Atlas, add your connection string to server/.env (Project: DealPilot, Database: dealpilot).');
    isConnected = false;
    connectionError = null;
    return { connected: false, mode: 'fallback' };
  }

  // Bind Mongoose connection lifecycle listeners
  mongoose.connection.on('connected', () => {
    isConnected = true;
    connectionError = null;
    console.log('MongoDB: Connected successfully');
  });

  mongoose.connection.on('error', (err) => {
    isConnected = false;
    connectionError = err.message;
    console.error('MongoDB: Connection error:', err.message);
  });

  mongoose.connection.on('disconnected', () => {
    isConnected = false;
    console.log('MongoDB: Disconnected (reconnection attempt in progress if server is active)...');
  });

  mongoose.connection.on('reconnected', () => {
    isConnected = true;
    connectionError = null;
    console.log('MongoDB: Reconnected successfully');
  });

  try {
    console.log('⏳ Connecting to MongoDB Atlas...');
    await mongoose.connect(uri, {
      dbName: 'dealpilot',
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      minPoolSize: 2,
    });
    isConnected = true;
    connectionError = null;
    console.log('MongoDB: Connected successfully to DealPilotCluster (database: dealpilot)');
    return { connected: true, mode: 'mongodb' };
  } catch (err) {
    isConnected = false;
    connectionError = err.message;
    console.error('MongoDB: Connection error:', err.message);
    console.error('⚠️  CRITICAL: MongoDB Atlas is configured in .env but could not be reached.');
    console.error('⚠️  Please verify your MongoDB Atlas credentials, cluster status, and IP Access List (whitelist 0.0.0.0/0).');
    // Avoid crashing the server on startup as requested
    return { connected: false, mode: 'error', error: err.message };
  }
}

export function isMongoConnected() {
  return isConnected && mongoose.connection.readyState === 1;
}

export function getDbStatus() {
  const uri = (config.mongoUri || process.env.MONGODB_URI || '').trim();
  const configured = Boolean(uri && uri !== '<MY_MONGODB_ATLAS_CONNECTION_STRING>');
  const connected = isConnected && mongoose.connection.readyState === 1;

  return {
    configured,
    connected,
    readyState: mongoose.connection.readyState,
    status: connected ? 'connected' : (configured ? 'failed_connection' : 'fallback_mode'),
    error: connectionError
  };
}
