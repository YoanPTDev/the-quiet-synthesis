import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

import { connectToDatabase } from './db/connection.js';
import GameEngine from './modules/game_engine.js';
import Player from './modules/player.js';

let gameEngine = null;

const app = express();
const server = http.createServer(app);

const corsOptions = {
  origin: ['http://localhost:1234', 'http://thequietsynthesis.com'],
};

const io = new Server(server, {
  cors: corsOptions,
});

app.use(cors(corsOptions)); // use cors middleware

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  res.header(
    'Access-Control-Allow-Origin',
    'http://localhost:1234, http://thequietsynthesis.com'
  ); // set the allowed origin
  next();
});

let playerCount = 0;

io.on('connection', (socket) => {
  socket.on('addPlayer', () => {
    playerCount++;
    const playerName = `Player ${playerCount}`;
    socket.playerName = playerName;
    gameEngine.players.push(new Player(null, socket));

    console.log(`${playerName} connected`);
  });

  socket.on('startGame', () => {
    gameEngine.start();
  });

  socket.on('endTurn', () => {
    gameEngine.endTurn();
  });

  // --------TESTING----------
  socket.on('saveData', async (data) => {
    // Process the data based on its type
    switch (data.type) {
      case 'AdventureLogDescription':
        // Save the AdventureLog entry to your mongoDB collection
        console.log(data.value);
        await gameEngine.log.addEntry(data.value);
        io.emit('updateLogs', gameEngine.log.weeks);
        break;
      case 'Notebook':
        // Save the Notebook entry to your mongoDB collection
        gameEngine.notebook.addNote(data.value);
        console.log(gameEngine.notebook.notes);
        io.emit('updateNotebook', gameEngine.notebook.notes);
        break;
      case 'Name':
        // Save the Name entry to your mongoDB collection
        break;
      case 'Gamertag':
        // Save the Gamertag entry to your mongoDB collection
        break;
      default:
        console.log('Unknown data type');
    }
  });
  // --------TESTING----------

  socket.on('mouse', (data) => {
    console.log('Received:', data.x, data.y);
    socket.broadcast.emit('mouse', data);
  });

  socket.on('disconnect', () => {
    const index = gameEngine.players.findIndex(
      (p) => p.socket.id === socket.id
    );
    if (index !== -1) {
      gameEngine.players.splice(index, 1);
    }
    console.log(`${socket.playerName} disconnected`);
  });
});

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
  init();
});

async function init() {
  //const connectionString = 'mongodb://localhost:27017/your-database';
  await connectToDatabase();
  gameEngine = new GameEngine(null, null);
  await gameEngine.buildAdventureLog('Test map', null);
  await gameEngine.buildDeck('default deck');
  console.log('build finished');
}

export default io;
