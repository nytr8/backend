import express from "express";
import {
  loginController,
  registerController,
  logoutController,
} from "../controller/auth.controller.js";

const authRouter = express.Router();
authRouter.post("/register", registerController);
authRouter.post("/login", loginController);
authRouter.post("/logout", logoutController);
export default authRouter;
