import * as types from 'actions/types';
import { buildAdjacencyMap } from 'utils';

const initialMap = {
    territories: {},
    continents: {},
};

export default (map = initialMap, action) => {
    if (action.type === types.INIT) {
        const newMap = { ...map };
        const { neighbours, continents } = action.map;
        const neighbourMapping = buildAdjacencyMap(neighbours);

        continents.forEach(continent => {
            continent.territories.forEach(territory => {
                // populate map.territories
                newMap.territories[territory.id] = {
                    name: territory.name,
                    circle: territory.circle,
                    continentId: continent.id,
                    d: territory.d,
                    neighbours: neighbourMapping[territory.id],
                };
            });

            // populate map.continents
            newMap.continents[continent.id] = {
                name: continent.name,
                color: continent.color,
            };
        });

        return newMap;
    }

    return map;
};
