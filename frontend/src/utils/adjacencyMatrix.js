const build = pairs => {
    const size = Math.max(...pairs.flat()) + 1;

    const matrix = Array.from(new Array(size), () => {
        // you can't iterate over `Array(size)` (without new keyword)
        return new Array(size).fill(false)
    });

    pairs.forEach(edge => {
        // values map to array indexes. yes, that means matrix[0][x] and
        // matrix[x][0] will always be blank. yolo

        const i = edge[0];
        const j = edge[1];
        matrix[i][j] = true;
        matrix[j][i] = true;
    });

    return matrix;
};

const getEdges = (matrix, i) => {
    const edges = [];

    matrix[i].forEach((hasEdge, j) => {
        if (hasEdge) {
            edges.push(j);
        }
    });

    return edges;
};

export { build, getEdges };
