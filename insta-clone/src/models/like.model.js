import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    userName: String,
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: [true, "Post ID is required"],
    },
  },
  {
    timestamps: true,
  },
);

likeSchema.index({ userName: 1, postId: 1 }, { unique: true });
const likeModel = mongoose.model("Like", likeSchema);
export default likeModel;
