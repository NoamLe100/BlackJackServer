import express, { Request, Response } from 'express';
import cors from 'cors';
import { Game } from './models/game';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let game: Game | null = null;

app.get('/', (req: Request, res: Response) => {
  res.send('Blackjack server running!');
});

app.post('/start', (req: Request, res: Response) => {
  const money = req.body.money ?? 2500;
  game = new Game(money);
  res.json({
    playerSum: game.getPlayerSum(),
    dealerSum: game.getDealerSum()
  });
});

app.post('/hit', (req: Request, res: Response) => {
  if (!game) {
    res.status(400).json({ error: 'No game in progress. Call /start first.' });
    return;
  }
      game.playerHit();
  const playerSum = game.getPlayerSum();

  if (playerSum > 21) {
    res.json({
      playerSum,
      busted: true,
      result: 'Dealer wins - Player busted'
    });
    return;
  }

  res.json({ playerSum, busted: false });
});

app.post('/stand', (req: Request, res: Response) => {
  if (!game) {
    res.status(400).json({ error: 'No game in progress. Call /start first.' });
    return;
  }
  game.dealerTurn();
  const result = game.determineWinner();
  res.json({
    playerSum: game.getPlayerSum(),
    dealerSum: game.getDealerSum(),
    result
  });
});

app.listen(port, () => {
  console.log(`Blackjack server listening on port ${port}`);
});