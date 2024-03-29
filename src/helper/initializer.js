import { colors, chickenCards } from "./cards.js";

function handByColor(hand) {
  console.log("hand", hand);
  const outHand = [];
  for (let i = 0; i < Object.keys(colors).length; i++) {
    outHand.push([]);
  }
  hand.forEach((card) => {
    outHand[card.color].push(card);
  });
  console.log("outhand", outHand);
  return outHand;
}

export function initializeChickenDeck(ctx) {
  let deck = [];
  chickenCards.forEach((card) => {
    for (let i = 0; i < 16; i++) {
      deck.push(card);
    }
  });

  deck = ctx.random.Shuffle(deck);
  let shownChickens = deck.splice(0, 5);
  const hands = [];
  for (let i = 0; i < ctx.numPlayers; i++) {
    hands.push(handByColor(deck.splice(0, 4)));
  }

  return [deck, shownChickens, hands];
}

export function initializeShipmentDeck(ctx) {
  const cities = [
    "Seattle",
    "Vancouver",
    "Boston",
    "New York",
    "Los Angeles",
    "Winnipeg",
    "Atlanta",
    "San Francisco",
    "Denver",
  ];
  let deck = [];
  for (let i = 0; i < 20; i++) {
    deck.push({
      cityFrom: ctx.random.Shuffle(cities)[0],
      cityTo: ctx.random.Shuffle(cities)[0],
      value: ctx.random.D20(),
    });
  }
  deck = ctx.random.Shuffle(deck);

  return deck;
}

export function initializeRoutes() {
  return [
    { from: 0, to: 1, length: 2, color: colors.GRAY, playerID: null },
    { from: 1, to: 2, length: 2, color: colors.GRAY, playerID: null },
  ];
}

export function initializeCities() {
  return [
    { name: "Vancouver", x: 50, y: 50 },
    { name: "Seattle", x: 100, y: 200 },
    { name: "Boston", x: 950, y: 200 },
  ];
}
