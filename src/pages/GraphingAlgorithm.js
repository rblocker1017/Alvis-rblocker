import React, { useState, useEffect } from 'react';
import Header from "../componenets/layout/header";
import { Button, Grid, Paper, ButtonBase, Select, MenuItem, InputLabel } from "@material-ui/core";
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { grey, green } from '@material-ui/core/colors';
import { Stage, Layer, Rect, Circle, Text, Line, Label, Tag } from 'react-konva';
import Konva from "konva";
import { generateConnectors, connectNode, getPoints, generateCirclesGraphing } from "./Shapes/NodeGenerator"
import { select } from 'd3';
import { kruskalAlgorithm, primAlgorithm, dijkstraAlgorithm } from "./Algorithms/Graphing";
import trash from '../trash.png';
import PathNotFound from '../componenets/Messages/PathNotFound'

// Define width and height of the of the webapp canvas
const WIDTH = 1370;
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
        height: "76%"
    },
    fields:
    {
        backgroundColor: grey[200],
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: "100%"
    },
    trashBtn: {
        position: "fixed",
        top: "85%",
        right: "1%",
        '&:hover': {
            '& $trashImg': {
                opacity: 1
            }
        }
    },
    trashImg: {
        opacity: 0.55
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
    const [type, setType] = useState("Kruskal");
    const [circles, setCircles] = React.useState(INIT);
    const [lines, setLines] = React.useState(CONNECT);
    const [connecting, setConnecting] = React.useState(false);
    const [circleId, setCircleId] = React.useState(INIT.length);
    const [selected, setSelected] = React.useState({});
    const [connections, setConnections] = React.useState(CURRENT_CON);
    const [startNode, setStartNode] = React.useState(INIT.find(circle => circle.start === true));
    const [endNode, setEndNode] = React.useState(INIT.find(circle => circle.end === true));
    const [algoArray, setAlgoArray] = React.useState(-1);
    const [displayArray, setDisplayArray] = React.useState([]);
    const [conValue, setConValue] = React.useState(1);
    const [step, setStep] = React.useState(-1);
    const [validPath, setValidPath] = React.useState(true);

    useEffect(() => {
        let tempArray = null;
        switch (type) {
            case "Kruskal":
                tempArray = kruskalAlgorithm(startNode, endNode, lines);
                break;
            case "Prim":
                tempArray = primAlgorithm(startNode, endNode, lines);
                break;
            //case "Dijkstras":
            //console.log(dijkstraAlgorithm(circles, lines, startNode, endNode));
            //break
            default:
                tempArray = kruskalAlgorithm(startNode, endNode, lines);
                break;
        }
        setStep(-1);
        setAlgoArray(tempArray);
        tempArray.length === undefined ? setValidPath(false) : setValidPath(true);
    }, [type, connections, startNode, endNode]);


    // anonymous functions that change header to respective button
    const changePrim = () => setType("Prim");
    const changeDij = () => setType("Dijkstras");
    const changeKruskal = () => setType("Kruskal");

    const stepForward = (e) => {
        if (step === -1) {
            clearLines();
            clearCircles();
            setSelected({});
        }
        console.log(step);
        if (step < algoArray.length - 1) {
            let tempStep = step + 1;
            setLines(
                lines.map(line => {
                    if (line.id === algoArray[tempStep]) {
                        return {
                            ...line,
                            connected: true
                        };
                    }
                    return line;
                })
            );
            setStep(tempStep);
        }
    }
    const stepBack = (e) => {
        console.log(step)
        if (step >= 0) {
            let tempStep = step - 1;
            setLines(
                lines.map(line => {
                    if (line.id === algoArray[step]) {
                        return {
                            ...line,
                            connected: false
                        }
                    }
                    return line;
                })
            );
            setStep(tempStep);
        }
    }
    const reset = (e) => {
        let clearLines = lines.map(line => {
            return {
                ...line,
                connected: false
            };
        });
        setStep(-1);
        setLines(clearLines);
    }

    // Adds a circle to the canvas. It is not attached to any connectors.
    // e - event listener
    const addCircle = (e) => {
        if (step !== -1) {
            return;
        }
        // calculate value
        const value = Math.floor(Math.random() * 100);
        // create a new circle array by concatinating a new circle to it
        const newcircles = circles.concat({
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
        });
        // set circle array state to the new concatinated array
        setCircles(newcircles);
        setCircleId(circleId + 1);
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



    // Method to clear all strokes on the circles
    const clearCircles = () => {
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

    // Method to clear all strokes on the lines
    const clearLines = () => {
        setLines(
            lines.map((line) => {
                if (line.connected) {
                    return {
                        ...line,
                        connected: false,
                    }
                }
                return line;
            })
        );
    }

    // while being dragged, the circle x and y co-ordinates are updated 
    // and its connectors positions are updated to follow the circle
    // e - event listener
    const handleMove = (e) => {
        let tempCircles = circles;
        let tempLines = lines;
        let tempCircle = circles.find(circle => circle.id === e.target.id());
        setCircles(
            tempCircles.map(circle => {
                if (circle.id === tempCircle.id) {
                    tempCircle = {
                        ...circle,
                        x: e.target.x(),
                        y: e.target.y()
                    }
                    return tempCircle;
                }
                return circle;
            })
        );
        setLines(
            tempLines.map(line => {
                if (tempCircle.connections.includes(line.id)) {
                    const other = circles.find(circle => line.connections.find(otherCircle => otherCircle !== tempCircle.id) === circle.id);
                    const points = getPoints(tempCircle, other);
                    return {
                        ...line,
                        connections: [tempCircle.id, other.id],
                        points: points
                    };
                }
                return line;
            })
        );

    }

    // sets clicked circle to selected
    // e - event listener
    const selectCircle = (e) => {
        if (step !== -1) {
            return;
        }
        const id = e.target.id();
        // set connecting state to true
        setConnecting(true);
        console.log(lines);
        setCircles(
            circles.map((circle) => {
                if (circle.id === id) {
                    setSelected(circle);
                }
                return {
                    ...circle,
                    connected: circle.id === id
                }
            })
        );
        clearLines();
    };

    // sets clicked to selected
    // e - event listener
    const selectLine = (e) => {
        console.log(connections);
        if (step !== -1) {
            return;
        }
        const id = e.target.id();
        // set connecting state to true
        setLines(
            lines.map((line) => {
                if (line.id === id) {
                    setSelected(line);
                }
                return {
                    ...line,
                    connected: line.id === id
                }
            })
        );
        setConnecting(false);
        clearCircles();
    };

    // Sets the starting point for the algorithm
    const setStart = (e) => {
        if (step !== -1 || JSON.stringify(selected) === "{}") {
            return;
        }
        // create a temporary array to keep track of the array changes
        let tempCircles = [];
        // checks if something is selected as well as if the selected node is not the end node
        if (connecting && !selected.end && !selected.start) {
            tempCircles = circles.map(circle => {
                if (selected.id === circle.id) {
                    setStartNode(circle);
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
        if (step !== -1 || JSON.stringify(selected) === "{}") {
            return;
        }
        // create a temporary array to keep track of the array changes
        let tempCircles = [];
        // checks if something is selected as well as if the selected node is not the end node
        if (connecting && !selected.start) {
            tempCircles = circles.map(circle => {
                if (selected.id === circle.id) {
                    setEndNode(circle);
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
        if (step !== -1) {
            return;
        }
        const id = e.target.id();
        let conId = "";
        let newLines = [];
        id < selected.id ? conId = id + "" + selected.id : conId = selected.id + "" + id;

        // creates a temporary circle object
        let toCircle = {};
        // concatinates the connector of the two circle objects to their connections variable
        setCircles(
            circles.map((circle) => {
                if (circle.connected) {
                    return {
                        ...circle,
                        connected: false,
                        connections: circle.connections.concat(conId)
                    };
                }
                if (circle.id === id) {
                    toCircle = circle;
                    return {
                        ...circle,
                        connections: circle.connections.concat(conId)
                    };
                }
                return circle;
            })
        );
        // creates a temporary new line
        const connectBundle = connectNode(toCircle, selected, connections, conValue);
        // if the line isn't just connecting to itself, add it to the connector state array
        if (JSON.stringify(connectBundle) === '{}') {
            //setLines(lines);
            clearCircles();
        }
        else {
            newLines = lines.concat(connectBundle[0]);
            setLines(newLines);
            setConnections(connectBundle[1].concat());
        }
        // clear connecting and selected states
        setConnecting(!connecting);
        setSelected({});
    };

    const changeConValue = (e) => {
        setConValue(e.target.value);
    }

    const deleteNode = (e) => {
        console.log(lines);
        const id = selected.id;
        if (id != -1) {
            if (connecting) {
                setCircles(circles.filter(circle => circle.id != id));
                setLines(lines.filter(line => !line.id.includes(JSON.stringify(id))));
                setSelected({ id: -1 });
            }
            else {
                setLines(lines.filter((line) => line.id !== id));
                setConnections(connections.filter((connection) => connection !== id));
            }
        }
    }

    const theme = createMuiTheme({
        palette: {
            primary: {
                main: green[900],
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
                                            <Button variant="contained" color="primary" onClick={reset} >Reset</Button>
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
                                <PathNotFound display={validPath} step={step + 1} />
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
                                                        fontSize={20}
                                                        align="center"
                                                        text={pointValues(circle)}
                                                        fill={"white"}
                                                        width={100}
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
                                                    fontSize={20}
                                                    text={circle.id}
                                                    x={circle.x - 5}
                                                    y={circle.y - 7}
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
                                                    hitStrokeWidth={25}
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
                                                        fontSize={30}
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
                                                <Button variant="contained" color="primary" onClick={stepBack}>Step Back</Button>
                                            </Grid>
                                            <Grid item >
                                                <Button variant="contained" color="primary" >Pause</Button>
                                            </Grid>
                                            <Grid item >
                                                <Button variant="contained" color="primary" onClick={stepForward}>Step Forward</Button>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <InputLabel >Connector Value</InputLabel>
                                                <Select
                                                    value={conValue}
                                                    onChange={changeConValue}
                                                >
                                                    <MenuItem value={1}>1</MenuItem>
                                                    <MenuItem value={2}>2</MenuItem>
                                                    <MenuItem value={3}>3</MenuItem>
                                                    <MenuItem value={4}>4</MenuItem>
                                                    <MenuItem value={5}>5</MenuItem>
                                                    <MenuItem value={6}>6</MenuItem>
                                                    <MenuItem value={7}>7</MenuItem>
                                                    <MenuItem value={8}>8</MenuItem>
                                                    <MenuItem value={9}>9</MenuItem>
                                                </Select>
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
                <ButtonBase className={classes.trashBtn} onClick={deleteNode}>
                    <img src={trash} className={classes.trashImg} />
                </ButtonBase>
            </ThemeProvider>
        </Header>
    );
}