import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { applyDiceRoll } from 'actions';
import {
    selectDice, selectAttackingTerritory, selectDefendingTerritory
} from 'selectors';
import { DIE_CHARS } from 'utils/constants';

const Die = ({num, color}) => {
    return <span className="die" style={{color}}>
        {DIE_CHARS[num]}
    </span>;
};

class DiceResults extends PureComponent {
    handleContinue = () => {
        this.props.applyDiceRoll();
    };

    render() {
        const { attacker, defender, victors } = this.props;

        return <>
            {victors.map(([winningDie, losingDie, type], i) => {
                const winner = type === 'A' ? attacker : defender;
                const loser = type === 'A' ? defender : attacker;
                return <div key={i}>
                    <Die num={winningDie} color={winner.color} />
                    <span className="beats">{' beats '}</span>
                    <Die num={losingDie} color={loser.color} />
                </div>;
            })}
            <div>
                <button onClick={this.handleContinue}>Continue</button>
            </div>
        </>;
    }
}

export default connect(state => ({
    victors: selectDice(state).victors,
    attacker: selectAttackingTerritory(state).owner,
    defender: selectDefendingTerritory(state).owner,
}), { applyDiceRoll })(DiceResults);
