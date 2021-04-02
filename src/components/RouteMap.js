import React from 'react';
import Route from './Route';
import City from './City';

const RouteMap = (props) => {
    const { G } = props;
    const routes = [];
    const cities = [];

    G.routes.forEach(route => {
        const routeProps = {
            route: route,
            ...props,
        }
        routes.push(
            <Route {...routeProps}/>
        );
    });

    G.cities.forEach(city => {
        const cityProps = {
            city: city,
            ...props,
        }
        cities.push(
            <City {...cityProps}/>
        );
    });


    return (
        <svg width='1000' height='600' xmlns='http://www.w3.org/2000/svg'>
            <image href='/img/kfc_map.jpg' height='100%' x='0' y='0'/>
            {routes}
            {cities}
        </svg>
    );
}

export default RouteMap;