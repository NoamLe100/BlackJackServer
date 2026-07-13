import { Card } from './card';
import { Deck } from './deck';
import { Player } from './player';
import { Dealer } from './dealer';

export class Game {
  private deck: Deck;
  private player: Player;
  private dealer: Dealer;

  constructor(playerMoney: number) {
    this.deck = new Deck();
    this.player = new Player(this.deck, playerMoney, 'Player');
    this.dealer = new Dealer(this.deck);
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

  public determineWinner(): string {
    const playerSum = this.getPlayerSum();
    const dealerSum = this.getDealerSum();

    if (playerSum > 21) return 'Dealer wins - Player busted';
    if (dealerSum > 21) return 'Player wins - Dealer busted';
    if (playerSum > dealerSum) return 'Player wins';
    if (dealerSum > playerSum) return 'Dealer wins';
    return 'Push - it\'s a tie';
  }
}