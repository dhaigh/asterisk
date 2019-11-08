import * as types from 'actions/types';

/// num players -> number of reinforcements after claiming
export const ARMIES_AS_REINFORCEMENTS = {
    2: 40,
    3: 35,
    4: 30,
    5: 25,
    6: 20,
};

export const MIN_ARMIES_PER_TURN = 3;
export const ARMIES_PER_3_COUNTRIES = 1;

export const modes = {
    CLAIMING: 'claiming',
    REINFORCING: 'reinforcing',
    PLACING: 'placing',
};

const initialGame = {
    mode: modes.CLAIMING,
    turn: -1,
};

export default (game = initialGame, action, map) => {
    if (action.type === types.START_GAME) {
        return {
            ...game,
            turn: 1,
        };

    } else if (action.type === types.CLAIM && map) {
        // should always be 42 but it's nice to get the number of territories
        // from the map
        const numTerritories = Object.keys(map.territories).length;

        return {
            ...game,
            turn: game.turn + 1,

            // after 41 territories have been claimed it will be turn 42, at
            // which point we switch to placing
            mode: game.turn === numTerritories ? modes.REINFORCING : modes.CLAIMING,
        };

    }

    return game;
};
