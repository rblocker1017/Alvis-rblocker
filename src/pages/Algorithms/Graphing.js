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

function hasPath(currentNode, end, connections, pathsUsed) {
    let exists = false;
    for (let i = 0; i < connections.length; i++) {
        if (connections[i].includes(currentNode) && !pathsUsed.includes(connections[i])) {
            if (connections[i].includes(end)) {
                return true;
            }
            pathsUsed.push(connections[i]);
            exists = hasPath(connections[i].replace(currentNode, ''), end, connections, pathsUsed);
        }
    }
    return exists;
}

export function kruskalAlgorithm(start, end, lines, connections) {
    let displayArray = [];
    const tempLines = lines;
    let currentConnections = [];
    tempLines.sort(sortLines);
    for (let i = 0; i < tempLines.length; i++) {
        displayArray.push(tempLines[i].id);
        currentConnections.push(tempLines[i].id);
        let pathsUsed = [];
        if (hasPath(JSON.stringify(start.id), JSON.stringify(end.id), currentConnections, pathsUsed)) {
            return displayArray;
        }
    }
    return -1;
}


