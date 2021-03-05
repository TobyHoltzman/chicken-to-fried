import React from 'react';
import { Card, CardContent, Checkbox, Typography } from '@material-ui/core';

const Shipment = (props) => {
    const { cityFrom , cityTo, value } = props.props;
    console.log(props);

    return (
        <Card className="shipment">
            <CardContent>
                <Typography>
                    {cityFrom}
                </Typography>
                <Typography>
                    {cityTo}
                </Typography>
                <Typography>
                    {value}
                </Typography>
                
            </CardContent>
            <Checkbox/>
        </Card>

    );
}

export default Shipment;