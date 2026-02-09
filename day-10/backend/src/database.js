import mongoose from "mongoose";

const connectDB = async () => {
  const db = await mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("connected to database");
  });
  return db;
};
export default connectDB;
