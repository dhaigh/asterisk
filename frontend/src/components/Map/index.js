import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import Circle from './Circle'
import Territory from './Territory'
import { whoseTurn } from 'selectors';

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
        const { armies, color } = this.props.player;

        return <svg className="map" onMouseMove={this.handleMouseMove} style={{
            borderColor: color,
        }}>
            {/* make all the <path>s and <Circle>s */}
            {this.props.territoryIds.map(tid =>
                <Territory key={tid} tid={tid} />
            )}

            {/* tooltip army count */}
            {armies &&
                <Circle x={x - 2} y={y - 2} count={armies} color={color} />
            }
        </svg>;
    }
}

export default connect(state => ({
    territoryIds: state.map.territories.allIds,
    player: whoseTurn(state),
}))(Map)
