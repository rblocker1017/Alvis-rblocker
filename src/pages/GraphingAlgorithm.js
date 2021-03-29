import React, { useState, useEffect } from 'react';
import Header from "../componenets/layout/header";
import { Button, Grid, Paper, ButtonBase, Select, MenuItem, InputLabel, Modal, Fade, Backdrop, TextField } from "@material-ui/core";
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { grey, green } from '@material-ui/core/colors';
import { Stage, Layer, Rect, Circle, Text, Line, Label, Tag } from 'react-konva';
import Konva from "konva";
import { generateConnectors, connectNode, getPoints, generateCirclesGraphing } from "./Shapes/NodeGenerator"
import { select } from 'd3';
import { kruskalAlgorithm, primAlgorithm, dijkstrasAlgorithm } from "./Algorithms/Graphing";
import trash from '../trash.png';
import PathNotFound from '../componenets/Messages/PathNotFound'
import * as Functions from './Functionality/GraphingFunctions';

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
    },
    insertPaper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
}));
// Generate initial connectors and circles
const INIT = generateCirclesGraphing(6, WIDTH, HEIGHT);
const CON_GEN = generateConnectors(6, INIT)
const CONNECT = CON_GEN;

// function to return if the circle lable should display START NODE or END NODE on its label
// circle - the circle you want to label
// return - label string
function pointValues(circle, type) {
    if (circle.start) {
        return "START NODE"
    }
    else if (circle.end && type !== "Prim" && type !== "Kruskal") {
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
    const [circleId, setCircleId] = React.useState(INIT.size);
    const [selected, setSelected] = React.useState(null);
    const [startNode, setStartNode] = React.useState(0);
    const [endNode, setEndNode] = React.useState(INIT.size - 1);
    const [algoArray, setAlgoArray] = React.useState(-1);
    const [conValue, setConValue] = React.useState(1);
    const [step, setStep] = React.useState(-1);
    const [validPath, setValidPath] = React.useState(true);
    const [changed, setChanged] = useState(false);
    const [open, setOpen] = useState(false);
    const [inputError, setInputError] = useState(false);
    const [input, setInput] = useState("");
    const [otherInsert, setOtherInsert] = useState(null);
    useEffect(() => {
        let tempArray = null;
        switch (type) {
            case "Kruskal":
                tempArray = kruskalAlgorithm(startNode, endNode, lines);
                break;
            case "Prim":
                tempArray = primAlgorithm(startNode, endNode, lines);
                break;
            case "Dijkstras":
                tempArray = dijkstrasAlgorithm(startNode, endNode, lines);
                break;
            default:
                tempArray = kruskalAlgorithm(startNode, endNode, lines);
                break;
        }
        setAlgoArray(tempArray);
        setChanged(false);
        console.log(tempArray);
        tempArray.length === undefined || tempArray < 2 ? setValidPath(false) : setValidPath(true);
    }, [type, changed, startNode, endNode]);

    const handleChange = (e) => {
        setInput(e.target.value);
        console.log(e.target.value);
    }

    const handleClose = () => {
        setConnecting(false);
        setSelected(null);
        setChanged(true);
        setOtherInsert(false);
        setInputError(false);
        setOpen(false);
    }

    const handleOpen = () => {
        if (step === -1) {
            setOpen(true);
        }
    }

    const insertValue = () => {
        const regex = /[^0-9]/g;
        if (!regex.test(input) && input !== "" && parseInt(input) > 1 && parseInt(input) < 100) {
            const id = otherInsert;
            let conId = JSON.stringify([Number(selected), Number(id)].sort());
            let newLines = new Map(lines);
            let newCircles = new Map(circles);
            // creates a temporary circle object
            let toCircle = newCircles.get(id);
            let fromCircle = newCircles.get(selected);
            // concatinates the connector of the two circle objects to their connections variable
            fromCircle.connected = false;
            toCircle.connections.push(conId);
            fromCircle.connections.push(conId);
            // creates a temporary new line
            newLines.set(conId, connectNode(toCircle, fromCircle, parseInt(input), conId));
            setLines(newLines);
            // clear connecting and selected states

            handleClose();
            return true;
        }
        else {
            setInputError(true);
        }
    }

    const changeAlgorithm = (e) => {
        if(step !== -1) {
            return;
        }
        setType(e.target.textContent);
    }

    const stepForward = (e) => {
        if (step === -1) {
            clearSelected();
            setSelected(null);
            setConnecting(false);
        }
        let tempLines = new Map(lines);
        if (step < algoArray.length - 1) {
            tempLines = Functions.stepForwardFunc(tempLines, algoArray, step);
            setStep(step + 1);
        }
        setLines(tempLines);
    }

    const stepBack = (e) => {
        if (step >= 0) {
            setLines(Functions.stepBackFunc(lines, algoArray, step));
            setStep(step - 1);
        }
    }

    const reset = (e) => {
        clearSteps();
        setStep(-1);
    }

    // Adds a circle to the canvas. It is not attached to any connectors.
    // e - event listener
    const addCircle = (e) => {
        if (step !== -1) {
            return;
        }
        setCircles(Functions.addCircleFunc(circles, circleId, HEIGHT, WIDTH));
        setCircleId(circleId + 1);
        setChanged(true);
    };

    // circle being dragged has variable isDragging set to true.
    // e - event listener
    const handleDragStart = (e) => {
        setCircles(Functions.handleDragStartFunc(circles, e.target.id()));
    };

    // Once circle is finished being dragged, isDragging is set to false
    // e - event listener
    const handleDragEnd = (e) => {
        setCircles(Functions.handleDragEndFunc(circles, e.target.id()));
    };

    const clearSteps = () => {
        setLines(Functions.clearStepsFunc(lines, algoArray, step));
        setStep(-1);
    }

    // Method to clear all strokes on the lines
    const clearSelected = () => {
        if (selected === null) {
            return 0;
        }
        let tempNodes = Functions.clearSelectedFunc(lines, circles, selected);
        setSelected(null);
        typeof selected === "string" ? setLines(tempNodes) : setCircles(tempNodes);
    }

    // while being dragged, the circle x and y co-ordinates are updated 
    // and its connectors positions are updated to follow the circle
    // e - event listener
    const handleMove = (e) => {
        const bundleMove = Functions.handleMoveFunc(lines, circles, e);
        setCircles(bundleMove.circles);
        setLines(bundleMove.lines);
    }

    // sets clicked circle to selected
    // @param e - event listener
    const selectNode = (e) => {
        // Can only select a node on the first step
        if (step !== -1) {
            return;
        }
        // Clear preivously selected
        clearSelected();
        const id = e.target.id();
        // do nothing if the selected and new selected circle are the same.
        if (id === selected) {
            return;
        }
        // initialize the tempNodes to make new values
        let tempNodes;
        const isString = typeof id === "string";
        isString ? tempNodes = new Map(lines) : tempNodes = new Map(circles);
        tempNodes = Functions.selectNodeFunc(tempNodes, id);
        setSelected(id);
        // if it is a circle, then set tempNodes to circles and set connecting to true
        // else set tempNodes to lines and set connecting to false
        isString ? setConnecting(false) : setConnecting(true);
        // update the respective node
        isString ? setLines(tempNodes) : setCircles(tempNodes);
    };

    // Sets the starting point for the algorithm
    const setStart = (e) => {
        if (step !== -1 || selected === null || selected === startNode || selected === endNode) {
            return;
        }
        setCircles(Functions.setStartFunc(circles, startNode, selected));
        setStartNode(selected);
        setConnecting(false);
        setSelected(null);
    }

    // Sets the ending point for the algorithm
    const setEnd = (e) => {
        if (step !== -1 || selected === null || selected === startNode || selected === endNode) {
            return;
        }
        setCircles(Functions.setEndFunc(circles, endNode, selected));
        setEndNode(selected);
        setConnecting(false);
        setSelected(null);
    }

    // makes a connector between the selected node and the next selected node
    // the connecting node's value is randomly generated
    const finalConnect = (e) => {
        const id = e.target.id();
        let conId = JSON.stringify([Number(selected), Number(id)].sort());
        if (step !== -1 || lines.has(conId)) {
            console.log("I exist!");
            return 0;;
        }
        if (id === selected || typeof selected === "string") {
            setConnecting(false);
            clearSelected();
            return 0;
        }
        setOtherInsert(e.target.id());
        handleOpen();
    };

    const changeConValue = (e) => {
        setConValue(e.target.value);
    }

    const deleteNode = (e) => {
        if (selected === null) {
            return 0;
        }
        const isString = typeof selected === "string";
        const deleteObject = Functions.deleteNodeFunc(circles, lines, selected, isString);
        setLines(deleteObject.lines);
        setCircles(deleteObject.circles);
        setSelected(null);
        setConnecting(false);
        setChanged(true);
    }

    const theme = createMuiTheme({
        palette: {
            primary: {
                main: green[900],
            },
            secondary: {
                main: grey[700],
            },
        },
    });
    // return object to be rendered
    return (
        <Header>
            <ThemeProvider theme={theme}>
                <Modal
                    className={classes.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                >
                    <Fade in={open}>
                        <div className={classes.insertPaper}>
                            <form>
                                <Grid container direction="column" alignItems="center" justify="center" spacing={2}>
                                    <Grid item>
                                        <h2 >Insert a value between 1 and 100</h2>
                                    </Grid>
                                    <Grid item>
                                        <TextField error={inputError} label="value" helperText={inputError ? "Invalid value" : ""} onChange={handleChange} />
                                    </Grid>
                                    <Grid item>
                                        <Button variant="contained" color="primary" onClick={insertValue}>Insert</Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </div>
                    </Fade>
                </Modal>
                <Grid container direction="column">
                    <Grid item></Grid>
                    <Grid item container spacing={1}>
                        <Grid item xs={3}>
                            <Grid container direction="column">
                                <Paper className={classes.buttons}>
                                    <Grid container spacing={0}>
                                        <Grid item xs={4}>
                                            <Button variant="contained" color={type !== "Prim" ? "primary" : "secondary"} className={classes.button} onClick={changeAlgorithm}>Prim</Button>
                                        </Grid>
                                        <Grid item className={classes.button} xs={4}>
                                            <Button variant="contained" color={type !== "Dijkstras" ? "primary" : "secondary"} className={classes.button} onClick={changeAlgorithm}>Dijkstras</Button>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Button variant="contained" color={type !== "Kruskal" ? "primary" : "secondary"} className={classes.button} onClick={changeAlgorithm}>Kruskal</Button>
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
                                        {Array.from(circles.values()).map((circle) => (
                                            <React.Fragment>
                                                <Label
                                                    x={circle.x}
                                                    y={circle.y - 50}

                                                >
                                                    <Tag
                                                        //width={100}
                                                        pointerDirection="down"
                                                        fill={circle.start || (circle.end && type !== "Prim" && type !== "Kruskal") ? "green" : ""}
                                                        pointerWidth={25}
                                                        pointerHeight={10}
                                                        stroke={circle.start || (circle.end && type !== "Prim" && type !== "Kruskal") ? "black" : ""}
                                                    />
                                                    <Text
                                                        fontSize={20}
                                                        align="center"
                                                        text={pointValues(circle, type)}
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
                                                    onClick={connecting ? finalConnect : selectNode}
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

                                        {Array.from(lines.values()).map((line) => (
                                            <React.Fragment>
                                                <Line
                                                    id={line.id}
                                                    points={line.points}
                                                    stroke={line.connected ? "red" : "black"}
                                                    hitStrokeWidth={25}
                                                    fill={"black"}
                                                    onClick={selectNode}
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