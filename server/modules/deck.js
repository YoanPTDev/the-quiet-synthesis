import Card from './card.js';
import { getDeckByName, getCardById } from '../db/db_DAO.js';

class DeckConfig {
  constructor() {
    this.springCards = new Array(); //Array de Card
    this.summerCards = new Array(); //Array de Card
    this.fallCards = new Array(); //Array de Card
    this.winterCards = new Array(); //Array de Card
  }

  async buildSeasons(deckName) {
    return new Promise(async (resolve) => {
      const dataDeck = await getDeckByName(deckName);
      for (let i = 0; i < dataDeck.cards.length; i++) {
        const dataCard = await getCardById(dataDeck.cards[i]);
        let card = null;

        card = new Card(
          dataCard._id,
          dataCard.suit,
          dataCard.season,
          dataCard.value
        );
        for (let j = 0; j < dataCard.prompts.length; j++) {
          card.prompts[j] = dataCard.prompts[j];
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
      }

      shuffle(this.springCards);
      shuffle(this.summerCards);
      shuffle(this.fallCards);
      shuffle(this.winterCards);

      resolve();
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
    this.currentCard;
  }

  static async build(deckName) {
    let config = new DeckConfig();
    await config.buildSeasons(deckName);
    return new Deck(config);
  }

  drawCard() {
    //Retourne un objet Card
    this.currentCard = this.fullDeck.shift();
    return this.currentCard;
  }

  discard(amount) {
    this.fullDeck.slice(0, amount); //Enleve les cartes de l'index 0 a "amount" non-inclus
  }
}

export { Deck, DeckConfig };
