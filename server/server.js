import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

import { connectToDatabase } from './db/connection.js';
import GameEngine from './modules/game_engine.js';
import { DeckConfig } from './modules/deck.js';

const app = express();
const server = http.createServer(app);

const corsOptions = {
  origin: 'http://localhost:1234',
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

io.on('startGame', () => {
  console.log('creating game engine');
  const game_engine = new GameEngine(
    null,
    new DeckConfig('default deck'),
    null
  );
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
  init();

});

async function init() {
  const connectionString = 'mongodb://localhost:27017/your-database';
  await connectToDatabase();
  //Code de test -> retirer apres
  const deckConfig = await createDeckConfig();
  console.log(deckConfig);
  const game_engine = new GameEngine(
    null,
    deckConfig,
    null
  );
  console.log('build finished')
  console.log(game_engine);
  // let card = game_engine.deck.drawCard();
  // console.log(card.suit);
  // console.log(card.value);
  // console.log(card.prompt1);
  // console.log(card.prompt2);
  //----------------------------
}

const createDeckConfig = async () => {
  console.log('creating deck configuration');
  return new DeckConfig('default deck');
}