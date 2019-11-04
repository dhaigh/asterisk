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

const place = territoryId => ({
    type: types.PLACE,
    territoryId,
});

export const hoverTerritory = territoryId => ({
    type: types.HOVER_TERRITORY,
    territoryId,
});

export const setViewingNeighbours = on => ({
    type: types.SET_VIEWING_NEIGHBOURS,
    on,
});

export const selectTerritory = territoryId => {
    return (dispatch, getState) => {
        const { viewingNeighbours } = getState().map;

        if (viewingNeighbours) {
            return;
        }

        dispatch(place(territoryId));
    };
};
