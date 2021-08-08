import http from "http";
import express from "express";
import logger from "morgan";
// routes
import userRouter from "../routes/user.js";
import chatRoomRouter from "../routes/chatRoom.js";
import "../config/mongo.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { Server } from "socket.io";
import UserModel from "../models/User.js";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  socket.on("disconnect", async () => {
    await UserModel.deleteUser({ socketId: socket.id });
  });
  socket.on("joinRoom", async ({ username, roomId }) => {
    //update socketid to user
    await UserModel.findAndUpdate(username, roomId, socket.id);

    socket.join(roomId); //create a room with roomId
    console.log("joined room: ", roomId);
  });
  socket.on("message", async (msg) => {
    const user = await UserModel.findUser(socket.id);
    if (!user) {
      console.error("Cannot find user with matching socket id", socket.id);
      return;
    }
    msg.username = user.username;
    io.to(user.roomId).emit("newMessage", msg); // emit message to all users in the room
  });
});

/** Get port from environment and store in Express. */
const port = process.env.PORT || "3000";
app.set("port", port);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", userRouter);
app.use("/api/room", chatRoomRouter);

app.use(express.static(path.join(__dirname, "../client/dist"))); //to serve files, not just html

/** catch 404 and forward to error handler */
app.use("*", (req, res) => {
  return res.status(404).json({
    success: false,
    message: "API endpoint doesnt exist",
    debug: JSON.stringify(req),
  });
});

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/src/index.html"));
// });

/** Listen on provided port, on all network interfaces. */
server.listen(port);
/** Event listener for HTTP server "listening" event. */
server.on("listening", () => {
  console.log(`Listening on port: ${port}/`);
});
