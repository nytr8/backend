import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "password is required"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "password is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
    select: false,
  },
});

const userModel = mongoose.model("users", userSchema);

export default userModel;
