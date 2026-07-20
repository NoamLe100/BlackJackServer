import { Card } from "./card"; 

export class Player {
  private balance: number;
  private bet: number;
  private cards: Card[];

  constructor(startingBalance: number, card1: Card, card2: Card) {
    this.balance = startingBalance;  
    this.bet = 0;        
    this.cards = [];
    this.addCard(card1);
    this.addCard(card2);
  }
  public placeBet(amount: number): void {   
  this.bet = amount;
  }
  public getBet():number{
    return this.bet;
  }

  public calculateSum(): number {
    let sum = 0;
    let aceCount = 0;

    for (const card of this.cards) {
      if (card.value === "A") {
        aceCount++;
        sum += 11;
      } else if (
        card.value === "J" ||
        card.value === "Q" ||
        card.value === "K"
      ) {
        sum += 10;
      } else {
        sum += Number(card.value);
      }
    }

    while (sum > 21 && aceCount > 0) {
      sum -= 10;
      aceCount--;
    }

    return sum;
  }
  public getBalance(): number {
  return this.balance;
}
  public getCards(): Card[] {
    return this.cards;
  }
  public addCard(card: Card): void {
    this.cards.push(card);
  }

  public addBalance(WinOrLose : boolean):void
  {
    if (WinOrLose==true)
      this.balance += this.bet;
    else
      this.balance -=this.bet;
  }
}
