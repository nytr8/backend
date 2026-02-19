import express from "express";
import {
  acceptFollowRequest,
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
followRouter.post(
  "/accept-req/:userName",
  authenticateUser,
  acceptFollowRequest,
);

export default followRouter;
