import User from './user.js';

class Player {
  constructor(user, socket) {
    this.user = user; //objet User
    this.socket = socket; //Connection socket.io
  }
}

export default Player;
