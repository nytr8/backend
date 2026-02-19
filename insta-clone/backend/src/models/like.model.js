import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "user is required"],
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: [true, "Post is required"],
    },
  },
  {
    timestamps: true,
  },
);

likeSchema.index({ userName: 1, postId: 1 }, { unique: true });
const likeModel = mongoose.model("Like", likeSchema);
export default likeModel;
