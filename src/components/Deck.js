import React from 'react';

const Deck = (props) => {
    console.log('props are ', props);
    const { G, ctx, moves, playerID } = props.props;
    console.log('G is', G);
    const { chickensShown } = G;

    const cards = [];
    chickensShown.forEach((card, index) => {
        const path = "/img/" + card.path;
        cards.push(
            <div className="adsf">
                <img 
                src={path}
                onClick={() => {
                    if (ctx.currentPlayer === playerID) {
                        if (ctx.activePlayers &&
                                ctx.activePlayers[playerID] &&
                                ctx.activePlayers[playerID].includes("drawSecondChicken")) {
                            moves.drawSecondChicken(index);
                        }
                        else {
                            moves.drawFirstChicken(index);
                        }
                    }
                }}
                key={index}
                />
            </div>
        );
    });
    cards.push(
        <div className="asdf">
            <img
            src="/img/chicken-deck.png"
            onClick={() => {
                if (ctx.currentPlayer === playerID) {
                    if (ctx.activePlayers &&
                            ctx.activePlayers[playerID] &&
                            ctx.activePlayers[playerID].includes("drawSecondChicken")) {
                        moves.drawSecondChicken(-1);
                    }
                    else {
                        moves.drawFirstChicken(-1);
                    }
                }
            }}
            key={6}
            />
        </div>
    );
    
    return (
        <div className="deck">
            {cards}
        </div>
    );
}

export default Deck;