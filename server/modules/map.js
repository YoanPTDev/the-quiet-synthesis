import MapElement from './map_element';
import Project from './project';

class MapConfig {
  constructor(color, height, width, ratio) {
    this.color = color;
    this.height = height;
    this.width = width;
    this.ratio = ratio;
  }

  save() {
    //WIP
  }

  load() {
    //WIP
  }
}

class Map {
  constructor(config) {
    this.config = config; //Objet MapConfig
    this.mapElements = new Array();
    this.projects = new Array();
  }

  draw() {
    //traverser les mapElements et caller leurs fonction draw()
  }
}

export default Map;
