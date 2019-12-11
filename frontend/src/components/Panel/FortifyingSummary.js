import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { endTurn } from 'actions';

class FortifyingSummary extends PureComponent {
    handleEndTurn = () => {
        this.props.endTurn();
    };

    render() {
        return <div className="summary">
            <div className="long">
                Hold <span className="key">R</span> and click to pick up armies
                from territories with more than one
            </div>
            <div><button onClick={this.handleEndTurn}>End Turn</button></div>
        </div>;
    }
};

export default connect(state => ({
}), { endTurn })(FortifyingSummary);
