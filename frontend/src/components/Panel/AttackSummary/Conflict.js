import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { setAttackingWith, setDefendingWith, rollDice } from 'actions';
import {
    selectAttackingTerritory, selectDefendingTerritory,
    selectAttackingArmies, selectDefendingArmies
} from 'selectors';
import DiceResults from './DiceResults';

const armies = n => (
    n === 1 ? `${n} army` : `${n} armies`
);

class Conflict extends PureComponent {
    attackHandler = numArmies => () => {
        this.props.setAttackingWith(numArmies);
    };

    defendHandler = numArmies => () => {
        this.props.setDefendingWith(numArmies);
    };

    handleRoll = () => {
        this.props.rollDice();
    };

    render() {
        if (this.props.dice) {
            return <DiceResults />;
        }

        const {
            attacking, attackingArmies, defending, defendingArmies
        } = this.props;
        const attackButtons = [];
        const defendButtons = [];

        if (defending) {
            for (let n = 1; n <= Math.min(3, attacking.armies - 1); n++) {
                attackButtons.push(
                    <div key={n}>
                        <button onClick={this.attackHandler(n)}>Attack with {n}</button>
                    </div>
                );
            }

            for (let n = 1; n <= Math.min(2, defending.armies); n++) {
                defendButtons.push(
                    <div key={n}>
                        <button onClick={this.defendHandler(n)}>Defend with {n}</button>
                    </div>
                );
            }
        }

        return attackingArmies === null ? attackButtons : <>
            <div>Attacking with {armies(attackingArmies)}</div>
            {defendingArmies === null ? defendButtons : <>
                <div>Defending with {armies(defendingArmies)}</div>
                <div><button onClick={this.handleRoll}>Roll Dice</button></div>
            </>}
        </>;
    }
}

export default connect(state => ({
    dice: state.game.conflict.dice,
    attacking: selectAttackingTerritory(state),
    defending: selectDefendingTerritory(state),
    attackingArmies: selectAttackingArmies(state),
    defendingArmies: selectDefendingArmies(state),
}), { setAttackingWith, setDefendingWith, rollDice })(Conflict);
