import Week from "./week.js";
import { createAdventureLog, addWeekToAdventureLog } from "../db/db_DAO.js";

class AdventureLog {
  constructor(ID, mapName, mapImage) {
    this.ID = ID;
    this.mapName = mapName;
    this.mapImage = mapImage;
    this.weeks = new Array();
  }

  static async build(mapName, mapImage) {
    //const ID = await createNewAdventureLog(mapName, mapImage);
    return new AdventureLog('1', mapName, mapImage);
  }

  async addEntry(entry) {
    this.weeks.push(entry);
    await addNewWeekToAdventureLog(this.ID, entry);
  }

  displayLog() {
    //WIP
  }
}

async function createNewAdventureLog(mapName, mapImage) {
  const newAdventureLog = {
    mapName,
    mapImage,
    weeks: [], // On crée une semaine vide qui servira plus tard à addNewWeekToAdventureLog
  };

  try {
    const createdAdventureLog = await createAdventureLog(newAdventureLog);
    console.log("Adventure log created:", createdAdventureLog);
    return createdAdventureLog;
  } catch (err) {
    console.error(err);
  }
}

async function addNewWeekToAdventureLog(adventureLogId, weekData) {
  try {
    const success = await addWeekToAdventureLog(adventureLogId, weekData);

    if (success) {
      console.log(`Week added to adventure log with ID: ${adventureLogId}`);
    } else {
      console.log(
        `Failed to add week to adventure log with ID: ${adventureLogId}`
      );
    }

    return success;
  } catch (err) {
    console.error(err);
  }
}

export default AdventureLog;
