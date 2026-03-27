import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}