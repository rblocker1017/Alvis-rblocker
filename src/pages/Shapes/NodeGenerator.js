// generate regular circle node
// numberCircles - number of wanted circles to generate
// width of canvas to put circles in
// height of canvas to put circles in
export function generateCircles(numberCircles, canvasWidth, canvasHeight) {
    let circles = new Map();

    while (circles.length < numberCircles) {
        const value = Math.floor(Math.random() * 100);
        const circle = {
            id: circles.length,
            x: canvasWidth / 2,
            y: (Math.random() * (canvasHeight - 200)) + 100,
            width: 100,
            height: 100,
            color: 'green',
            stroke: 'black',
            strokeWidth: 5,
            selected: false,
            connections: [],
            value: value
        };
        circles.set(circle.id, circle);
    }
    //console.log(circles);
    return circles;
}

export function generateArray(numberSquares, canvasWidth, canvasHeight) {
    let rect = [];
    while (rect.length < numberSquares) {
        if (rect.length === 0) {
            rect.push({
                x: canvasWidth / numberSquares,
                y: canvasHeight - 100,
                width: 100,
                height: 100,
                stroke: 'black',
                strokeWidth: 5,
                value: null
            })
        }
        else {
            rect.push({
                x: rect[rect.length - 1].x + 100,
                y: canvasHeight - 100,
                width: 100,
                height: 100,
                stroke: 'black',
                strokeWidth: 5,
                value: null
            })
        }
    }
    return rect;
}

export function generateBinaryTree(numberCircles, canvasWidth, canvasHeight) {
    let circles = [];
    while (circles.length < numberCircles) {
        const value = Math.floor(Math.random() * 100);
        if (circles.length === 0) {
            circles.push({
                id: circles.length,
                x: canvasWidth / 2,
                y: 60,
                width: 100,
                height: 100,
                color: 'white',
                fill: 'green',
                stroke: 'black',
                strokeWidth: 5,
                selected: false,
                connections: [],
                value: value,
                parent: null,
                leftChild: null,
                rightChild: null
            });
        }
        else {
            NodeCreater(circles, canvasWidth, canvasHeight, circles[Math.floor((circles.length - 1) / 2)], value);
        }
    }
    for (let i = 0; i < circles.length; i++) {
        //console.log(circles[i].value);
        let parent = circles[i].parent === null ? "none" : circles[i].parent.value;
        let leftChild = circles[i].leftChild === null ? "none" : circles[i].leftChild.value;
        let rightChild = circles[i].rightChild === null ? "none" : circles[i].rightChild.value;
        //console.log("Parent value is: " + parent);
        //console.log("Left child value is: " + leftChild);
        //console.log("Right child value is: " + rightChild);
    }
    return circles;
}

export function NodeCreater(circles, canvasWidth, canvasHeight, Parent, value) {
    let step = Math.floor((circles.length + 1) / 2) + 1;
    if (Parent.leftChild === null) {
        let circle = {
            id: circles.length,
            x: Parent.x - 150 - (Math.pow(canvasWidth, 1.22 / step)),
            y: Parent.y + 60,
            width: 100,
            height: 100,
            color: 'green',
            fill: 'green',
            stroke: 'black',
            strokeWidth: 5,
            selected: false,
            connections: [],
            value: value,
            parent: Parent,
            leftChild: null,
            rightChild: null
        };
        Parent.leftChild = circle.id;
        circles.push(circle);
    }
    else if (Parent.rightChild === null) {
        let circle = {
            id: circles.length,
            x: Parent.x + 150 + (Math.pow(canvasWidth, 1.22 / step)),
            y: Parent.y + 60,
            width: 100,
            height: 100,
            color: 'green',
            fill: 'green',
            stroke: 'black',
            strokeWidth: 5,
            selected: false,
            connections: [],
            value: value,
            parent: Parent,
            leftChild: null,
            rightChild: null
        };
        Parent.rightChild = circle.id;
        circles.push(circle);
    }
    else {
        return;
    }
}

