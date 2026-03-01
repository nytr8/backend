import express from "express";
import {
  loginController,
  registerController,
  logoutController,
  getMeController,
} from "../controller/auth.controller.js";
import authenticateUser from "../middlewares/identifyUser.js";

const authRouter = express.Router();
authRouter.post("/register", registerController);
authRouter.post("/login", loginController);
authRouter.post("/logout", authenticateUser, logoutController);
authRouter.get("/get-me", authenticateUser, getMeController);
export default authRouter;
