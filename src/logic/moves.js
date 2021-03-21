import { INVALID_MOVE } from 'boardgame.io/core';
import { colors } from '../helper/cards.js'
import { createContext } from 'react';


// DRAW CHICKENS
export function drawFirstChicken(G, ctx, index) {
    if (index < 0) { // Drawing from deck
        const chicken = G.chickenDeck.pop();
        G.players[ctx.currentPlayer].chickens[chicken.color].push(chicken);
        ctx.events.setStage('drawSecondChicken');
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
        G.players[ctx.currentPlayer].chickens[chicken.color].push(chicken);
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
    if (selections.length === 0 || selections.length > 3 || selections.every(x=>!x)) { 
        return INVALID_MOVE;
    }
    const player = G.players[ctx.currentPlayer];
    selections.forEach((choice, index) => {
        const shipment = player.shipmentChoices[index];
        if (choice) {
            player.shipments.push(shipment);
        }
        else {
            G.shipmentDeck.push(shipment)
        }
    });

    player.shipmentChoices = [];
    ctx.events.endStage();
    if(!ctx.activePlayers ||
        (Object.keys(ctx.activePlayers).length === 1 && ctx.playerID in ctx.activePlayers)) {
        ctx.events.endTurn();
    }
    
};


// CLAIM ROUTE
export function claimRoute(G, ctx, routeID, selections) {
    // selections is a dict from colors to number of chosen cards
    const route = G.routes[routeID];
    const player = G.players[ctx.currentPlayer];
    const hand = player.chickens;

    if (!canClaimRoute(selections, route, player.numChickens)) {
        return INVALID_MOVE;
    }

    Object.keys(selections).forEach(color => {
        hand[color].splice(hand[color].length - selections[color]);
    });
    route.playerID = ctx.currentPlayer;
    player.numChickens -= route.length;

    if (player.numChickens <= 2) {
        ctx.events.endPhase();
    }
    ctx.events.endTurn();
}

export function canClaimRoute(selections, route, numChickens) {
    const keys = Object.keys(selections);
    const numCards = keys.reduce((prev, cur) => prev + selections[cur], 0);
    if (route.playerID !== null || numChickens < route.length || numCards !== route.length) {
        return false;
    }
    const hasMulti = keys.includes(colors.MULTI.toString());
    const hasColor = keys.includes(route.color.toString());
    console.log(keys, numCards, hasMulti, hasColor);
    return (route.color === colors.GRAY) ?
        keys.length === 1 || (keys.length === 2 && hasMulti) :
        (keys.length === 1 && (hasMulti || hasColor)) || (keys.length === 2 && hasMulti && hasColor);
}