import { Card, Suit, CardValue } from './card';
import { Deck } from './deck';

const suits: Suit[] = ['hearts', 'diamonds', 'clubs', 'spades'];
const values: CardValue[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

const valueMap: Record<CardValue, number> = {
  'A': 11, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
  'J': 10, 'Q': 10, 'K': 10
};


export class Player
{
    private money :number;
    private bet : number;
    private cards :Card[];
    private sum : number;
    private deck :Deck;
    
    constructor( deck :Deck , money:number, name:string ) 
    {
        this.money=money;
        this.cards = [];
        this.deck=deck;
        this.cards.push(this.deck.drawCard());
        this.cards.push(this.deck.drawCard());
        this.sum= this.calculateSum();
        this.bet=0;
    }
    
    public calculateSum(): number {
  let sum = 0;
  let aceCount = 0;

  for (const card of this.cards) {
    if (card.value === 'A') {
      aceCount++;
      sum += 11;
    } else if (card.value === 'J' || card.value === 'Q' || card.value === 'K') {
      sum += 10;
    } else {
      sum += Number(card.value);
    }
  }

  while (sum > 21 && aceCount > 0) 
    {
    sum -= 10; 
    aceCount--;
     }

  this.sum = sum;
  return sum;
}
}