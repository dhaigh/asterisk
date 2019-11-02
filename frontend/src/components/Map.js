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
        return this.props.map.continents.map(con => {
            return con.territories.map(ter => {
                return <Territory
                    key={ter.id}
                    id={ter.id}
                    color={con.color}
                    circle={ter.circle}
                    d={ter.d}
                />;
            });
        });
    }
}

export default connect(state => ({
    map: state.map,
}), { loadMap })(Map);
