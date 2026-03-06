import express from "express";
import {
  createSongsController,
  getSongByMoodController,
  getSonglistByMoodController,
} from "../controller/song.controller.js";
import upload from "../middlewares/multerMiddleware.js";

const songRouter = express.Router();

songRouter.post("/create", upload.single("song"), createSongsController);
songRouter.get("/getSong", getSongByMoodController);
songRouter.get("/getSonglist", getSonglistByMoodController);
export default songRouter;
