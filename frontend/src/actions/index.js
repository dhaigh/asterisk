import * as types from './types';
import * as consts from 'utils/constants';
import map from 'map.json';
import {
    getTerritoryById, whoseTurn, selectAttackingArmies, selectDefendingArmies
} from 'selectors';

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

        dispatch(selectTerritory(1));
        dispatch(selectTerritory(7));
        dispatch(selectTerritory(8));

        dispatch(selectTerritory(2));
        dispatch(selectTerritory(9));
        dispatch(selectTerritory(10));

        dispatch(selectTerritory(3));
        dispatch(selectTerritory(11));
        dispatch(selectTerritory(12));

        dispatch(selectTerritory(4));
        dispatch(selectTerritory(13));
        dispatch(selectTerritory(14));

        dispatch(selectTerritory(5));
        dispatch(selectTerritory(15));
        dispatch(selectTerritory(16));

        dispatch(selectTerritory(6));
        dispatch(selectTerritory(17));
        dispatch(selectTerritory(18));

        dispatch(selectTerritory(19));
        dispatch(selectTerritory(23));
        dispatch(selectTerritory(24));

        dispatch(selectTerritory(20));
        dispatch(selectTerritory(25));
        dispatch(selectTerritory(26));

        dispatch(selectTerritory(21));
        dispatch(selectTerritory(27));
        dispatch(selectTerritory(28));

        dispatch(selectTerritory(22));
        dispatch(selectTerritory(29));
        dispatch(selectTerritory(30));

        dispatch(selectTerritory(31));
        dispatch(selectTerritory(32));
        dispatch(selectTerritory(39));

        dispatch(selectTerritory(33));
        dispatch(selectTerritory(34));
        dispatch(selectTerritory(40));

        dispatch(selectTerritory(35));
        dispatch(selectTerritory(36));
        dispatch(selectTerritory(41));

        dispatch(selectTerritory(37));
        dispatch(selectTerritory(38));
        dispatch(selectTerritory(42));

        // 3 players
        // => starting with 35
        // => 14 territories each
        // => 35-14 reinforcements
        for (let i = 0; i < 21; i++)
            dispatch(selectTerritory(6));
        for (let i = 0; i < 21; i++)
            dispatch(selectTerritory(7));
        for (let i = 0; i < 21; i++)
            dispatch(selectTerritory(40));

        // place
        dispatch(selectTerritory(34));
        dispatch(selectTerritory(34));
        dispatch(selectTerritory(34));
        dispatch(selectTerritory(34));

        // // choose attacking
        dispatch(selectTerritory(34));

        // choose defending
        dispatch(selectTerritory(33));

        dispatch(setAttackingWith(3));

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

export const select = (territoryId, playerId) => ({
    type: types.SELECT,
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
        } else if (mode === consts.M_REINFORCING ||
                   mode === consts.M_PLACING) {
            if (territory.ownerId !== player.id) {
                // can't place if you don't own it
                return;
            }
        }

        dispatch(select(territoryId, player.id));

        // player order is shuffled after reinforcement
        const newMode = getState().game.mode;
        if (mode === consts.M_REINFORCING && newMode === consts.M_PLACING) {
            // TODO: randomize
            dispatch(reorderPlayers([3, 2, 1]));
        }
    };
};

export const endTurn = () => ({
    type: types.END_TURN,
});

export const setAttackingWith = numArmies => ({
    type: types.SET_ATTACKING_WITH,
    numArmies,
});

export const setDefendingWith = numArmies => ({
    type: types.SET_DEFENDING_WITH,
    numArmies,
});

const diceRolled = (attacking, defending) => ({
    type: types.DICE_ROLLED,
    dice: { attacking, defending },
});

const dieRoll = () => 1 + Math.floor(Math.random() * 6);

export const rollDice = () => {
    return (dispatch, getState) => {
        const state = getState();
        const attacking = [];
        const defending = [];

        for (let i = 0; i < selectAttackingArmies(state); i++) {
            attacking.push(dieRoll());
        }
        for (let i = 0; i < selectDefendingArmies(state); i++) {
            defending.push(dieRoll());
        }

        dispatch(diceRolled(attacking, defending));
    };
};

export const applyDiceRoll = () => ({
    type: types.APPLY_DICE_ROLL,
});
