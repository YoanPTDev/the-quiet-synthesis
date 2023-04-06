import Card from './card.js';

class DeckConfig {
  constructor(springCards, summerCards, fallCards, winterCards) {
    this.springCards = springCards; //Array de Card
    this.summerCards = summerCards; //Array de Card
    this.fallCards = fallCards; //Array de Card
    this.winterCards = winterCards; //Array de Card
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

export default Deck;
