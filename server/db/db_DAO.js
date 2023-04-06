const dbo = require("./connection");
const ObjectId = require("mongodb").ObjectId;

let db_connect = dbo.getDb();


// ======================================================
// COMMENT UTILISER LE DAO (server-side code examples)
// ======================================================

// LES IMPORTS (Change le path pour que ca aille chercher les fichiers)
//    const { getDeckByName, getCardById } = require("./db_DAO");
//    const cardConstants = require('./constants');


// OBTENIR UN DECK
//    const deck = await getDeckByName(deckName);

// OBTENIR UNE CARTE À PARTIR DU DECK 
//    const card = await getCardById(deck.cards[index]);

// OBTENIR UNE CARTE À PARTIR DES CONSTANTES DE CARTES
//    const card = await getCardById(cardConstants.SPRING_A);


// ======================================================
// MON CODE DAO (please no touch)
// ======================================================

async function getDeckByName(deckName) {
    try {
      const deckCollection = db_connect.collection("decks");
      const deck = await deckCollection.findOne({ name: deckName });
      return deck;
    } catch (err) {
      console.error(err);
    }
  }
  
async function getCardById(cardId) {
try {
    const cardCollection = db_connect.collection("cards");
    const card = await cardCollection.findOne({ _id: ObjectId(cardId) });
    return card;
} catch (err) {
    console.error(err);
}
}

module.exports = {
getDeckByName,
getCardById
};