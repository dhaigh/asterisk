import React from 'react';
import { connect } from 'react-redux'
import * as consts from 'utils/constants';
import {
    whoseTurn,
    getPlayers, getHoverTerritory, selectUnclaimedTerritories
} from 'selectors';
import Item from './Item';
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
            {props.unclaimed.length > 0 && <>
                <h2>Still Unclaimed</h2>
                {props.unclaimed.map(t =>
                    <Item key={t.id} color={t.continent.color}>
                        {t.name}
                    </Item>
                )}
            </>}
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
    unclaimed: selectUnclaimedTerritories(state),
}))(Panel);
