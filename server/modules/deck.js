import Card from "./card.js";
import { getDeckByName, getCardById } from "../db/db_DAO.js";

class DeckConfig {
  constructor(deckName) {
    this.springCards = new Array(); //Array de Card
    this.summerCards = new Array(); //Array de Card
    this.fallCards = new Array(); //Array de Card
    this.winterCards = new Array(); //Array de Card

    let tempDeck = getDeckByName(deckName);

    for (let i = 0; i < tempDeck.cards.length; i++) {
      let temp_card = getCardById(tempDeck.cards[i]);

      let card = new Card(
        temp_card.suit,
        temp_card.value,
        temp_card.prompts[0].description,
        temp_card.prompts[1].description
      );

      if (temp_card.season == "Spring") {
        this.springCards.push(card);
      } else if (temp_card.season == "Summer") {
        this.summerCards.push(card);
      } else if (temp_card.season == "Fall") {
        this.fallCards.push(card);
      } else if (temp_card.season == "Winter") {
        this.winterCards.push(card);
      }
    }

    shuffle(this.springCards);
    shuffle(this.summerCards);
    shuffle(this.fallCards);
    shuffle(this.winterCards);
  }

  getSpring() {
    return this.springCards;
  }

  getSummer() {
    return this.summerCards;
  }

  getFall() {
    return this.fallCards;
  }

  getWinter() {
    return this.winterCards;
  }
}

// https://bost.ocks.org/mike/shuffle/ -> Algorithme de Fisher-Yates
function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

class Deck {
  constructor(config) {
    this.config = config; //Objet DeckConfig
    this.fullDeck = config
      .getSpring()
      .concat(config.getSummer(), config.getFall(), config.getWinter());
  }

  drawCard() {
    //Retourne un objet Card
    return this.fullDeck.shift();
  }

  discard(amount) {
    this.fullDeck.slice(0, amount); //Enleve les cartes de l'index 0 a "amount" non-inclus
  }
}

export { Deck, DeckConfig };
