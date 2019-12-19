import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import Territory from './Territory'
import { whoseTurn } from 'selectors';

class Map extends PureComponent {
    render() {
        return <div className="map">
            <h1>Asterisk</h1>
            <svg style={{
                borderColor: this.props.player.color,
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
