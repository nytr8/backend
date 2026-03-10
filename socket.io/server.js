import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
});

io.on("connection", (socket) => {
  // ...
  socket.on("message", (msg) => {
    // console.log("user fired message event");
    console.log(msg);
    io.emit(abc);
  });
});

httpServer.listen(3000, () => {
  console.log("server running at 3000");
});
