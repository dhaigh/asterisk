import React from 'react';
import { connect } from 'react-redux'
import Territory from './Territory'

const Map = ({ map }) => {
    const territories = Object.entries(map.territories);

    return territories.map(([tid, ter]) => {
        tid = parseInt(tid);
        const { color } = map.continents[ter.continentId];

        return <Territory
            key={tid}
            id={tid}
            color={color}
            circle={ter.circle}
            d={ter.d}
        />;
    });
};

// get map from redux here rather than passing it in as prop from <App />
// because redux diffing algo seems faster than the react props one (at least
// in this case)
export default connect(state => ({
    map: state.map,
}))(Map);