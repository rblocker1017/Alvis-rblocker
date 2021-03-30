import React, { useState, useEffect, Component } from 'react';
import Header from "../componenets/layout/header";
import { Button, Grid, Paper, ButtonBase, Select, MenuItem, InputLabel, Modal, Fade, Backdrop, TextField, withStyles } from "@material-ui/core";
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
const styles = (theme) => ({
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
});
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

class GraphingAlgorithm extends Component{
    constructor(props){
        super(props);
        this.classes = this.props.classes;
        this.state = {
            type: "Prim",
            circles: INIT,
            lines: CONNECT,
            connecting: false,
            circleId: INIT.size,
            selected: null,
            startNode: 0,
            endNode: INIT.size - 1,
            algoArray: kruskalAlgorithm(0, INIT.size - 1, CONNECT),
            conValue: 1,
            step: -1,
            validPath: true,
            changed: false,
            open: false,
            inputError: false,
            input: "",
            otherInsert: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.insertValue = this.insertValue.bind(this);
        this.changeAlgo = this.changeAlgo.bind(this);
        this.addCircle = this.addCircle.bind(this);
        this.clearSelected = this.clearSelected.bind(this);
        this.clearSteps = this.clearSteps.bind(this);
        this.stepForward = this.stepForward.bind(this);
        this.stepBack = this.stepBack.bind(this);
        this.reset = this.reset.bind(this);
        this.handleDragStart = this.handleDragStart.bind(this);
        this.handleDragEnd = this.handleDragEnd.bind(this);
        this.handleMove = this.handleMove.bind(this);
        this.selectNode = this.selectNode.bind(this);
        this.setStart = this.setStart.bind(this);
        this.setEnd = this.setEnd.bind(this);
        this.finalConnect = this.finalConnect.bind(this);
        this.deleteNode = this.deleteNode.bind(this);
    }
    handleChange(e) {
        this.setState({
            input: e.target.value
        });
    }
    handleClose(){
        this.setState({
            connecting: false,
            selected: null,
            changed: true,
            otherInsert: false,
            inputError: false,
            open: false
        });
    }
    handleOpen(){
        if (this.state.step === -1) {
            this.setState({
                open: true
            });
        }
    }
    insertValue(){
        const regex = /[^0-9]/g;
        if (!regex.test(this.state.input) && this.state.input !== "" && parseInt(this.state.input) > 1 && parseInt(this.state.input) < 100) {
            const id = this.state.otherInsert;
            let conId = JSON.stringify([Number(this.state.selected), Number(id)].sort());
            let newLines = new Map(this.state.lines);
            let newCircles = new Map(this.state.circles);
            // creates a temporary circle object
            let toCircle = newCircles.get(id);
            let fromCircle = newCircles.get(this.state.selected);
            // concatinates the connector of the two circle objects to their connections variable
            fromCircle.connected = false;
            toCircle.connections.push(conId);
            fromCircle.connections.push(conId);
            // creates a temporary new line
            newLines.set(conId, connectNode(toCircle, fromCircle, parseInt(this.state.input), conId));
            this.setState({
                lines: newLines
            });
            // clear connecting and selected states
            this.handleClose();
            return true;
        }
        else {
            this.setState({
                inputError: true
            });
        }
    }
    changeAlgo(e){
        if (this.state.step !== -1) {
            return;
        }
        this.setState({
            changed: true,
            type: e.target.textContent
        });
    }
    // Adds a circle to the canvas. It is not attached to any connectors.
    // e - event listener
    addCircle(e){
        if (this.state.step !== -1) {
            return;
        }
        this.setState({
            circles: Functions.addCircleFunc(this.state.circles, this.state.circleId, HEIGHT, WIDTH),
            circleId: this.state.circleId + 1,
            changed: true
        });
    };
    clearSelected(){
        if (this.state.selected === null) {
            return 0;
        }
        let tempNodes = Functions.clearSelectedFunc(this.state.lines, this.state.circles, this.state.selected);
        typeof this.state.selected === "string" ? this.setState({lines: tempNodes, selected: null}) : this.setState({circles: tempNodes, selected: null, connecting: false});
    }
    clearSteps(){
        this.setState({
            lines: Functions.clearStepsFunc(this.state.lines, this.state.algoArray, this.state.step),
            step: -1
        });
    }
    stepForward(){
        if (this.state.step === -1) {
            this.clearSelected();
        }
        let tempLines = new Map(this.state.lines);
        let tempStep = this.state.step;
        if (this.state.step < this.state.algoArray.length - 1 && this.state.startNode !== null) {
            tempLines = Functions.stepForwardFunc(tempLines, this.state.algoArray, this.state.step);
            ++tempStep;
        }
        this.setState({
            step: tempStep,
            lines: tempLines
        });
    }

    stepBack(e){
        if (this.state.step >= 0) {
            this.setState({
                lines: Functions.stepBackFunc(this.state.lines, this.state.algoArray, this.state.step),
                step: this.state.step - 1
            });
        }
    }

    reset(e){
        this.clearSteps();
        this.setState({
            state: -1
        });
    }

    // circle being dragged has variable isDragging set to true.
    // e - event listener
    handleDragStart(e){
        this.setState({
            circles: Functions.handleDragStartFunc(this.state.circles, e.target.id())
        });
    };

    // Once circle is finished being dragged, isDragging is set to false
    // e - event listener
    handleDragEnd(e){
        this.setState({
            circles: Functions.handleDragEndFunc(this.state.circles, e.target.id())
        });
    };

    // while being dragged, the circle x and y co-ordinates are updated 
    // and its connectors positions are updated to follow the circle
    // e - event listener
    handleMove(e){
        const bundleMove = Functions.handleMoveFunc(this.state.lines, this.state.circles, e);
        this.setState({
            circles: bundleMove.circles,
            lines: bundleMove.lines
        });
    }

    // sets clicked circle to selected
    // @param e - event listener
    selectNode(e){
        console.log(this.state);
        // Can only select a node on the first step
        if (this.state.step !== -1) {
            return;
        }
        // Clear preivously selected
        this.clearSelected();
        const id = e.target.id();
        // do nothing if the selected and new selected circle are the same.
        if (id === this.state.selected) {
            return;
        }
        // initialize the tempNodes to make new values
        let tempNodes;
        const isString = typeof id === "string";
        console.log(isString);
        isString ? tempNodes = new Map(this.state.lines) : tempNodes = new Map(this.state.circles);
        tempNodes = Functions.selectNodeFunc(tempNodes, id);
        // if it is a circle, then set tempNodes to circles and set connecting to true
        // else set tempNodes to lines and set connecting to false
        if(isString){
            this.setState({
                selected: id,
                connecting: isString ? false : true,
                lines: tempNodes
            }); 
        }
        else{
            this.setState({
                selected: id,
                connecting: isString ? false : true,
                circles: tempNodes
            }); 
        }
    };

    // Sets the starting point for the algorithm
    setStart(e){
        if (this.state.step !== -1 || this.state.selected === null || this.state.selected === this.state.startNode || this.state.selected === this.state.endNode) {
            return;
        }
        const selected = this.state.selected;
        this.setState({
            circles: Functions.setStartFunc(this.state.circles, this.state.startNode, selected),
            startNode: selected,
            connecting: false,
            selected: null,
            changed: true
        });
    }

    // Sets the ending point for the algorithm
    setEnd(e){
        if (this.state.step !== -1 || this.state.selected === null || this.state.selected === this.state.startNode || this.state.selected === this.state.endNode) {
            return;
        }
        const selected = this.state.selected;
        this.setState({
            circles: Functions.setEndFunc(this.state.circles, this.state.endNode, selected),
            endNode: selected,
            connecting: false,
            selected: null,
            changed: true
        });
    }

    // makes a connector between the selected node and the next selected node
    // the connecting node's value is randomly generated
    finalConnect(e){
        const id = e.target.id();
        let conId = JSON.stringify([Number(this.state.selected), Number(id)].sort());
        if (this.state.step !== -1 || this.state.lines.has(conId)) {
            return 0;
        }
        if (id === this.state.selected || typeof this.state.selected === "string") {
            this.setState({
                connecting: false
            });
            this.clearSelected();
            return 0;
        }
        this.setState({
            otherInsert: e.target.id()
        });
        this.handleOpen();
    };

    deleteNode(e){
        if (this.state.selected === null) {
            return 0;
        }
        const isString = typeof this.state.selected === "string";
        const deleteObject = Functions.deleteNodeFunc(this.state.circles, this.state.lines, this.state.selected, isString);
        this.setState({
            lines: deleteObject.lines,
            circles: deleteObject.circles,
            selected: null,
            connecting: false,
            changed: true
        });
    }
    shouldComponentUpdate(nextProps, nextState){
        if(nextState.type !== this.state.type || nextState.circles !== this.state.circles || nextState.lines !== this.state.lines || nextState.open !== this.state.open){
            return true;
        }
        return false;
    }
    componentDidUpdate(){
        if(this.state.changed === true){ 
            let tempArray = null;
            switch(this.state.type){
                case "Kruskal":
                    tempArray = kruskalAlgorithm(this.state.startNode, this.state.endNode, this.state.lines);
                    break;
                case "Prim":
                    tempArray = primAlgorithm(this.state.startNode, this.state.endNode, this.state.lines);
                    break;
                case "Dijkstras":
                    tempArray = dijkstrasAlgorithm(this.state.startNode, this.state.endNode, this.state.lines);
                    break;
                default:
                    tempArray = kruskalAlgorithm(this.state.startNode, this.state.endNode, this.state.lines);
                    break;
            }
            this.setState({
                algoArray: tempArray,
                changed: false
            });
        }
    }

    render(){
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
        return(
            <Header>
            <ThemeProvider theme={theme}>
                <Modal
                    className={this.classes.modal}
                    open={this.state.open}
                    onClose={this.state.handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                >
                    <Fade in={this.state.open}>
                        <div className={this.classes.insertPaper}>
                            <form>
                                <Grid container direction="column" alignItems="center" justify="center" spacing={2}>
                                    <Grid item>
                                        <h2 >Insert a value between 1 and 100</h2>
                                    </Grid>
                                    <Grid item>
                                        <TextField error={this.state.inputError} label="value" helperText={this.state.inputError ? "Invalid value" : ""} onChange={this.handleChange} />
                                    </Grid>
                                    <Grid item>
                                        <Button variant="contained" color="primary" onClick={this.insertValue}>Insert</Button>
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
                                <Paper className={this.classes.buttons}>
                                    <Grid container spacing={0}>
                                        <Grid item xs={4}>
                                            <Button variant="contained" color={this.state.type !== "Prim" ? "primary" : "secondary"} className={this.classes.button} onClick={this.changeAlgo}>Prim</Button>
                                        </Grid>
                                        <Grid item className={this.classes.button} xs={4}>
                                            <Button variant="contained" color={this.state.type !== "Dijkstras" ? "primary" : "secondary"} className={this.classes.button} onClick={this.changeAlgo}>Dijkstras</Button>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Button variant="contained" color={this.state.type !== "Kruskal" ? "primary" : "secondary"} className={this.classes.button} onClick={this.changeAlgo}>Kruskal</Button>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <h1>
                                            </h1>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <Button variant="contained" color="primary" onClick={this.addCircle}>Insert</Button>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Button variant="contained" color="primary" onClick={this.reset} >Reset</Button>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                            <h2>
                            </h2>
                            <Paper className={this.classes.code}>
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
                            <Paper className={this.classes.paper}>
                                <h1>
                                    Graphing Algorithm: {this.state.type}
                                </h1>
                                <PathNotFound display={this.state.validPath} step={this.state.step + 1} />
                                <Stage width={WIDTH} height={HEIGHT}>
                                    <Layer>
                                        {Array.from(this.state.circles.values()).map((circle) => (
                                            <React.Fragment>
                                                <Label
                                                    x={circle.x}
                                                    y={circle.y - 50}

                                                >
                                                    <Tag
                                                        //width={100}
                                                        pointerDirection="down"
                                                        fill={circle.start || (circle.end && this.state.type !== "Prim" && this.state.type !== "Kruskal") ? "green" : ""}
                                                        pointerWidth={25}
                                                        pointerHeight={10}
                                                        stroke={circle.start || (circle.end && this.state.type !== "Prim" && this.state.type !== "Kruskal") ? "black" : ""}
                                                    />
                                                    <Text
                                                        fontSize={20}
                                                        align="center"
                                                        text={pointValues(circle, this.state.type)}
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
                                                    onClick={this.state.connecting ? this.finalConnect : this.selectNode}
                                                    onDragStart={this.handleDragStart}
                                                    onDragEnd={this.handleDragEnd}
                                                    onDragMove={this.handleMove}
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

                                        {Array.from(this.state.lines.values()).map((line) => (
                                            <React.Fragment>
                                                <Line
                                                    id={line.id}
                                                    points={line.points}
                                                    stroke={line.connected ? "red" : "black"}
                                                    hitStrokeWidth={25}
                                                    fill={"black"}
                                                    onClick={this.selectNode}
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
                                    <Paper className={this.classes.fields}>
                                        <Grid container spacing={1}>
                                            <Grid item xs={1}>
                                            </Grid>
                                            <Grid item >
                                                <Button variant="contained" color="primary" onClick={this.stepBack}>Step Back</Button>
                                            </Grid>
                                            <Grid item >
                                                <Button variant="contained" color="primary" >Pause</Button>
                                            </Grid>
                                            <Grid item >
                                                <Button variant="contained" color="primary" onClick={this.stepForward}>Step Forward</Button>
                                            </Grid>
                                            <Grid item xs={2}>
                                            </Grid>
                                            <Grid item>
                                                <Button variant="contained" color="primary" onClick={this.setStart}>Set Start</Button>
                                            </Grid>
                                            <Grid item>
                                                <Button variant="contained" color="primary" onClick={this.setEnd}>Set End</Button>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </form>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <ButtonBase className={this.classes.trashBtn} onClick={this.deleteNode}>
                    <img src={trash} className={this.classes.trashImg} />
                </ButtonBase>
            </ThemeProvider>
        </Header>
        );
    }
}
export default withStyles(styles)(GraphingAlgorithm);