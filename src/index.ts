import express, { Request, Response } from "express";
import cors from "cors";
import { Game } from "./models/game";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let game: Game | null = null;
let playerBalance = 2500;

app.get("/", (req: Request, res: Response) => {
  res.send("Blackjack server running!");
});

app.post("/start", (req: Request, res: Response) => {
  const bet = req.body.bet;

  if (bet > playerBalance || bet <= 0) {
    res.status(400).json({ error: "Invalid bet amount" });
    return;
  }
  game = new Game(playerBalance);
  game.placeBet(req.body.bet);
  res.json({
    playerSum: game.getPlayerSum(),
    dealerSum: game.firstCardSum(),
    playerCards: game.getPlayerCards(),
    dealerCards: game.getDealerCards(),
    balance: game.getBalance(),
    bet: game.getBet(),
  });
  return;
});
app.post("/double", (req: Request, res: Response) => {
  if (!game) {
    res.status(400).json({ error: "No game in progress. Call /start first." });
    return;
  }

  game.doubleDown();

  res.json({
    playerSum: game.getPlayerSum(),
    playerCards: game.getPlayerCards(),
    busted: game.getPlayerSum() > 21,
  });
});

app.post("/hit", (req: Request, res: Response) => {
  if (!game) {
    res.status(400).json({ error: "No game in progress. Call /start first." });
    return;
  }
  game.playerHit();
  const playerSum = game.getPlayerSum();

  if (playerSum > 21) {
    res.json({
      playerSum,
      playerCards: game.getPlayerCards(),
      busted: true,
      result: "Dealer wins - Player busted",
    });
    return;
  }

  res.json({ playerSum, playerCards: game.getPlayerCards(), busted: false });
});

app.get("/balance", (req: Request, res: Response) => {
  res.json({ balance: playerBalance });
});

app.post("/stand", (req: Request, res: Response) => {
  if (!game) {
    res.status(400).json({ error: "No game in progress. Call /start first." });
    return;
  }
  game.dealerTurn();
  const result = game.determineWinner();
  game.settleBet();
  playerBalance = game.getBalance();
  res.json({
    playerSum: game.getPlayerSum(),
    playerCards: game.getPlayerCards(),
    dealerSum: game.getDealerSum(),
    dealerCards: game.getDealerCards(),
    balance: game.getBalance(),
    result,
  });

  return;
});

app.listen(port, () => {
  console.log(`Blackjack server listening on port ${port}`);
});
