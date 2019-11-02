const initialPlayers = {
    1: {
        name: 'Deccaz',
        color: '#3fafd7',
        troopCount: 13,
    },
};

export default (players = initialPlayers, action) => {
    if (action.type === 'place') {
        const playerId = 1;
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
}
