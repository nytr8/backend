import express from "express";
import {
  authController,
  loginController,
} from "../controller/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/register", authController);
authRouter.post("/login", loginController);

export default authRouter;
