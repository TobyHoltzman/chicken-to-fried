import React from "react";

const ChickenHand = (props) => {
  const { G, playerID } = props;

  const cards = [];
  const chickens = G.players[playerID].chickens;

  chickens.forEach((color) => {
    if (color.length) {
      cards.push(
        <div className="handChicken">
          <img src={"img/" + color[0].path} key={color[0].color} />
          <a>{color.length}</a>
        </div>
      );
    }
  });

  return <div className="chickenHand">{cards}</div>;
};

export default ChickenHand;
