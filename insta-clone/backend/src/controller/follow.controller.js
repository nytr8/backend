import followModel from "../models/follow.model.js";
import userModel from "../models/user.model.js";

async function followUserController(req, res) {
  const follower = req.user.id;
  const followee = req.params.id;
  const isFolloweeExists = await userModel.findOne({
    _id: followee,
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
  const follower = req.user.id;
  const followee = req.params.id;
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
  const follower = req.params.id;
  const followee = req.user.id;

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
async function getMyFollowers(req, res) {
  const myId = req.user.id;

  const followers = await followModel
    .find({ followee: myId, status: "accepted" })
    .populate("follower", "userName profileImage"); // adjust fields as needed

  res.status(200).json({
    message: "followers fetched successfully",
    count: followers.length,
    followers,
  });
}
async function getMyFollowing(req, res) {
  const myId = req.user.id;

  const following = await followModel
    .find({ follower: myId, status: { $in: ["accepted", "pending"] } })
    .populate("followee", "userName profileImage");

  res.status(200).json({
    message: "following fetched successfully",
    count: following.length,
    following,
  });
}
async function getPendingRequests(req, res) {
  const myId = req.user.id;

  const pending = await followModel
    .find({ followee: myId, status: "pending" })
    .populate("follower", "userName profileImage");

  res.status(200).json({
    message: "pending requests fetched",
    count: pending.length,
    pending,
  });
}
async function getAllUserController(req, res) {
  const users = await userModel
    .find({ _id: { $ne: req.user.id } })
    .select("userName profileImage");
  res.status(200).json({
    message: "all users fetched",
    count: users.length,
    users,
  });
}
export {
  followUserController,
  unfollowUserController,
  acceptFollowRequest,
  getMyFollowers,
  getMyFollowing,
  getPendingRequests,
  getAllUserController,
};
