import express from "express";
import {
  followUserController,
  unfollowUserController,
} from "../controller/follow.controller.js";
import authenticateUser from "../middlewares/identifyUser.js";

const followRouter = express.Router();

followRouter.post("/follow/:userName", authenticateUser, followUserController);
followRouter.post(
  "/unfollow/:userName",
  authenticateUser,
  unfollowUserController,
);

export default followRouter;
