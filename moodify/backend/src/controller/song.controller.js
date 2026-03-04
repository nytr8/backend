import { toFile } from "@imagekit/nodejs";
import client from "../config/imagekit.js";
import id3 from "node-id3";
import songModel from "../models/song.model.js";

async function createSongsController(req, res) {
  const song = req.file.buffer;
  const { mood } = req.body;
  const tags = id3.read(song);
  const image = tags.image.imageBuffer;
  const title = tags.title;

  const [imageFile, songFile] = await Promise.all([
    client.files.upload({
      file: await toFile(image, title),
      fileName: title,
      folder: "moodify",
    }),
    client.files.upload({
      file: await toFile(song, title),
      fileName: title,
      folder: "moodify",
    }),
  ]);

  //   console.log(imageFile.url);
  //   console.log(songFile.url);

  const songData = await songModel.create({
    url: songFile.url,
    image: imageFile.url,
    title: title,
    mood: mood,
  });
  res.status(201).json({
    message: "song created successfully",
    data: songData,
  });
}
async function getSongByMoodController(req, res) {
  try {
    const { mood } = req.query;

    const song = await songModel.aggregate([
      { $match: { mood: mood } },
      { $sample: { size: 1 } },
    ]);

    res.status(200).json({
      message: "Random song retrieved based on mood successfully",
      data: song[0],
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
}
export { createSongsController, getSongByMoodController };
