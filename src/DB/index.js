import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB with URL:", process.env.MONGODB_URL);
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URL);
    console.log(
      `MongoDB  Connected ! DB Host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
