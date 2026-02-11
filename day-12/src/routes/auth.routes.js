import express from "express";
import { userModel } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const checkUserExist = await userModel.findOne({ email });
  if (checkUserExist) {
    return res.status(400).json({
      message: "user already existed with the email you entered",
    });
  }
  const user = await userModel.create({
    name,
    email,
    password,
  });
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
  );
  res.cookie("jwt_token", token);
  res.status(201).json({
    message: "user registered succesfully",
    user,
    token,
  });
});
export { authRouter };
