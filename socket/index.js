const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});
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

io.on("connection", socket => {
  //WHEN CONNECT
  console.log("a user connected");
  io.emit("welcome", "hello this is socket serv");
  //take userId and socketId from user
  socket.on("addUser", userId => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

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
