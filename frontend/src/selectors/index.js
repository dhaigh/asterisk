import { createSelector } from 'reselect'

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
    [getOrder, getById],
    (order, byId) => order.map(pid => byId[pid])
);

// -----------------------------------------------------------------------------
// territory stuff

const getNeighbours = state => {
    const territory = getHoverTerritory(state);

    if (territory === null) {
        return [];
    }

    return territory.neighbours;
};

// all of the below is specific to <Territory /> components:

const getId = (_, props) => props.territory.id;

export const getHoverTerritory = state => {
    const tid = state.neighbours.tid;

    if (tid === null) {
        return null;
    }

    return state.map.territories[tid];
};

export const isActive = (state, props) => {
    const { neighbours } = state;

    if (neighbours.on) {
        return getId(null, props) === neighbours.tid;
    }

    return false;
};

const selectIsNeighbour = createSelector(
    [getId, getNeighbours],
    (tid, neighbours) => neighbours.indexOf(tid) >= 0
);

export const isNeighbour = (state, props) => {
    if (state.neighbours.on) {
        return selectIsNeighbour(state, props);
    }

    return false;
};

export const getPlacement = (state, props) => {
    return state.placements[getId(null, props)];
};
