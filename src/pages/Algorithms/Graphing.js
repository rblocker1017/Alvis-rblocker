/* Placeholder Dijkstras by Alex
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
*/
// Sorting function for line objects to sort by value
// @return: if value of a < value of b return -1, > return 1, equal 0
const sortLines = (a, b) => {
    if (a.value < b.value) {
        return -1;
    }
    else if (b.value < a.value) {
        return 1;
    }
    return 0;
}
/*
 * hasPath - function to find if current node has a connection to end
 * currentNode - current 
 */
function hasPath(currentNode, end, lines, processedNodes) {
    let exists = false;
    //console.log(currentNode);
    if (currentNode === end) {
        exists = true;
    }
    lines.forEach(line => {
        //
        if (line.connections.includes(currentNode) && !processedNodes.includes(currentNode)) {

            const nextStart = line.connections.find(circleId => circleId !== currentNode)
            exists = exists || hasPath(nextStart, end, lines, processedNodes.concat(currentNode));
        }
    });
    return exists;
}

/*
 * kruskalHelper - recursive helper for kruskalAlgorithm
 * @param currentNode - the integer id of the current node
 * @param end - the integer id of the end node
 * @param lines - an array of all the existing lines
 * @param processedNodes - the current nodes that have already been processed. this is so that there is no cyclical paths.
 */
function kruskalHelper(currentNode, end, lines, processedNodes) {
    // push the current id
    // find the lines that are connected to the current id
    //console.log(currentNode);
    //console.log(end);
    console.log(hasPath(currentNode, end, lines, processedNodes));
    
    //return result;
}

export function kruskalAlgorithm(start, end, lines) {
    let displayArray = [];
    const tempLines = lines;
    let currentConnections = [];
    //console.log(start);
    console.log(kruskalHelper(start.id, end.id, lines, currentConnections));
    //console.log(displayArray);
    return -1;
}
