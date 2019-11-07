import * as types from 'actions/types';

const initialPlayers = {
    byId: {},
    myId: -1,
    order: [],
};

export default (players = initialPlayers, action) => {
    if (action.type === types.INIT) {
        const { me } = action.data;
        return {
            ...players,
            myId: me.id,
            byId: {
                ...players.byId,
                [me.id]: me,
            },
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
    }

    return players;
};
