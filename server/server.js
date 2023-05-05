import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

import {
  SAVE_LOG_DATA,
  ADD_PLAYER,
  END_TURN,
  START_GAME,
  MOUSE_DATA,
  SCARCITY_DATA,
  TRANSFER,
  UPDATE_SCARCITY_ABUNDANCE,
  ABUNDANCE_DATA,
  NOTE_DATA,
  UPDATE_NOTEBOOK,
  NAME_DATA,
  GAMERTAG_DATA,
} from '../utils/constants.mjs';

import { connectToDatabase } from './db/connection.js';
import GameEngine from './modules/game_engine.js';
import Player from './modules/player.js';
import Week from './modules/week.js';
import { ProjectAction } from './modules/game_action_strategy.js';

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
  socket.on(ADD_PLAYER, () => {
    playerCount++;
    const playerName = `Player ${playerCount}`;
    socket.playerName = playerName;
    gameEngine.players.push(new Player(null, socket));

    console.log(`${playerName} connected`);
  });

  socket.on(START_GAME, () => {
    gameEngine.start();
  });

  socket.on(END_TURN, () => {
    gameEngine.endTurn();
  });

  // --------TESTING----------
  socket.on(SAVE_LOG_DATA, (data) => {
    // Process the data based on its type
    switch (data.type) {
      case SCARCITY_DATA:
        if (data.action === TRANSFER) {
          const indexToRemove = gameEngine.scarc_abund.abundances.indexOf(
            data.value
          );
          gameEngine.scarc_abund.abundances.splice(indexToRemove, 1);
        }
        gameEngine.scarc_abund.scarcities.push(data.value);
        io.emit(UPDATE_SCARCITY_ABUNDANCE, gameEngine.scarc_abund);
        break;
      case ABUNDANCE_DATA:
        if (data.action === TRANSFER) {
          const indexToRemove = gameEngine.scarc_abund.scarcities.indexOf(
            data.value
          );
          gameEngine.scarc_abund.scarcities.splice(indexToRemove, 1);
        }
        gameEngine.scarc_abund.abundances.push(data.value);
        io.emit(UPDATE_SCARCITY_ABUNDANCE, gameEngine.scarc_abund);
        break;
      case NOTE_DATA:
        // Save the Notebook entry to your mongoDB collection
        gameEngine.notebook.addNote(data.value);
        io.emit(UPDATE_NOTEBOOK, gameEngine.notebook.notes);
        break;
      case NAME_DATA:
        // Save the Name entry to your mongoDB collection
        break;
      case GAMERTAG_DATA:
        // Save the Gamertag entry to your mongoDB collection
        break;
      default:
        console.log(`${data.type} is not a recognized data type. Make sure that the data type 
        exists on the server and that you have the proper syntax.`);
    }
  });
  // --------TESTING----------

  socket.on(MOUSE_DATA, (data) => {
    console.log('Received:', data.x, data.y);
    socket.broadcast.emit(MOUSE_DATA, data);
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
