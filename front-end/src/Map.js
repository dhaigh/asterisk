import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import Territory from './Territory'

class Map extends PureComponent {
    render() {
        return this.props.continents.map((con) => {
            return con.territories.map((ter) => {
                return <Territory
                    id={ter.id}
                    color={con.color}
                    circle={ter.circle}
                    d={ter.d}
                    key={ter.id}
                />
            });
        })
    }
}

export default connect(state => ({
    continents: state.continents,
    territories: state.territories,
    selected: state.selected,
    others: state.others,
}))(Map);
