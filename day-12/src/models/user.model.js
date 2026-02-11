import mongoose, { Types } from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: [true, "user already exists"],
  },
  password: String,
});

const userModel = mongoose.model("users", userSchema);

export { userModel };
