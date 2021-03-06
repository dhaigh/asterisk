// takes an array of integer 2-tuples (adjacency list) and turns it into an
// array where indicies are vertices and values are arrays of adjacent vertices
export const buildAdjacencyMap = list => {
    const size = Math.max(...list.flat()) + 1;

    // make 2d array size x size, filled with false
    const matrix = Array.from(new Array(size), () => {
        // you can't iterate over `Array(size)` (without new keyword)
        return new Array(size).fill(false);
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
        return row.map((hasEdge, vertex) => {
            // remember that indicies are vertices, so we return the index
            // (`vertex`) if there is an edge present, otherwise return null
            // for filtering purposes

            if (hasEdge) {
                return vertex;
            }

            return null;
        }).filter(value => {
            return value !== null;
        });
    });
};

// sums an array of numbers
export const sum = arr => arr.reduce((a, b) => a + b, 0);

// the basic sort comparator
export const cmp = (a, b) => {
    if (a < b) {
        return -1;
    } else if (a === b) {
        return 0;
    } else {
        return 1;
    }
};

// fisher-yates shuffle
export const shuffle = arr => {
    for (let i = arr.length - 1; i > 0; i--) {
        // random index from 0 to i inclusive
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
};
