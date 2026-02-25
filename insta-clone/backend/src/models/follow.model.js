import mongoose from "mongoose";

const followSchema = new mongoose.Schema(
  {
    follower: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "follower is required"],
      ref: "Users",
    },
    followee: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "followee is required"],
      ref: "Users",
    },
    status: {
      type: String,
      default: "pending",
      enum: {
        values: ["pending", "accepted", "rejected"],
        message: "status must be either pending, accepted or rejected",
      },
    },
  },
  {
    timestamps: true,
  },
);

followSchema.index({ follower: 1, followee: 1 }, { unique: true });
const followModel = mongoose.model("Follow", followSchema);

export default followModel;
