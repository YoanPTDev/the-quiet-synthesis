/*
server/modules/game.js
La classe qui configure les paramètres du jeu (abandonnée) et génère le code de lobby pour Socket.IO.
Raphael Lavoie (auteur)
Nicolas Drolet
Yoan Poulin Truchon
*/

class GameConfig {
  constructor(playerCount) {
    this.playerCount = playerCount;
    this.roomCode = generateRandomString(5);
  }
}

function generateRandomString(n) {
  let result = '';
  const characters = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';

  for (let i = 0; i < n; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

class Game {
  constructor(config) {
    this.config = config;
  }
}

export { Game, GameConfig };
