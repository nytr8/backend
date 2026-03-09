import { Router } from "express";
import { register } from "../controller/auth.controller.js";
import { registerValidation } from "../validation/auth.validator.js";

const authRoutes = Router();

authRoutes.post("/register", registerValidation, register);

export default authRoutes;
