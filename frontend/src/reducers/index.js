import playersReducer from './playersReducer';
import mapReducer from './mapReducer'
import gameReducer from './gameReducer'
import neighboursReducer from './neighboursReducer';

export default (state = {}, action) => {
    const map = mapReducer(state.map, action, state);

    // these both can use updated map but they want the previous versions of
    // each other
    const game = gameReducer(state.game, action, {...state, map});
    const players = playersReducer(state.players, action, {...state, map});

    return {
        map, game, players,
        neighbours: neighboursReducer(state.neighbours, action),
    };
};
