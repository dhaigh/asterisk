import * as types from 'actions/types';
import * as consts from 'utils/constants';
import {
    whoIsNext, selectTerritoriesOwned, calcTotalIncome
} from 'selectors';

const initialPlayers = {
    myId: -1,
    byId: {},
    order: [],
};

const handleSelect = (players, pid, state) => {
    const { map, game } = state;
    const player = players.byId[pid];
    const numPlayers = players.order.length;
    let byId = players.byId;

    if (game.mode === consts.M_CLAIMING) {
        if (game.turn + 1 === map.territories.allIds.length) {
            // all territories claimed, allocate reinforcement armies
            // TODO: check (somewhere else, before the game starts) that we
            // don't have more than 6 players

            const numStartingArmies = consts.STARTING_NUM_ARMIES[numPlayers];
            byId = Object.fromEntries(
                players.order.map(pid => {
                    const numPlaced = selectTerritoriesOwned(map, pid).length;
                    const armies = numStartingArmies - numPlaced;
                    return [ pid, { ...byId[pid], armies  } ];
                })
            );
        }

    } else if (game.mode === consts.M_REINFORCING) {
        const armies = player.armies - 1;
        byId = {
            ...byId,
            [pid]: {
                ...player,
                armies: armies === 0 ? calcTotalIncome(map, pid) : armies,
            },
        };

    } else if (game.mode === consts.M_PLACING) {
        byId = {
            ...byId,
            [pid]: {
                ...player,
                armies: player.armies - 1
            },
        };
    }

    return {
        ...players,
        byId,
    };
};

export default (players = initialPlayers, action, state) => {
    const { map } = state;

    if (action.type === types.INIT) {
        const { me } = action.data;
        return {
            myId: me.id,
            byId: { [me.id]: me },
            order: [me.id],
        };

    } else if (action.type === types.PLAYER_JOINED) {
        const { player } = action;
        return {
            ...players,
            byId: {
                ...players.byId,
                [player.id]: player,
            },
            order: [...players.order, player.id],
        };

    } else if (action.type === types.START_GAME) {
        // the order is shuffled when the game starts
        return {
            ...players,
            order: action.playerOrder,
        };

    } else if (action.type === types.SELECT) {
        return handleSelect(players, action.playerId, state);

    } else if (action.type === types.REORDER_PLAYERS) {
        return {
            ...players,
            order: action.order,
        };

    } else if (action.type === types.END_TURN) {
        const nextPlayer = whoIsNext(state);

        return {
            ...players,
            byId: {
                ...players.byId,
                [nextPlayer.id]: {
                    ...nextPlayer,
                    armies: calcTotalIncome(map, nextPlayer.id),
                },
            },
        };
    }

    return players;
};
