import * as types from 'actions/types';
import * as consts from 'utils/constants';
import { selectCanBeAttacking, selectCanBeAttacked } from 'selectors';

const initialGame = {
    mode: consts.M_PREGAME,
    turn: -1,
    armiesInHand: {},
    attackingTid: null,
    attackedTid: null,
};

const handleSelect = (game, action, map, players) => {
    const player = players.byId[action.playerId];
    const numPlayers = players.order.length;
    const placedLastArmy = player.armies === 1;

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
        if (placedLastArmy) {
            const turn = game.turn + 1;

            return {
                ...game,
                turn,

                // if we're back to the first player, placing can begin.
                //
                // TODO: in async multiplayer mode this logic will be
                // different because players can reinforce simultaneously,
                // so perhaps reinforcing will only take one turn? or X turns
                // where X is the number of players (to simplify modulus math?)
                mode: turn % numPlayers === 0 ?
                        consts.M_PLACING : consts.M_REINFORCING,
            };
        }

    } else if (game.mode === consts.M_PLACING) {
        if (placedLastArmy) {
            return {
                ...game,
                mode: consts.M_ATTACKING,
            };
        }

    } else if (game.mode === consts.M_ATTACKING) {
        if (selectCanBeAttacking(action.territoryId, game, map, players)) {
            // chose the attacking territory
            return {
                ...game,
                attackingTid: action.territoryId,
                attackedTid: null,
            };
        } else if (selectCanBeAttacked(action.territoryId, game, map, players)) {
            // chose the attacked territory
            return {
                ...game,
                attackedTid: action.territoryId,
            };
        }
    }

    return game;
};

export default (game = initialGame, action, map, players) => {
    if (action.type === types.START_GAME) {
        return {
            ...game,
            mode: consts.M_CLAIMING,

            // the first turn is turn 0
            turn: 0,
        };

    } else if (action.type === types.SELECT) {
        return handleSelect(game, action, map, players);

    } else if (action.type === types.END_TURN) {
        return {
            ...game,
            mode: consts.M_PLACING,
            turn: game.turn + 1,
            attackingTid: null,
            attackedTid: null,
        };
    }

    return game;
};
