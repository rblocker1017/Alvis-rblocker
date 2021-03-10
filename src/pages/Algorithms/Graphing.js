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
            const nextStart = line.connections.find(circleId => circleId !== currentNode)
            // OR the result with exists in order to pass the result through the end
            exists = exists || hasPath(nextStart, end, lines, processedNodes.concat(currentNode));
        }
    });
    return exists;
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
    const tempLines = lines;
    let currentConnections = [];
    // sort lines from lowest to highest value for the kruskal algorithm
    tempLines.sort(sortLines);
    // add the lines from lowest value to highest value and check if there is a path every iteration
    for (let i = 0; i < tempLines.length; i++) {
        displayLines.push(tempLines[i]);
        displayArray.push(tempLines[i].id);
        if (hasPath(start.id, end.id, displayLines, currentConnections)) {
            return displayArray;
        }
    }
    return -1;
}

function primHelper(start, end, displayLines, tempLines, processedNodes) {
    console.log(start);
    if (start === end) {
        return 0;
    }
    for (let node of processedNodes) {
        for (let line of tempLines) {
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
    const tempLines = lines;
    let processedNodes = [start.id];
    tempLines.sort(sortLines);
    primHelper(start.id, end.id, displayLines, tempLines, processedNodes);
    console.log(displayLines);
    return displayLines;
}