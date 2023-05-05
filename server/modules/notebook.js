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
    this.notes = { notes: [] };
  }

  addNote(note) {
    let newIndex = this.notes.notes.length + 1;
    this.notes.notes.push({ id: 'note' + newIndex, value: note });
  }

  addPage(title, color) {
    this.pages.push(new Page(title, color));
  }
}

export default Notebook;
