import mongoose from 'mongoose';
import { config } from 'dotenv';

config();

const mongoURI = process.env.MONGO_URI;
export const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
