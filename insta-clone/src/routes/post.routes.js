import express from "express";
import postController from "../controller/post.controller.js";
import multer from "multer";
const postRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

postRouter.post("/", upload.single("media"), postController);

export default postRouter;
