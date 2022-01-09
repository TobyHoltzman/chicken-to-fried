import React from "react";
import {
  Card,
  CardContent,
  Checkbox,
  Switch,
  Typography,
} from "@material-ui/core";

const City = (props) => {
  console.log("shipment props", props);
  const { city } = props;

  const onCityClick = () => {
    console.log("city ", city.name, " clicked");
  };

  return (
    <g
      onClick={onCityClick}
      style={{ cursor: "pointer", fill: "rgb(55, 55, 196)" }}
    >
      <text
        x={city.x}
        y={city.y + 25}
        style={{ font: "bold 16px sans-serif", fill: "blue" }}
      >
        {city.name}
      </text>
      <circle cx={city.x} cy={city.y} r="10" />
    </g>
  );
};

export default City;
