import React, { useState, useEffect, Component } from "react";
import Header from "../componenets/layout/header";
import { Button, ButtonBase, Grid, Paper } from "@material-ui/core";
import {
    withStyles,
    ThemeProvider,
    createMuiTheme,
} from "@material-ui/core/styles";
import { grey, orange, green, amber, red } from "@material-ui/core/colors";
import {
    Stage,
    Layer,
    Rect,
    Circle,
    Text,
    Line,
    Label,
    Tag,
} from "react-konva";
import Konva from "konva";
import {
    generateBinaryTree,
    generateConnectorsBTT,
    connectNode,
    getPoints,
    inOrderTraversalHelper,
    preOrderTraversalHelper,
    postOrderTraversalHelper,
    generateArray,
    createLeft,
    createRight,
    connectNodeBTT,
    newConnectNodeBTT,
} from "./Shapes/NodeGenerator";
import {inOrderTraversal, preOrderTraversal, postOrderTraversal} from './Algorithms/BinaryTreeTraversal';
import trash from "../trash.png";

const WIDTH = 1400;
const HEIGHT = 450;

const styles = (theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
        height: "100%",
        width: "125%",
    },
    buttons: {
        backgroundColor: grey[200],
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
        width: "100%",
        height: "100%",
    },
    button: {
        width: "105%",
    },
    code: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
        height: "76%",
    },
    fields: {
        backgroundColor: grey[200],
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
        height: "100%",
    },
    /*TRASH BUTTON START*/
    trashBtn: {
        position: "fixed",
        top: "85%",
        right: "1%",
        "&:hover": {
            "& $trashImg": {
                opacity: 1,
            },
        },
    },
    trashImg: {
        opacity: 0.55,
    },
    /*TRASH BUTTON END*/
});

const INIT = generateBinaryTree(9, WIDTH, HEIGHT);
const CON_GEN = generateConnectorsBTT(INIT);
const CONNECT = CON_GEN[0];
const CURRENT_CON = CON_GEN[1];

