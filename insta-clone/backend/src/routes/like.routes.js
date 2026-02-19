import express from "express";
import authenticateUser from "../middlewares/identifyUser.js";
import likeController from "../controller/like.controller.js";

const likeRouter = express.Router();
likeRouter.post("/like/:postId", authenticateUser, likeController);

export default likeRouter;
