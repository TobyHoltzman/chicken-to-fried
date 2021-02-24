import React from 'react';
import PropTypes from 'prop-types';

import Deck from './components/Deck';
import Hand from './components/Hand';

const ChickenToFriedBoard = (props) => {
    console.log('board props', props);
    const player = props.G.players[props.playerID];
    console.log('player', player);
    return (
        <div className="game">
            <div className="deck"><Deck props={props}/></div>
            <div className="hand"><Hand props={props}/></div>
        </div>
    );
};

ChickenToFriedBoard.propTypes = {
    G: PropTypes.any.isRequired,
    ctx: PropTypes.any.isRequired,
    moves: PropTypes.any.isRequired,
};

 export default ChickenToFriedBoard;