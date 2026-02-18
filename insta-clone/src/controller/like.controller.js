import likeModel from "../models/like.model.js";
import postModel from "../models/post.model.js";

async function likeController(req, res) {
  const username = req.user.username;
  const postId = req.params.postId;

  const isPostExists = await postModel.findOne({ _id: postId });
  if (!isPostExists) {
    return res.status(404).json({
      message: "the post doesnt exists",
    });
  }
  const isLikeExists = await likeModel.findOne({
    userName: username,
    postId: postId,
  });
  if (isLikeExists) {
    return res.status(401).json({
      message: "already liked this post",
    });
  }
  const post = await likeModel.create({
    userName: username,
    postId: postId,
  });
  res.status(201).json({
    message: "liked succesfuly",
    post,
  });
}

export default likeController;
