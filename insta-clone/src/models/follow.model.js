import mongoose from "mongoose";

const followSchema = new mongoose.Schema(
  {
    follower: String,
    followee: String,
  },
  {
    timestamps: true,
  },
);

const followModel = mongoose.model("Follow", followSchema);

export default followModel;
