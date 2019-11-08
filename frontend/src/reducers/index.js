import gameReducer from './gameReducer'
import mapReducer from './mapReducer'
import playersReducer from './playersReducer';
import placementsReducer from './placementsReducer';
import neighboursReducer from './neighboursReducer';

export default (state = {}, action) => {
    const map = mapReducer(state.map, action);

    return {
        // give gameReducer the map
        game: gameReducer(state.game, action, map),

        players: playersReducer(state.players, action),
        placements: placementsReducer(state.placements, action),
        neighbours: neighboursReducer(state.neighbours, action),
        map,
    };
};
