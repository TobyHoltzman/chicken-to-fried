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


export function drawFirstTrain(G, ctx, index) {
    if (index < 0) { // Drawing from deck
        const chicken = G.chickenDeck.pop();
        G.players[ctx.currentPlayer].chickens.push(chicken);
    }
    else {
        const chicken = G.trainShown.splice(index, 1)[0];
        G.players[ctx.currentPlayer].chickens.push(chicken);
        if (chicken.color === colors.MULTI) {
            ctx.events.endTurn();
        }
        const shownChicken = G.chickenDeck.pop();
        G.trainShown.push(shownChicken);
    }
};

export function drawSecondTrain(G, ctx, index) {
    if (index < 0) { // Drawing from deck
        const chicken = G.chickenDeck.pop();
        G.players[ctx.currentPlayer].chickens.push(chicken);
    }
    else {
        const chicken = G.trainShown.splice(index, 1)[0];
        if (chicken.color === colors.MULTI) {
            return INVALID_MOVE;
        }
        G.players[ctx.currentPlayer].chickens.push(chicken);
        const shownChicken = G.chickenDeck.pop();
        G.trainShown.push(shownChicken);
        ctx.events.endTurn();
    }
}

export function drawDestination(G, ctx, selections) {
    if (selections.length === 0 || selections.length > 3) { 
        return INVALID_MOVE;
    }
    const player = G.players[ctx.currentPlayer];
    [0, 1, 2].forEach(choice => {
        const shipment = player.shipmentChoices[i];
        if (selections.includes(choice)) {
            player.shipments.push(shipment);
        }
        else {
            G.shipmentDeck.push(shipment)
            ctx.Shuffle(G.shipmentDeck);
        }
    });


    ctx.events.endTurn();
};

export function claimRoute(G, ctx, routeIndex) {
    const route = G.routes[routeIndex];
    const hand = G.players[ctx.currentPlayer].chickens;
    if (countTrainsOfColor(hand, route.color) <= route.length && G.players[ctx.currentPlayer].numChickens >= route.length) {
        G.players[ctx.currentPlayer].chickens = removeTrainsOfColor(hand, route.color, route.length);
        G.routes[routeIndex].player = ctx.currentPlayer;
        G.players[ctx.currentPlayer].numChickens -= route.length;

        if (player.numChickens <= 3) {
            ctx.events.endPhase();
        }
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
    return countTrainsOfColor(hand, route.color) >= route.length;    
}

export function removeTrainsOfColor(hand, color, length) {
    return hand.filter((color))
}

export const ChickenToFried = {
    setup: (ctx) => {
        console.log(ctx)
        const [ chickenDeck, trainShown, trainHand ] = initializeTrainDeck(ctx);
        const [ shipmentDeck, shipments ] = initializeDestinationDeck(ctx);
        return {
            shipmentDeck: shipmentDeck,
            chickenDeck: chickenDeck,
            trainShown: trainShown,
            players: Array(ctx.numPlayers).fill({
                numChickens: 45,
                chickenColor: colors.GRAY,
                name: '',
                chickens: trainHand,
                shipments: shipments,
                shipmentChoices: [],
            }),
            routes: initializeRoutes(),
        }
    },

    turn: {
        stages: {
            move: {
                moves: { drawFirstTrain, claimRoute, drawShipment }
            },
            drawSecondTrain: {
                moves: { drawSecondTrain } 
            },
            drawShipment: {
                moves: { drawDestination }
            }
        }
    },

    phases: {
        draw: {

        },
        play: {
            endIf: isGameEnding
        },
        endgame: {

        }
    },

    moves: {
        drawTrain,
        drawDestination,
        claimRoute
    }
}