import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import Circle from './Circle'
import Territory from './Territory'
import { intKeyEntries } from 'utils';

class Map extends PureComponent {
    state = {
        mousePos: [-1000, 0],
    };

    handleMouseMove = (e) => {
        // these coords are relative to the top left corner of the viewport, so
        // when we make a troop count circle at these coords, it will naturally
        // be offset from the mouse pointer by the amount of padding where the
        // <svg> starts
        this.setState({
            mousePos: [e.pageX, e.pageY],
        });
    };

    render() {
        const [ x, y ] = this.state.mousePos;
        const { color, troopCount } = this.props.player;
        const territories = intKeyEntries(this.props.map.territories);

        return <svg className="map" onMouseMove={this.handleMouseMove}>
            {/* make all the <path>s and <Circle>s */}
            {territories.map(([tid, t]) => {
                const { color } = this.props.map.continents[t.continentId];

                return <Territory
                    key={tid}
                    id={tid}
                    territory={t}
                    continentColor={color}
                />;
            })}

            {/* tooltip troop count */}
            <Circle x={x - 2} y={y - 2} count={troopCount} color={color} />

        </svg>;
    }
}

export default connect(state => ({
    map: state.map,
    player: state.players[state.myId],
}))(Map)
