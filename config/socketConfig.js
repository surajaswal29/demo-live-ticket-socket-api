import { Server } from "socket.io";

let io;
let activeUsers = [];

export const SocketConfig = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  const addNewUser = (user, socketId) => {
    !activeUsers.some((i) => i.userId === user.userId) &&
      activeUsers.push({
        userId: user?.userId,
        userName: user?.userName,
        socketId,
      });
  };

  const removeUser = (socketId) => {
    activeUsers = activeUsers.filter((user) => user.socketId !== socketId);
  };

  // setting up new socket connection
  io.on("connection", (socket) => {
    console.log("User Connected! ✅");

    socket.on("newUser", (user) => {
      addNewUser(user, socket.id);
      console.log(`New User 👤 Added with Id: ${socket.id}`);
    });

    socket.on("disconnect", () => {
      removeUser(socket.id);
      console.log("User Disconnected! ❌");
    });
  });

  return io;
};

export const getUser = (userId) => {
  return activeUsers.find((user) => user.userId === userId);
};

export const getActiveUsers = () => activeUsers;

export const getIO = () => io;
