import express from "express";
import {
  getPostsController,
  getPostsDetails,
  postController,
} from "../controller/post.controller.js";
import multer from "multer";
const postRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

postRouter.post("/", upload.single("media"), postController);
postRouter.get("/", getPostsController);
postRouter.get("/details/:postId", getPostsDetails);

export default postRouter;
