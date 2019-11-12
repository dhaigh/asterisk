import * as types from './types';
import * as consts from 'utils/constants';
import map from 'map.json';
import { getTerritoryById, whoseTurn } from 'selectors';

const init = data => ({
    type: types.INIT,
    data: data,
});

export const load = () => {
    return (dispatch, getState) => {
        // TODO: get from server
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

        dispatch(place(1, 2));
        dispatch(place(7, 3));
        dispatch(place(8, 1));

        dispatch(place(2, 2));
        dispatch(place(9, 3));
        dispatch(place(10, 1));

        dispatch(place(3, 2));
        dispatch(place(11, 3));
        dispatch(place(12, 1));

        dispatch(place(4, 2));
        dispatch(place(13, 3));
        dispatch(place(14, 1));

        dispatch(place(5, 2));
        dispatch(place(15, 3));
        dispatch(place(16, 1));

        dispatch(place(6, 2));
        dispatch(place(17, 3));
        dispatch(place(18, 1));

        dispatch(place(19, 2));
        dispatch(place(23, 3));
        dispatch(place(24, 1));

        dispatch(place(20, 2));
        dispatch(place(25, 3));
        dispatch(place(26, 1));

        dispatch(place(21, 2));
        dispatch(place(27, 3));
        dispatch(place(28, 1));

        dispatch(place(22, 2));
        dispatch(place(29, 3));
        dispatch(place(30, 1));

        dispatch(place(31, 2));
        dispatch(place(32, 3));
        dispatch(place(39, 1));

        dispatch(place(33, 2));
        dispatch(place(34, 3));
        dispatch(place(40, 1));

        dispatch(place(35, 2));
        dispatch(place(36, 3));
        dispatch(place(41, 1));

        dispatch(place(37, 2));
        dispatch(place(38, 3));
        dispatch(place(42, 1));

        // 3 players
        // => starting with 35
        // => 14 territories each
        // => 35-14 reinforcements
        for (let i = 0; i < 21; i++)
            dispatch(place(6, 2));
        for (let i = 0; i < 21; i++)
            dispatch(place(7, 3));
        for (let i = 0; i < 20; i++)
            dispatch(place(40, 1));

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

export const place = (territoryId, playerId) => ({
    type: types.PLACE,
    territoryId,
    playerId,
});

export const reorderPlayers = (order) => ({
    type: types.REORDER_PLAYERS,
    order,
});

export const selectTerritory = territoryId => {
    return (dispatch, getState) => {
        const state = getState();
        const { mode } = state.game;

        // can't claim when neighbour mode is on (shift key)
        if (state.neighbours.on) {
            return;
        }

        const player = whoseTurn(state);
        const territory = getTerritoryById(state, territoryId);

        if (mode === consts.M_CLAIMING) {
            // can't claim if someone else already has
            if (territory.ownerId !== null) {
                return;
            }
        } else if (territory.ownerId !== player.id) {
            // can't place if you don't own it
            return;
        }

        dispatch(place(territoryId, player.id));

        // player order is shuffled after reinforcement
        const newMode = getState().game.mode;
        if (mode === consts.M_REINFORCING && newMode === consts.M_PLACING) {
            // TODO: randomize
            dispatch(reorderPlayers([3, 2, 1]));
        }
    };
};
