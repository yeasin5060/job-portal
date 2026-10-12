import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  const mongoUrl = process.env.MONGODB_URL || process.env.MONGO_URI;
  if (!mongoUrl) {
    console.error("MONGODB_URL is not defined in environment variables");
    throw new Error("MONGODB_URL is not defined in environment variables");
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(mongoUrl, opts).then((mongooseInstance) => {
      console.log("MongoDB Connected Successfully");
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error("MongoDB Connection Failed:", e);
    throw e;
  }

  return cached.conn;
};

export default connectDB;