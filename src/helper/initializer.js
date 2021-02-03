export function initializeTrainDeck(ctx) {
    let deck = [];
    trainCards.forEach((card) => {
        for (let i = 0; i < 5; i++) {
            deck.push(card);
        }
    });

    deck = ctx.random.Shuffle(deck);
    let shownTrains = deck.splice(0, 5);
    let hands = Array(ctx.numPlayers).fill([
        deck.pop(), deck.pop(), deck.pop()
    ]);
    console.log(hands);
    return [ deck, shownTrains, hands ];
}

export function initializeDestinationDeck(ctx) {
    let deck = [
        { from: 'Seattle', to: 'Vancouver', value: 5 },
        { from: 'Seattle', to: 'Vancouver', value: 5 },
        { from: 'Seattle', to: 'Vancouver', value: 5 },
        { from: 'Seattle', to: 'Vancouver', value: 5 },
        { from: 'Seattle', to: 'V ancouver', value: 5 },
        { from: 'Seattle', to: 'Vancouver', value: 5 },
        { from: 'Seattle', to: 'Vancouver', value: 5 },
        { from: 'Seattle', to: 'Vancouver', value: 5 },
        { from: 'Seattle', to: 'Vancouver', value: 5 },
        { from: 'Seattle', to: 'Vancouver', value: 5 },
        { from: 'Seattle', to: 'Vancouver', value: 5 },
        { from: 'Seattle', to: 'Vancouver', value: 5 },
        { from: 'Seattle', to: 'Vancouver', value: 5 },
    ]
    deck = ctx.random.Shuffle(deck);
    let hands = Array(ctx.numPlayers).fill([
        deck.pop()
    ]);
    return [ deck, hands ];
}

export function initializeRoutes() {
    return [
        { from: 'Vancouver', to: 'Seattle', length: 2, color: colors.GRAY, player: null},
        { from: 'Vancouver', to: 'Seattle', length: 2, color: colors.GRAY, player: null}
    ]
}
