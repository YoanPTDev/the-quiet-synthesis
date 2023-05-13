import MapElement from './map_element.js';

class Project {
  constructor(turns, desc, player) {
    this.turns = turns;
    this.desc = desc;
    this.player = player;
    //this.mapElem = mapElem; //Objet MapElement
  }

  endProject() {
    //WIP
  }

  getElement() {
    return this.mapElem;
  }
}

export default Project;
