import postModel from "../models/post.model.js";
import ImageKit from "@imagekit/nodejs";
import { toFile } from "@imagekit/nodejs";
import likeModel from "../models/like.model.js";

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

async function getAllPosts(req, res) {
  const user = req.user;
  const allpost = await Promise.all(
    (await postModel.find().populate("user").lean()).map(async (post) => {
      const isLiked = await likeModel.findOne({
        userName: user.username,
        postId: post._id,
      });

      post.isLiked = !!isLiked;
      return post;
    }),
  );

  if (!allpost) {
    return res.status(404).json({
      message: "no post exists",
    });
  }
  res.status(200).json({
    message: "get all post succesfully",
    allpost,
  });
}

export { postController, getPostsController, getPostsDetails, getAllPosts };
