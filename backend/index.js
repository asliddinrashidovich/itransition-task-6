const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, { cors: { origin: '*' } });

const presentationRoutes = require('./routes/presentations');

app.use(express.json());
app.use(require('cors')());
app.use('/api/presentations', presentationRoutes);

server.listen(5000, () => {
  console.log('🚀 Server running on http://localhost:5000');
});
