import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import Map from './Map'
import Panel from './Panel'
import { load, setViewingNeighbours, setPickingArmies } from 'actions';

class App extends PureComponent {
    state = {
        loaded: false,
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

        return <>
            <Map />
            <Panel />
        </>;
    }
}

export default connect(
    null,
    { load, setViewingNeighbours, setPickingArmies }
)(App)
