const dbo = require("./connection");
const ObjectId = require("mongodb").ObjectId;

let db_connect = dbo.getDb();


// ======================================================
// LES COMMANDES QUE TU PEUX UTILISER (server-side code)
// ======================================================

const { getDeckByName, getCardById } = require("./db_commands"); // Change le path pour que ca aille chercher "commands.js"

// GET DECK
/* Ca va output une variable "deck" qui contient le nom du deck et un array de toutes les cartes,
   alors tu va devoir faire 'temp_deck = getDeck("default deck")' de ton bord. 
   Check le "db_game_structure" pour voir comment c'est structuré en-dedans. */
async function getDeck(deckName) {
  const deck = await getDeckByName(deckName);

  if (!deck) {
    console.log("Deck not found");
  }

  console.log("Deck:", deck); // for testing

  /* Ca loop à travers tous les id dans l'array "cards" de l'objet "deck" que ca vient de remplir
     et ca remplace les id par des objets "card" */
  for (let index = 0; index < deck.cards.length; index++) {
    const cardId = deck.cards[index];
    const card = await getCardById(cardId);
    deck.cards[index] = card;
  }

  return deck;
}



// ======================================================
// MON CODE (please no touch)
// ======================================================

async function getDeckByName(deckName) {
    try {
      const deckCollection = db_connect.collection("deck");
      const deck = await deckCollection.findOne({ name: deckName });
      return deck;
    } catch (err) {
      console.error(err);
    }
  }
  
async function getCardById(cardId) {
try {
    const cardCollection = db_connect.collection("card");
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