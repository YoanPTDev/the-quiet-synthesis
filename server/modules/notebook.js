class Page {
  constructor(title, color) {
    this.title = title;
    this.color = color;
    this.notes = new Array(); //String
  }

  addNote(note) {
    this.notes.push(note);
  }
}

class Notebook {
  constructor() {
    // this.pages = new Array(); //Array de Page
    this.notes = {};
  }

  addNote(note) {
    let newIndex = Object.keys(this.notes).length + 1;
    this.notes["note" + newIndex] = {id : newIndex, value : note};
  }

  addPage(title, color) {
    this.pages.push(new Page(title, color));
  }
}

export default Notebook;
