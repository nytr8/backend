import "dotenv/config";
import express from "express";
import authRoutes from "./routes/auth.routes.js";
import handlingError from "./middlewares/errorhandling.js";

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use(handlingError);
export default app;
