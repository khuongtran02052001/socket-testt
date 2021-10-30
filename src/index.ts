require("dotenv").config();
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from 'cors'
import authRouter from "./routes/auth";
import postRouter from "./routes/post";
import { Server } from 'socket.io'
import http from 'http'
import Like from "./models/like";
import Post from "./models/post";
// import verifyToken from "./middlewere/auth";
// import Post from "./models/post";
// import multer from "multer";
// import Like from "./models/like";
// import Comment from "./models/cmt";

const connectDB = async () => {
  try {
    mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@minifb.lycqu.mongodb.net/miniFb?retryWrites=true&w=majority`
    );
    console.log(`connect successfully`);
  } catch (error) {
    console.log(`error`);
    process.exit(1);
  }
};
connectDB();
const app = express();

app.use(express.json());
app.use(cors({
  origin: '*'
}));

// socket

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);


  socket.on("like", (data) => {
    console.log('b', data)
  })

  socket.on("disconnect", (data) => {
    console.log("User Disconnected", socket.id);
  });
});

// app
app.use(express.static('public'))
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => console.log(`sever Started ${PORT}`));

export default app;