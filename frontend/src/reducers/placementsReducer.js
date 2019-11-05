import * as types from 'actions/types';

const initialPlacements = {};

export default (placements = initialPlacements, action) => {
    if (action.type === types.INIT) {
        const newPlacements = {};

        action.map.continents.forEach(continent => {
            continent.territories.forEach(territory => {
                newPlacements[territory.id] = {
                    playerId: null,
                    numTroops: 0,
                };
            });
        });

        return newPlacements;

    } else if (action.type === types.PLACE) {
        const { territoryId, playerId } = action;
        const placement = placements[territoryId];

        if (placement.playerId !== playerId && placement.playerId !== null) {
            return placements;
        }

        return {
            ...placements,
            [territoryId]: {
                playerId,
                numTroops: placement.numTroops + 1,
            },
        };
    }

    return placements;
};
