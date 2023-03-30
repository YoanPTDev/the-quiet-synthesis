import Week from './week';

class AdventureLog {
  constructor() {
    this.weeks = new Array(); //Array de Week (ou String)
    //*** A revoir si on veut une liste de Week ou seulement
    // des entrees en String qui decrivent le deroulement du tour ***
  }

  addEntry(entry) {
    this.weeks.push(entry);
  }

  displayLog() {
    //WIP
  }
}

export default AdventureLog;
