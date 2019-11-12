import { createSelector } from 'reselect'
import { sum } from 'utils';
import * as consts from 'utils/constants';

// -----------------------------------------------------------------------------
// players
export const getSelf = state => {
    const { myId } = state.players;
    if (myId === -1) {
        return null;
    }

    return state.players.byId[myId];
};

const getOrder = state => state.players.order;
const getById = state => state.players.byId;
export const getPlayers = createSelector(
    getOrder, getById,
    (order, byId) => order.map(pid => byId[pid])
);

// -----------------------------------------------------------------------------
// territory stuff

export const getTerritoryById = (state, tid) => {
    const territory = state.map.territories.byId[tid];
    const continent = state.map.continents.byId[territory.continentId];

    return {
        ...territory,
        continent,
    };
};

// all of the below is specific to <Territory /> components:

const getTerritoryId = (_, props) => props.tid;

export const getHoverTerritory = state => {
    const tid = state.neighbours.tid;
    if (tid !== null) {
        return state.map.territories.byId[tid];
    }
    return null;
};

const getNeighbours = state => {
    const territory = getHoverTerritory(state);
    if (territory) {
        return territory.neighbours;
    }
    return [];
};

const selectIsNeighbour = createSelector(
    getTerritoryId,
    getNeighbours,
    (tid, neighbours) => neighbours.indexOf(tid) >= 0
);

const territoryClassName = (state, props) => {
    const { neighbours } = state;

    if (neighbours.on) {
        if (getTerritoryId(null, props) === neighbours.tid) {
            return 'active';
        } else if (selectIsNeighbour(state, props)) {
            return 'neighbour';
        }
    }

    return null;
};

const _getTerritory = createSelector(
    state => state,
    getTerritoryId,
    (state, tid) => getTerritoryById(state, tid)
);

const getOwner = createSelector(
    state => state.players,
    _getTerritory,
    (players, territory) => {
        if (territory.ownerId !== null) {
            return players.byId[territory.ownerId];
        }
        return null;
    }
);

export const getTerritory = createSelector(
    _getTerritory, getOwner, territoryClassName,
    (territory, owner, className) => {
        return {
            ...territory,
            owner,
            className,
        };
    }
);

const selectTerritories = state => {
    return state.map.territories.allIds.map(tid => {
        return getTerritoryById(state, tid);
    });
};

export const selectUnclaimedTerritories = createSelector(
    selectTerritories,
    territories => {
        const unclaimed = territories.filter(t => t.ownerId === null);
        if (unclaimed.length > 7) {
            return [];
        }
        return unclaimed;
    }
);


// -----------------------------------------------------------------------------
// game stuff

export const whoseTurn = state => {
    // for all of the following:
    // suppose order = [2, 3, 1] (values in order array are player IDs)
    // ---------------------------------
    // when turn = 0:
    // index = 0 % 3
    //       = 0
    // order[0] = player 2
    // ---------------------------------
    // when turn = 2
    // index = 2 % 3
    //       = 2
    // order[2] = player 1
    // ---------------------------------
    // when turn = 4
    // index = 4 % 3
    //       = 1
    // order[1] = player 3
    const index = state.game.turn % state.players.order.length;
    return state.players.byId[state.players.order[index]];
};

// returns territory IDs that are owned by a given player ID
export const selectTerritoriesOwned = createSelector(
    (map, _) => map.territories,
    (_, pid) => pid,
    (territories, pid) => {
        return territories.allIds.filter(tid => {
            return territories.byId[tid].ownerId === pid;
        });
    }
);

// returns continent IDs where every territory is owned by a given player ID
export const selectContinentsOwned = createSelector(
    (map, _) => map,
    (_, pid) => pid,
    (map, pid) => {
        // count num territories per continent
        const countPerCont = Object.fromEntries(
            map.continents.allIds.map(cid => [ cid, 0 ])
        );

        selectTerritoriesOwned(map, pid).forEach(tid => {
            countPerCont[map.territories.byId[tid].continentId] += 1;
        });

        // build array of continent ids where the player has all of the
        // territories in it
        const owned = [];
        Object.entries(countPerCont).forEach(([ cid, count ]) => {
            if (count === map.continents.byId[cid].territoryIds.length) {
                owned.push(cid);
            }
        });

        return owned;
    }
);

export const calcArmiesToPlace = (map, pid) => {
    let numArmies = Math.floor(
        selectTerritoriesOwned(map, pid).length / consts.ARMY_DIVISOR
    );

    numArmies += sum(
        selectContinentsOwned(map, pid).map(cid =>
            map.continents.byId[cid].armies
        )
    );

    return Math.max(numArmies, consts.MIN_ARMIES_PER_TURN);
};
