import mongoose from "mongoose";

export const connectDB = async (mongoURL) => {
  try {
    await mongoose.connect(mongoURL);
    console.log("✅ Auth DB connected successfully");
  } catch (error) {
    console.error("❌ DB Connection Error:", error.message);
  }
};
