import { combineReducers } from 'redux'
import mapReducer from './mapReducer'
import myIdReducer from './myIdReducer'
import playersReducer from './playersReducer';
import placementsReducer from './placementsReducer';
import neighboursReducer from './neighboursReducer';

export default combineReducers({
    map: mapReducer,
    myId: myIdReducer,
    players: playersReducer,
    placements: placementsReducer,
    neighbours: neighboursReducer,
});
