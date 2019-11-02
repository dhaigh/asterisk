import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import Circle from './Circle'
import Map from './Map'

export class App extends PureComponent {
    state = {
        mousePos: [-1000, 0],
    };

    handleMouseMove = (e) => {
        this.setState({
            mousePos: [e.clientX, e.clientY],
        });
    };

    handleChange = () => {
        this.props.dispatch({type: 'toggle_borders'});
    };

    render() {
        if (!this.props.player) {
            return null;
        }

        const [ x, y ] = this.state.mousePos;
        const { color, troopCount } = this.props.player;

        return <>
            <svg onMouseMove={this.handleMouseMove}>
                <Map />
                <Circle x={x + 15} y={y + 15} count={troopCount} color={color} />
            </svg>
            <p>
                <label>
                    borders:{' '}
                    <input type="checkbox" onChange={this.handleChange} />
                </label>
            </p>
            {this.props.selectedTerritory &&
                <p>{this.props.selectedTerritory.name}</p>
            }
        </>;
    }
}

export default connect(state => ({
    player: state.players[1],
    selectedTerritory: state.map.selectedTerritory ?
        state.map.territories[state.map.selectedTerritory] : null,
}))(App)
