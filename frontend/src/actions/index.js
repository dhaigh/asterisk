import * as types from './types';
import map from 'map.json';
import { whoseTurn } from 'selectors';

const init = data => ({
    type: types.INIT,
    data: data,
});

export const load = () => {
    return (dispatch, getState) => {
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

        // this order should be randomised
        dispatch(startGame([2, 3, 1]));

        dispatch(claim(1, 2));
        dispatch(claim(2, 3));
        dispatch(claim(3, 1));
        dispatch(claim(4, 2));
        dispatch(claim(5, 3));
        dispatch(claim(6, 1));
        dispatch(claim(7, 2));
        dispatch(claim(8, 3));
        dispatch(claim(9, 1));
        dispatch(claim(10, 2));
        dispatch(claim(11, 3));
        dispatch(claim(12, 1));
        dispatch(claim(13, 2));
        dispatch(claim(14, 3));
        dispatch(claim(15, 1));
        dispatch(claim(16, 2));
        dispatch(claim(17, 3));
        dispatch(claim(18, 1));
        dispatch(claim(19, 2));
        dispatch(claim(20, 3));
        dispatch(claim(21, 1));
        dispatch(claim(22, 2));
        dispatch(claim(23, 3));
        dispatch(claim(24, 1));
        dispatch(claim(25, 2));
        dispatch(claim(26, 3));
        dispatch(claim(27, 1));
        dispatch(claim(28, 2));
        dispatch(claim(29, 3));
        dispatch(claim(30, 1));
        dispatch(claim(31, 2));
        dispatch(claim(32, 3));
        dispatch(claim(33, 1));
        dispatch(claim(34, 2));
        dispatch(claim(35, 3));
        dispatch(claim(36, 1));
        dispatch(claim(37, 2));
        dispatch(claim(38, 3));
        dispatch(claim(39, 1));
        dispatch(claim(40, 2));
        dispatch(claim(41, 3));
        dispatch(claim(42, 1));

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

        if (state.game.mode === 'claiming') {
            // can't claim if someone else already has
            if (state.placements[territoryId]) {
                return;
            }

            dispatch(claim(territoryId, whoseTurn(state).id));
        } else {
            dispatch(place(territoryId, whoseTurn(state).id));
        }
    };
};
