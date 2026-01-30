import mongoose from "mongoose";
const notesSchema = new mongoose.Schema({
  title: String,
  description: String,
});
const notesModel = mongoose.model("Notes", notesSchema);

export default notesModel;
