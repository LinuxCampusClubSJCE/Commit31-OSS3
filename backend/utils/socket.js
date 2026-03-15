// Simple in-memory socket tracker
const userSockets = new Map(); // userId -> Set of socketIds

function addUser(userId, socketId) {
  if (!userId) return;
  const normalized = userId.toString();
  if (!userSockets.has(normalized)) {
    userSockets.set(normalized, new Set());
  }
  userSockets.get(normalized).add(socketId);
}

function removeUser(socketId) {
  for (const [userId, sockets] of userSockets.entries()) {
    if (sockets.has(socketId)) {
      sockets.delete(socketId);
      if (sockets.size === 0) {
        userSockets.delete(userId);
      }
      break;
    }
  }
}

function getSockets(userId) {
  if (!userId) return new Set();
  return userSockets.get(userId.toString()) || new Set();
}

function notifyUser(io, userId, event, payload) {
  const sockets = getSockets(userId);
  sockets.forEach((sid) => io.to(sid).emit(event, payload));
}

module.exports = {
  addUser,
  removeUser,
  getSockets,
  notifyUser,
};
