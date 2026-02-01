import express from "express";
import notesModel from "./models/app.models.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.post("/notes", async (req, res) => {
  const { title, description } = req.body;
  const notes = await notesModel.create({
    title,
    description,
  });
  res.status(201).json({
    message: "notes created succesfully",
    notes,
  });
});

app.get("/notes", async (req, res) => {
  const notes = await notesModel.find();
  res.status(200).json({
    message: "notes get succesfully",
    notes,
  });
});
app.patch("/notes/:id", async (req, res) => {
  const id = req.params.id;
  const notes = await notesModel.findByIdAndUpdate(id, req.body);
  res.status(200).json({
    message: "notes updated succesfully",
    notes: notes,
  });
});
app.delete("/notes/:id", async (req, res) => {
  const id = req.params.id;
  const notes = await notesModel.findByIdAndDelete(id, req.body);
  res.status(200).json({
    message: "notes updated succesfully",
    notes: notes,
  });
});

export default app;
