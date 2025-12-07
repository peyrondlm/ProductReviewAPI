import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("MONGODB_URI is not defined in .env");
  process.exit(1);
}

async function connectDB() {
  if (mongoose.connection.readyState === 1) return mongoose; // ya conectado
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB via Mongoose");
    return mongoose;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

export default connectDB;
