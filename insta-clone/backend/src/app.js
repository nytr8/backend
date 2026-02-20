import express from "express";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import postRouter from "./routes/post.routes.js";
import followRouter from "./routes/follow.routes.js";
import likeRouter from "./routes/like.routes.js";
import cors from "cors";
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/", followRouter);
app.use("/api/", likeRouter);
export default app;
