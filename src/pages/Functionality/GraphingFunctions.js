import {getPoints} from '../Shapes/NodeGenerator';
export function stepForwardFunc(tempLines, algoArray, step){
    let tempLine = tempLines.get(algoArray[step + 1]);
    tempLine.connected = true;
    tempLines.set(algoArray[step + 1], tempLine);
    return tempLines;
}

export function stepBackFunc(lines, algoArray, step){
    let tempLines = new Map(lines);
    let tempLine = tempLines.get(algoArray[step]);
    tempLine.connected = false;
    tempLines.set(algoArray[step], tempLine);
    return tempLines;
}

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

export function handleDragStartFunc(circles, id){
    let tempCircles = circles;
    let tempCircle = tempCircles.get(id);
    tempCircle.isDragging = true;
    tempCircles.set(id, tempCircle);
    return tempCircles;
}

export function handleDragEndFunc(circles, id){
    let tempCircles = circles;
    let tempCircle = tempCircles.get(id);
    tempCircle.isDragging = false;
    tempCircles.set(id, tempCircle);
    return tempCircles
}

export function clearStepsFunc(lines, algoArray, step){
    let tempStep = step;
    let tempLines = new Map(lines);
    while (tempStep >= 0) {
        const currentIndex = algoArray[tempStep];
        let currentLine = tempLines.get(currentIndex);
        currentLine.connected = false;
        tempLines.set(currentIndex, currentLine);
        tempStep--;
    }
    return tempLines;
}

export function clearSelectedFunc(lines, circles, selected){
    let tempNode;
    let tempNodes;
    const isString = typeof selected === "string";
    isString ? tempNodes = new Map(lines) : tempNodes = new Map(circles);
    tempNode = tempNodes.get(selected);
    tempNode.connected = false;
    tempNodes.set(selected, tempNode);
    return tempNodes;
}

export function handleMoveFunc(lines, circles, e){
    let tempCircles = new Map(circles);
    let tempLines = new Map(lines);
    let tempCircle = tempCircles.get(e.target.id());
    tempCircle.x = e.target.x();
    tempCircle.y = e.target.y();
    tempCircles.set(e.target.id(), tempCircle);
    for (let line of tempCircle.connections) {
        let tempLine = tempLines.get(line);
        let otherCircle = tempCircles.get(tempLine.connections.find(otherCircle => otherCircle !== tempCircle.id));
        tempLine.points = getPoints(tempCircle, otherCircle); 
        tempLines.set(tempLine.id, tempLine);
    }
    return {lines: tempLines, circles: tempCircles}
}
export function selectNodeFunc(tempNodes, id){
    // retrieve the circle with given id and set its connected value
    let tempNode = tempNodes.get(id);
    tempNode.connected = true;
    tempNodes.set(id, tempNode);
    console.log(tempNodes);
    return tempNodes;
}

export function setStartFunc(circles, startNode, selected){
    // create a temporary array to keep track of the array changes
    let tempCircles = new Map(circles);
    let oldStart = tempCircles.get(startNode);
    let newStart = tempCircles.get(selected);
    oldStart.start = false;
    tempCircles.set(startNode, oldStart);
    newStart.start = true;
    newStart.connected = false;
    tempCircles.set(selected, newStart);
    return tempCircles;
}
export function setEndFunc(circles, endNode, selected){
    // create a temporary array to keep track of the array changes
    let tempCircles = new Map(circles);
    let oldEnd = tempCircles.get(endNode);
    let newEnd = tempCircles.get(selected);
    oldEnd.end = false;
    tempCircles.set(endNode, oldEnd);
    newEnd.end = true;
    newEnd.connected = false;
    tempCircles.set(selected, newEnd);
    return tempCircles;
}

export function deleteNodeFunc(circles, lines, selected, isString){
    let newLines = new Map(lines);
    let newCircles = new Map(circles);
    if (isString) {
        deleteLine(newLines, newCircles, selected);
    }
    else {
        deleteCircle(newLines, newCircles, selected);
    }
    return {lines: newLines, circles: newCircles};
}

function deleteLine(newLines, newCircles, line){
    let tempLine = newLines.get(line);
    for (let circle of tempLine.connections) {
        let tempCircle = newCircles.get(circle);
        tempCircle.connections = tempCircle.connections.filter(internalLine => line !== internalLine)
        newCircles.set(circle, tempCircle);
    }
    newLines.delete(line);
}

function deleteCircle(newLines, newCircles, circle){
    let tempCircle = newCircles.get(circle);
    for (let line of tempCircle.connections) {
        deleteLine(newLines, newCircles, line);
    }
    newCircles.delete(circle);
}