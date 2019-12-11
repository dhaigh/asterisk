import React from 'react';
import { connect } from 'react-redux'
import { getPlayers } from 'selectors';
import PlayerItem from './PlayerItem';

const PlayerSummary = ({ players }) => {
    return players.map(player =>
        <PlayerItem key={player.id} player={player} />
    );
};

export default connect(state => ({
    players: getPlayers(state),
}))(PlayerSummary);
