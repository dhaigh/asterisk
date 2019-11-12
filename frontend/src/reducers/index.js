import playersReducer from './playersReducer';
import mapReducer from './mapReducer'
import gameReducer from './gameReducer'
import neighboursReducer from './neighboursReducer';

export default (state = {}, action) => {
    const gameMode = state.game && state.game.mode;

    const map = mapReducer(state.map, action, gameMode);

    const game = gameReducer(state.game, action, map, state.players);

    const players = playersReducer(state.players, action, map, state.game);

    return {
        map,
        players,
        game,
        neighbours: neighboursReducer(state.neighbours, action),
    };
};
