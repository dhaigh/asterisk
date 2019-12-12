import React from 'react';
import { connect } from 'react-redux'
import * as consts from 'utils/constants';
import { whoseTurn, getPlayers, getHoverTerritory } from 'selectors';
import AttackSummary from './AttackSummary';
import FortifyingSummary from './FortifyingSummary';
import PlayerSummary from './PlayerSummary';

const Panel = props => {
    return <div className="panel" style={{
        borderColor: props.whoseTurn.color,
    }}>
        <h1>Asterisk</h1>
        <section>
            <h2>{props.mode}</h2>
            {props.mode === consts.M_ATTACKING ? <AttackSummary /> :
             props.mode === consts.M_FORTIFYING ? <FortifyingSummary /> :
                <PlayerSummary />
            }
        </section>

        <section className="territory">
            Territory: {props.hoverTerritory && props.hoverTerritory.name}
        </section>
    </div>;
};

export default connect(state => ({
    mode: state.game.mode,
    players: getPlayers(state),
    whoseTurn: whoseTurn(state),
    hoverTerritory: getHoverTerritory(state),
}))(Panel);
