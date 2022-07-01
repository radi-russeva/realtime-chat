const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const studentRoutes = require("./routes/studentRoutes");
const messagesRoutes = require("./routes/messagesRoutes");
const postsRoutes = require("./routes/postRoutes");
const app = express();
const socket = require("socket.io");
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", studentRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/posts", postsRoutes);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineStudents = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-student", (studentId) => {
    onlineStudents.set(studentId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendStudentSocket = onlineStudents.get(data.to);
    if (sendStudentSocket) {
      socket.to(sendStudentSocket).emit("msg-recieve", data.msg);
    }
  });
});

