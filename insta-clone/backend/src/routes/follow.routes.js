import express from "express";
import {
  acceptFollowRequest,
  followRequestSentController,
  unfollowUserController,
} from "../controller/follow.controller.js";
import authenticateUser from "../middlewares/identifyUser.js";

const followRouter = express.Router();

followRouter.post("/follow/:id", authenticateUser, followRequestSentController);
followRouter.post("/unfollow/:id", authenticateUser, unfollowUserController);
followRouter.post("/accept-req/:id", authenticateUser, acceptFollowRequest);

export default followRouter;
