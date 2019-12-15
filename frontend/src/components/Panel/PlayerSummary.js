import React from 'react';
import { connect } from 'react-redux'
import { getPlayers, selectUnclaimedTerritories } from 'selectors';
import Item from './Item';
import PlayerItem from './PlayerItem';

const PlayerSummary = ({ players, unclaimed }) => {
    return <>
        {players.map(player =>
            <PlayerItem key={player.id} player={player} />
        )}
        {unclaimed.length > 0 && <>
            <h2>Still Unclaimed</h2>
            {unclaimed.map(t =>
                <Item key={t.id} color={t.continent.color}>
                    {t.name}
                </Item>
            )}
        </>}
    </>;
};

export default connect(state => ({
    players: getPlayers(state),
    unclaimed: selectUnclaimedTerritories(state),
}))(PlayerSummary);
