import followModel from "../models/follow.model.js";
import userModel from "../models/user.model.js";

async function followUserController(req, res) {
  const follower = req.user.username;
  const followee = req.params.userName;
  const isFolloweeExists = await userModel.findOne({
    userName: followee,
  });
  if (!isFolloweeExists) {
    return res.status(404).json({
      message: "who you are trying to follow doesnt exists",
    });
  }
  const isAlreadyFollowed = await followModel.findOne({
    follower: follower,
    followee: followee,
  });
  if (isAlreadyFollowed) {
    return res.status(409).json({
      message: "you already follows him",
    });
  }
  const isSelfFollower = follower === followee;
  if (isSelfFollower) {
    return res.status(409).json({
      message: "you cannot follow youe self",
    });
  }

  const followUser = await followModel.create({
    follower: follower,
    followee: followee,
    status: "pending",
  });
  res.status(201).json({
    message: `follow request sent to ${followee}`,
    followUser,
  });
}
async function unfollowUserController(req, res) {
  const follower = req.user.username;
  const followee = req.params.userName;
  if (follower == followee) {
    return res.status(400).json({
      message: "you cant unfollow yourself",
    });
  }
  const deleteFollow = await followModel.findOneAndDelete({
    follower: follower,
    followee: followee,
  });
  if (!deleteFollow) {
    return res.status(404).json({
      message: "you are not following this user",
    });
  }
  res.status(200).json({
    message: "unfollow succesfully",
    deleteFollow,
  });
}
async function acceptFollowRequest(req, res) {
  const follower = req.user.username;
  const followee = req.params.userName;

  const request = await followModel.findOneAndUpdate(
    {
      follower,
      followee,
      status: "pending",
    },
    { status: "accepted" },
    { returnDocument: "after" },
  );
  if (!request) {
    return res.status(404).json({
      message: "follow request not found",
    });
  }
  res.status(200).json({
    message: "follow request accepted",
    request,
  });
}

export { followUserController, unfollowUserController, acceptFollowRequest };
