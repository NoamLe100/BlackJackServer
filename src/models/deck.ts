import { Card, Suit, CardValue } from "./card";

const suits: Suit[] = ["hearts", "diamonds", "clubs", "spades"];
const values: CardValue[] = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

export class Deck {
  private cards: Card[];

  constructor() {
    this.cards = [];

    for (const suit of suits) {
      for (const value of values) {
        this.cards.push({
          suit: suit,
          value: value,
        });
      }
    }
    this.shuffle();
  }
  public getCardsRemaining(): number {
    return this.cards.length;
  }

  public drawCard(): Card {
    const card = this.cards.pop();
    if (card === undefined) {
      throw Error("deck is empty");
    }
    return card;
  }
  public shuffle(): void {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const cardI = this.cards[i];
      const cardJ = this.cards[j];

      if (cardI === undefined || cardJ === undefined) {
        continue;
      }

      this.cards[i] = cardJ;
      this.cards[j] = cardI;
    }
  }
}
