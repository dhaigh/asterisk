import * as types from './types';
import map from 'map.json';
import { getSelf } from 'selectors';

const init = data => ({
    type: types.INIT,
    data: data,
});

export const load = () => {
    return dispatch => {
        // todo: get from server
        dispatch(init({
            map,
            me: {
                id: 1,
                name: 'Geddy',
                color: '#006aff',
                troopCount: 14,
            },
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

const place = (territoryId, playerId) => ({
    type: types.PLACE,
    territoryId,
    playerId,
});

export const selectTerritory = territoryId => {
    return (dispatch, getState) => {
        const state = getState();

        // can't place when neighbour mode is on (shift key)
        if (state.neighbours.on) {
            return;
        }

        const self = getSelf(state);

        // can't place once you've run out
        if (self.troopCount === 0) {
            return;
        }

        dispatch(place(territoryId, self.id));
    };
};
