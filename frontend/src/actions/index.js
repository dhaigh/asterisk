import * as types from './types';
import * as consts from 'utils/constants';
import { shuffle } from 'utils';
import map from 'map.json';
import {
    getTerritoryById, whoseTurn, selectAttackingArmies, selectDefendingArmies
} from 'selectors';

const init = data => ({
    type: types.INIT,
    data: data,
});

const colors = [
    '#ff8800', // orange
    '#ff0022', // red
    '#3fafd7', // blue
    '#cc00cc', // purple
    '#000090', // navy
    '#4bb368', // green
];

const pickColor = () => {
    const i = Math.floor(Math.random() * colors.length);
    const color = colors[i];
    colors.splice(i, 1);
    return color;
};

export const load = () => {
    return (dispatch, getState) => {
        // TODO: get from server if playing non-locally
        // TODO: refactor

        let numPlayers = 3;//parseInt(window.prompt('Enter number of players (2-6)'), 10);
        while (Number.isNaN(numPlayers) || numPlayers > 6) {
            numPlayers = parseInt(window.prompt('Enter number of players (2-6)'), 10);
        }

        const players = {};
        const playerOrder = [];
        for (let n = 1; n <= numPlayers; n++) {
            players[n] = {
                id: n,
                //name: window.prompt(`Player ${n} name`),
                name: (`Player ${n}`),
                color: pickColor(),
            };
            playerOrder.push(n);
        }
        shuffle(playerOrder);

        dispatch(init({
            map,
            me: players[1],
        }));

        for (let n = 2; n <= numPlayers; n++) {
            dispatch(playerJoined(players[n]));
        }

        dispatch(startGame(playerOrder));

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

const select = (territoryId, playerId) => ({
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
            if (territory.ownerId !== null) {
                // can't claim if someone else already has
                return;
            }
        } else if (mode === consts.M_REINFORCING ||
                   mode === consts.M_PLACING ||
                   mode === consts.M_FORTIFYING
        ) {
            if (territory.ownerId !== player.id) {
                // can't place (or pick if fortifying) if you don't own it
                return;
            }

            if (mode === consts.M_FORTIFYING && state.game.pickingArmies) {
                if (territory.armies === 1) {
                    // can't pick from a territory with only 1 army
                    return;
                }
            } else if (player.armies === 0) {
                // can't place if you got no armies
                return;
            }
        }

        dispatch(select(territoryId, player.id));

        // player order is shuffled after reinforcement
        // TODO: remove all of the following, doesn't seem to be in hasboro.com
        // rules
        // const newMode = getState().game.mode;
        // const playerOrder = [...state.players.order];
        // shuffle(playerOrder);
        // if (mode === consts.M_REINFORCING && newMode === consts.M_PLACING) {
        //     dispatch(reorderPlayers(playerOrder));
        // }
    };
};

const _endTurn = () => ({
    type: types.END_TURN,
});

export const endTurn = () => {
    return (dispatch, getState) => {
        const state = getState();
        const player = whoseTurn(state);

        if (player.armies > 0) {
            // can't end turn if you have armies in hand
            return;
        }

        dispatch(_endTurn());
    };
};

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

const _beginFortifying = () => ({
    type: types.BEGIN_FORTIFYING,
});

export const beginFortifying = () => {
    return (dispatch, getState) => {
        const state = getState();

        if (state.game.conflict.dice) {
            // can't start fortifying if you have rolled dice
            return;
        }

        dispatch(_beginFortifying());
    };
};

export const setPickingArmies = on => ({
    type: types.SET_PICKING_ARMIES,
    on,
});
