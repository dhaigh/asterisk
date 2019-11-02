import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import Circle from './Circle'
import Map from './Map'
import { setBorderMode } from 'actions';

export class App extends PureComponent {
    state = {
        mousePos: [-1000, 0],
    };

    handleMouseMove = (e) => {
        this.setState({
            mousePos: [e.clientX, e.clientY],
        });
    };

    handleKeyDown = (e) => {
        if (e.key === 'Shift') {
            this.props.setBorderMode(true);
        }
    };

    handleKeyUp = (e) => {
        if (e.key === 'Shift') {
            this.props.setBorderMode(false);
        }
    };

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('keyup', this.handleKeyUp);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
        document.removeEventListener('keyup', this.handleKeyUp);
    }

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
            {this.props.hoverTerritory &&
                <p>{this.props.hoverTerritory.name}</p>
            }
        </>;
    }
}

export default connect(state => ({
    player: state.players[1],
    hoverTerritory: state.map.hoverTerritory ?
        state.map.territories[state.map.hoverTerritory] : null,
}), { setBorderMode })(App)
