import * as types from 'actions/types';

const initialPlacements = {};

export default (placements = initialPlacements, action) => {
    if (action.type === types.CLAIM) {
        const { territoryId, playerId } = action;
        const placement = placements[territoryId];

        if (placement) {
            // can't claim a territory if it is already claimed
            return placements;
        }

        return {
            ...placements,
            [territoryId]: {
                ownerId: playerId,
                numTroops: 1,
            },
        };

    } else if (action.type === types.PLACE) {
        const { territoryId, playerId } = action;
        const placement = placements[territoryId];

        // can't place when another player already owns it
        if (placement.ownerId !== playerId) {
            return placements;
        }

        return {
            ...placements,
            [territoryId]: {
                ...placement,
                numTroops: placement.numTroops + 1,
            },
        };
    }

    return placements;
};
