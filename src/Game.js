import { INVALID_MOVE } from 'boardgame.io/core';
import { initializeDestinationDeck, initializeTrainDeck, initializeRoutes } from './helper/initializer.js';

export const colors = {
    RED: 0,
    BLUE: 1,
    GREEN: 2,
    YELLOW: 3,
    PINK: 4,
    GRAY: 5,
    MULTI: 6,
};

export const trainCards = [
    { color: colors.RED },
    { color: colors.BLUE },
    { color: colors.GREEN },
    { color: colors.YELLOW },
    { color: colors.PINK },
];


export function drawTrain(G, ctx, index) {
    if (index < 0) { // Drawing from deck
        const train = G.trainDeck.pop();
        G.trainHand[ctx.currentPlayer].push(train);
    }
    else {
        const train = G.trainShown.splice(index, 1)[0];
        G.trainHand[ctx.currentPlayer].push(train)
        const shownTrain = G.trainDeck.pop();
        G.trainShown.push(shownTrain);
    }
};

export function drawDestination(G, ctx) {
    const ticket = G.destinationDeck.pop();
    G.destinationHand[ctx.currentPlayer].push(ticket);
};

export function claimRoute(G, ctx, routeIndex) {
    const route = G.routes[routeIndex];
    const hand = G.trainHand[ctx.currentPlayer];
    if (countTrainsOfColor(hand, route.color) <= route.length) {
        G.trainHand[ctx.currentPlayer] = removeTrainsOfColor(hand, route.color, route.length);
        G.routes[routeIndex].player = ctx.currentPlayer;
    }
    else {
        return INVALID_MOVE;
    }
}

export function countTrainsOfColor(hand, color) {
    const validCards = hand.filter((card) => {
        return card.color === colors.MULTI || card.color === color || color === colors.GRAY;
    });
    return validCards.length;
}

export function canClaimRoute(hand, route) {
    return countTrainsOfColor(hand, route.color) <= route.length;    
}

export function removeTrainsOfColor(hand, color, length) {
    
}



export const ChickenToFried = {
    setup: (ctx) => {
        console.log(ctx)
        const [ trainDeck, trainShown, trainHand ] = initializeTrainDeck(ctx);
        const [ destinationDeck, destinationHand ] = initializeDestinationDeck(ctx);
        return {
            destinationDeck: destinationDeck,
            destinationHand: destinationHand,
            trainDeck: trainDeck,
            trainShown: trainShown,
            trainHand: trainHand,
            routes: initializeRoutes(),
        }
    },
    moves: {
        drawTrain,
        drawDestination,
        claimRoute
    }
}