import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import Map from './Map'
import Circle from './Circle'

import './App.css';

class App extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { mousePos: [-1000, 0] };
        this.handleMouseMove = this.handleMouseMove.bind(this);
    }

    handleMouseMove(e) {
        this.setState({
            mousePos: [e.clientX, e.clientY],
        });
    }

    render() {
        const [ x, y ] = this.state.mousePos;
        const { color, troopCount } = this.props.player;

        return <svg onMouseMove={this.handleMouseMove}>
            <Map />
            <Circle x={x + 15} y={y + 15} value={troopCount} color={color} />
        </svg>;
    }
}

export default connect(state => ({
    player: state.player,
}))(App)
