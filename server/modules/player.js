import User from './user.js';

class Player {
  constructor(uuid ,user, socket) {
    this.uuid = uuid;
    this.user = user; //objet User
    this.socket = socket; //Connection socket.io
  }
}

export default Player;
