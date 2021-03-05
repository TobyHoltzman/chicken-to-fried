import { Button, Checkbox, Dialog, DialogContent } from '@material-ui/core';
import React from 'react';
import Shipment from './Shipment';

const ShipmentChoices = (props) => {
    const { G, playerID } = props;

    const cards = [];
    const shipmentChoices = G.players[playerID].shipmentChoices;

    const open = shipmentChoices.length > 0;

    shipmentChoices.forEach((shipment, index) => {
        cards.push(
            <div>
                <Shipment props={shipment} key={index}/>
            </div>
            
        );
    });
    console.log('shipmentchoice', cards);
    
    return (
        <div className="shipmentChoices">
            <Dialog
            open={open}
            >
                <div>{cards}</div>
                <Button color="primary">Confirm</Button>
            </Dialog>
        </div>
    );
}

export default ShipmentChoices;