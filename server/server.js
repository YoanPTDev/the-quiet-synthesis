import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

import { connectToDatabase } from './db/connection.js';
import GameEngine from './modules/game_engine.js';
import { DeckConfig } from './modules/deck.js';
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

  socket.on('mouse', (data) => {
    console.log('Received:', data.x, data.y);
    socket.broadcast.emit('mouse', data);
  });

  socket.on('drawCard', () => {
    let card = gameEngine.deck.drawCard();
    if (card != null) {
      socket.emit('cardData', JSON.stringify(card));
    } else {
      socket.emit('error', { message: 'No cards left.' });
    }
  });
  
  socket.on('endTurn', () => {
    gameEngine.endTurn();
  });

  socket.on('disconnect', () => {
    const index = gameEngine.players.findIndex((p) => p.socket.id === socket.id);
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
  const connectionString = 'mongodb://localhost:27017/your-database';
  await connectToDatabase();
  gameEngine = new GameEngine(null, null);
  await gameEngine.buildDeck('default deck');
  console.log('build finished');
  //Code de test -> retirer apres
  // let card = game_engine.deck.drawCard();
  // console.log(card.suit);
  // console.log(card.value);
  // console.log(card.prompt1);
  // console.log(card.prompt2);
  //----------------------------
}

export default io;