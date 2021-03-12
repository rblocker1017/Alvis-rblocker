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
/* hasPath - recursivelyChecks all branches to see if there is a valid path
 * @param currentNode - the integer id of the current node
 * @param end - the integer id of the end node
 * @param lines - an array of all the existing lines you want processed
 * @param processedNodes - the current nodes that have already been processed. this is so that there is no cyclical paths.
 * @return exists - boolean statement if there exists a path to the end node
 */
function hasPath(currentNode, end, lines, processedNodes) {
    let exists = false;
    // if the currentNode and end are equal, then a valid path was found
    if (currentNode === end) {
        exists = true;
    }
    lines.forEach(line => {
        // recursively check every line in the given connections to see if there is a path
        if (line.connections.includes(currentNode) && !processedNodes.includes(currentNode)) {
            // if the line includes the currentNode in its connections, then assign newStart to the other node in the line's connections array
            const nextStart = line.connections.find(circleId => circleId !== currentNode);
            // OR the result with exists in order to pass the result through the end
            exists = exists || hasPath(nextStart, end, lines, processedNodes.concat(currentNode));
        }
    });
    return exists;
}

function isCyclical(start, processedNodes, displayLines) {
    console.log(displayLines);
    console.log(processedNodes);
    let cyclical = false;
    for (let node of processedNodes.values()) {
        for (let lines of displayLines) {
            const newProc = new Set(processedNodes);
            newProc.delete(node);
            cyclical = cyclical || isCyclical(node, newProc, displayLines.filter(disLines => disLines !== lines));
        }
    }
    return false;
    //return cyclical;
}

/* kruskalAlgorithm - find the shortest path from start to end with kruskal
 * @param start - start circle
 * @param end - end circle
 * @param lines - all existing lines
 * @return if a path exists, returns a display array containing the path from start to end, else return -1
 */
export function kruskalAlgorithm(start, end, lines) {
    let displayArray = [];
    let displayLines = [];
    const tempLines = Array.from(lines.values());
    let currentConnections = [];
    // sort lines from lowest to highest value for the kruskal algorithm
    tempLines.sort(sortLines);
    // add the lines from lowest value to highest value and check if there is a path every iteration
    for (let i = 0; i < tempLines.length; i++) {
        if (!hasPath(tempLines[i].connections[0], tempLines[i].connections[1], displayLines, currentConnections )) {
            displayLines.push(tempLines[i]);
            displayArray.push(tempLines[i].id);
        }
    }
    return displayArray;
}

function primHelper(start, end, displayLines, tempLines, processedNodes) {
    for (let line of tempLines) {
        for (let node of processedNodes) {
            if (line.connections.includes(node) && !processedNodes.includes(line.connections.find(id => id !== node))) {
                let nextStart = line.connections.find(id => id !== node);
                displayLines.push(line.id);
                processedNodes.push(nextStart);
                return primHelper(nextStart, end, displayLines, tempLines, processedNodes);
            }
        }
    }
    return -1;
}

export function primAlgorithm(start, end, lines) {
    let displayLines = [];
    const tempLines = Array.from(lines.values());
    let processedNodes = [start];
    tempLines.sort(sortLines);
    primHelper(start, end, displayLines, tempLines, processedNodes);
    return displayLines;
}

// Graph creates a graph out of the circles and connected lines

export function Graph(circles, lines) {
    const nodes = [];
    const list = {};

    // Add a vertex to the array of vertices (nodes)
    const addNode = (node) => {
        nodes.push(node);
        list[node] = [];
    };

    // Add an edge to the map of edges (lines)
    const addEdge = (node1, node2, weight) => {
        list[node1].push({ node: node2, weight: weight });
        list[node2].push({ node: node1, weight: weight });
    };

    // Begin adding each circle object to the array
    circles.forEach((circle) => {
        addNode(circle.id);
    });

    // Begin adding each edge to the map
    let firstNode;
    let secondNode;
    lines.forEach((line) => {
        circles.forEach((circle) => {
            if (circle.id === line.connections[0]) firstNode = circle; // Find the exact pairing to insert into the map
            if (circle.id === line.connections[1]) secondNode = circle;
        });
        addEdge(firstNode.id, secondNode.id, line.value);
    });

    // Returns the graph as an array for easy access
    return [nodes, list];
}

export function dijkstraAlgorithm(circles, lines, start, end) {
    // Get the graph and parse it into a node array & list map
    let graph = Graph(circles, lines);
    let nodes = graph[0];
    let list = graph[1];
    console.log(list);
    // Dijkstra start up arrays & variables
    let distances = [];
    let visited = [];
    let shortestDistance; // current shortest distance
    let shortestIndex; // current shortest index
    let startNum;

    // For loop to initialize all the distances to infinity
    for (let i = 0; i < nodes.length; i++) {
        distances[i] = Infinity;
        if (nodes[i] === start.id) startNum = i;
    }

    // Starting node distance to itself is 0
    distances[startNum] = 0;
    // True while the shortestIndex is not -1
    while (true) {
        shortestDistance = Infinity;
        shortestIndex = -1;

        // Discover all of the nodes that are not visited

        for (let i = 0; i < distances.length; i++) {
            if (distances[i] < shortestDistance && !visited[i]) {
                shortestDistance = distances[i];
                shortestIndex = i;
            }
        }
        console.log(shortestDistance);
        console.log(shortestIndex);

        // No node visitted so quit out
        if (shortestIndex === -1) {
            return distances;
        }

        console.log("after return");
        // Find the node with the shortestIndex to find its neighbors
        let curNode;
        circles.forEach((circle) => {
            if (circle.id === shortestIndex) curNode = circle;
        });
        console.log(curNode);
        console.log("after assigning current");
        for (let i = 0; i < list[curNode].length; i++) {
            // if the path over this edge is shorter
            if (
                list[shortestIndex][i] !== 0 &&
                distances[i] > distances[shortestIndex] + list[shortestIndex][i].weight
            ) {
                // Save this path as new shortest path.
                console.log(distances);
                console.log(list);
                distances[i] = distances[shortestIndex] + list[shortestIndex][i].weight;
            }
        }
        console.log("after for loop");
        // After we visit the node, we mark it as done
        console.log("after comment");
        visited[shortestIndex] = true;
        console.log("Visited nodes: " + visited);
        console.log("Currently lowest distances: " + distances);
    }
}
