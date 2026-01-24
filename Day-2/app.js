import express from "express";
const app = express(); //server created

app.get("/", (req, res) => {
  res.send("hello world");
});
app.listen(3000);
