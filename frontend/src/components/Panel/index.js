import React from 'react';
import { connect } from 'react-redux'
import {
    getPlayers, getHoverTerritory, selectUnclaimedTerritories
} from 'selectors';
import Item from './Item';
import PlayerItem from './PlayerItem';

const Panel = props => {
    return <div className="panel">
        <h1>Asterisk</h1>
        <section>
            <p>Mode: {props.mode}</p>
        </section>
        <section className="players">
            <h2>Players</h2>
            {props.players.map(player =>
                <PlayerItem player={player} />
            )}
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
    hoverTerritory: getHoverTerritory(state),
    unclaimed: selectUnclaimedTerritories(state),
}))(Panel);
