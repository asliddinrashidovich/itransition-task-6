// socket.js
import { io } from 'socket.io-client';

export const socket = io(import.meta.env.VITE_SOCKET_SERVER_URL || 'http://localhost:5000', {
  autoConnect: false,
  transports: ['websocket'],
});

// Emitting helper functions (optional)
export const emitSlideUpdate = (slides) => {
  socket.emit('slides:update', slides);
};

export const emitElementUpdate = (elements) => {
  socket.emit('elements:update', elements);
};

export const emitUserUpdate = (users) => {
  socket.emit('users:update', users);
};
