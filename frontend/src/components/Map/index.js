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

        return <div className="map">
            <h1>Asterisk</h1>
            <svg onMouseMove={this.handleMouseMove} style={{
                borderColor: color,
            }}>
                <pattern id="crosshatch" x="0" y="0" width="20" height="20"
                    patternUnits="userSpaceOnUse"
                >
                    <rect className="square yellow" x="0" y="0" width="10" height="10" />
                    <rect className="square red" x="10" y="0" width="10" height="10" />
                    <rect className="square yellow" x="10" y="10" width="10" height="10" />
                    <rect className="square red" x="0" y="10" width="10" height="10" />
                </pattern>

                {/* make all the <path>s and <Circle>s */}
                {this.props.territoryIds.map(tid =>
                    <Territory key={tid} tid={tid} />
                )}

                {/* tooltip army count */}
                {armies &&
                    <Circle x={x - 2} y={y - 2} count={armies} color={color} />
                }
            </svg>
            <div className="hint">
                Hold <span className="key">Shift</span> key to view territory neighbours.
            </div>
        </div>;
    }
}

export default connect(state => ({
    territoryIds: state.map.territories.allIds,
    player: whoseTurn(state),
}))(Map)
