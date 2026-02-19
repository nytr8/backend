import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  caption: {
    type: String,
    default: "",
  },
  media: {
    type: String,
    required: [true, "media file is required for creating post"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: [true, "user is required for creating post"],
  },
});
const postModel = mongoose.model("Posts", postSchema);

export default postModel;
