import express from "express";
import {
  getAllPosts,
  getPostsController,
  getPostsDetails,
  postController,
} from "../controller/post.controller.js";
import multer from "multer";
import authenticateUser from "../middlewares/identifyUser.js";
const postRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

postRouter.post("/", upload.single("media"), authenticateUser, postController);
postRouter.get("/", authenticateUser, getPostsController);
postRouter.get("/details/:postId", authenticateUser, getPostsDetails);
postRouter.get("/allpost", authenticateUser, getAllPosts);

export default postRouter;
