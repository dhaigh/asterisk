import Graph from './Graph'

class BorderCollection {
    constructor(borders) {
        const maxId = Math.max(...borders.flat());
        this.idOffset = Math.min(...borders.flat());
        this.graph = new Graph(maxId - this.idOffset + 1);

        borders.forEach(edge => {
            const i = this.idToIndex(edge[0]);
            const j = this.idToIndex(edge[1]);
            this.graph.addEdge(i, j);
        });
    }

    idToIndex(id) {
        return id - this.idOffset;
    }

    getBorders(id) {
        const i = this.idToIndex(id);
        return this.graph.getEdges(i).map(x => x + this.idOffset);
    }

    hasBorder(id1, id2) {
        const i = this.idToIndex(id1);
        const j = this.idToIndex(id2);
        return this.graph.hasEdge(i, j);
    }
}

export default BorderCollection;
