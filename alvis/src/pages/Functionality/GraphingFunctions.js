import {getPoints} from '../Shapes/NodeGenerator';
// stepForwardFunc - set the connected value of the next line associated to the next step to true
// @param: tempLines - current existing lines
// @param: algoArray - current order of the lines that need to be selected
// @param: step - current step in visualization sequence
// @return: return updated lines
export function stepForwardFunc(tempLines, algoArray, step){
    // get line of next step, set its connecting value to true, then update the lines
    let tempLine = tempLines.get(algoArray[step + 1]);
    tempLine.connected = true;
    tempLines.set(algoArray[step + 1], tempLine);
    return tempLines;
}
// stepBackFunc - deselect current step and decrement the step
// @param: lines - current existing lines
// @param: algoArray - current order of the lines that need to be selected
// @param: step - current step in visualization sequence
// @return: return updated lines
export function stepBackFunc(lines, algoArray, step){
    let tempLines = new Map(lines);
    // get line of the previous step, set its connecting value to false, then update the lines
    let tempLine = tempLines.get(algoArray[step]);
    tempLine.connected = false;
    tempLines.set(algoArray[step], tempLine);
    return tempLines;
}
// addCircleFunc - adds a circle to the passed in circle map
// @param: circles - circles map to be modified
// @param: circleId - id of the circle that will be added
// @param: HEIGHT - height of canvas spawn point
// @param: WIDTH - width of canvas spawn point
// @return: map of circles that includes the new circle
export function addCircleFunc(circles, circleId, HEIGHT, WIDTH){
    let newCircles = new Map(circles);
    // calculate value
    const value = Math.floor(Math.random() * 100);
    // create a new circle array by concatinating a new circle to it
    const newcircle = {
        type: "line",
        id: circleId,
        x: (Math.random() * (WIDTH - 200)) + 100,
        y: (Math.random() * (HEIGHT - 200)) + 100,
        width: 100,
        height: 100,
        color: 'green',
        stroke: 'black',
        strokeWidth: 5,
        selected: false,
        connect: false,
        connections: [],
        value: value
    };
    // set circle array state to the new concatinated array
    newCircles.set(circleId, newcircle);
    return newCircles;
}
// handleDragStartFunc - sets isDragging value of the target id to true
// @param: circles - map of circles to modify
// @param: id - id of the target circle
// @return: map of modified circles
export function handleDragStartFunc(circles, id){
    let tempCircles = circles;
    let tempCircle = tempCircles.get(id);
    // set isDragging to true and set the value back to the map
    tempCircle.isDragging = true;
    tempCircles.set(id, tempCircle);
    return tempCircles;
}
// handleDragEndFunc - sets isDragging value of the target to false
// @param: circles - map of circles to modify
// @param: id - id of the target circle
// @return: map of modified circles
export function handleDragEndFunc(circles, id){
    let tempCircles = circles;
    let tempCircle = tempCircles.get(id);
    tempCircle.isDragging = false;
    tempCircles.set(id, tempCircle);
    return tempCircles
}
// cleartepsFunc - clears the already selected circles
// @param: lines - map of lines to modify
// @param: algoArray - array of values the algorithm produced in step order
// @param: step - current step number
// @return: new modified lines
export function clearStepsFunc(lines, algoArray, step){
    let tempStep = step;
    let tempLines = new Map(lines);
    // while there is still a step, set connected value to false, and decrement tempStep 
    while (tempStep >= 0) {
        const currentIndex = algoArray[tempStep];
        let currentLine = tempLines.get(currentIndex);
        currentLine.connected = false;
        tempLines.set(currentIndex, currentLine);
        tempStep--;
    }
    return tempLines;
}
// clearSelectedFunc - clears out the selected node
// @param: lines - lines to be modified
// @param: circles - circles to be modified
// @param: selected - target to clear
// @return: new modified node array
export function clearSelectedFunc(lines, circles, selected){
    let tempNode;
    let tempNodes;
    // if selected is a string, we know we need to modify lines, otherwise, we need to modify circles
    typeof selected === "string" ?
        tempNodes = new Map(lines) : 
        tempNodes = new Map(circles);
    tempNode = tempNodes.get(selected);
    // deselect it
    tempNode.connected = false;
    tempNodes.set(selected, tempNode);
    return tempNodes;
}
// handleMoveFunc - handles the move function for the circle and updates location of all the connected lines it
// @param: lines - lines to be modified
// @param: circles - circles to be modified
// @param: e - current event listener for the circle that is being moved
// @return: returns an object with the modified lines and circles labled as such
export function handleMoveFunc(lines, circles, e){
    let tempCircles = new Map(circles);
    let tempLines = new Map(lines);
    // target circle
    let tempCircle = tempCircles.get(e.target.id());
    // update coordinates of selected circle
    tempCircle.x = e.target.x();
    tempCircle.y = e.target.y();
    // sets temp circle back into the circles
    tempCircles.set(e.target.id(), tempCircle);
    // enumerate through circles connections and update them accordingly
    for (let line of tempCircle.connections) {
        let tempLine = tempLines.get(line);
        let otherCircle = tempCircles.get(tempLine.connections.find(otherCircle => otherCircle !== tempCircle.id));
        tempLine.points = getPoints(tempCircle, otherCircle); 
        tempLines.set(tempLine.id, tempLine);
    }
    return {lines: tempLines, circles: tempCircles}
}
// selectNodeFunc - selects a node
// @param: tempNodes - map of either lines or circles
// @param: id - id of node to select
// @return: modified tempNodes with selected node
export function selectNodeFunc(tempNodes, id){
    // retrieve the circle with given id and set its connected value
    let tempNode = tempNodes.get(id);
    tempNode.connected = true;
    tempNodes.set(id, tempNode);
    return tempNodes;
}
// setStartFunc - sets selected circle to start
// @param: circles - map of circles to modify
// @param: startNode - old start circle
// @param: selected - new start circle
// @return: returns modified circles value with new start node
export function setStartFunc(circles, startNode, selected){
    // create a temporary array to keep track of the array changes
    let tempCircles = new Map(circles);
    let newStart = tempCircles.get(selected);
    // set old start value to false, and update circles
    if(startNode !== null){
        let oldStart = tempCircles.get(startNode);
        oldStart.start = false;
        tempCircles.set(startNode, oldStart);
    }
    // set new start value to true, deselect it, and update circles
    newStart.start = true;
    newStart.connected = false;
    tempCircles.set(selected, newStart);
    return tempCircles;
}
// setEndFunc - sets selected circle to end
// @param: circles - map of circles to modify
// @param: endNode - old end circle
// @param: selected - new end circle
// @return: returns modified circles value with new end node
export function setEndFunc(circles, endNode, selected){
    // create a temporary array to keep track of the array changes
    let tempCircles = new Map(circles);
    let newEnd = tempCircles.get(selected);
    // set old end value to false, and update circles
    if(endNode !== null){
        let oldEnd = tempCircles.get(endNode);
        oldEnd.end = false;
        tempCircles.set(endNode, oldEnd);
    }
    // set new end value to true, deselect it, and update circles
    newEnd.end = true;
    newEnd.connected = false;
    tempCircles.set(selected, newEnd);
    return tempCircles;
}
// deleteNodeFunc - deletes selected node
// @param: lines - lines to be modified
// @param: circles - circles to be modified
// @param: selected - target to clear
// @param: isString - boolean to show what type the node is. if true, selected is a string, else its a circle
// @return: object with modified lines and circles named respectively
export function deleteNodeFunc(circles, lines, selected, isString){
    let newLines = new Map(lines);
    let newCircles = new Map(circles);
    // line or circle? send them to respective function
    if (isString) {
        deleteLine(newLines, newCircles, selected);
    }
    else {
        deleteCircle(newLines, newCircles, selected);
    }
    return {lines: newLines, circles: newCircles};
}
// deleteLine - deletes line from lines and updates circles
// @param: newLines - lines map to be modified
// @param: newCircles - circles map to be modified
// @param: line - target line id to delete
function deleteLine(newLines, newCircles, line){
    // get target line
    let tempLine = newLines.get(line);
    // remove line from the circles connections that contain the line
    for (let circle of tempLine.connections) {
        let tempCircle = newCircles.get(circle);
        // filter the circle id from the line connections and set it back to the map
        tempCircle.connections = tempCircle.connections.filter(internalLine => line !== internalLine)
        newCircles.set(circle, tempCircle);
    }
    // delete target line
    newLines.delete(line);
}
// deleteCircle - delete circle and all connected lines to that circle.
// @param: newLines - lines map to be modified
// @param: newCircles - circles map to be modified
// @param: circle - target circle id to delete
function deleteCircle(newLines, newCircles, circle){
    // get target circle
    let tempCircle = newCircles.get(circle);
    // remove every line in the circle's connections
    for (let line of tempCircle.connections) {
        deleteLine(newLines, newCircles, line);
    }
    // delete circle
    newCircles.delete(circle);
}
