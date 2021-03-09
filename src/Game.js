
import { colors } from './helper/cards.js'
import { initializeShipmentDeck, initializeChickenDeck, initializeRoutes } from './helper/initializer.js';
import {
    drawFirstChicken,
    drawSecondChicken,
    drawShipments,
    chooseShipments,
    claimRoute,
} from './logic/moves.js';

export const ChickenToFried = {
    setup: (ctx) => {
        console.log(ctx);
        const [ chickenDeck, chickensShown, chickens ] = initializeChickenDeck(ctx);
        const shipmentDeck = initializeShipmentDeck(ctx);
        const players = [];
        for(let i = 0; i < ctx.numPlayers; i++) {
            players.push({
                numChickens: 45,
                chickenColor: colors.GRAY,
                name: '',
                chickens: chickens,
                shipments: [],
                shipmentChoices: [],
            });
        }
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
            },
        }
    },

    phases: {
        draw: {
            onBegin: (_, ctx) => ctx.events.setActivePlayers({
                all: 'draw',
                next: { 1: ctx.events.endPhase }
            }),
            turn: {
                stages: {
                    draw: { moves: { drawShipments } },
                    chooseShipments: { moves: { chooseShipments } }, 
                },
            },
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