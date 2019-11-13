import * as types from 'actions/types';
import { buildAdjacencyMap } from 'utils';

const initialMap = () => ({
    territories: {
        byId: {},
        allIds: [],
    },
    continents: {
        byId: {},
        allIds: [],
    },
});

const handlePlace = (tById, action, gameMode) => {
    const tid = action.territoryId;
    const pid = action.playerId;
    const territory = tById[tid];

    if (gameMode === 'claiming') {
        if (tById[tid].ownerId === null) {
            // can only claim a territory if it hasn't already been claimed
            return {
                ...tById,
                [tid]: {
                    ...territory,
                    ownerId: pid,
                    armies: 1,
                },
            };
        }

    } else if (gameMode === 'reinforcing' || gameMode === 'placing') {
        // can't place when another player already owns it
        if (territory.ownerId === pid) {
            return {
                ...tById,
                [tid]: {
                    ...territory,
                    armies: territory.armies + 1,
                },
            };
        }
    }

    return tById;
};

export default (map = initialMap(), action, gameMode) => {
    if (action.type === types.INIT) {
        const newMap = initialMap();
        const { neighbours, continents } = action.data.map;
        const neighbourMapping = buildAdjacencyMap(neighbours);

        continents.forEach(continent => {
            continent.territories.forEach(territory => {
                // populate map.territories
                newMap.territories.byId[territory.id] = {
                    id: territory.id,
                    name: territory.name,
                    circle: territory.circle,
                    continentId: continent.id,
                    d: territory.d,
                    neighbours: neighbourMapping[territory.id],
                    ownerId: null,
                    armies: 0,
                };
                newMap.territories.allIds.push(territory.id);
            });

            // populate map.continents
            newMap.continents.byId[continent.id] = {
                id: continent.id,
                name: continent.name,
                color: continent.color,
                bonus: continent.bonus,
                territoryIds: continent.territories.map(t => t.id),
            };
            newMap.continents.allIds.push(continent.id);
        });

        return newMap;

    } else if (action.type === types.PLACE) {
        return {
            ...map,
            territories: {
                ...map.territories,
                byId: handlePlace(map.territories.byId, action, gameMode),
            },
        };
    }

    return map;
};
