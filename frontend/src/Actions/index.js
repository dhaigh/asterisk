export const loadMap = mapData => ({
    type: 'load_map',
    mapData
});

export const place = territoryId => ({
    type: 'place',
    territoryId
});

export const showBorders = territoryId => ({
    type: 'show_borders',
    territoryId
});

export const selectTerritory = territoryId => {
    return (dispatch, getState) => {
        const { viewingBorders } = getState().map;
        if (viewingBorders) {
            dispatch(showBorders(territoryId));
        } else {
            dispatch(place(territoryId));
        }
    };
};
