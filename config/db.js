import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose.connect("mongodb://localhost:27017/backend_final");
  console.log("MongoDB conectado");
};