class BinaryTreeTraversal extends Component{
    constructor(props){
        super(props);
        this.classes = this.props.classes;
        this.state = {
            type: "",
            num: 0,
            circles: INIT,
            visualArray: [],
            algorithmArray: [],
            lines: CONNECT,
            connection: CURRENT_CON,
            selected: {id:-1},
            selectedRight: {},
            selectedLeft: {},
            fromCon: {},
            idNum: INIT.length
        };
        this.changeAlgo = this.changeAlgo.bind(this);
        this.stepForward = this.stepForward.bind(this);
        this.stepBackward = this.stepBackward.bind(this);
        this.selectCircle = this.selectCircle.bind(this);
        this.deleteBranch = this.deleteBranch.bind(this);
        this.deleteNode = this.deleteNode.bind(this);
        this.insertRight = this.insertRight.bind(this);
        this.insertLeft = this.insertLeft.bind(this);
        this.resetTree = this.resetTree.bind(this);
        this.insertNode = this.insertNode.bind(this);
    }
    changeAlgo(e){
        if(this.state.num === 0){
            this.setState({
                type: e.target.textContent
            });
        }
    }
    stepForward(){
        if (this.state.num < this.state.algorithmArray.length) {
            this.state.algorithmArray[this.state.num].stroke = "red";
            this.state.visualArray[this.state.num].value = this.state.algorithmArray[this.state.num].value;
            this.setState({
                num: this.state.num + 1,
                circles: this.state.circles,
                visualArray: this.state.visualArray
            });
        }
    }
    stepBackward(){
        if (this.state.num - 1 < 0) return;
        else {
            this.state.algorithmArray[this.state.num - 1].stroke = "black";
            this.state.visualArray[this.state.num - 1].value = null;
            this.setState({
                circles: this.state.circles,
                visualArray: this.state.visualArray,
                num: this.state.num - 1
            });
        }
    }
    selectCircle(e){
        if (this.state.num !== 0) {
            return null;
        }
        const id = e.target.id();
        // set connecting state to true
        console.log(this.state.selected);
        this.setState({
            selectedLeft: {},
            selectedRight: {},
            selected: this.state.selected.id === e.target.id() ? {id: -1} : this.state.circles.find((circle) => circle.id === e.target.id()),
            circles: this.state.circles.map((circle) => {
                if (circle.id == id) {
                    if (circle.id != this.state.selected.id) {
                        return {
                            ...circle,
                            stroke: "blue",
                            connected: true,
                        };
                    }
                }
                return {
                    ...circle,
                    stroke: "black",
                    connected: false,
                };
            })
        });
    };
    deleteBranch(e){
        const id = this.state.selected.id;
        let tempBundle;
        //console.log(lines);
        if (id != -1 && id != this.state.circles[0].id) {
            let node = this.state.circles.find((circle) => circle.id == id);
            tempBundle = this.deleteNode(node, this.state.circles.filter((circle) => circle.id != id), this.state.lines);
            // ** TODO **
            // disconnect node from the parent
            tempBundle[0] = tempBundle[0].map((circle) => {
                if (circle.leftChild !== null && circle.leftChild === node.id) {
                    return {
                        ...circle,
                        leftChild: null
                    };
                }
                else if (circle.rightChild !== null && circle.rightChild === node.id) {
                    return {
                        ...circle,
                        rightChild: null
                    };
                }
                return circle;
            });
            this.setState({
                circles: tempBundle[0],
                lines: tempBundle[1]
            });
        }
    }
    deleteNode(node, nodeArray, nodeConnections){

        let leftNodeArray = nodeArray;
        let rightNodeArray = nodeArray;
        let resultNodeArray = nodeArray;

        let newConnections = nodeConnections.filter((line) => {
            for (let i = 0; i < line.connections.length; i++) {
                if (line.connections[i] === node.id) {
                    console.log("test");
                    return false;
                }
            }
            return true;
        });
        let leftNodeConnections = newConnections;
        let rightNodeConnections = newConnections;
        //console.log(newConnections);
        if (node.leftChild != null) {
            let leftBundle = this.deleteNode(this.state.circles.find((circle) => node.leftChild === circle.id), nodeArray.filter((circle) => circle.id != node.leftChild), newConnections);
            leftNodeArray = leftBundle[0];
            leftNodeConnections = leftBundle[1];
            //console.log(leftNodeArray);
        }
        if (node.rightChild != null) {
            let rightBundle = this.deleteNode(this.state.circles.find((circle) => node.rightChild === circle.id), nodeArray.filter((circle) => circle.id != node.rightChild), newConnections);
            rightNodeArray = rightBundle[0];
            rightNodeConnections = rightBundle[1];
            //console.log(rightNodeArray);
        }
        resultNodeArray = leftNodeArray.filter((circle) => rightNodeArray.includes(circle));
        newConnections = leftNodeConnections.filter((line) => rightNodeConnections.includes(line));
        console.log(resultNodeArray);
        return [resultNodeArray, newConnections];
    }
    insertRight(e){
        this.resetTree();
        this.setState({
            selected: {id: -1},
            selectedLeft: {},
            selectedRight: this.state.circles.find((circle) => circle.id == e.target.id())
        });
    }

