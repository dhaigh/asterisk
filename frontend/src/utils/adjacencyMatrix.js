// takes an array of integer 2-tuples (adjacency list) and turns it into a
// matrix where indicies are vertices
const build = list => {
    const size = Math.max(...list.flat()) + 1;

    const matrix = Array.from(new Array(size), () => {
        // you can't iterate over `Array(size)` (without new keyword)
        return new Array(size).fill(false)
    });

    list.forEach(edge => {
        // vertices map to array indexes. if vertex numbering starts at 1 then
        // that means matrix[0][x] will always be blank. yolo

        const [ i, j ] = edge;
        matrix[i][j] = true;
        matrix[j][i] = true;
    });

    // we know that our matrices won't change, so we can reduce to a quick
    // lookup form so that for given vertex a, we can get all adjacent vertices
    // with matrix[a]
    return matrix.map(row => {
        // remember that indicies are vertices, so we return the index (`vertex`)
        // if there is an edge present, otherwise return null for filtering
        // purposes

        return row.map((hasEdge, vertex) => {
            if (hasEdge) {
                return vertex;
            }

            return null;
        }).filter(value => {
            return value !== null;
        });
    });
};

export { build };
