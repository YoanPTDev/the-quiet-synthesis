import User from './user.js';

class Player {
  constructor(uuid, socket, name) {
    this.uuid = uuid;
    this.socket = socket; //Connection socket.io
    this.name = name;
    this.isConnected = true;
  }
}

export default Player;
