    import { Card } from './card';
    import { Deck } from './deck';
    import { Player } from './player';
    import { Dealer } from './dealer';

    export class Game {
    private deck: Deck;
    private player: Player;
    private dealer: Dealer;

    constructor(playerBet: number)
    {
        this.deck = new Deck();
        this.player = new Player(playerBet,this.deck.drawCard(),this.deck.drawCard());
        this.dealer = new Dealer(this.deck.drawCard(),this.deck.drawCard());
    }

    public playerHit(): void {
        const card: Card = this.deck.drawCard();
        this.player.addCard(card);
    }

    public dealerTurn(): void {
        while (this.dealer.shouldHit()) {
        const card: Card = this.deck.drawCard();
        this.dealer.addCard(card);
        }
    }

    public getPlayerSum(): number {
        return this.player.calculateSum();
    }

    public getDealerSum(): number {
        return this.dealer.calculateSum();
    }
    public firstCardSum(): number {
        return this.dealer.calculateFirstSum()
    }
  
    

    public determineWinner(): string {
        const playerSum = this.getPlayerSum();
        const dealerSum = this.getDealerSum();

        if (playerSum > 21) 
        return 'Dealer wins - Player busted';
        if (dealerSum > 21) 
        return 'Player wins - Dealer busted';
        if (playerSum > dealerSum) 
        return 'Player wins';
        if (dealerSum > playerSum) 
        return 'Dealer wins';
        return 'Push';
    }
    public getPlayerCards(): Card[] {  
        return this.player.getCards();
    }

    public getDealerCards(): Card[] {   
        return this.dealer.getCards();
    }
    public placeBet(amount: number): void {
  this.player.placeBet(amount);
}

public getBalance(): number {
  return this.player.getBalance();
}
public getBet():number{
    return this.player.getBet();
}
public doubleDown():void {
 this.placeBet(this.getBet()*2);
 this.playerHit();
}
public settleBet(): void {
  const result = this.determineWinner();
  const playerWon = result.startsWith('Player wins');
  this.player.addBalance(playerWon);
}
    }