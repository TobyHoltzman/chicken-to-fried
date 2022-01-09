import React from "react";
import { initializeCities } from "../helper/initializer.js";

const Route = (props) => {
  console.log("shipment props", props);
  const { route, routeCallback } = props;
  const { to, from, length, color, player } = route;

  const cities = initializeCities();
  const city1 = cities[to];
  const city2 = cities[from];

  const routePath = `M ${city1.x} ${city1.y} C ${city1.x - 50} ${
    city1.y + 50
  }, ${city2.x + 50} ${city2.y + 50}, ${city2.x} ${city2.y}`;

  const onRouteClick = () => {
    console.log("clicked route from", city2, "to", city1);
    routeCallback(route);
  };
  const routeID = "route" + city1.name + city2.name;

  return (
    <g
      onClick={onRouteClick}
      style={{ cursor: "pointer", fill: "rgb(55, 55, 196)" }}
    >
      <path
        d={routePath}
        strokeWidth="10"
        stroke="gray"
        fill="transparent"
        id={routeID}
      />
      <text style={{ font: "bold 25px sans-serif", fill: "green" }}>
        <textPath startOffset="50%" href={"#" + routeID}>
          {length}
        </textPath>
      </text>
    </g>
  );
};

export default Route;
