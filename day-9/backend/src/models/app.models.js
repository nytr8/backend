import mongoose from "mongoose";

const notesSchema = mongoose.Schema({
  title: String,
  description: String,
});

const notesModel = mongoose.model("Note", notesSchema);

export default notesModel;