    insertLeft(e){
        this.resetTree();
        this.setState({
            selected: {id: -1},
            selectedRight: {},
            selectedLeft: this.state.circles.find((circle) => circle.id == e.target.id())
        });
    }
    resetTree(){
        this.state.circles.forEach((circle) => (circle.stroke = "black"));
        this.state.visualArray.forEach((rect) => (rect.value = null));
        this.setState({
            circles: this.state.circles.concat(),
            visualArray: this.state.visualArray,
            num: 0
        });
    }
    insertNode(e){
        if (Object.keys(this.state.selectedLeft).length !== 0) {
            const child = createLeft(this.state.selectedLeft, this.state.idNum, WIDTH);
            if (child.id === -1) {
                return -1;
            }
            const connectionBundle = newConnectNodeBTT(
                this.state.selectedLeft,
                child,
                this.state.connection,
                true
            );
            this.setState({
                selectedLeft: {},
                lines: this.state.lines.concat(connectionBundle[0]),
                circles: this.state.circles.concat(child),
                idNum: this.state.idNum + 1
            });
        } else if (Object.keys(this.state.selectedRight).length !== 0) {
            const child = createRight(this.state.selectedRight, this.state.idNum, WIDTH);
            if (child.id === -1) {
                return -1;
            }
            const connectionBundle = newConnectNodeBTT(
                this.state.selectedRight,
                child,
                this.state.connection,
                false
            );
            this.setState({
                selectedRight: {},
                lines: this.state.lines.concat(connectionBundle[0]),
                circles: this.state.circles.concat(child),
                idNum: this.state.idNum + 1
            });
        }
    };
    shouldComponentUpdate(nextProps, nextState){
        if(this.state.lines !== nextState.lines ||
            this.state.type !== nextState.type ||
            this.state.circles !== nextState.circles || 
            this.state.num !== nextState.num ||
            this.state.selectedLeft !== nextState.selectedLeft ||
            this.state.selectedRight !== nextState.selectedRight){
                return true;
        }
        return false;
    }
    componentDidUpdate(prevProps, prevState){
        if(prevState.lines !== this.state.lines || prevState.type !== this.state.type){
            let array = [];
            //this.resetTree();
            switch (this.state.type) {
                case "Preorder":
                    preOrderTraversal(this.state.circles[0], array, this.state.circles);
                    break;
                case "Postorder":
                    postOrderTraversal(this.state.circles[0], array, this.state.circles);
                    break;
                case "Inorder":
                    inOrderTraversal(this.state.circles[0], array, this.state.circles);
                    break;
            }
            this.setState({
                algorithmArray: array,
                visualArray: generateArray(array.length, WIDTH, HEIGHT)
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
        return (
            <Header>
                <ThemeProvider theme={theme}>
                    <Grid container direction="column">
                        <Grid item></Grid>
                        <Grid item container spacing={1}>
                            <Grid item xs={3}>
                                <Grid container direction="column">
                                    <Paper className={this.classes.buttons}>
                                        <Grid container spacing={1}>
                                            <Grid item xs={4}>
                                                <Button
                                                    variant="contained"
                                                    onClick={this.changeAlgo}
                                                    color={this.state.type === "Preorder" ? "secondary" : "primary"}
                                                    className={this.classes.button}
                                                >
                                                    Preorder
                          </Button>
                                            </Grid>
                                            <Grid item className={this.classes.button} xs={4}>
                                                <Button
                                                    variant="contained"
                                                    //onClick={() => {console.log(CON_GEN) }}
                                                    onClick={this.changeAlgo}
                                                    color={this.state.type === "Inorder" ? "secondary" : "primary"}
                                                    className={this.classes.button}
                                                >
                                                    Inorder
                          </Button>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Button
                                                    variant="contained"
                                                    onClick={this.changeAlgo}
                                                    color={this.state.type === "Postorder" ? "secondary" : "primary"}
                                                    className={this.classes.button}
                                                >
                                                    Postorder
                          </Button>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <h1></h1>
                                            </Grid>
                                            <Grid item xs={7}>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={this.insertNode}
                                                >
                                                    Insert
                          </Button>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={this.resetTree}
                                                >
                                                    Reset
                          </Button>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>
                                <h2></h2>
                                <Paper className={this.classes.code}>
                                    <h3>CODE</h3>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                                        do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                        Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                        laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                                        irure dolor in reprehenderit in voluptate velit esse cillum
                                        dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                                        cupidatat non proident, sunt in culpa qui officia deserunt
                                        mollit anim id est laborum.
                    </p>
                                </Paper>
                            </Grid>
                            <Grid item xs={9}>
                                <Paper className={this.classes.paper}>
                                    <h1>Graphing Algorithm: {this.state.type}</h1>
                                    <h1>Step: {this.state.num}</h1>
                                    <Stage width={WIDTH} height={HEIGHT} draggable>
                                        <Layer>
    
                                            {this.state.circles.map((circle) => (
                                                <React.Fragment>
                                                    <Circle
                                                        key={circle.id}
                                                        id={circle.id}
                                                        x={circle.x}
                                                        y={circle.y}
                                                        width={circle.width}
                                                        height={circle.height}
                                                        fill={circle.fill}
                                                        opacity={0.8}
                                                        stroke={circle.stroke}
                                                        shadowColor="black"
                                                        shadowBlur={10}
                                                        shadowOpacity={0.6}
                                                        onClick={this.selectCircle}
                                                    />
                                                    <Text
                                                        text={circle.value}
                                                        x={circle.x}
                                                        y={circle.y}
                                                        fill="white"
                                                    />
                                                    <Circle
                                                        x={circle.x + 40}
                                                        y={circle.y + 40}
                                                        id={circle.id}
                                                        stroke={
                                                            this.state.selectedRight.id === circle.id ? "red" : "black"
                                                        }
                                                        width={circle.width / 10}
                                                        height={circle.height / 10}
                                                        onClick={this.insertRight}
                                                    />
                                                    <Circle
                                                        x={circle.x - 40}
                                                        y={circle.y + 40}
                                                        id={circle.id}
                                                        stroke={
                                                            this.state.selectedLeft.id === circle.id ? "red" : "black"
                                                        }
                                                        width={circle.width / 10}
                                                        height={circle.height / 10}
                                                        onClick={this.insertLeft}
                                                    />
                                                </React.Fragment>
                                            ))}
                                            {this.state.lines.map((line) => (
                                                <React.Fragment>
                                                    <Line
                                                        id={line.id}
                                                        points={line.points}
                                                        stroke={line.stroke}
                                                        fill={"black"}
                                                        onClick={this.selectLine}
                                                    />
                                                </React.Fragment>
                                            ))}
                                            {this.state.visualArray.map((rect) => (
                                                <React.Fragment>
                                                    <Rect
                                                        x={rect.x}
                                                        y={rect.y}
                                                        width={rect.width}
                                                        height={rect.height}
                                                        stroke={rect.stroke}
                                                        strokeWidth={rect.strokeWidth}
                                                        value={rect.value}
                                                    />
                                                    <Text
                                                        text={rect.value}
                                                        fontSize={20}
                                                        x={rect.x + 40}
                                                        y={rect.y + 40}
                                                    />
                                                </React.Fragment>
                                            ))}
                                        </Layer>
                                        
                                    </Stage>
                                    
                                </Paper>
                                <h1></h1>
                                <Grid item xs={12}>
                                    <form noValidate autoComplete="off">
                                        ``
                      <Paper className={this.classes.fields}>
                                            <Grid container spacing={1}>
                                                <Grid item xs={2}></Grid>
                                                <Grid item>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={this.stepBackward}
                                                    >
                                                        Step Back
                            </Button>
                                                </Grid>
                                                <Grid item xs={2}></Grid>
                                                <Grid item>
                                                    <Button variant="contained" color="primary">
                                                        Pause
                            </Button>
                                                </Grid>
                                                <Grid item xs={2}></Grid>
                                                <Grid item>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={this.stepForward}
                                                    >
                                                        Step Forward
                            </Button>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </form>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <ButtonBase className={this.classes.trashBtn} onClick={this.deleteBranch}>
                        <img src={trash} className={this.classes.trashImg} />
                    </ButtonBase>
                </ThemeProvider>
            </Header>
        );
    }
}

export default withStyles(styles)(BinaryTreeTraversal);