import { createSelector } from 'reselect'
import { sum } from 'utils';
import * as consts from 'utils/constants';

// -----------------------------------------------------------------------------
// game stuff

// returns player obj of player whose turn it is
// can be called either of the following ways:
// whoseTurn(state)
// whoseTurn(game, players)
export const whoseTurn = (...args) => {
    const game = args.length === 1 ? args[0].game : args[0];
    const players = args.length === 1 ? args[0].players : args[1];

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
    const index = game.turn % players.order.length;
    return players.byId[players.order[index]];
};

// -----------------------------------------------------------------------------
// players
export const getSelf = state => {
    const { myId } = state.players;
    if (myId === -1) {
        return null;
    }

    return state.players.byId[myId];
};

// -----------------------------------------------------------------------------
// map

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
const selectContinentsOwned = createSelector(
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
            const continent = map.continents.byId[cid];
            if (count === continent.territoryIds.length) {
                owned.push(continent);
            }
        });

        return owned;
    }
);

const calcTerritoryIncome = (map, pid) => {
    return Math.floor(
        selectTerritoriesOwned(map, pid).length / consts.ARMY_DIVISOR
    );
};

const calcContinentIncome = (map, pid) => {
    const continents = selectContinentsOwned(map, pid);
    return sum(continents.map(c => c.bonus));
};

// returns number of armies a player is entitled to place at the start of their
// turn
export const calcTotalIncome = (map, pid) => {
    const territoryIncome = calcTerritoryIncome(map, pid);
    const continentIncome = calcContinentIncome(map, pid);
    const combined = territoryIncome + continentIncome;

    return Math.max(combined, consts.MIN_ARMIES_PER_TURN);
};

export const getPlayers = state => {
    const { map, players } = state;

    return players.order.map(pid => {
        const territories = selectTerritoriesOwned(map, pid);
        const continents = selectContinentsOwned(map, pid);

        return {
            ...players.byId[pid],
            income: calcTotalIncome(map, pid),
            incomeFromTerritories: calcTerritoryIncome(map, pid),
            territoryCount: territories.length,
            theirTurn: whoseTurn(state).id === pid,
            continents,
        };
    });
};

// -----------------------------------------------------------------------------
// territory stuff

export const getTerritoryById = createSelector(
    state => state.map,
    (_, tid) => tid,
    (map, tid) => {
        const territory = map.territories.byId[tid];
        const continent = map.continents.byId[territory.continentId];

        return {
            ...territory,
            continent,
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

// all of the below is specific to <Territory /> components:

const getTid = (_, props) => props.tid;

export const getHoverTerritory = state => {
    const tid = state.neighbours.tid;
    if (tid !== null) {
        return state.map.territories.byId[tid];
    }
    return null;
};

const getNeighbours = (state, activeTid) => {
    const territory = state.map.territories.byId[activeTid];
    if (territory) {
        return territory.neighbours;
    }
    return [];
};

const selectActiveOrNeighbour = createSelector(
    getNeighbours,
    (_, activeTid, __) => activeTid,
    (_, __, tid) => tid,
    (neighbours, activeTid, tid) => {
        return tid === activeTid ? 'active' :
               neighbours.indexOf(tid) >= 0 ? 'neighbour' : null;
    }
);

const territoryClassName = (state, props) => {
    const { game, neighbours } = state;
    const tid = getTid(null, props)

    if (neighbours.on) {
        // <shift> neighbour viewing mode
        return selectActiveOrNeighbour(state, neighbours.tid, tid);

    } else if (game.attackingTid !== null) {
        // check attacking territory
        return selectActiveOrNeighbour(state, game.attackingTid, tid);
    }

    return null;
};

export const getTerritory = createSelector(
    state => state,
    getTid,
    territoryClassName,
    (state, tid, className) => {
        const territory = getTerritoryById(state, tid);
        const owner = territory.ownerId === null ? null :
            state.players.byId[territory.ownerId];

        return {
            ...territory,
            owner,
            className,
        };
    }
);
