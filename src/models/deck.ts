import { Card, Suit, CardValue } from './card';

const suits: Suit[] = ['hearts', 'diamonds', 'clubs', 'spades'];
const values: CardValue[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

export class Deck {
  private cards: Card[];

 constructor() {
  this.cards = [];

  for (const suit of suits) {
    for (const value of values) {
      this.cards.push({
        suit: suit,
        value: value,
        imagePath: `${value}_of_${suit}.png`
      });
    }
  }
}
  public getCardsRemaining(): number {
    return this.cards.length;
  }

  public drawCard() : Card
  {
   const card= this.cards.pop();
   if (card === undefined)
   {
    throw   Error("deck is empty");
   }
   return card;
  }
}

  
   