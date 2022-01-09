import React from "react";
import {
  Card,
  CardContent,
  Checkbox,
  Switch,
  Typography,
} from "@material-ui/core";

const Shipment = (props) => {
  console.log("shipment props", props);
  const { cityFrom, cityTo, value, selected, shipmentIndex, toggleSelected } =
    props;

  const onSwitch = () => {
    toggleSelected(shipmentIndex);
  };

  const shipmentSwitch =
    selected !== undefined ? (
      <Switch checked={selected} onChange={onSwitch} />
    ) : (
      <div></div>
    );

  return (
    <Card className="shipment">
      <CardContent>
        <Typography>{cityFrom}</Typography>
        <Typography>{cityTo}</Typography>
        <Typography>{value}</Typography>
      </CardContent>
      {shipmentSwitch}
    </Card>
  );
};

export default Shipment;
