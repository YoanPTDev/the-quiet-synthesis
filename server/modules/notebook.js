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
    this.pages = new Array(); //Array de Page
  }

  addPage(title, color) {
    this.pages.push(new Page(title, color));
  }

  display() {
    //WIP
  }
}

export default Notebook;
