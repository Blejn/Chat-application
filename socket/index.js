const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const PORT = process.env.PORT || 8900;

app.get("/", (req, res) => {
  res.write(`<h1>Socket IO START ON PORT:${PORT} </h1>`);
  res.end();
});

io.on("connection", socket => {
  //WHEN CONNECT
  console.log("a user connected");
  io.emit("welcome", "hello this is socket serv");
  //take userId and socketId from user
  socket.on("addUser", userId => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });
  // const io = require("socket.io")(8900, {
  //   cors: {
  //     origin: "http://localhost:3000",
  //   },
  // });

  let users = [];
  //ADDING USER TO SOCKET IO
  const addUser = (userId, socketId) => {
    !users.some(user => user.userId === userId) &&
      users.push({ userId, socketId });
  };
  //REMOVING USER FROM SOCKET IO WHEN LOGOUT
  const deleteUser = socketId => {
    users = users.filter(user => user.socketId !== socketId);
  };

  //MESSAGE CONTROLLER
  const getUser = userId => {
    return users.find(user => user.userId === userId);
  };
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  //DISCONNECT
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    deleteUser(socket.id);
    io.emit("getUsers", users);
  });
});
server.listen(PORT || 8900, () => {
  console.log("listening on 8900");
});
