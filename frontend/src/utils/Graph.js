class Graph {
    constructor(size) {
        this.matrix = Array.from(new Array(size), () => {
            // you can't iterate over Array(size) (without new keyword)
            return new Array(size).fill(false)
        })
    }

    addEdge(i, j) {
        this.matrix[i][j] = true
        this.matrix[j][i] = true
    }

    getEdges(i) {
        const edges = []
        this.matrix[i].forEach((value, j) => {
            if (value) {
                edges.push(j)
            }
        })
        return edges
    }

    hasEdge(i, j) {
        return this.matrix[i][j]
    }
}

export default Graph;
