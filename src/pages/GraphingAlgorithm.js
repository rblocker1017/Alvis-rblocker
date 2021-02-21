import React, { useState } from 'react';
import Header from "../componenets/layout/header";
import { Button, Grid, Paper } from "@material-ui/core";
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { grey, orange } from '@material-ui/core/colors';
import { Stage, Layer, Rect, Circle, Text, Line, Label, Tag } from 'react-konva';
import Konva from "konva";
import { generateConnectors, connectNode, getPoints, generateCirclesGraphing } from "./Shapes/NodeGenerator"
import { select } from 'd3';

// Define width and height of the of the webapp canvas
const WIDTH = 950;
const HEIGHT = 450;

// Generate styles for React objects
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        width: "100%"
    },
    buttons:
    {
        backgroundColor: grey[200],
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        width: "100%",
        height: "100%"
    },
    button:
    {
        width: "90%",
    },
    code:
    {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: "115%"
    },
    fields:
    {
        backgroundColor: grey[200],
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: "100%"
    }
}));
// Generate initial connectors and circles
const INIT = generateCirclesGraphing(3, WIDTH, HEIGHT);
const CON_GEN = generateConnectors(2, INIT)
const CONNECT = CON_GEN[0];
const CURRENT_CON = CON_GEN[1];

// function to return if the circle lable should display START NODE or END NODE on its label
// circle - the circle you want to label
// return - label string
function pointValues(circle) {
    if (circle.start) {
        return "START NODE"
    }
    else if (circle.end) {
        return "END NODE"
    }
    return "";
}

