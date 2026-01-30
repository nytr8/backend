import express from "express";
import notesModel from "./models/notes.model.js";

const app = express();

app.use(express.json());

app.post("/notes", async (req, res) => {
  const { title, description } = req.body;
  const notes = await notesModel.create({
    title,
    description,
  });
  res.status(201).json({
    message: "created note succesfully",
    notes,
  });
});

export default app;
