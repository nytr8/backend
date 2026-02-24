import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: [true, "username already exists"],
  },
  email: {
    type: String,
    required: true,
    unique: [true, "email already exists"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  bio: {
    type: String,
    default: "",
  },
  profileImage: {
    type: String,
    default:
      "https://i.pinimg.com/564x/66/ff/cb/66ffcb56482c64bdf6b6010687938835.jpg",
  },
});

const userModel = mongoose.model("Users", userSchema);

export default userModel;
