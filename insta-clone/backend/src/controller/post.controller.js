import postModel from "../models/post.model.js";
import ImageKit from "@imagekit/nodejs";
import { toFile } from "@imagekit/nodejs";
import jwt from "jsonwebtoken";

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function postController(req, res) {
  const { caption } = req.body;

  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), req.file.originalname),
    fileName: req.file.originalname,
    folder: "/cohort-2-media",
  });

  const post = await postModel.create({
    caption: caption,
    media: file.url,
    user: req.user.id,
  });
  res.status(201).json({
    message: "created a post succesfully",
    media: post.media,
    caption,
  });
}

async function getPostsController(req, res) {
  let userId = req.user.id;

  const userPosts = await postModel.find({
    user: userId,
  });
  if (!userPosts) {
    res.status(404).json({
      message: "resorce not found",
    });
  }
  // res.send(userPosts);
  res.status(200).json({
    message: "get posts succesfully",
    userPosts,
  });
}

async function getPostsDetails(req, res) {
  let userId = req.user.id;
  let postId = req.params.postId;

  const post = await postModel.findById(postId);
  if (!post) {
    return res.status(404).json({
      message: "Post not found.",
    });
  }
  let isValidPostDetails = post.user.toString() === userId;
  if (!isValidPostDetails) {
    res.status(403).json({
      message: "forbidden content",
    });
  }
  return res.status(200).json({
    message: "get post details succesfully",
    post,
  });
}

export { postController, getPostsController, getPostsDetails };
