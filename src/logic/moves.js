import { INVALID_MOVE } from 'boardgame.io/core';
import { colors } from '../helper/cards.js'
import { createContext } from 'react';


// DRAW CHICKENS
export function drawFirstChicken(G, ctx, index) {
    if (index < 0) { // Drawing from deck
        const chicken = G.chickenDeck.pop();
        G.players[ctx.currentPlayer].chickens.push(chicken);
    }
    else {
        const chicken = G.chickensShown.splice(index, 1)[0];
        G.players[ctx.currentPlayer].chickens[chicken.color].push(chicken);
        if (chicken.color === colors.MULTI) {
            ctx.events.endTurn();
        }
        else {
            ctx.events.setStage('drawSecondChicken');
        }
        const shownChicken = G.chickenDeck.pop();
        G.chickensShown.push(shownChicken);
    }
};

export function drawSecondChicken(G, ctx, index) {
    if (index < 0) { // Drawing from deck
        const chicken = G.chickenDeck.pop();
        G.players[ctx.currentPlayer].chickens.push(chicken);
        ctx.events.endTurn();
    }
    else {
        const chicken = G.chickensShown.splice(index, 1)[0];
        if (chicken.color === colors.MULTI) {
            return INVALID_MOVE;
        }
        G.players[ctx.currentPlayer].chickens[chicken.color].push(chicken);
        const shownChicken = G.chickenDeck.pop();
        G.chickensShown.push(shownChicken);
        ctx.events.endTurn();
    }
}


// DRAW SHIPMENTS
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


// CLAIM ROUTE
export function claimRoute(G, ctx, routeID) {
    const route = G.routes[routeID];
    const player = G.players[ctx.currentPlayer];
    const hand = player.chickens;
    if (canClaimRoute(hand, route)) {
        ctx.events.setStage('chooseChickens');
    }
    else {
        return INVALID_MOVE;
    }
}

export function chooseChickens(G, ctx, routeID, selections) {
    // selections is a dict from colors to chosen cards
    const route = G.routes[routeID];
    const player = G.players[ctx.currentPlayer];
    const hand = player.chickens;

    selections.keys.forEach(color => {
        hand[color].splice(selections[color].length);
    });
    route.player = ctx.currentPlayer;
    player.numChickens -= route.length;

    if (G.players[ctx.currentPlayer].numChickens <= 2) {
        ctx.events.endPhase();
    }
    ctx.events.endTurn();
}

export function canClaimRoute(hand, route) {
    if (route.color === colors.GRAY) {
        return hand.flat().length >= route.length;
    }

    return hand[route.color].length + hand[colors.MULTI].length >= route.length;    
}