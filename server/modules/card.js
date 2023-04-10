class Card {
  constructor(id, suit, season, value) {
    this.id = id;
    this.suit = suit;
    this.season = season;
    this.value = value;
    this.prompts = new Array();
  }
}

export default Card;
