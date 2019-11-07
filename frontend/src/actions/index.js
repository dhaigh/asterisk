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
            },
        }));
        dispatch(playerJoined({
            id: 2,
            name: 'Alex',
            color: '#ff0022',
        }));
        dispatch(playerJoined({
            id: 3,
            name: 'Neil',
            color: '#ff8800',
        }));
        dispatch(startGame([2, 3, 1]));
        return Promise.resolve();
    };
};

export const startGame = playerOrder => ({
    type: types.START_GAME,
    playerOrder,
});

export const playerJoined = player => ({
    type: types.PLAYER_JOINED,
    player,
});

export const hoverTerritory = territoryId => ({
    type: types.HOVER_TERRITORY,
    territoryId,
});

export const setViewingNeighbours = on => ({
    type: types.SET_VIEWING_NEIGHBOURS,
    on,
});

const claim = (territoryId, playerId) => ({
    type: types.CLAIM,
    territoryId,
    playerId,
});

export const place = (territoryId, playerId) => ({
    type: types.PLACE,
    territoryId,
    playerId,
});

export const selectTerritory = territoryId => {
    return (dispatch, getState) => {
        const state = getState();

        // can't claim when neighbour mode is on (shift key)
        if (state.neighbours.on) {
            return;
        }

        const self = getSelf(state);

        dispatch(claim(territoryId, self.id));
    };
};