export function createLeft(circle, id, canvasWidth) {
    let step = Math.floor((id + 1) / 2) + 1;
    if (circle.leftChild === null) {
        let newCircle = {
            id: id,
            x: circle.x - 150 - (Math.pow(canvasWidth, 1.22 / step)),
            y: circle.y + 60,
            width: 100,
            height: 100,
            color: 'green',
            value: Math.floor(Math.random() * 100),
            fill: 'green',
            stroke: 'black',
            strokeWidth: 5,
            selected: false,
            connections: [],
            parent: circle,
            leftChild: null,
            rightChild: null
        };
        circle.leftChild = newCircle.id;
        return newCircle;
    }
    return { id: -1 };
}
export function createRight(circle, id, canvasWidth) {
    let step = Math.floor((id + 1) / 2) + 1;
    if (circle.rightChild === null) {
        let newCircle = {
            id: id,
            x: circle.x + 150 + (Math.pow(canvasWidth, 1.22 / step)),
            y: circle.y + 60,
            width: 100,
            height: 100,
            color: 'green',
            value: Math.floor(Math.random() * 100),
            fill: 'green',
            stroke: 'black',
            strokeWidth: 5,
            selected: false,
            connections: [],
            parent: circle,
            leftChild: null,
            rightChild: null
        };
        circle.rightChild = newCircle.id;
        return newCircle;
    }
    return { id: -1 };
}

/*
*   Inorder Traversal 
*/
export function inOrderTraversalHelper(circles) {
    let array = [];
    inOrderTraversal(circles[0], circles, array);
    return array;
}
export function inOrderTraversal(root, circles, array) {
    if (root !== null) {
        inOrderTraversal(root.leftChild, circles, array);
        array.push(root.id);
        inOrderTraversal(root.rightChild, circles, array);
    }
}


/*
*   Preorder Traversal 
*/
export function preOrderTraversalHelper(circles) {
    let array = [];
    preOrderTraversal(circles[0], circles, array);
    return array;
}
export function preOrderTraversal(root, circles, array) {
    if (root !== null) {
        array.push(root.id);
        preOrderTraversal(root.leftChild, circles, array);
        preOrderTraversal(root.rightChild, circles, array);
    }
}

/*
*   Postorder Traversal 
*/

export function postOrderTraversalHelper(circles) {
    let array = [];
    postOrderTraversal(circles[0], circles, array);
    return array;
}
export function postOrderTraversal(root, circles, array) {
    if (root !== null) {
        postOrderTraversal(root.leftChild, circles, array);
        postOrderTraversal(root.rightChild, circles, array);
        array.push(root.id);
    }
}

export function generateConnectorsBTT(circles) {
    console.log("in");
    return connectNodeBTT(circles[0], circles);
}

export function connectNodeBTT(circle, circles) {
    //console.log(circles);
    let lines = [];
    let connections = [];
    //connections.push(id);
    if (circle.leftChild !== null) {
        const value = Math.floor(Math.random() * 100);
        let id = "";
        let childBundle = null;
        let leftChild = circles.filter((node) => node.id === circle.leftChild)[0];
        circle.id < circle.leftChild ? id = circle.id + "" + circle.leftChild : id = circle.leftChild + "" + circle.id;
        connections.push(id);
        lines.push({
            id: id,
            connections: [circle.id, circle.leftChild],
            points: getPoints({ x: circle.x + 5, y: circle.y + 30 }, leftChild),
            value: value,
            stroke: "black",
            connected: false
        });
        childBundle = connectNodeBTT(leftChild, circles);
        if (childBundle !== null) {
            lines.push(...childBundle[0]);
            connections.push(...childBundle[1]);
        }
    }
    if (circle.rightChild !== null) {
        const value = Math.floor(Math.random() * 100);
        let id = "";
        let childBundle = null;
        let rightChild = circles.filter((node) => node.id === circle.rightChild)[0];
        circle.id < circle.rightChild ? id = circle.id + "" + circle.rightChild : id = circle.rightChild + "" + circle.id;
        connections.push(id);
        lines.push({
            id: id,
            connections: [circle.id, circle.rightChild],
            points: getPoints({ x: circle.x - 5, y: circle.y + 30 }, rightChild),
            value: value,
            stroke: "black",
            connected: false
        });
        childBundle = connectNodeBTT(rightChild, circles);
        if (childBundle !== null) {
            lines.push(...childBundle[0]);
            connections.push(...childBundle[1]);
        }
    }
    if (circle.rightChild === null && circle.leftChild === null) {
        return null;
    }
    return [lines, connections];
}


