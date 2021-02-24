import React from 'react';

const Hand = (props) => {
    const { G, playerID } = props.props;

    const cards = [];
    const chickens = G.players[playerID].chickens;

    chickens.forEach((color, index) => {
        console.log('color', color);
        if (color.length) {
            cards.push(
                <div className="handChicken">
                    <img src={'img/' + color[0].path} key={index}/>
                    <a>{color.length}</a>
                </div>
            );
        }
    });
    
    return (
        <div className="chickenHand">
            {cards}
        </div>
    );
}

export default Hand;