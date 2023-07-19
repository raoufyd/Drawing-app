import express from "express";
import cors from "cors";
import { Server, Socket } from "socket.io";

const io = new Server(5000, {
  cors: {
    origin: "http://localhost:5500", // Replace with the actual origin of your client-side code
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  },
});

// Rest of your server code...

io.on("connection", (socket: Socket) => {
  console.log("Socket connected:", socket.id);
  var dat;
  // Handle socket events
  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
  socket.on("mouseDataToServer", (data) => {
    console.log("data : ", data);

    dat = data;
    socket.emit("mouseDataToClient", dat);
  });
});
