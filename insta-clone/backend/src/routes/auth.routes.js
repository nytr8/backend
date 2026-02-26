import express from "express";
import jwt from "jsonwebtoken";
import {
  loginController,
  registerController,
  logoutController,
} from "../controller/auth.controller.js";
import passport from "../config/Passport.js";
import authenticateUser from "../middlewares/identifyUser.js";
import userModel from "../models/user.model.js";
const authRouter = express.Router();
authRouter.post("/register", registerController);
authRouter.post("/login", loginController);
authRouter.post("/logout", logoutController);
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);
authRouter.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = jwt.sign({ userId: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
    });

    res.redirect("http://localhost:5173");
  },
);
authRouter.get("/me", authenticateUser, async (req, res) => {
  const user = await userModel.findById(req.user.id).select("-password");
  res.json(user);
});

export default authRouter;
