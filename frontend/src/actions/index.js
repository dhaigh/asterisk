import * as types from './types';
import map from 'map.json';

const init = data => ({
    type: types.INIT,
    map: data.map,
    myId: data.myId,
});

export const load = () => {
    return dispatch => {
        // todo: get from server
        dispatch(init({
            myId: 1,
            map,
        }));
        return Promise.resolve();
    };
};

export const hoverTerritory = territoryId => ({
    type: types.HOVER_TERRITORY,
    territoryId,
});

export const setViewingNeighbours = on => ({
    type: types.SET_VIEWING_NEIGHBOURS,
    on,
});

const place = territoryId => ({
    type: types.PLACE,
    territoryId,
})

export const selectTerritory = territoryId => {
    return (dispatch, getState) => {
        const state = getState();

        // can't place when neighbour mode is on (shift key)
        if (state.neighbours.on) {
            return;
        }

        // can't place once you've run out
        if (state.players[state.myId].troopCount === 0) {
            return;
        }

        dispatch(place(territoryId));
    };
};
