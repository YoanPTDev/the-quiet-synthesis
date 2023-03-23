const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const app = express();
const server = http.createServer(app);
const cors = require('cors');
const {GameEngine, playerTurnStateMachine} = require('./modules/game_engine');

const corsOptions = {
  origin: 'http://localhost:1234',
};

const io = socketio(server, {
  cors: corsOptions
});

app.use(cors(corsOptions)); // use cors middleware

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  res.header('Access-Control-Allow-Origin', 'http://localhost:1234, http://thequietsynthesis.com'); // set the allowed origin
  next();
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('mouse', (data) => {
    console.log('Received:', data.x, data.y);
    socket.broadcast.emit('mouse', data);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
