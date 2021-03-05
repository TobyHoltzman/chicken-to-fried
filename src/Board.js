import React from 'react';
import PropTypes from 'prop-types';

import Deck from './components/Deck';
import ChickenHand from './components/ChickenHand';
import ShipmentHand from './components/ShipmentHand';
import ShipmentChoices from './components/ShipmentChoices';

const ChickenToFriedBoard = (props) => {
    console.log('board props', props);
    return (
        <div className="game">
            <div className="deck"><Deck {...props}/></div>
            <div className="hand">
                <ChickenHand {...props}/>
                <br/>
                <ShipmentHand {...props}/>
            </div>
            <div className="choices"><ShipmentChoices {...props}/></div>
        </div>
    );
};

ChickenToFriedBoard.propTypes = {
    G: PropTypes.any.isRequired,
    ctx: PropTypes.any.isRequired,
    moves: PropTypes.any.isRequired,
};

export default ChickenToFriedBoard;