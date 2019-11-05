import * as types from 'actions/types';

const initialPlayers = {
    1: {
        name: 'Geddy',
        color: '#006aff',
        troopCount: 13,
    },
    2: {
        name: 'Alex',
        color: '#ff0022',
        troopCount: 13,
    },
    3: {
        name: 'Neil',
        color: '#ff8800',
        troopCount: 13,
    },
};

export default (players = initialPlayers, action) => {
    if (action.type === types.PLACE) {
        const { playerId } = action;
        const player = players[playerId];

        return {
            ...players,
            [playerId]: {
                ...player,
                troopCount: player.troopCount - 1,
            },
        };
    }

    return players;
};
