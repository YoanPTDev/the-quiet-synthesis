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
    this.config = config; //Objet GameConfig
  }
}

export { Game, GameConfig };
