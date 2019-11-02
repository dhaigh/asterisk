import * as matrix from 'utils/adjacencyMatrix';

const initialMap = {
    territories: {},
    continents: {},
    borders: [],

    // border selection stuff
    viewingBorders: false,
    selectedTerritory: null,
    neighbours: [],
};

export default (map = initialMap, action) => {
    if (action.type === 'load_map') {
        const { continents } = action.mapData;
        const newMap = {
            ...map,
            borders: matrix.build(action.mapData.borders),
        };

        continents.forEach(continent => {
            continent.territories.forEach(territory => {
                newMap.territories[territory.id] = {
                    name: territory.name,
                    circle: territory.circle,
                    continentId: continent.id,
                    d: territory.d,
                };
            });

            newMap.continents[continent.id] = {
                name: continent.name,
                color: continent.color,
            };
        });

        return newMap;

    } else if (action.type === 'show_borders') {
        const { territoryId } = action;
        return {
            ...map,
            selectedTerritory: territoryId,
            neighbours: matrix.getEdges(map.borders, territoryId),
        };

    } else if (action.type === 'toggle_borders') {
        return {
            ...map,
            viewingBorders: !map.viewingBorders,
            selectedTerritory: null,
            neighbours: [],
        };
    }

    return map;
}
