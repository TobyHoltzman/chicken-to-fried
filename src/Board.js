import React from 'react';
import PropTypes from 'prop-types';

import Deck from './components/Deck';

const ChickenToFriedBoard = (props) => {
    console.log('board props', props);
    const player = props.G.players[props.playerID];
    console.log('player', player);
    return (
        <div className="game">
            <div className="hand">
                {[...Array(player.chickens)].map((value, index) => (
                    <b>{player.chickens[index].length}</b>
                ))
                }
            </div>
            <div className="deck">
                <Deck props={props}/>
            </div>
        </div>
        
    );
};

ChickenToFriedBoard.propTypes = {
    G: PropTypes.any.isRequired,
    ctx: PropTypes.any.isRequired,
    moves: PropTypes.any.isRequired,
};

 export default ChickenToFriedBoard;