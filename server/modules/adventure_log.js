/*
server/modules/adventure_log.js
La classe reliée au Adventure Log et les fonctions qui la sauvegarde dans la BD.
Raphael Lavoie (auteur)
Nicolas Drolet (auteur)
Yoan Poulin Truchon
*/

import { createAdventureLog, addWeekToAdventureLog } from '../db/db_DAO.js';

class AdventureLog {
  constructor(ID, mapName, mapImage) {
    this.ID = ID;
    this.mapName = mapName;
    this.mapImage = mapImage;
    this.weeks = { logs: [] };
  }

  static async build(mapName, mapImage) {
    const ID = await createNewAdventureLog(mapName, mapImage);
    return new AdventureLog(ID, mapName, mapImage);
  }

  async addEntry(entry) {
    this.weeks.logs.push(entry);
    await addNewWeekToAdventureLog(this.ID, entry);
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
    console.log('Adventure log created:', createdAdventureLog);
    return createdAdventureLog;
  } catch (err) {
    console.error(err);
  }
}

async function addNewWeekToAdventureLog(adventureLogId, weekData) {
  const newWeek = {
    weekData,
  };

  try {
    const success = await addWeekToAdventureLog(adventureLogId, newWeek);

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
