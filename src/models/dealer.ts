import { Card, CardValue } from './card';

const valueMap: Record<CardValue, number> = {
  'A': 11, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
  'J': 10, 'Q': 10, 'K': 10
};

export class Dealer {
  private cards: Card[];
  private sum: number;

  constructor(card1 :Card , card2 :Card) {
    this.cards = [];
    this.addCard(card1);
    this.addCard(card2);
    this.sum = 0;
  }

  public addCard(card: Card): void {
    this.cards.push(card);
  }

  public calculateSum(): number {
    let sum = 0;
    let aceCount = 0;

    for (const card of this.cards) {
      sum += valueMap[card.value];
      if (card.value === 'A') aceCount++;
    }

    while (sum > 21 && aceCount > 0) {
      sum -= 10;
      aceCount--;
    }

    this.sum = sum;
    return sum;
  }
  public calculateFirstSum() : number {
    return valueMap[this.cards[0]!.value];
  }

  public shouldHit(): boolean {
    return this.calculateSum() < 17;
  }

  public getCards(): Card[] {
    return this.cards;
  }
  public dealerSetSum() :void
  {
    this.sum=0;
  }
  
}