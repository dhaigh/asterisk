import * as types from 'actions/types';
import * as consts from 'utils/constants';
import { selectTerritoriesOwned, calcArmiesToPlace } from 'selectors';

const initialPlayers = {
    myId: -1,
    byId: {},
    order: [],
};

const handlePlace = (players, pid, map, game) => {
    const player = players.byId[pid];
    const numPlayers = players.order.length;
    let newById = players.byId;

    if (game.mode === consts.M_CLAIMING) {
        if (game.turn + 1 === map.territories.allIds.length) {
            // all territories claimed, allocate reinforcement armies
            // TODO: check (somewhere else, before the game starts) that we
            // don't have more than 6 players

            const numStartingArmies = consts.STARTING_NUM_ARMIES[numPlayers];
            newById = Object.fromEntries(
                players.order.map(pid => {
                    const numPlaced = selectTerritoriesOwned(map, pid).length;
                    const armies = numStartingArmies - numPlaced;
                    return [ pid, { ...newById[pid], armies  } ];
                })
            );
        }

    } else if (game.mode === consts.M_REINFORCING) {
        const armies = player.armies - 1;
        newById = {
            ...newById,
            [pid]: {
                ...player,
                armies: armies === 0 ? calcArmiesToPlace(map, pid) : armies,
            },
        };

    } else if (game.mode === consts.M_PLACING) {
        const armies = player.armies - 1;
        newById = {
            ...newById,
            [pid]: {
                ...player,
                armies: armies === 0 ? calcArmiesToPlace(map, pid) : armies,
            },
        };
    }

    return {
        ...players,
        byId: newById,
    };
};

export default (players = initialPlayers, action, map, game) => {
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

    } else if (action.type === types.PLACE) {
        return handlePlace(players, action.playerId, map, game);

    } else if (action.type === types.REORDER_PLAYERS) {
        return {
            ...players,
            order: action.order,
        };
    }

    return players;
};
