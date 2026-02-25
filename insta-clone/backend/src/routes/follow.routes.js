import express from "express";
import {
  acceptFollowRequest,
  followUserController,
  getAllUserController,
  getMyFollowers,
  getMyFollowing,
  getPendingRequests,
  unfollowUserController,
} from "../controller/follow.controller.js";
import authenticateUser from "../middlewares/identifyUser.js";

const followRouter = express.Router();

followRouter.post("/follow/:id", authenticateUser, followUserController);
followRouter.post("/unfollow/:id", authenticateUser, unfollowUserController);
followRouter.post("/accept-req/:id", authenticateUser, acceptFollowRequest);
followRouter.get("/follow/followers", authenticateUser, getMyFollowers);
followRouter.get("/follow/following", authenticateUser, getMyFollowing);
followRouter.get("/follow/pending", authenticateUser, getPendingRequests);
followRouter.get("/alluser", authenticateUser, getAllUserController);

export default followRouter;
