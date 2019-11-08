import * as types from 'actions/types';

export const modes = {
    CLAIMING: 'claiming',
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
            mode: game.turn === numTerritories ? modes.PLACING : modes.CLAIMING,
        };

    }

    return game;
};
