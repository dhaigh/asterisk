import * as types from 'actions/types';

const initialPlayers = {
    byId: {
        2: {
            id: 2,
            name: 'Alex',
            color: '#ff0022',
            troopCount: 13,
        },
        3: {
            id: 3,
            name: 'Neil',
            color: '#ff8800',
            troopCount: 13,
        },
    },
    myId: -1,
    order: [2, 3],
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
            order: [me.id, ...players.order],
        };

    } else if (action.type === types.PLACE) {
        const { playerId } = action;
        const player = players.byId[playerId];

        return {
            ...players,
            byId: {
                ...players.byId,
                [playerId]: {
                    ...player,
                    troopCount: player.troopCount - 1,
                },
            },
        };
    }

    return players;
};