// Main function that keeps track of, displays and calculates the graphing functions
export default function GraphingAlgorithm() {
    // store styles
    const classes = useStyles();

    // generate function states
    const [type, setType] = useState("Prim");
    const [circles, setCircles] = React.useState(INIT);
    const [lines, setLines] = React.useState(CONNECT);
    const [connecting, setConnecting] = React.useState(false);
    const [selected, setSelected] = React.useState({});
    const [connections, setConnections] = React.useState(CURRENT_CON);

    // anonymous functions that change header to respective button
    const changePrim = () => setType("Prim");
    const changeDij = () => setType("Dijkstras");
    const changeKruskal = () => setType("Kruskal");

    // Adds a circle to the canvas. It is not attached to any connectors.
    // e - event listener
    const addCircle = (e) => {
        // calculate value
        const value = Math.floor(Math.random() * 100);
        // create a new circle array by concatinating a new circle to it
        const newcircles = circles.concat({
            id: circles.length,
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
        });
        // set circle array state to the new concatinated array
        setCircles(newcircles);
    };

    // circle being dragged has variable isDragging set to true.
    // e - event listener
    const handleDragStart = (e) => {
        const id = e.target.id();
        setCircles(
            circles.map((circle) => {
                return {
                    ...circle,
                    isDragging: circle.id === id,
                };
            })
        );
    };

    // Once circle is finished being dragged, isDragging is set to false
    // e - event listener
    const handleDragEnd = (e) => {
        setCircles(
            circles.map((circle) => {
                return {
                    ...circle, 
                    isDragging: false,
                };
            })
        );
    };

    // while being dragged, the circle x and y co-ordinates are updated 
    // and its connectors positions are updated to follow the circle
    // e - event listener
    const handleMove = (e) => {
        // find circle being dragged and sets it to temporary value
        const tempCircle = circles.find(circle => circle.id === e.target.id());
        const tempLines = lines;
        // set circle to a remapped array with the updated circle values
        setCircles(
            // remap the circle being dragged's values
            circles.map((circle) => {
                if (tempCircle === circle) {
                    // update coordinates
                    const newCircle = {
                        ...circle,
                        x: e.target.x(),
                        y: e.target.y()
                    }
                    // update circle's connector's point values
                    circle.connections.map(connection => {
                        // gets other circle needed to calculate the line's position
                        const other = tempLines[connection].connections.filter(otherCircle => otherCircle.id != tempCircle.id);
                        const points = getPoints(newCircle, other[0]);
                        tempLines[connection] = {
                            id: tempLines[connection].id,
                            connections: [newCircle, other[0]],
                            points: points,
                            value: tempLines[connection].value,
                            connected: tempLines[connection].connected
                        }
                        // update lines
                        setLines(tempLines);
                    });
                    return newCircle;
                }
                return circle;
            })
        );
    /*
     * Work in progress code
     * 
tempCircles.map(circle => {
if (circle.id === tempCircle.id) {
    const newCircle = {
        ...circle,
        x: e.target.x(),
        y: e.target.y()
    }
    tempLines.map(line => {
        let tempLine = line;
        if (circle.connections.includes(line.id)) {
            const other = line.connections.filter(otherCircle => otherCircle.id != tempCircle.id);
            const points = getPoints(newCircle, other[0]);
            tempLine = {
                ...line,
                connections: [newCircle, other],
                points: points
            };
        }
        console.log(tempLine);

        return tempLine;
    });
    return newCircle
}
return circle;
});
setLines(tempLines);
setCircles(tempCircles);
*/
    }

    // sets clicked circle to selected
    // e - event listener
    const selectCircle = (e) => {
        const id = e.target.id();
        // set connecting state to true
        setConnecting(true);

        setCircles(
            circles.map((circle) => {
                if (circle.id == id) {
                    setSelected(circle);
                }
                return {
                    ...circle,
                    connected: circle.id === id
                }
            })
        );
    };

    // sets clicked to selected
    // e - event listener
    const selectLine = (e) => {
        const id = e.target.id();
        // set connecting state to true
        setLines(
            lines.map((line) => {
                return {
                    ...line,
                    connected: line.id === id
                }
            })
        );
    };

    // Sets the starting point for the algorithm
    const setStart = (e) => {
        // create a temporary array to keep track of the array changes
        let tempCircles = []; 
        // checks if something is selected as well as if the selected node is not the end node
        if (connecting && !selected.end && !selected.start) {
            tempCircles = circles.map(circle => {
                if (selected.id === circle.id) {
                    return {
                        ...circle,
                        start: true
                    };
                }
                if (circle.start) {
                    return {
                        ...circle,
                        start: false
                    };
                }
                return circle;
            })
        }
        // otherwise, set tempCircles to regular circle
        else {
            tempCircles = circles;
        }
        // sets selected circled false and sets the new array to the circles state
        setCircles(
            tempCircles.map((circle) => {
                if (circle.connected) {
                    return {
                        ...circle,
                        connected: false,
                    };
                }
                return circle;
            })
        );
        // sets connecting to false and selected to empty
        setConnecting(!connecting);
        setSelected({});
    }

    // Sets the ending point for the algorithm
    const setEnd = (e) => {
        // create a temporary array to keep track of the array changes
        let tempCircles = [];
        // checks if something is selected as well as if the selected node is not the end node
        if (connecting && !selected.start) {
            tempCircles = circles.map(circle => {
                if (selected.id === circle.id) {
                    return {
                        ...circle,
                        end: true
                    };
                }
                if (circle.end) {
                    return {
                        ...circle,
                        end: false
                    };
                }
                return circle;
            })
        }
        // otherwise, set tempCircles to regular circle
        else {
            tempCircles = circles;
        }
        // sets selected circled false and sets the new array to the circles state
        setCircles(
            tempCircles.map((circle) => {
                if (circle.connected) {
                    return {
                        ...circle,
                        connected: false,
                    };
                }
                return circle;
            })
        );
        // sets connecting to false and selected to empty
        setConnecting(!connecting);
        setSelected({});
    }

    // makes a connector between the selected node and the next selected node
    // the connecting node's value is randomly generated
    const finalConnect = (e) => {
        const id = e.target.id();
        // creates a temporary circle object
        let toCircle = {};
        // concatinates the connector of the two circle objects to their connections variable
        setCircles(
            circles.map((circle) => {
                if (circle.connected) {
                    return {
                        ...circle,
                        connected: false,
                        connections: circle.connections.concat(lines.length)
                    };
                }
                if (circle.id === id) {
                    toCircle = circle;
                    return {
                        ...circle,
                        connections: circle.connections.concat(lines.length)
                    };
                }
                return circle;
            })
        );
        // creates a temporary new line
        const connectBundle = connectNode(toCircle, selected, connections);
        // if the line isn't just connecting to itself, add it to the connector state array
        if (JSON.stringify(connectBundle) === '{}') {
            setLines(lines);
            setCircles(
                circles.map((circle) => {
                    if (circle.connected) {
                        return {
                            ...circle,
                            connected: false,
                        };
                    }
                    return circle;
                })
            );
        }
        else {
            setLines(lines.concat(connectBundle[0]));
            setConnections(connectBundle[1]);
        }
        // clear connecting and selected states
        setConnecting(!connecting);
        setSelected({});
    };

    const theme = createMuiTheme({
        palette: {
            primary: {
                main: grey[900],
            }
        }
    })
    // return object to be rendered
    return (
        <Header>
            <ThemeProvider theme={theme}>
                <Grid container direction="column">
                    <Grid item></Grid>
                    <Grid item container spacing={1}>
                        <Grid item xs={3}>
                            <Grid container direction="column">
                                <Paper className={classes.buttons}>
                                    <Grid container spacing={0}>
                                        <Grid item xs={4}>
                                            <Button variant="contained" color="primary" className={classes.button} onClick={changePrim}>Prim</Button>
                                        </Grid>
                                        <Grid item className={classes.button} xs={4}>
                                            <Button variant="contained" color="primary" className={classes.button} onClick={changeDij}>Dijkstras</Button>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Button variant="contained" color="primary" className={classes.button} onClick={changeKruskal}>Kruskal</Button>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <h1>
                                            </h1>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <Button variant="contained" color="primary" onClick={addCircle}>Insert</Button>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Button variant="contained" color="primary" >Reset</Button>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                            <h2>
                            </h2>
                            <Paper className={classes.code}>
                                <h3>
                                    CODE
              </h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                            </Paper>
                        </Grid>
                        <Grid item xs={9}>
                            <Paper className={classes.paper}>
                                <h1>
                                    Graphing Algorithm: {type}
                                </h1>
                                <Stage width={WIDTH} height={HEIGHT}>
                                    <Layer>
                                        {circles.map((circle) => (
                                            <React.Fragment>
                                                <Label
                                                    x={circle.x}
                                                    y={circle.y - 50}

                                                >
                                                    <Tag
                                                        //width={100}
                                                        pointerDirection="down"
                                                        fill={circle.start || circle.end ? "green" : ""}
                                                        pointerWidth={25}
                                                        pointerHeight={10}
                                                        stroke={circle.start || circle.end ? "black" : ""}
                                                    />
                                                    <Text
                                                        align="center"
                                                        text={pointValues(circle)}
                                                        fill={"white"}
                                                        width={75}
                                                    />

                                                </Label>
                                                <Circle
                                                    key={circle.id}
                                                    id={circle.id}
                                                    x={circle.x}
                                                    y={circle.y}
                                                    width={circle.width}
                                                    height={circle.height}
                                                    fill={'green'}
                                                    opacity={0.8}
                                                    stroke={circle.connected ? 'red' : 'black'}
                                                    shadowColor="black"
                                                    shadowBlur={10}
                                                    shadowOpacity={0.6}
                                                    onClick={connecting ? finalConnect : selectCircle}
                                                    onDragStart={handleDragStart}
                                                    onDragEnd={handleDragEnd}
                                                    onDragMove={handleMove}
                                                    draggable
                                                />
                                                <Text
                                                    text={circle.value}
                                                    x={circle.x}
                                                    y={circle.y}
                                                    fill="white"
                                                />
                                            </React.Fragment>
                                        ))}
                                        {lines.map((line) => (
                                            <React.Fragment>
                                                <Line
                                                    id={line.id}
                                                    points={line.points}
                                                    stroke={line.connected ? "red" : "black"}
                                                    fill={"black"}
                                                    onClick={selectLine}
                                                />
                                                <Label
                                                    x={(line.points[0] + line.points[2]) / 2}
                                                    y={(line.points[1] + line.points[3]) / 2}
                                                >
                                                    <Tag
                                                        fill={"white"}
                                                    />
                                                    <Text
                                                        text={line.value}
                                                        fill="black"
                                                    />

                                                </Label>
                                            </React.Fragment>
                                        ))}
                                    </Layer>
                                </Stage>
                            </Paper>
                            <h1>
                            </h1>
                            <Grid item xs={12}>
                                <form noValidate autoComplete="off">
                                    <Paper className={classes.fields}>
                                        <Grid container spacing={1}>
                                            <Grid item xs={1}>
                                            </Grid>
                                            <Grid item >
                                                <Button variant="contained" color="primary">Step Back</Button>
                                            </Grid>
                                            <Grid item >
                                                <Button variant="contained" color="primary">Pause</Button>
                                            </Grid>
                                            <Grid item >
                                                <Button variant="contained" color="primary">Step Forward</Button>
                                            </Grid>
                                            <Grid item xs={2}>
                                            </Grid>
                                            <Grid item>
                                                <Button variant="contained" color="primary" onClick={setStart}>Set Start</Button>
                                            </Grid>
                                            <Grid item>
                                                <Button variant="contained" color="primary" onClick={setEnd}>Set End</Button>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </form>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </Header>
    );
}