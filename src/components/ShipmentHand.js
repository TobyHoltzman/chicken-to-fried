import React from "react";
import Shipment from "./Shipment";

const ShipmentHand = (props) => {
  const { G, playerID } = props;

  const cards = [];
  const shipments = G.players[playerID].shipments;

  shipments.forEach((shipment, index) => {
    cards.push(<Shipment {...shipment} key={index} />);
  });

  return <div className="shipmentHand">{cards}</div>;
};

export default ShipmentHand;
