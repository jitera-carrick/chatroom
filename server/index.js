import http from "http";
import express from "express";
import logger from "morgan";
import cors from "cors";
// routes
// import indexRouter from "./routes/index.js";
import userRouter from "../routes/user.js";
import chatRoomRouter from "../routes/chatRoom.js";
// import deleteRouter from "../routes/delete.js";
// middlewares
// import { decode } from "./middlewares/jwt.js";
import "../config/mongo.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { Server } from "socket.io";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
/** Create HTTP server. */
const server = http.createServer(app);
const io = new Server(server);
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

/** Get port from environment and store in Express. */
const port = process.env.PORT || "3000";
app.set("port", port);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/room", chatRoomRouter);
// app.use("/delete", deleteRouter);

/* client */
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/index.html"));
// });

app.use(express.static(path.join(__dirname, "../client/dist"))); //to serve files, not just html

/** catch 404 and forward to error handler */
app.use("*", (req, res) => {
  return res.status(404).json({
    success: false,
    message: "API endpoint doesnt exist",
  });
});

/** Create HTTP server. */
// const server = http.createServer(app);
/** Listen on provided port, on all network interfaces. */
server.listen(port);
/** Event listener for HTTP server "listening" event. */
server.on("listening", () => {
  console.log(`Listening on port:: http://localhost:${port}/`);
});
