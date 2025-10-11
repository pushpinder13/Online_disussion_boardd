const { Server } = require('socket.io');

let io;

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join-thread', (threadId) => {
      socket.join(`thread-${threadId}`);
      console.log(`User ${socket.id} joined thread ${threadId}`);
    });

    socket.on('leave-thread', (threadId) => {
      socket.leave(`thread-${threadId}`);
      console.log(`User ${socket.id} left thread ${threadId}`);
    });

    socket.on('new-reply', (data) => {
      socket.to(`thread-${data.threadId}`).emit('reply-added', data);
    });

    socket.on('typing', (data) => {
      socket.to(`thread-${data.threadId}`).emit('user-typing', {
        userId: data.userId,
        username: data.username
      });
    });

    socket.on('stop-typing', (data) => {
      socket.to(`thread-${data.threadId}`).emit('user-stop-typing', {
        userId: data.userId
      });
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }
  return io;
};

module.exports = { initializeSocket, getIO };