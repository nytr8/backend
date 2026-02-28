import express from "express";
import {
  authController,
  getMe,
  loginController,
  logoutController,
} from "../controller/auth.controller.js";
import { identifyUser } from "../middlewares/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/register", authController);
authRouter.post("/login", loginController);
authRouter.get("/get-me", identifyUser, getMe);
authRouter.get("/logout", identifyUser, logoutController);

export default authRouter;
