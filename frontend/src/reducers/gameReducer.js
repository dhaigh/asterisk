import * as types from 'actions/types';
import { cmp } from 'utils';
import * as consts from 'utils/constants';
import { selectCanBeAttacking, selectCanBeAttacked } from 'selectors';

const initialGame = {
    mode: consts.M_PREGAME,
    turn: -1,

    // only relevant to fortifying mode
    pickingArmies: false,

    // only relevant to attacking mode
    conflict: {
        // attackingTid: null,
        // attackingArmies: null,
        // defendingTid: null,
        // defendingArmies: null,
        // dice: {
            // attacking: [],
            // defending: [],
            // victors: [],
            // losses: {},
        // },
    },
};

const processDice = dice => {
    // copy so that we can sort for algorithmic purposes here and show dice in
    // original random order to UI
    const attacking = [...dice.attacking];
    const defending = [...dice.defending];

    attacking.sort().reverse();
    defending.sort().reverse();

    const losses = {
        attacking: 0,
        defending: 0,
    };

    const victors = []
    for (let i = 0; i < Math.min(attacking.length, defending.length); i++) {
        if (defending[i] >= attacking[i]) {
            victors.push([defending[i], attacking[i], 'D']);
            losses.attacking += 1;
        } else {
            victors.push([attacking[i], defending[i], 'A']);
            losses.defending += 1;
        }
    }

    victors.sort((a, b) => {
        return cmp(a[0], b[0]);
    }).reverse();

    return {
        attacking, defending,
        victors, losses
    };
};

const handleSelect = (game, action, state) => {
    const { map, players } = state;
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
        if (game.conflict.dice) {
            // dice has been rolled, leave everything alone
            return game;
        } else if (selectCanBeAttacking(state, action.territoryId)) {
            // chose the attacking territory
            const attacking = state.map.territories.byId[action.territoryId];
            return {
                ...game,
                conflict: {
                    attackingTid: action.territoryId,
                    attackingArmies: attacking.armies === 2 ? 1 : null,
                },
            };
        } else if (selectCanBeAttacked(state, action.territoryId)) {
            // chose the defending territory
            const defending = state.map.territories.byId[action.territoryId];
            return {
                ...game,
                conflict: {
                    ...game.conflict,
                    defendingTid: action.territoryId,
                    defendingArmies: defending.armies === 1 ? 1 : null,
                },
            };
        }
    }

    return game;
};

export default (game = initialGame, action, state) => {
    const { map } = state;

    if (action.type === types.START_GAME) {
        return {
            ...game,
            mode: consts.M_CLAIMING,

            // the first turn is turn 0
            turn: 0,
        };

    } else if (action.type === types.SELECT) {
        return handleSelect(game, action, state);

    } else if (action.type === types.END_TURN) {
        return {
            ...game,
            mode: consts.M_PLACING,
            turn: game.turn + 1,
        };

    } else if (action.type === types.SET_ATTACKING_WITH) {
        return {
            ...game,
            conflict: {
                ...game.conflict,
                attackingArmies: action.numArmies,
            },
        };

    } else if (action.type === types.SET_DEFENDING_WITH) {
        return {
            ...game,
            conflict: {
                ...game.conflict,
                defendingArmies: action.numArmies,
            },
        };

    } else if (action.type === types.DICE_ROLLED) {
        return {
            ...game,
            conflict: {
                ...game.conflict,
                dice: processDice(action.dice),
            },
        };

    } else if (action.type === types.APPLY_DICE_ROLL) {
        let { attackingTid, defendingTid } = game.conflict;
        const attacking = map.territories.byId[attackingTid];
        const defending = map.territories.byId[defendingTid];

        if (!selectCanBeAttacking(state, attackingTid)) {
            // selected territory ran out of armies to attack with or it's
            // armies captured all neighbouring enemy territories
            attackingTid = null;
            defendingTid = null;
        } else if (defending.ownerId === attacking.ownerId) {
            // cant attack yourself so we reset the defending territory
            defendingTid = null;
        }

        return {
            ...game,
            conflict: {
                attackingTid,
                defendingTid,
                attackingArmies: attackingTid &&
                    attacking.armies === 2 ? 1 : null,
                defendingArmies: defendingTid &&
                    defending.armies === 1 ? 1 : null,
                dice: null,
            },
        };

    } else if (action.type === types.BEGIN_FORTIFYING) {
        return {
            ...game,
            mode: consts.M_FORTIFYING,
            conflict: {},
        };

    } else if (action.type === types.SET_PICKING_ARMIES) {
        return {
            ...game,
            pickingArmies: action.on,
        };
    }

    return game;
};
