import map from 'map.json';

export const init = data => ({
    type: 'init',
    map: data.map,
    myId: data.myId,
});

export const load = () => {
    return dispatch => {
        // todo: get from server
        dispatch(init({
            myId: 1,
            map,
        }));
        return Promise.resolve();
    };
};

export const place = territoryId => ({
    type: 'place',
    territoryId,
});

export const hoverTerritory = territoryId => ({
    type: 'hover_territory',
    territoryId,
});

export const setViewingNeighbours = on => ({
    type: 'set_viewing_neighbours',
    on,
});

export const selectTerritory = territoryId => {
    return (dispatch, getState) => {
        const { viewingNeighbours } = getState().map;

        if (viewingNeighbours) {
            return;
        }

        dispatch(place(territoryId));
    };
};
