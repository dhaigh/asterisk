import React from 'react';
import Item from './Item';

const PlayerItem = ({ player }) => {
    return <Item key={player.id} color={player.color}>
        <div className="name">
            {player.name} (+{player.income})
        </div>
        <Item color={player.color} small={true}>
            {player.territoryCount} territories (+{player.incomeFromTerritories})
        </Item>
        {player.continents.map(continent =>
            <Item color={continent.color} small={true}>
                {continent.name} (+{continent.bonus})
            </Item>
        )}
    </Item>;
}

export default PlayerItem;
