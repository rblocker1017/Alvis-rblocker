﻿import { Backdrop, Button, Fade, Grid, Modal, TextField, withStyles } from "@material-ui/core";
import { green, grey } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';
import React, { Component } from 'react';
import GraphingDisplay from '../componenets/layout/AlgorithmDisplay/Graphing/GraphingDisplay';
import MainPage from '../componenets/layout/Page/MainPage';
import { dijkstrasAlgorithm, kruskalAlgorithm, primAlgorithm } from "./Algorithms/Graphing";
import * as Functions from './Functionality/GraphingFunctions';
import { connectNode, generateCirclesGraphing, generateConnectors } from "./Shapes/NodeGenerator";
// Define width and height of the of the webapp canvas
const WIDTH = 1370;
const HEIGHT = 450;

// Generate styles for React objects
const styles = (theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    insertPaper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
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
        this.reset();
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
        console.log("test");
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
            <React.Fragment>
            <Modal
                className={this.classes.modal}
                open={this.state.open}
                onClose={this.handleClose}
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
            <MainPage 
                algorithms = {[
                    {name: "Prim", func: this.changeAlgo},
                    {name: "Dijkstras", func: this.changeAlgo},
                    {name: "Kruskal", func: this.changeAlgo}
                ]}
                display = {{
                    name: "Graphing Algorithms",
                    type: this.state.type,
                    step: this.state.step + 1,
                    display: <GraphingDisplay 
                                circles={this.state.circles} 
                                lines={this.state.lines} 
                                type={this.state.type}
                                connecting={this.state.connecting}
                                selectNode={this.selectNode}
                                finalConnect={this.finalConnect}
                                handleDragStart={this.handleDragStart}
                                handleDragEnd={this.handleDragEnd}
                                handleMove={this.handleMove}
                                clearSelected={this.clearSelected}
                            />,
                    delete: this.deleteNode,
                    insert: this.addCircle,
                    reset: this.reset,
                    extra: null
                }}
                barFunctions = {{
                    forward: this.stepForward,
                    back: this.stepBack,
                    start: this.setStart,
                    end: this.setEnd,
                }}
            />
        </React.Fragment>
        );
    }
}
export default withStyles(styles)(GraphingAlgorithm);