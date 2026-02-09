import express from "express";
import notesModel from "../models/app.models.js";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("./public"));

app.post("/notes", async (req, res) => {
  const { title, description } = req.body;
  const notes = await notesModel.create({
    title,
    description,
  });
  res.status(201).json({ message: "notes created", notes });
});
app.get("/notes", async (req, res) => {
  const notes = await notesModel.find();
  res.status(200).json({ message: "notes fetched succesfully", notes });
});
app.delete("/notes/:id", async (req, res) => {
  const id = req.params.id;
  const notes = await notesModel.findByIdAndDelete(id);
  res.status(200).json({ message: "notes deleted succesfully", notes });
});
app.patch("/notes/:id", async (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;
  const notes = await notesModel.findByIdAndUpdate(id, { title, description });
  res.status(200).json({ message: "notes updated succesfully", notes });
});
app.use("*name", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/public/index.html"));
});
export default app;
