import { combineReducers } from 'redux'
import mapReducer from './mapReducer'
import playersReducer from './playersReducer';
import placementsReducer from './placementsReducer';
import neighboursReducer from './neighboursReducer';

export default combineReducers({
    map: mapReducer,
    players: playersReducer,
    placements: placementsReducer,
    neighbours: neighboursReducer,
});
