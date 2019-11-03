import map from 'map.json';

export const processMap = mapData => ({
    type: 'process_map',
    mapData,
});

export const loadMap = () => {
    return dispatch => {
        // todo: get from server
        dispatch(processMap(map));
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
