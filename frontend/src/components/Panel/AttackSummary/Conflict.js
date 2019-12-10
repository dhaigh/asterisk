import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { setAttackingWith, setDefendingWith, rollDice } from 'actions';
import {
    selectAttackingTerritory, selectDefendingTerritory,
    selectAttackingArmies, selectDefendingArmies
} from 'selectors';

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
        const {
            attacking, attackingArmies,
            defending, defendingArmies
        } = this.props;
        const attackButtons = [];
        const defendButtons = [];

        if (defending) {
            for (let n = 1; n <= Math.min(3, attacking.armies); n++) {
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
            <div>Attacking with {attackingArmies} armies</div>
            {defendingArmies === null ? defendButtons : <>
                <div>Defending with {defendingArmies} armies</div>
                <div><button onClick={this.handleRoll}>Roll Dice</button></div>
            </>}
        </>;
    }
}

export default connect(state => ({
    attacking: selectAttackingTerritory(state),
    defending: selectDefendingTerritory(state),
    attackingArmies: selectAttackingArmies(state),
    defendingArmies: selectDefendingArmies(state),
}), { setAttackingWith, setDefendingWith, rollDice })(Conflict);
