/*
server/modules/player.js
La classe représentant les Joueurs.
Raphael Lavoie (auteur)
Nicolas Drolet
Yoan Poulin Truchon
*/

class Player {
  constructor(uuid, socket, name) {
    this.uuid = uuid;
    this.socket = socket; //Connection socket.io
    this.name = name;
    this.isConnected = true;
  }
}

export default Player;
