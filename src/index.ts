import express ,{ Request ,Response} from 'express';
import cors from 'cors';
import { Deck } from './models/deck';

const app = express();
const port = 3000;
const myDeck = new Deck();

app.use(cors());
app.use(express.json());


app.get('/', (req: Request, res: Response) => 
{
  res.send('Hello World!');
});


app.listen(port, () => 
{
    console.log(`Example app listening on port ${port}`);
});

app.get('star', (req: Request, res: Response) => 
{
    console.log(myDeck.getCardsRemaining());
});

app.get('star', (req: Request, res: Response) => 
{
    const card = myDeck.drawCard();
    if (card) {
        console.log(card.suit); 
}   
});


