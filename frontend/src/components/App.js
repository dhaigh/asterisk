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

    render() {
        if (!this.props.player) {
            return null;
        }

        const [ x, y ] = this.state.mousePos;
        const { color, troopCount } = this.props.player;

        return <svg onMouseMove={this.handleMouseMove}>
            <Map continents={this.props.continents} />
            <Circle x={x + 15} y={y + 15} count={troopCount} color={color} />
        </svg>;
    }
}

export default connect(state => ({
    player: state.player,
    continents: state.continents,
}))(App)
