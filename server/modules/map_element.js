class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Dessin {
  constructor(color, dessin) {
    this.color = color;
    this.dessin = dessin; //Bitmap?
  }
}

class MapElement {
  constructor(pos, dessin) {
    this.pos = pos; //Objet Point
    this.dessin = dessin; //Objet Dessin
  }

  draw() {
    //WIP
  }
}

export default MapElement;
