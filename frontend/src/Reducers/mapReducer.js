import * as matrix from 'utils/adjacencyMatrix';

const initialMap = {
    territories: {},
    continents: {},

    // neighbour viewing stuff
    viewingNeighbours: false,
    hoverTerritory: null,
};

export default (map = initialMap, action) => {
    if (action.type === 'load_map') {
        const { continents } = action.mapData;
        const borders =  matrix.build(action.mapData.borders);
        const newMap = { ...map };

        continents.forEach(continent => {
            continent.territories.forEach(territory => {
                newMap.territories[territory.id] = {
                    name: territory.name,
                    circle: territory.circle,
                    continentId: continent.id,
                    d: territory.d,
                    neighbours: borders[territory.id],
                };
            });

            newMap.continents[continent.id] = {
                name: continent.name,
                color: continent.color,
            };
        });

        return newMap;

    } else if (action.type === 'hover_territory') {
        const { territoryId } = action;
        return {
            ...map,
            hoverTerritory: territoryId,
        };

    } else if (action.type === 'set_viewing_neighbours') {
        return {
            ...map,
            viewingNeighbours: action.on,
        };
    }

    return map;
}
