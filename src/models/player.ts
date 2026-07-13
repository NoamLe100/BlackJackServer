import { Card, Suit, CardValue } from './card';
import { Deck } from './deck';

const suits: Suit[] = ['hearts', 'diamonds', 'clubs', 'spades'];
const values: CardValue[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

export class Player
{
    private money :number;
    private bet : number;
    private cards :Card[];
    private sum : number;
    private deck :Deck;
    constructor( deck :Deck , money:number) 
    {
        this.money=money;
        this.cards = [];
        this.deck=deck;
        this.cards.push(this.deck.drawCard());
        this.cards.push(this.deck.drawCard());
        this.sum=0;
        this.bet=0;
    }
    

}