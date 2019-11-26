import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { endTurn } from 'actions';
import { selectAttacking, selectAttacked } from 'selectors';

class AttackSummary extends PureComponent {
    handleEndTurn = () => {
        this.props.endTurn();
    };

    render() {
        const { attacking, attacked } = this.props;

        return <div className="attack-summary">
            {attacking
                ? <div>
                    <span className="country" style={{
                        backgroundColor: attacking.owner.color,
                    }}>
                        {attacking.name}
                    </span>
                </div>
                : <div>Choose a country to attack from</div>
            }

            {attacked
                ? <>
                    <div>{'\u2694'}</div>
                    <div>
                        <span className="country" style={{
                            backgroundColor: attacked.owner.color,
                        }}>
                            {attacked.name}
                        </span>
                    </div>
                </>
                : <div>Choose a country to attack</div>
            }

            <div><button onClick={this.handleEndTurn}>End Turn</button></div>
        </div>;
    }
}

export default connect(state => ({
    attacking: selectAttacking(state),
    attacked: selectAttacked(state),
}), { endTurn })(AttackSummary);
