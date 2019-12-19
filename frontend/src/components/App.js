import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import Map from './Map'
import Panel from './Panel'
import Tooltip from './Tooltip'
import { load, setViewingNeighbours, setPickingArmies } from 'actions';

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
            mousePos: [e.pageX, e.pageY],
        });
    };

    handleKeyDown = (e) => {
        if (e.key === 'Shift') {
            this.props.setViewingNeighbours(true);
        } else if (e.key === 'Alt') {
            this.props.setPickingArmies(true);
        }
    };

    handleKeyUp = (e) => {
        if (e.key === 'Shift') {
            this.props.setViewingNeighbours(false);
        } else if (e.key === 'Alt') {
            this.props.setPickingArmies(false);
        }
    };

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('keyup', this.handleKeyUp);
        document.addEventListener('mousemove', this.handleMouseMove);
        this.props.load().then(() => {
            this.setState({loaded: true});
        });
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
        document.removeEventListener('keyup', this.handleKeyUp);
        document.removeEventListener('mousemove', this.handleMouseMove);
    }

    render() {
        if (!this.state.loaded) {
            return <p>Loading...</p>;
        }

        return <>
            <Map />
            <Tooltip mousePos={this.state.mousePos} />
            <Panel />
        </>;
    }
}

export default connect(
    null,
    { load, setViewingNeighbours, setPickingArmies }
)(App)
