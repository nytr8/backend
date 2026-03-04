import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  url: {
    type: String,
    required: [true, "url is required"],
  },
  image: {
    type: String,
    required: [true, "image is required"],
  },
  title: {
    type: String,
    required: [true, "title is required"],
  },
  mood: {
    type: String,
    enum: ["happy", "sad", "surprised", "neutral"],
    required: [true, "mood is required"],
  },
});

const songModel = mongoose.model("songs", songSchema);

export default songModel;
