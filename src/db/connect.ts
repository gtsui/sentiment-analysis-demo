import mongoose from "mongoose";

let dbConnected = false;

export const connectDB = async () => {
  if (dbConnected) {
    console.log("calling db...");
    return;
  }

  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URL!);
      console.log("db connected...");
      dbConnected = true;
    }
  } catch (e) {
    console.log(e);
  }
};
