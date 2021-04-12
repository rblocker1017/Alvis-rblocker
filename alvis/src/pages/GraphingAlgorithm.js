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

// Graphing Algorithm component
// displays all of the buttons and display for the graphing algorithms
class GraphingAlgorithm extends Component{
    // initialize states and binds local methods
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
        this.instructions = [
            "Select Circle / Line: Click on node (can only select when step is at 0)",
            "Deselect Circle / Line: Click on already selected node",
            "Move Circle: Click and drag circle",
            "Move Canvas: Click and drag canvas",
            "Add Circle: Click Insert button (can only insert when step is at 0)",
            "Create Connection: Select a circle, then select a different circle",
            "Delete Circle / Line: Select node, then click the trashcan",
            "Select Algorithm: Click on specific algorithm",
            "Algorithm Display: Use Step Back and Step Forward to navigate algorithms",
            "Set Start/End: Sets selected node to start/end. End is only displayed on shortest path algorithms"
        ];
    }
    // handleChange - handles change in textbox for insert input.
    // @param: e - event handler object
    handleChange(e) {
        // sets state of the input for the insert modal
        this.setState({
            input: e.target.value
        });
    }
    // handleClose - close the input modal
    handleClose(){
        // clears the states of insert modal related states
        this.setState({
            connecting: false,
            selected: null,
            changed: true,
            otherInsert: false,
            inputError: false,
            open: false
        });
    }
    // handleOpen - open the input modal
    handleOpen(){
        // sets open state to true as long as it is not mid algorithm display
        if (this.state.step === -1) {
            this.setState({
                open: true
            });
        }
    }
    // insertValue - creates a new connection with a valid input
    insertValue(){
        // create a regex reference to only accept numeric values
        const regex = /[^0-9]/g;
        // check if the input is:
        //  1. a numeric value using the regex reference
        //  2. the number is greater than or equal to 1
        //  3. the number is less than 100
        if (!regex.test(this.state.input) && this.state.input !== "" && parseInt(this.state.input) >= 1 && parseInt(this.state.input) < 100) {
            let conId = JSON.stringify([Number(this.state.selected), Number(this.state.otherInsert)].sort());   // id of new connection
            let newLines = new Map(this.state.lines);                                       // copy of lines
            let newCircles = new Map(this.state.circles);                                   // copy of circles
            // get to and from circles for the connection to conenct together
            let toCircle = newCircles.get(this.state.otherInsert);
            let fromCircle = newCircles.get(this.state.selected);
            // concatinates the connector of the two circle objects to their connections variable
            fromCircle.connected = false;
            toCircle.connections.push(conId);
            fromCircle.connections.push(conId);
            newCircles.set(fromCircle.id, fromCircle);
            newCircles.set(toCircle.id, toCircle);
            // updates circles and lines states
            newLines.set(conId, connectNode(toCircle, fromCircle, parseInt(this.state.input), conId));
            this.setState({
                circles: newCircles,
                lines: newLines
            });
            // clear connecting and selected states
            this.handleClose();
        }
        else {
            // update input error state to display input error message
            this.setState({
                inputError: true
            });
        }
    }
    // changeAlgo - change the current algorithm
    // @param: e - event handler of the button
    changeAlgo(e){
        // reset algorithm back to first step
        this.reset();
        // set changed value to true and updates type to the new algorithm type
        this.setState({
            changed: true,
            type: e.target.textContent
        });
    }
    // Adds a circle to the canvas. It is not attached to any connectors.
    // @param: e - event listener
    addCircle(e){
        // only add the circle if the visualizer is not currently running
        if (this.state.step === -1) {
            // update circles state and increment current circle id
            this.setState({
                circles: Functions.addCircleFunc(this.state.circles, this.state.circleId, HEIGHT, WIDTH),
                circleId: this.state.circleId + 1,
                changed: true
            });        
        }
    };
    // clearSelected - clear selected node
    clearSelected(){
        // check if there is a selected value
        if (this.state.selected !== null) {
            // clear selected value and store it in tempNodes
            let tempNodes = Functions.clearSelectedFunc(this.state.lines, this.state.circles, this.state.selected);
            // store it in circles or lines state depending on the selected variable type
            typeof this.state.selected === "string" ? 
                this.setState({lines: tempNodes, selected: null}) : 
                this.setState({circles: tempNodes, selected: null, connecting: false});        }
    }
    // clearSteps - clears currently visualization run steps
    clearSteps(){
        // sets state to -1 and clears line steps
        this.setState({
            lines: Functions.clearStepsFunc(this.state.lines, this.state.algoArray, this.state.step),
            step: -1
        });
    }
    // stepForward - steps forward in the visualizer
    stepForward(){
        // if it is the first step, ensure that the selected value is cleared
        if (this.state.step === -1) {
            this.clearSelected();
        }
        // create temp variables for states to avoid race conditions
        let tempLines = new Map(this.state.lines);
        let tempStep = this.state.step;
        // if there is a next step, then step forward
        if (this.state.step < this.state.algoArray.length - 1 && this.state.startNode !== null) {
            tempLines = Functions.stepForwardFunc(tempLines, this.state.algoArray, this.state.step);
            ++tempStep;
        }
        // set step and lines to new value
        this.setState({
            step: tempStep,
            lines: tempLines
        });
    }
    // stepBack - go to the previous step in the visualizer
    stepBack(){
        // if there is a previous state, then step back
        if (this.state.step >= 0) {
            this.setState({
                lines: Functions.stepBackFunc(this.state.lines, this.state.algoArray, this.state.step),
                step: this.state.step - 1
            });
        }
    }
    // reset visualizer to its base state
    reset(){
        // clear the steps and set state to -1
        this.clearSteps();
        this.setState({
            step: -1
        });
    }

    // handleDragStart - keep track of what circle is currently being dragged
    //  * if a future implementation wants to do some change effect while dragged, this will be helpful
    // @params: e - event listener
    handleDragStart(e){
        this.setState({
            circles: Functions.handleDragStartFunc(this.state.circles, e.target.id())
        });
    };

    // handleDragEnd - keep clear the currently dragged circle state
    // @params: e - event listener
    handleDragEnd(e){
        this.setState({
            circles: Functions.handleDragEndFunc(this.state.circles, e.target.id())
        });
    };

    // handleMove - while being dragged, the circle x and y co-ordinates are updated 
    //  and its connectors positions are updated to follow the circle
    // @param: e - event listener
    handleMove(e){
        const bundleMove = Functions.handleMoveFunc(this.state.lines, this.state.circles, e);
        this.setState({
            circles: bundleMove.circles,
            lines: bundleMove.lines
        });
    }
    // selectNode - sets clicked circle to selected
    // @param: e - event listener
    selectNode(e){
        console.log(e);
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
    }
    // setStart - Sets the starting point for the algorithm
    // @param: e - event listener
    setStart(){
        // checks if: 
        //  selected is null
        //  state is at base state
        //  state is already a start or end node
        if (this.state.step !== -1 || this.state.selected === null || this.state.selected === this.state.startNode || this.state.selected === this.state.endNode) {
            return;
        }
        // set selected to stop race conditions
        const selected = this.state.selected;
        this.setState({
            circles: Functions.setStartFunc(this.state.circles, this.state.startNode, selected),
            startNode: selected,
            connecting: false,
            selected: null,
            changed: true
        });
    }
    // setEnd - Sets the ending point for the algorithm
    // @param: e - event listener
    setEnd(e){
        // checks if: 
        //  selected is null
        //  state is at base state
        //  state is already a start or end node
        if (this.state.step !== -1 || this.state.selected === null || this.state.selected === this.state.startNode || this.state.selected === this.state.endNode) {
            return;
        }
        // set selected to stop race conditions
        const selected = this.state.selected;
        this.setState({
            circles: Functions.setEndFunc(this.state.circles, this.state.endNode, selected),
            endNode: selected,
            connecting: false,
            selected: null,
            changed: true
        });
    }

    // finalConnect - open the modal to create the a new connection between selected and circle with id from e
    // @param: e - event listener
    finalConnect(e){
        const id = e.target.id();                                                       // id of new selected circle
        let conId = JSON.stringify([Number(this.state.selected), Number(id)].sort());   // tentative new id of the connection
        //makes sure that the state is zero and that it is a new connection
        if (this.state.step !== -1 || this.state.lines.has(conId)) {
            return 0;
        }
        // clear selected if the circle is the same, or if the user selects the line
        if (id === this.state.selected || typeof this.state.selected === "string") {
            this.setState({
                connecting: false
            });
            this.clearSelected();
            return 0;
        }
        // otherwise open new modal to start a new connection
        this.setState({
            otherInsert: e.target.id()
        });
        this.handleOpen();
    };
    // deleteNode - delete currently selected node
    deleteNode(){
        // checks is state isnt null
        if (this.state.selected !== null) {
            // checks if the selected node is a line or a circle
            const isString = typeof this.state.selected === "string";

            // delete object with delete node function
            const deleteObject = Functions.deleteNodeFunc(this.state.circles, this.state.lines, this.state.selected, isString);
            console.log(this.state.selected);
            console.log(this.state.startNode);
            if(this.state.endNode === this.state.selected){
                this.setState({
                    endNode: null
                });
            }
            if(this.state.startNode === this.state.selected){
                this.setState({
                    startNode: null
                });
            }
            this.setState({
                lines: deleteObject.lines,
                circles: deleteObject.circles,
                selected: null,
                connecting: false,
                changed: true
            });
        }
    }
    // shouldComponentUpdate - checks if component should re-render
    shouldComponentUpdate(nextProps, nextState){
        // rerenders if one of these states update:
        //  type
        //  circles
        //  lines
        //  opened
        if(nextState.changed !== this.state.type || nextState.circles !== this.state.circles || nextState.lines !== this.state.lines || nextState.open !== this.state.open){
            return true;
        }
        return false;
    }
    // componentDidUpdate - updates changed components after re-render
    componentDidUpdate(){
        // if changed flag is set, recalculate algorithm path
        if(this.state.changed === true){ 
            let tempArray = null;
            // check type, and calculate algorithm accordingly
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
    // render function
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
            {/* (can maybe modularize the modal since other components use it) */}
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
                    {name: "Prim", func: this.changeAlgo, time: "O(E log(V)), V = number of vertices", space: "O(V), V = number of vertices"},
                    {name: "Dijkstras", func: this.changeAlgo, time: "O(V^2), V = number of vertices", space: "O(V), V = number of vertices"},
                    {name: "Kruskal", func: this.changeAlgo, time: "O(E log(V)), V = number of vertices", space: "O(V), V = number of vertices"}
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
                instruct = {this.instructions}
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