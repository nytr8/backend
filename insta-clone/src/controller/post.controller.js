import postModel from "../models/post.model.js";
import ImageKit from "@imagekit/nodejs";
import { toFile } from "@imagekit/nodejs";
import jwt from "jsonwebtoken";

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function postController(req, res) {
  const { caption } = req.body;

  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "unauthenticated user",
    });
  }

  let jwttoken = null;
  try {
    jwttoken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    res.status(401).json({
      message: "token unverified",
    });
  }

  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), req.file.originalname),
    fileName: req.file.originalname,
    folder: "/cohort-2-media",
  });

  const post = await postModel.create({
    caption: caption,
    media: file.url,
    user: jwttoken.id,
  });
  res.status(201).json({
    message: "created a post succesfully",
    media: post.media,
    caption,
  });
}

export default postController;
