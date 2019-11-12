import * as types from 'actions/types';
import * as consts from 'utils/constants';

const initialGame = {
    mode: consts.M_PREGAME,
    turn: -1,
    armiesInHand: {},
};

export default (game = initialGame, action, map, players) => {
    if (action.type === types.START_GAME) {
        return {
            ...game,
            mode: consts.M_CLAIMING,

            // the first turn is turn 0
            turn: 0,
        };

    } else if (action.type === types.PLACE) {
        const player = players.byId[action.playerId];
        const numPlayers = players.order.length;

        if (game.mode === consts.M_CLAIMING) {
            const nextTurn = game.turn + 1;

            if (nextTurn === map.territories.allIds.length) {
                // after all territories have been claimed we switch to
                // reinforcing
                return {
                    ...game,
                    turn: nextTurn,
                    mode: consts.M_REINFORCING,
                };
            }

            return {
                ...game,
                turn: nextTurn,
            };

        } else if (game.mode === consts.M_REINFORCING) {
            if (player.armies === 1) {
                // increment turn if player has placed their last army
                const turn = game.turn + 1;

                return {
                    ...game,
                    turn,

                    // if we're back to the first player, placing can begin.
                    //
                    // TODO: in async multiplayer mode this logic will be
                    // different because players can reinforce simultaneously,
                    // so perhaps reinforcing will only take one turn?
                    mode: turn % numPlayers === 0 ?
                            consts.M_PLACING : consts.M_REINFORCING,
                };
            }

        } else if (game.mode === consts.M_PLACING) {
            if (player.armies === 1) {
                // increment turn if player has placed their last army
                const turn = game.turn + 1;

                return {
                    ...game,
                    turn,
                    // TODO: attack mode
                };
            }
        }
    }

    return game;
};
