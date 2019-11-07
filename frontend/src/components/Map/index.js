import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import Circle from './Circle'
import Territory from './Territory'
import { getSelf } from 'selectors';

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
        const { color, troopCount } = this.props.self;
        const { territories, continents } = this.props.map;

        return <svg className="map" onMouseMove={this.handleMouseMove}>
            {/* make all the <path>s and <Circle>s */}
            {Object.values(territories).map(t => {
                return <Territory
                    key={t.id}
                    territory={t}
                    continentColor={continents[t.continentId].color}
                />;
            })}

            {/* tooltip troop count */}
            <Circle x={x - 2} y={y - 2} count={troopCount} color={color} />

        </svg>;
    }
}

export default connect(state => ({
    map: state.map,
    self: getSelf(state),
}))(Map)
