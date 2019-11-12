import React from 'react';
import { connect } from 'react-redux'
import {
    getPlayers, getHoverTerritory, selectUnclaimedTerritories
} from 'selectors';
import Item from './Item';

const Panel = props => {
    return <div className="panel">
        <h1>Asterisk</h1>
        <section>
            <p>Mode: {props.mode}</p>
        </section>
        <section className="players">
            <h2>Players</h2>
            {props.players.map(player =>
                <Item
                    key={player.id}
                    color={player.color}
                    text={player.name}
                />
            )}
            {props.unclaimed.length > 0 && <>
                <h2>Still Unclaimed</h2>
                {props.unclaimed.map(territory =>
                    <Item
                        key={territory.id}
                        color={territory.continent.color}
                        text={territory.name}
                    />
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
