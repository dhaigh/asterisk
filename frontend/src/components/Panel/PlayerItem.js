import React from 'react';
import Item from './Item';

const PlayerItem = ({ player }) => {
    const className = player.theirTurn ? 'their-turn' : null;

    return <Item color={player.color} className={className}>
        <div className="name">
            {player.name} (+{player.income})
        </div>
        <Item color={player.color} small={true}>
            {player.territoryCount} territories (+{player.incomeFromTerritories})
        </Item>
        {player.continents.map(continent =>
            <Item key={continent.id} color={continent.color} small={true}>
                {continent.name} (+{continent.bonus})
            </Item>
        )}
    </Item>;
}

export default PlayerItem;
