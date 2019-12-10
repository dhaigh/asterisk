import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { endTurn } from 'actions';
import Conflict from './Conflict';
import Territory from './Territory';
import {
    whoseTurn, selectAttackingTerritory, selectDefendingTerritory
} from 'selectors';

class AttackSummary extends PureComponent {
    handleEndTurn = () => {
        this.props.endTurn();
    };

    render() {
        const { attacking, defending, playerName } = this.props;

        return <div className="attack-summary">
            <div>
                {playerName + '\'s turn '}
                <button onClick={this.handleEndTurn}>End</button>
            </div>

            <Territory territory={attacking}>
                Choose a country to attack from
            </Territory>

            {attacking && <>
                <div>{'\u2694'}</div>
                <Territory territory={defending}>
                    Choose a country to attack
                </Territory>
                </>
            }

            {attacking && defending && <Conflict />}
        </div>;
    }
}

export default connect(state => ({
    playerName: whoseTurn(state).name,
    attacking: selectAttackingTerritory(state),
    defending: selectDefendingTerritory(state),
}), { endTurn })(AttackSummary);
