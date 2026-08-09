import mongoose from 'mongoose';
import dns from 'dns';
import config from './index';

// Fix for Windows / ISP DNS SRV resolution error (querySrv ECONNREFUSED)
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch {
  /* fallback to default */
}

export async function connectDB(): Promise<void> {
  try {
    const conn = await mongoose.connect(config.mongodb_uri);
    console.log(`MongoDB connected: ${conn.connection.host}:${conn.connection.port}/${conn.connection.name}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

export async function disconnectDB(): Promise<void> {
  await mongoose.disconnect();
  console.log('MongoDB disconnected');
}
