import User from './user.js';

class Player {
  constructor(user, socket) {
    this.user = user; //objet User
    this.socket = socket; //Connection socket.io
  }

  takeToken(turnAction) {
    //WIP
  }

  takeAction(gameAction) {
    //WIP
  }

  choosePrompt() {
    //WIP
  }
}

export default Player;
