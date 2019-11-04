import React from 'react';
import { connect } from 'react-redux'
import { intKeyEntries } from 'utils';
import PlayerItem from './PlayerItem';

const Panel = props => {
    return <div className="panel">
        <h1>Asterisk</h1>
        <section className="players">
            <h2>Players</h2>
            {intKeyEntries(props.players).map(([pid, player]) => {
                return <PlayerItem key={pid} player={player} />;
            })}
        </section>

        <section className="territory">
            Territory: {props.hoverTerritory && props.hoverTerritory.name}
        </section>
    </div>;
};

export default connect(state => ({
    myId: state.myId,
    players: state.players,
    hoverTerritory: state.neighbours.tid ?
        state.map.territories[state.neighbours.tid] : null,
}))(Panel);
