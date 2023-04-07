class Card {
  constructor(suit, value, prompt1, prompt2 = null) {
    this.suit = suit;
    this.value = value;
    this.prompt1 = prompt1;
    this.prompt2 = prompt2;
  }

  getSuit() {
    return this.suit;
  }

  getValue() {
    return this.value;
  }

  getPrompts() {
    return [this.prompt1, this.prompt2];
  }
}

export default Card;
