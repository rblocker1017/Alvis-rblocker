// generate regular circle node
// numberCircles - number of wanted circles to generate
// width of canvas to put circles in
// height of canvas to put circles in
export function generateCircles(numberCircles, canvasWidth, canvasHeight) {
    let circles = [];

    while (circles.length < numberCircles) {
        const value = Math.floor(Math.random() * 100);
        circles.push({
            id: circles.length,
            x : (Math.random() * (canvasWidth - 200)) + 100,
            y : (Math.random() * (canvasHeight - 200)) + 100,
            width : 100,
            height : 100,
            color : 'green',
            stroke : 'black',
            strokeWidth : 5,
            selected: false,
            connections: [],
            value: value
            });
    }
    return circles;
}

// generate circle node for graphing function (more states)
// numberCircles - number of wanted circles to generate
// width of canvas to put circles in
// height of canvas to put circles in
export function generateCirclesGraphing(numberCircles, canvasWidth, canvasHeight) {
    let circles = [];

    while (circles.length < numberCircles) {
        const value = Math.floor(Math.random() * 100);
        let circle = {
            id: circles.length,
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
            value: value,
            start: false,
            end: false
        }
        // sets first element to start node
        if (circles.length === 0) {
            circle = {
                ...circle,
                start: true
            };
        }
        // sets last element to end node
        if (circles.length === numberCircles -1 ) {
            circle = {
                ...circle,
                end: true
            };
        }
        circles.push(circle);
    }
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
    let result = [];
    let connections = [];
    while (result.length < numberConnectors) {
        // get a random value, and two random circles that are different form eachother
        const value = Math.floor(Math.random() * 100);
        let fromIndex = Math.floor(Math.random() * circles.length);
        let toIndex = Math.floor(Math.random() * circles.length);
        while (toIndex === fromIndex) {
            toIndex = Math.floor(Math.random() * circles.length);
        }
        // create an id with the sorted indexes of the two circles
        let id = "";
        toIndex < fromIndex ? id = toIndex + "" + fromIndex : id = fromIndex + "" + toIndex;
        if (connections.includes(id)) {
            continue;
        }
        connections.push(id);
        const from = circles[fromIndex];
        const to = circles[toIndex];

        // creates new connection between to and from circles and sorts the connectors
        const newConnection = {
            id: result.length,
            connections: [to, from],
            points: getPoints(to, from),
            value: value,
            connected: false
        };
        newConnection.connections.sort(sortConnectors);

        // push connector id to the connecting circles and current connectors
        circles[fromIndex].connections.push(result.length);
        circles[toIndex].connections.push(result.length);
        result.push(newConnection);
    }
    return [result, connections];
}

// connects the to and from node
// to - circle connecting to
// from - circle connecting from
// idNum - id number of the connector
export function connectNode(to, from, connections) {
    let id = "";
    to.id < from.id ? id = to.id + "" + from.id : id = from.id + "" + to.id;
    if (!connections.includes(id) && JSON.stringify(to) !== '{}') {
        const value = Math.floor(Math.random() * 100);
        connections.push(id);
        return [{
            id: id,
            connections: [to, from],
            points: getPoints(to, from),
            value: value,
            connected: false
        },
        connections];
    }
    return {};
}