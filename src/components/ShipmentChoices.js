import { Button, Checkbox, Dialog, DialogContent } from "@material-ui/core";
import React from "react";
import Shipment from "./Shipment";

const ShipmentChoices = (props) => {
  const { G, moves, playerID } = props;

  const cards = [];
  const shipmentChoices = G.players[playerID].shipmentChoices;

  const open = shipmentChoices.length > 0;
  const [selectedShipments, setSelectedShipments] = React.useState([
    true,
    true,
    true,
  ]);

  const toggleSelected = (shipmentIndex) => {
    selectedShipments[shipmentIndex] = !selectedShipments[shipmentIndex];
    setSelectedShipments([...selectedShipments]);
  };

  const onConfirm = () => {
    moves.chooseShipments(selectedShipments);
    setSelectedShipments([true, true, true]);
  };
  shipmentChoices.forEach((shipment, index) => {
    const shipmentProps = {
      selected: selectedShipments[index],
      toggleSelected: toggleSelected,
      shipmentIndex: index,
      ...shipment,
    };
    cards.push(
      <div>
        <Shipment {...shipmentProps} key={index} />
      </div>
    );
  });

  return (
    <div className="shipmentChoices">
      <Dialog open={open}>
        <div>{cards}</div>
        <Button color="primary" onClick={onConfirm}>
          Confirm
        </Button>
      </Dialog>
    </div>
  );
};

export default ShipmentChoices;
