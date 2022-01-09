import React, { useCallback, useState } from "react";
import { Button, Checkbox, Dialog, DialogContent } from "@material-ui/core";
import Route from "./Route";
import City from "./City";

const RouteSelectionDialog = (props) => {
  const { isOpen, onClose, route, ctx, moves } = props;

  const onConfirm = useCallback(() => {
    // do something with route
    moves.selectRoute(route.id, ctx.currentPlayer);

    onClose();
  }, [moves]);

  return (
    <Dialog open={isOpen}>
      <Button onClick={onConfirm}>Confirm</Button>
    </Dialog>
  );
};

export default RouteSelectionDialog;
