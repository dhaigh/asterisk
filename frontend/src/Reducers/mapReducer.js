const initialMap = {
    territories: {},
    borders: {},
    continents: [],
    viewingBorders: false,
};


export default (map = initialMap, action) => {
    if (action.type === 'LOAD_MAP') {
        const { continents } = action.mapData;
        const newMap = {
            // todo: rename? basically byId
            territories: {},

            // todo
            borders: {},

            continents,
        };

        continents.forEach(continent => {
            continent.territories.forEach(territory => {
                newMap.territories[territory.id] = {
                    ...territory,
                    continentId: continent.id,
                };
            });
        });

        return newMap;
    } else if (action.type === 'toggle_borders') {
        return {
            ...map,
            viewingBorders: !map.viewingBorders,
        };
    }

    return map;
}
