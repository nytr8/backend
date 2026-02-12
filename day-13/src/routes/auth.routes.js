import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import express from "express";
import crypto from "crypto";

const appRouter = express.Router();

appRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const isUserExists = await userModel.findOne({ email });
  if (isUserExists) {
    return res.status(400).json({
      message: "user with this email already exists",
    });
  }
  const hash = crypto.createHash("md5").update(password).digest("hex");
  const user = await userModel.create({
    name,
    email,
    password: hash,
  });
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
  );
  res.cookie("jwt_token", token);
  res.status(201).json({
    message: "user registered successfully",
    user,
    token,
  });
});

appRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // find user by email
  const user = await userModel.findOne({ email });

  // if user not found
  if (!user) {
    return res.status(404).json({
      message: "User does not exist",
    });
  }
  const hashPassword = crypto.createHash("md5").update(password).digest("hex");
  // check password
  if (user.password !== hashPassword) {
    return res.status(401).json({
      message: "Incorrect password",
    });
  }
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
  );
  res.cookie("token", token);
  // success
  res.status(200).json({
    message: "Logged in successfully",
    token,
  });
});

export default appRouter;
