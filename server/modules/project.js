import MapElement from './map_element.js';

class Project {
  constructor(timer, desc, player) {
    this.timer = timer;
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
