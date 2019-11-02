export const loadMap = mapData => ({
    type: 'LOAD_MAP',
    mapData
});

export const place = territoryId => ({
    type: 'PLACE',
    territoryId
});
