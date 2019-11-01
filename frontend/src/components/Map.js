import React from 'react';
import Territory from './Territory'

const Map = ({ continents }) => {
    return continents.map((con) => {
        return con.territories.map((ter) => {
            return <Territory
                id={ter.id}
                color={con.color}
                circle={ter.circle}
                d={ter.d}
                key={ter.id}
            />;
        });
    });
}

export default Map;
