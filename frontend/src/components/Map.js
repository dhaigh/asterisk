import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import Territory from './Territory'
import { loadMap } from 'actions';
import mapData from 'map.json';

class Map extends PureComponent {
    componentDidMount() {
        this.props.loadMap(mapData);
    }

    render() {
        const { map } = this.props;
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
    }
}

export default connect(state => ({
    map: state.map,
}), { loadMap })(Map);
