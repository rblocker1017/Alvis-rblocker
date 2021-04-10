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
/*
    ****** DOES NOT WORK ******
    isCyclical - unimplemented test function. Function that is used to detect if the graphing path is cyclical
    @param: start - starting node of the current graph
    @param: processedNodes - nodes waiting to be processed
    @param: displayLines - nodes that have been processed
    @return: returns true if the path contains a cyclical path, false if not 
*/ 
function isCyclical(start, processedNodes, displayLines) {
    let cyclical = false;
    // iterate through processed nodes
    for (let node of processedNodes.values()) {
        // iterate through each path connected to these nodes
        for (let lines of displayLines) {
            const newProc = new Set(processedNodes);
            // delete the current node from processed nodes
            newProc.delete(node);
            // take the OR of cyclcal and result
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
/**
 * primHelper - helper function for Prim algorithm. runs recursively
 * @param {*} start - start node
 * @param {*} end - end node
 * @param {*} displayLines - lines to display in a certain order
 * @param {*} tempLines - full array of lines
 * @param {*} processedNodes - nodes that the algorithm has already seen
 * @returns -1 when there are no other paths to process
 */
function primHelper(start, end, displayLines, tempLines, processedNodes) {
    // Enumerate all lines
    for (let line of tempLines) {
        // enumerate all processed nodes
        for (let node of processedNodes) {
            // checks if there is a connection, as well as if we have already processed this node
            if (line.connections.includes(node) && !processedNodes.includes(line.connections.find(id => id !== node))) {
                // get next start, push current line to display, and push next node to processed nodes. then run  this function again
                let nextStart = line.connections.find(id => id !== node);
                displayLines.push(line.id);
                processedNodes.push(nextStart);
                return primHelper(nextStart, end, displayLines, tempLines, processedNodes);
            }
        }
    }
    return -1;
}
/**
 * primAlgorithm - algorithm that starts the prim helper
 * @param {*} start - start node
 * @param {*} end - end node
 * @param {*} lines - map of lines
 * @returns 
 */
export function primAlgorithm(start, end, lines) {
    // set up variables and sort lines
    let displayLines = [];
    const tempLines = Array.from(lines.values());
    let processedNodes = [start];
    tempLines.sort(sortLines);
    // run recursive algorithm
    primHelper(start, end, displayLines, tempLines, processedNodes);
    return displayLines;
}
/**
 * dijkstrasHelper - helper function for dijkstras algorithm
 * @param {*} start - start node
 * @param {*} end - end node
 * @param {*} displayLines - lines to display
 * @param {*} tempLines -  all of the lines
 * @param {*} processedNodes - nodes that have been processed
 * @returns 
 */
export function dijkstrasHelper(start, end, displayLines, tempLines, processedNodes) {
    // if start and end are the same, return immediately
    if (Number(start) === Number(end)) {
        return displayLines
    }
    // iterate through all lines
    for (let line of tempLines) {
        // iterate through all processed nodes
        for (let node of processedNodes) {
            // if it is a connection and not already processed, processes it
            if (line.connections.includes(node) && !processedNodes.includes(line.connections.find(id => id !== node))) {
                let nextStart = line.connections.find(id => id !== node);
                displayLines.push(line.id);
                processedNodes.push(nextStart);
                return dijkstrasHelper(nextStart, end, displayLines, tempLines, processedNodes);
            }
        }
    }
    return -1;
}
/**
 * dijkstrasAlgorithm - algorithm that starts the dijkstras helper
 * @param {*} start - start node
 * @param {*} end - end node
 * @param {*} lines - map of lines
 * @returns 
 */
export function dijkstrasAlgorithm(start, end, lines) {
    // set up variables and sort lines
    let displayLines = [];
    const tempLines = Array.from(lines.values());
    let processedNodes = [start];
    tempLines.sort(sortLines);
    // run recursion algorithm
    dijkstrasHelper(start, end, displayLines, tempLines, processedNodes);
    return displayLines;
}