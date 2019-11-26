import React from 'react';
import { connect } from 'react-redux'
import * as consts from 'utils/constants';
import {
    whoseTurn,
    getPlayers, getHoverTerritory, selectUnclaimedTerritories
} from 'selectors';
import Item from './Item';
import PlayerItem from './PlayerItem';
import AttackSummary from './AttackSummary';

const PlayerSummary = ({ players }) => {
    return players.map(player =>
        <PlayerItem key={player.id} player={player} />
    );
};

const Panel = props => {
    return <div className="panel" style={{
        borderColor: props.whoseTurn.color,
    }}>
        <h1>Asterisk</h1>
        <section>
            <h2>{props.mode}</h2>
            {props.mode === consts.M_ATTACKING
                ? <AttackSummary />
                : <PlayerSummary players={props.players} />
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
