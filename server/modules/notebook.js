/*
server/modules/notebook.js
La classe reliée au Notebook qui permet au joueurs de prendre des notes durant la partie.
Raphael Lavoie (auteur)
Nicolas Drolet
Yoan Poulin Truchon
*/

class Notebook {
  constructor() {
    this.notes = { notes: [] };
  }

  addNote(note) {
    let newIndex = this.notes.notes.length + 1;
    this.notes.notes.push({ id: 'note' + newIndex, value: note });
  }
}

export default Notebook;
