import "dotenv/config";
import app from "./src/app.js";
import express from "express";
import dbConnect from "./src/config/database.js";
app.use(express.json());
dbConnect();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
