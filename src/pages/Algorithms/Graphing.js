function DijkstraAlgorithm(start, lines) {
    const numberOfVertices = edges.length;

    const minDistances = [];

    for (let currentVertex = 0; currentVertex < numberOfVertices; currentVertex++) {
        minDistances.push(Infinity);
    }
    minDistances[start] = 0;

    const visited = new Set();

    while (visited.size != numberOfVertices) {
        const [vertex, currentMinDistance] = MinDistanceVertex(minDistances, visited);

        if (currentMinDistance === Infinity)
            break;

        visited.add(vertex);

        for (const edge of edges[vertex]) {
            const [destination, distanceToDestination] = edge;

            if (visited.has(destination)) {
                continue;
            }

            const newPathDistance = currentMinDistance + distanceToDestination;
            const currentDestinationDistance = minDistances[destination];
            if (newPathDistance < currentDestinationDistance) {
                minDistances[destination] = newPathDistance;
            }
        }
    }
    return minDistances.map(x => (x === Infinity ? -1 : x));
}

function MinDistanceVertex(distances, visited) {
    let currentMinDistance = Infinity;
    let vertex = -1;

    for (const [vertexIndex, distance] of distances.entries()) {
        if (visited.has(vertexIndex)) {
            continue;
        }
        if (distance <= currentMinDistance) {
            vertex = vertexIndex;
            currentMinDistance = distance;
        }
    }
    return [vertex, currentMinDistance];
}

let start = 0;
let edges = [
    [
        [1, 7]
    ],
    [
        [2, 6],
        [3, 20],
        [4, 3]
    ],
    [
        [3, 14]
    ],
    [
        [4, 2]
    ],
    [],
];

const sortLines = (a, b) => {
    if (a.value < b.value) {
        return -1;
    }
    else if (b.value < a.value) {
        return 1;
    }
    return 0;
}

export function kruskalAlgorithm(lines) {
    let displayArray = [];
    const tempLines = lines;
    let currentConnections = [];
    let reached = false;
    tempLines.sort(sortLines);
    for (let i = 0; i < tempLines.length; i++) {
        console.log(tempLines[i]);
    }

}


