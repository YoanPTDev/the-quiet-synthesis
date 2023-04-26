import { ObjectId } from 'mongodb';
import { getDatabase } from './connection.js';

let theQuietYearDB = getDatabase();

// ======================================================
// COMMENT UTILISER LE DAO (server-side code examples)
// ======================================================

// LES IMPORTS (Change le path pour que ca aille chercher les fichiers)
    // const { getDeckByName, getCardById } = require("./db_DAO");
    // const cardConstants = require('./constants');

// OBTENIR UN DECK
    // const deck = await getDeckByName(deckName);

// OBTENIR UNE CARTE À PARTIR DU DECK
    // const card = await getCardById(deck.cards[index]);

// OBTENIR UNE CARTE À PARTIR DES CONSTANTES DE CARTES
    // const card = await getCardById(cardConstants.SPRING_A);

// CRÉER UN NOUVEAU ADVENTURE LOG
// On utilise 'const' au lieu de 'let' ici, car les variables ne seront pas ré-assignées plus tard
    // async function createNewAdventureLog(mapName, mapImage) {
    //   const newAdventureLog = {
    //     mapName,
    //     mapImage,
    //     weeks: [],     // On crée une semaine vide qui servira plus tard à addNewWeekToAdventureLog
    //   };

    //   try {
    //     const createdAdventureLog = await createAdventureLog(newAdventureLog);
    //     console.log('Adventure log created:', createdAdventureLog);
    //     return createdAdventureLog;
    //   } catch (err) {
    //     console.error(err);
    //   }
    // }

// AJOUTER UNE SEMAINE (TOUR) AU ADVENTURE LOG
    // async function addNewWeekToAdventureLog(adventureLogId, weekData) {
    //   try {
    //     const success = await addWeekToAdventureLog(adventureLogId, weekData);

    //     if (success) {
    //       console.log(`Week added to adventure log with ID: ${adventureLogId}`);
    //     } else {
    //       console.log(`Failed to add week to adventure log with ID: ${adventureLogId}`);
    //     }

    //     return success;
    //   } catch (err) {
    //     console.error(err);
    //   }
    // }

// ======================================================
// MON CODE DAO (please no touch)
// ======================================================

async function getDeckByName(deckName) {
  try {
    const deckCollection = theQuietYearDB.collection('decks');
    const deck = await deckCollection.findOne({ name: deckName });
    return deck;
  } catch (err) {
    console.error(err);
  }
}

async function getCardById(cardId) {
  try {
    const cardCollection = theQuietYearDB.collection('cards');
    const card = await cardCollection.findOne({ _id: new ObjectId(cardId) });
    return card;
  } catch (err) {
    console.error(err);
  }
}

async function createAdventureLog(adventureLog) {
  try {
    const adventureLogCollection = theQuietYearDB.collection('adventure_logs');
    const result = await adventureLogCollection.insertOne(adventureLog);
    return result.insertedId.toHexString();
  } catch (err) {
    console.error(err);
  }
}

async function addWeekToAdventureLog(adventureLogId, week) {
  try {
    const adventureLogCollection = theQuietYearDB.collection('adventure_logs');
    const result = await adventureLogCollection.updateOne(
      { _id: new ObjectId(adventureLogId) },
      { $push: { weeks: week } }    // On 'append' le weekData à la section 'weeks' du document
    );
    return result.modifiedCount === 1;    // Va retourner "true" si mis à jour avec succès
  } catch (err) {
    console.error(err);
  }
}



export { getDeckByName, getCardById, createAdventureLog, addWeekToAdventureLog };

