import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import Circle from './Circle'
import Map from './Map'
import { load, setViewingNeighbours } from 'actions';

class App extends PureComponent {
    state = {
        loaded: false,
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
        this.props.load().then(() => {
            this.setState({loaded: true});
        });
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
        document.removeEventListener('keyup', this.handleKeyUp);
    }

    render() {
        if (!this.state.loaded) {
            return <p>Loading...</p>;
        }

        const [ x, y ] = this.state.mousePos;
        const { color, troopCount } = this.props.player;

        return <>
            <svg onMouseMove={this.handleMouseMove}>
                <Map map={this.props.map} />
                <Circle x={x - 2} y={y - 2} count={troopCount} color={color} />
            </svg>
            <section className="panel">
                <h1>Asterisk</h1>
                <section className="territory">Territory: {this.props.hoverTerritory && this.props.hoverTerritory.name}</section>
            </section>
            <br className="clearboth" />
            <p className="hint">Hold <span className="key">Shift</span> key to view territory neighbours.</p>
        </>;
    }
}

export default connect(state => ({
    player: state.players[state.myId],
    hoverTerritory: state.neighbours.tid ?
        state.map.territories[state.neighbours.tid] : null,
}), { load, setViewingNeighbours })(App)
