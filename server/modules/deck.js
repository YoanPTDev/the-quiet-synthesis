import Card from './card.js';
import { getDeckByName, getCardById } from '../db/db_DAO.js';

class DeckConfig {
  constructor(deckName) {
    this.springCards = new Array(); //Array de Card
    this.summerCards = new Array(); //Array de Card
    this.fallCards = new Array(); //Array de Card
    this.winterCards = new Array(); //Array de Card

  }

  buildSeasons = async () => {
    getDeckByName(deckName).then((dataDeck) => {
      for (let i = 0; i < dataDeck.cards.length; i++) {
        getCardById(dataDeck.cards[i]).then((dataCard) => {
          let card = null;
          try {
            card = new Card(
              dataCard.suit,
              dataCard.value,
              dataCard.prompts[0].description,
              dataCard.prompts[1].description
            );
          } catch (error) {
            card = new Card(
              dataCard.suit,
              dataCard.value,
              dataCard.prompts[0].description
            );
          }

          if (dataCard.season == 'Spring') {
            this.springCards.push(card);
          } else if (dataCard.season == 'Summer') {
            this.summerCards.push(card);
          } else if (dataCard.season == 'Fall') {
            this.fallCards.push(card);
          } else if (dataCard.season == 'Winter') {
            this.winterCards.push(card);
          }
        });
      }

      shuffle(this.springCards);
      shuffle(this.summerCards);
      shuffle(this.fallCards);
      shuffle(this.winterCards);
    });
  }
}

// https://bost.ocks.org/mike/shuffle/ -> Algorithme de Fisher-Yates
function shuffle(array) {
  var m = array.length,
    t,
    i;

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
    this.fullDeck = config.springCards.concat(
      config.summerCards,
      config.fallCards,
      config.winterCards
    );
  }

  drawCard() {
    //Retourne un objet Card
    console.log(this.fullDeck);
    return this.fullDeck.shift();
  }

  discard(amount) {
    this.fullDeck.slice(0, amount); //Enleve les cartes de l'index 0 a "amount" non-inclus
  }
}

export { Deck, DeckConfig };
