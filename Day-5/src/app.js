import express from "express";

const app = express();

const notes = [];
app.use(express.json());

app.post("/notes", (req, res) => {
  notes.push(req.body);
  res.status(201).json({
    message: "notes created",
  });
});
app.get("/notes", (req, res) => {
  res.status(200).json({
    message: notes,
  });
});
app.delete("/notes/:index", (req, res) => {
  delete notes[req.params.index];
  res.status(204).json({
    message: `deleted ${req.params.index} th index data`,
  });
});
app.patch("/notes/:index", (req, res) => {
  notes[req.params.index].desc = req.body.desc;
  res.status(201).json({
    message: `patched  ${req.params.index} th index data`,
  });
});

export default app;
