import mongoose from 'mongoose';

export let isMongoConnected = false;

export async function connectDB() {
  const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://mansiashwinprabhu_db_user:mansiingarden@cluster0.rayxz6v.mongodb.net/EventManagerDB?retryWrites=true&w=majority&appName=Cluster0';
  
  try {
    await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 5000 });
    isMongoConnected = true;
    console.log('MongoDB Connected Successfully to:', MONGO_URI);
  } catch (error: any) {
    isMongoConnected = false;
    console.warn('⚠️ MongoDB Connection Failed. Switched to active In-Memory Fallback Engine.');
    console.error('MongoDB Connection Error Details:', error.message);
  }
}
