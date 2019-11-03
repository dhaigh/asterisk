import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import Circle from './Circle'
import Map from './Map'
import { loadMap, setViewingNeighbours } from 'actions';

class App extends PureComponent {
    state = {
        mousePos: [-1000, 0],
    };

    handleMouseMove = (e) => {
        // these coords are relative to the top left corner of the viewport, so
        // when we make a troop count circle at these coords, it will naturally
        // be offset from the mouse pointer by the amount of padding where the
        // <svg> starts
        this.setState({
            mousePos: [e.clientX, e.clientY],
        });
    };

    handleKeyDown = (e) => {
        if (e.key === 'Shift') {
            this.props.setViewingNeighbours(true);
        }
    };

    handleKeyUp = (e) => {
        if (e.key === 'Shift') {
            this.props.setViewingNeighbours(false);
        }
    };

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('keyup', this.handleKeyUp);
        this.props.loadMap();
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
        document.removeEventListener('keyup', this.handleKeyUp);
    }

    render() {
        const [ x, y ] = this.state.mousePos;
        const { color, troopCount } = this.props.player;

        return <>
            <svg onMouseMove={this.handleMouseMove}>
                <Map map={this.props.map} />
                <Circle x={x - 2} y={y - 2} count={troopCount} color={color} />
            </svg>
            {this.props.hoverTerritory &&
                <p>{this.props.hoverTerritory.name}</p>
            }
        </>;
    }
}

export default connect(state => ({
    player: state.players[1],
    hoverTerritory: state.neighbours.tid ?
        state.map.territories[state.neighbours.tid] : null,
}), { loadMap, setViewingNeighbours })(App)
