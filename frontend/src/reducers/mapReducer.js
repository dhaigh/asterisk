import * as types from 'actions/types';
import * as consts from 'utils/constants';
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

const handleSelect = (tById, action, gameMode) => {
    const tid = action.territoryId;
    const pid = action.playerId;
    const territory = tById[tid];

    if (gameMode === consts.M_CLAIMING) {
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

    } else if (gameMode === consts.M_REINFORCING || gameMode === consts.M_PLACING) {
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

export default (map = initialMap(), action, {game}) => {
    if (action.type === types.INIT) {
        // since INIT actions only get made once we probably could just do a
        // shallow clone of initialMap and go from there, but this way is more
        // robust and lets us dispatch INIT multiple times without side effects
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

    } else if (action.type === types.SELECT) {
        return {
            ...map,
            territories: {
                ...map.territories,
                byId: handleSelect(map.territories.byId, action, game.mode),
            },
        };

    } else if (action.type === types.APPLY_DICE_ROLL) {
        const { attackingTid, defendingTid, dice } = game.conflict;
        const attacking = {...map.territories.byId[attackingTid]};
        const defending = {...map.territories.byId[defendingTid]};

        attacking.armies -= dice.losses.attacking;
        defending.armies -= dice.losses.defending;

        if (defending.armies <= 0) {
            defending.ownerId = attacking.ownerId;
            defending.armies = dice.attacking.length;
            attacking.armies -= dice.attacking.length;
        }

        return {
            ...map,
            territories: {
                ...map.territories,
                byId: {
                    ...map.territories.byId,
                    [attackingTid]: attacking,
                    [defendingTid]: defending,
                },
            },
        };
    }

    return map;
};
