import map from 'map.json';
import { BorderCollection } from 'utils';

//todo: acquire from server
const initialState = {
    player: {
        id: 1,
        color: '#3fafd7',
        troopCount: 13,
    },
    territories: {},
    continents: map.continents,
    selected: null,
    others: new Set(),
    borderCollection: new BorderCollection(map.borders),
};

initialState.continents.forEach((con) => {
    con.territories.forEach((ter) => {
        initialState.territories[ter.id] = {
            ...ter,
            continentId: con.id,
            troopCount: 0,
        };
    });
});

export default (state = initialState, action) => {
    if (action.type === 'PLACE') {
        const territory = state.territories[action.id];
        return {
            ...state,
            player: {
                ...state.player,
                troopCount: state.player.troopCount - 1,
            },
            territories: {
                ...state.territories,
                [action.id]: {
                    ...territory,
                    troopCount: territory.troopCount + 1,
                }
            }
        };

    } else if (action.type === 'TOGGLE') {
        const id = action.id;
        return {
            ...state,
            selected: id,
            others: new Set([...state.borderCollection.getBorders(id)]),
        };
    }

    return state;
}
