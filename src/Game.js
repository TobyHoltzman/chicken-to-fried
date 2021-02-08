import { INVALID_MOVE } from 'boardgame.io/core';
import { colors, trainCards } from './helper/cards.js'
import { initializeShipmentDeck, initializeChickenDeck, initializeRoutes } from './helper/initializer.js';



export function drawFirstChicken(G, ctx, index) {
    if (index < 0) { // Drawing from deck
        const chicken = G.chickenDeck.pop();
        G.players[ctx.currentPlayer].chickens.push(chicken);
    }
    else {
        const chicken = G.chickensShown.splice(index, 1)[0];
        G.players[ctx.currentPlayer].chickens.push(chicken);
        if (chicken.color === colors.MULTI) {
            ctx.events.endTurn();
        }
        const shownChicken = G.chickenDeck.pop();
        G.chickensShown.push(shownChicken);
    }
    ctx.events.setStage('drawSecondChicken');
};

export function drawSecondChicken(G, ctx, index) {
    if (index < 0) { // Drawing from deck
        const chicken = G.chickenDeck.pop();
        G.players[ctx.currentPlayer].chickens.push(chicken);
    }
    else {
        const chicken = G.chickensShown.splice(index, 1)[0];
        if (chicken.color === colors.MULTI) {
            return INVALID_MOVE;
        }
        G.players[ctx.currentPlayer].chickens.push(chicken);
        const shownChicken = G.chickenDeck.pop();
        G.chickensShown.push(shownChicken);
        ctx.events.endTurn();
    }
}

export function drawShipments(G, ctx) {
    const player = G.players[ctx.currentPlayer];
    player.shipmentChoices = G.shipmentDeck.splice(0, 3);
    ctx.events.setStage('chooseShipments');
}

export function chooseShipments(G, ctx, selections) {
    if (selections.length === 0 || selections.length > 3) { 
        return INVALID_MOVE;
    }
    const player = G.players[ctx.currentPlayer];
    [0, 1, 2].forEach(choice => {
        const shipment = player.shipmentChoices[choice];
        if (selections.includes(choice)) {
            player.shipments.push(shipment);
        }
        else {
            G.shipmentDeck.push(shipment)
            G.shipmentDeck = ctx.random.Shuffle(G.shipmentDeck);
        }
    });

    player.shipmentChoices = [];
    ctx.events.endTurn();
};

export function claimRoute(G, ctx, routeID) {
    const route = G.routes[routeID];
    const hand = G.players[ctx.currentPlayer].chickens;
    if (countTrainsOfColor(hand, route.color) <= route.length && G.players[ctx.currentPlayer].numChickens >= route.length) {
        G.players[ctx.currentPlayer].chickens = removeTrainsOfColor(hand, route.color, route.length);
        G.routes[routeID].player = ctx.currentPlayer;
        G.players[ctx.currentPlayer].numChickens -= route.length;

        if (G.players[ctx.currentPlayer].numChickens <= 2) {
            ctx.events.endPhase();
        }

        ctx.events.endTurn();
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

export function canClaimRoute(G, hand, routeID) {
    const route = G.routes[routeID];
    return countTrainsOfColor(hand, route.color) >= route.length;    
}

export function removeTrainsOfColor(hand, color, length) {
    return hand.filter((color))
}

export const ChickenToFried = {
    setup: (ctx) => {
        console.log(ctx);
        const [ chickenDeck, chickensShown, chickens ] = initializeChickenDeck(ctx);
        const shipmentDeck = initializeShipmentDeck(ctx);
        const players = Array(ctx.numPlayers).fill({
            numChickens: 45,
            chickenColor: colors.GRAY,
            name: '',
            chickens: chickens,
            shipments: [],
            shipmentChoices: [],
        });
        players.forEach((player, index) => {
            player.chickens = chickens[index];
        });
        return {
            shipmentDeck: shipmentDeck,
            chickenDeck: chickenDeck,
            chickensShown: chickensShown,
            players: players,
            routes: initializeRoutes(),
        }
    },

    turn: {
        stages: {
            move: {
                moves: { drawFirstChicken, claimRoute, drawShipments }
            },
            drawSecondChicken: {
                moves: { drawSecondChicken } 
            },
            chooseShipments: {
                moves: { chooseShipments }
            }
        }
    },

    phases: {
        draw: {
            moves: { drawShipments },
            start: true,
            next: 'play'
        },
        play: {
            moves: { drawFirstChicken, drawShipments, claimRoute },
            next: 'endgame'
        },
        endgame: {
            moves: { claimRoute, drawShipments }
        }
    },

    moves: {
        drawFirstChicken,
        drawShipments,
        claimRoute
    }
}