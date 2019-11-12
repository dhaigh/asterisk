import React from 'react';
import { connect } from 'react-redux'
import { getPlayers, getHoverTerritory } from 'selectors';
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
                <PlayerItem key={player.id} player={player} />
            )}
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
}))(Panel);
