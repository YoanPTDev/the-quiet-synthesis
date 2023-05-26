/*
server/modules/project.js
La classe reliée au Projets qui peuvent être entâmés durant la partie.
Raphael Lavoie (auteur)
Nicolas Drolet
Yoan Poulin Truchon
*/

class Project {
  constructor(turns, desc, player) {
    this.turns = turns;
    this.desc = desc;
    this.player = player;
  }
}

export default Project;
