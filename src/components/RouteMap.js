import React, { useState } from "react";
import { Button, Checkbox, Dialog, DialogContent } from "@material-ui/core";
import Route from "./Route";
import RouteSelectionDialog from "./RouteSelectionDialog";
import City from "./City";

const RouteMap = (props) => {
  const { G } = props;
  const routes = [];
  const cities = [];
  const [selectingRoute, setSelectingRoute] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState({});

  const routeCallback = (route) => {
    setSelectingRoute(true);
    setSelectedRoute(route);
  };

  const onClose = () => {
    setSelectingRoute(false);
  };

  G.routes.forEach((route, index) => {
    const routeProps = {
      route: route,
      routeID: index,
      routeCallback: routeCallback,
      ...props,
    };
    routes.push(<Route {...routeProps} />);
  });

  G.cities.forEach((city) => {
    const cityProps = {
      city: city,
      ...props,
    };
    cities.push(<City {...cityProps} />);
  });

  return (
    <>
      <RouteSelectionDialog
        isOpen={selectingRoute}
        route={selectedRoute}
        onClose={onClose}
      />
      <svg width="1000" height="600" xmlns="http://www.w3.org/2000/svg">
        <image href="/img/kfc_map.jpg" height="100%" x="0" y="0" />
        {routes}
        {cities}
      </svg>
    </>
  );
};

export default RouteMap;