// generate circle node for graphing function (more states)
// numberCircles - number of wanted circles to generate
// width of canvas to put circles in
// height of canvas to put circles in
export function generateCirclesGraphing(numberCircles, canvasWidth, canvasHeight) {
    let circles = new Map();

    while (circles.size < numberCircles) {
        let circle = {
            type: "circle",
            id: circles.size,
            x: (Math.random() * (canvasWidth - 200)) + 100,
            y: (Math.random() * (canvasHeight - 200)) + 100,
            width: 100,
            height: 100,
            color: 'green',
            stroke: 'black',
            strokeWidth: 5,
            selected: false,
            connect: false,
            connections: [],
            start: false,
            end: false
        }
        // sets first element to start node
        if (circles.size === 0) {
            circle = {
                ...circle,
                start: true
            };
        }
        // sets last element to end node
        if (circles.size === numberCircles - 1) {
            circle = {
                ...circle,
                end: true
            };
        }
        circles.set(circle.id, circle);
    }
    console.log(Array.from(circles.values()));
    return circles;
}

// returns points for connectors using math
export function getPoints(to, from) {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    let angle = Math.atan2(-dy, dx);

    const radius = 50

    return [
        from.x + -radius * Math.cos(angle + Math.PI),
        from.y + radius * Math.sin(angle + Math.PI),
        to.x + -radius * Math.cos(angle),
        to.y + radius * Math.sin(angle)
    ];
}

// sorts connectors by id
const sortConnectors = (a, b) => {
    if (a.id < b.id) {
        return -1;
    }
    else if (a.id > b.id) {
        return 1;
    }
    return 0;
}

// generates connectors between circles
// numberConnectors - initial number of connectors
// circles - array of circles to put connectors
export function generateConnectors(numberConnectors, circles) {
    let result = new Map();
    while (result.size < numberConnectors) {
        // get a random value, and two random circles that are different form eachother
        const value = Math.floor(Math.random() * 99) + 1;
        let fromIndex = Math.floor(Math.random() * circles.size);
        let toIndex = Math.floor(Math.random() * circles.size);
        while (Number(toIndex) === Number(fromIndex)) {
            toIndex = Math.floor(Math.random() * circles.size);
        }
        //console.log(toIndex + " " + fromIndex);
        // create an id with the sorted indexes of the two circles
        let id = JSON.stringify([Number(toIndex), Number(fromIndex)].sort());
        if (result.has(id)) {
            continue;
        }
        //console.log(circles);
        const from = circles.get(fromIndex);
        const to = circles.get(toIndex);
        //console.log(from);
        // creates new connection between to and from circles and sorts the connectors
        const newConnection = {
            type: "line",
            id: id,
            connections: [to.id, from.id],
            points: getPoints(to, from),
            value: value,
            stroke: "black",
            connected: false
        };
        newConnection.connections.sort(sortConnectors);

        // push connector id to the connecting circles and current connectors
        //console.log();
        to.connections.push(id);
        from.connections.push(id);
        circles.set(toIndex, to);
        circles.set(fromIndex, from);
        result.set(id, newConnection);
    }
    //console.log(result);
    //console.log(tempConnections);
    return result;
}

// connects the to and from node
// to - circle connecting to
// from - circle connecting from
// idNum - id number of the connector
export function connectNode(to, from, setValue, id) {
    return {
        type: "line",
        id: id,
        connections: [to.id, from.id],
        points: getPoints(to, from),
        value: setValue,
        stroke: "black",
        connected: false
    };
}
export function newConnectNodeBTT(to, from, connections, isLeft) {
    let id = "";
    let newTo = {};
    to.id < from.id ? id = to.id + "" + from.id : id = from.id + "" + to.id;
    if (isLeft) {
        newTo = {
            ...to,
            x: to.x + 5,
            y: to.y + 30
        }
    }
    else {
        newTo = {
            ...to,
            x: to.x - 5,
            y: to.y + 30
        }
    }
    connections.push(id);
    return [{
        id: id,
        connections: [to.id, from.id],
        points: getPoints(newTo, from),
        stroke: "black",
        connected: false
    },
        connections];
}
