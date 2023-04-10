class Card {
  constructor(id, suit, value, prompt1, prompt2 = null) {
    this.id = id;
    this.suit = suit;
    this.value = value;
    this.prompt1 = prompt1;
    this.prompt2 = prompt2;
  }
}

export default Card;
