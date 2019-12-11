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
                Hold <span className="key">Alt</span> and click to pick up armies
                from territories with at least two
            </div>
            <div><button onClick={this.handleEndTurn}>End Turn</button></div>
        </div>;
    }
};

export default connect(state => ({
}), { endTurn })(FortifyingSummary);
