import React from 'react';
import { Card, CardContent, Checkbox, Switch, Typography } from '@material-ui/core';

const City = (props) => {
    console.log('shipment props', props)
    const { city } = props;


    return (
        <circle cx={city.x} cy={city.y} r='10' />
    );
}

export default City;