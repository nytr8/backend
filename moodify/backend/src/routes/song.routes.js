import express from "express";
import {
  createSongsController,
  getSongByMoodController,
} from "../controller/song.controller.js";
import upload from "../middlewares/multerMiddleware.js";

const songRouter = express.Router();

songRouter.post("/create", upload.single("song"), createSongsController);
songRouter.get("/getSong", getSongByMoodController);
export default songRouter;
