import React, { useState, useEffect } from "react";
import Header from "../componenets/layout/header";
import { Button, ButtonBase, Grid, Paper } from "@material-ui/core";
import {
    makeStyles,
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
import trash from "../trash.png";

const WIDTH = 1400;
const HEIGHT = 450;

const useStyles = makeStyles((theme) => ({
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
}));

const INIT = generateBinaryTree(9, WIDTH, HEIGHT);
const CON_GEN = generateConnectorsBTT(INIT);
const CONNECT = CON_GEN[0];
const CURRENT_CON = CON_GEN[1];

export default function BinaryTreeTraversal() {
    const classes = useStyles();
    const [type, settype] = useState("");
    const [num, changeIteration] = useState(0);
    const [circles, setCircles] = React.useState(INIT);
    const [defaultArray, setDefualtArray] = React.useState([])
    const [visualArray, setVisualArray] = React.useState([]);
    const [inOrderArray, setInorder] = React.useState([]);
    const [preOrderArray, setPreorder] = React.useState([]);
    const [postOrderArray, setPostorder] = React.useState([]);
    const [lines, setLines] = React.useState(CONNECT);
    const [connection, setConnections] = React.useState(CURRENT_CON);
    const [selected, setSelected] = React.useState({ id: -1 });
    const [selectedRight, setSelectedRight] = React.useState({});
    const [selectedLeft, setSelectedLeft] = React.useState({});
    const [connecting, setConnecting] = React.useState(false);
    const [fromCon, setFromCon] = React.useState({});
    const [idNum, setIdNum] = useState(INIT.length);
    //const [width, setWidth] = React.useState(WIDTH);
    //const [height, setHeight] = React.useState(HEIGHT);
    /*
     *   Inorder Traversal
     */
    const inOrderTraversalHelper = () => {
        let array = [];
        inOrderTraversal(circles[0], array);
        setInorder(array);
        setVisualArray(generateArray(array.length, WIDTH, HEIGHT));
    };

    const inOrderTraversal = (root, array) => {
        if (root !== null) {
            inOrderTraversal(root.leftChild, array);
            circles.forEach((circle) => {
                if (circle.id === root.id) {
                    array.push(circle);
                }
            });
            inOrderTraversal(root.rightChild, array);
        }
    };

    /*
     *   Preorder Traversal
     */
    const preOrderTraversalHelper = () => {
        let array = [];
        let cur = circles[0];
        preOrderTraversal(cur, array);
        setPreorder(array);
        setVisualArray(generateArray(array.length, WIDTH, HEIGHT));
    };

    const preOrderTraversal = (root, array) => {
        if (root !== null) {
            circles.map((circle) => {
                if (circle.id === root.id) array.push(circle);
            });
            preOrderTraversal(root.leftChild, array);
            preOrderTraversal(root.rightChild, array);
        }
    };

    //useEffect(() => {
    //    updateDisplay();
    //}, [circles]);

    /*
     *   Postorder Traversal
     */

    const postOrderTraversalHelper = () => {
        let array = [];
        let cur = circles[0];
        postOrderTraversal(cur, array);
        setPostorder(array);
        setVisualArray(generateArray(array.length, WIDTH, HEIGHT));
    };

    const postOrderTraversal = (root, array) => {
        if (root !== null) {
            postOrderTraversal(root.leftChild, array);
            postOrderTraversal(root.rightChild, array);
            circles.map((circle) => {
                if (circle.id === root.id) array.push(circle);
            });
        }
    };

    /*
     * These 6 step methods handle the different steps being iterated for each algorithm
     */

    const stepForwardInorder = () => {
        if (num < inOrderArray.length) {
            inOrderArray[num].stroke = "red";
            visualArray[num].value = inOrderArray[num].value;
            changeIteration(num + 1);
        }
        setCircles(circles);
        setVisualArray(visualArray);
    };

    const stepBackInorder = () => {
        if (num - 1 < 0) return;
        else {
            inOrderArray[num - 1].stroke = "black";
            visualArray[num - 1].value = null;
            setCircles(circles);
            setVisualArray(visualArray);
            if (num - 1 >= 0) changeIteration(num - 1);
        }
    };

    const stepForwardPreorder = () => {
        if (num < preOrderArray.length) {
            preOrderArray[num].stroke = "red";
            visualArray[num].value = preOrderArray[num].value;
            changeIteration(num + 1);
        }
        setCircles(circles);
        setVisualArray(visualArray);
    };

    const stepBackPreorder = () => {
        if (num - 1 < 0) return;
        else {
            preOrderArray[num - 1].stroke = "black";
            visualArray[num - 1].value = null;
            setCircles(circles);
            setVisualArray(visualArray);
            if (num - 1 >= 0) changeIteration(num - 1);
        }
    };

    const stepForwardPostorder = () => {
        if (num < postOrderArray.length) {
            postOrderArray[num].stroke = "red";
            visualArray[num].value = postOrderArray[num].value;
            changeIteration(num + 1);
        }
        setCircles(circles);
        setVisualArray(visualArray);
    };

    const stepBackPostorder = () => {
        if (num - 1 < 0) return;
        else {
            postOrderArray[num - 1].stroke = "black";
            visualArray[num - 1].value = null;
            setCircles(circles);
            setVisualArray(visualArray);
            if (num - 1 >= 0) changeIteration(num - 1);
        }
    };

    const sleep = (milliseconds) => {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
    };

    let name = "test";

    const changePreorder = () => {
        resetTree();
        preOrderTraversalHelper();
        settype("Preorder");
    };
    const changeInorder = () => {
        resetTree();
        inOrderTraversalHelper();
        settype("Inorder");
    };
    const changePostorder = () => {
        resetTree();
        postOrderTraversalHelper();
        settype("Postorder");
    };

    const updateDisplay = () => {
        if (type === "Preorder") {
            changePreorder();
        }
        else if (type === "Inorder") {
            changeInorder();
        }
        else if (type === "Postorder") {
            changePostorder();
        }
    }

    const addCircle = (e) => {
        const value = Math.floor(Math.random() * 100);
        const newcircles = circles.concat({
            id: circles.length,
            x: Math.random() * (WIDTH - 200) + 100,
            y: Math.random() * (HEIGHT - 200) + 100,
            width: 100,
            height: 100,
            color: "green",
            stroke: "black",
            strokeWidth: 5,
            selected: false,
            connect: false,
            connections: [],
            value: value,
        });
        setCircles(newcircles);
    };

    const selectCircle = (e) => {
        const id = e.target.id();
        // set connecting state to true
        setSelectedLeft({});
        setSelectedRight({});
        setConnecting(true);
        setCircles(
            circles.map((circle) => {
                if (circle.id == id) {
                    if (circle.id != selected.id) {
                        setSelected(circle);
                        return {
                            ...circle,
                            stroke: "blue",
                            connected: true,
                        };
                    }
                    setSelected({ id: -1 });
                }
                return {
                    ...circle,
                    stroke: "black",
                    connected: false,
                };
            })
        );
        console.log(circles);
    };
    const deleteBranch = (e) => {
        const id = selected.id;
        resetTree();
        let tempBundle;
        //console.log(lines);
        if (id != -1 && id != circles[0].id) {
            let node = circles.filter((circle) => circle.id == id)[0]
            tempBundle = deleteNode(node , circles.filter((circle) => circle.id != id), lines);
            // ** TODO **
            // disconnect node from the parent
            tempBundle[0] = tempBundle[0].map((circle) => {
                if (circle.leftChild !== null && circle.leftChild.id === node.id) {
                    return {
                        ...circle,
                        leftChild: null
                    };
                }
                else if (circle.rightChild !== null && circle.rightChild.id === node.id) {
                    return {
                        ...circle,
                        rightChild: null
                    };
                }
                return circle;
            });
            setCircles(tempBundle[0]);
            setLines(tempBundle[1]);
            //console.log(tempBundle[0]);
        }
    }
    const deleteNode = (node, nodeArray, nodeConnections) => {
        //console.log(node);
        //console.log(nodeArray);
        let leftNodeArray = nodeArray;
        let rightNodeArray = nodeArray;
        let resultNodeArray = nodeArray;

        let newConnections = nodeConnections.filter((line) => {
            for (let i = 0; i < line.connections.length; i++) {
                if (line.connections[i].id === node.id) {
                    return false;
                }
            }
            return true;
        });
        let leftNodeConnections = newConnections;
        let rightNodeConnections = newConnections;
        //console.log(newConnections);
        if (node.leftChild != null) {
            let leftBundle = deleteNode(node.leftChild, nodeArray.filter((circle) => circle.id != node.leftChild.id), newConnections);
            leftNodeArray = leftBundle[0];
            leftNodeConnections = leftBundle[1];
            //console.log(leftNodeArray);
        }
        if (node.rightChild != null) {
            let rightBundle = deleteNode(node.rightChild, nodeArray.filter((circle) => circle.id != node.rightChild.id), newConnections);
            rightNodeArray = rightBundle[0];
            rightNodeConnections = rightBundle[1];
            //console.log(rightNodeArray);
        }
        resultNodeArray = leftNodeArray.filter((circle) => rightNodeArray.includes(circle));
        newConnections = leftNodeConnections.filter((line) => rightNodeConnections.includes(line));
        //console.log(resultNodeArray);
        return [resultNodeArray, newConnections];
        //let newArray = ;
        //if (node.leftChild) {
        //}
        /*
        let tempCircle = circles;
        resetTree();
        const id = selected.id;
        if (id != -1) {
            tempCircle = tempCircle.map((circle) => {
                if (circle.leftchild != null) {
                    if (circle.leftChild.id == id) {
                        return {
                            ...circle,
                            leftChild: null,
                        };
                    }
                }
                if (circle.rightChild != null) {
                    if (circle.rightChild.id == id) {
                        return {
                            ...circle,
                            rightChild: null,
                        };
                    }
                }
                if (circle.parent != null) {
                    if (circle.parent.id == id) {
                        return {
                            ...circle,
                            parent: null,
                        };
                    }
                }
                return circle;
            });

            tempCircle = tempCircle.filter((circle) => circle.id != id);
            setCircles(tempCircle);
            setLines(lines.filter((line) => !line.id.includes(JSON.stringify(id))));
            setSelected({ id: -1 });
        }*/
    };

    const insertRight = (e) => {
        setSelected({ id: -1 });
        setSelectedLeft({});
        setSelectedRight(circles.filter((circle) => circle.id == e.target.id())[0]);
    };

    const insertLeft = (e) => {

        setSelected({ id: -1 });
        setSelectedRight({});
        setSelectedLeft(circles.filter((circle) => circle.id == e.target.id())[0]);
    };

    const insertNode = (e) => {

        if (Object.keys(selectedLeft).length !== 0) {
            const child = createLeft(selectedLeft, idNum, WIDTH);
            if (child.id === -1) {
                return -1;
            }
            const connectionBundle = newConnectNodeBTT(
                selectedLeft,
                child,
                connection,
                true
            );
            setSelectedLeft({});
            setLines(lines.concat(connectionBundle[0]));
            setCircles(circles.concat(child));
            setIdNum(idNum + 1);
        } else if (Object.keys(selectedRight).length !== 0) {
            const child = createRight(selectedRight, idNum, WIDTH);
            if (child.id === -1) {
                return -1;
            }
            const connectionBundle = newConnectNodeBTT(
                selectedRight,
                child,
                connection,
                false
            );
            setSelectedRight({});
            setLines(lines.concat(connectionBundle[0]));
            setCircles(circles.concat(child));
            setIdNum(idNum + 1);
            console.log(idNum);
        }
    };

    const selectLine = (e) => {
        const id = e.target.id();
        // set connecting state to true
        setLines(
            lines.map((line) => {
                return {
                    ...line,
                    connected: line.id === id,
                };
            })
        );
    };

    const initialConnect = (e) => {
        const id = e.target.id();
        setConnecting(!connecting);
        setCircles(
            circles.map((circle) => {
                if (circle.id == id) {
                    setFromCon(circle);
                }
                return {
                    ...circle,
                    connected: circle.id === id,
                };
            })
        );
    };

    const stepForward = () => {
        if (type === "Preorder") stepForwardPreorder();
        else if (type === "Inorder") stepForwardInorder();
        else if (type === "Postorder") stepForwardPostorder();
    };

    const stepBackward = () => {
        if (type === "Preorder") stepBackPreorder();
        else if (type === "Inorder") stepBackInorder();
        else if (type === "Postorder") stepBackPostorder();
    };

    const resetTree = () => {
        circles.forEach((circle) => (circle.stroke = "black"));
        visualArray.forEach((rect) => (rect.value = null));
        setCircles(circles);
        //setVisualArray(visualArray);
        changeIteration(0);
    };
    const reset = (e) => {
        setCircles(INIT);
        setLines(CONNECT);
    };

    const finalConnect = (e) => {
        const id = e.target.id();
        let toCircle = {};
        setCircles(
            circles.map((circle) => {
                if (circle.connected) {
                    return {
                        ...circle,
                        connected: false,
                        connections: circle.connections.concat(lines.length),
                    };
                }
                if (circle.id === id) {
                    toCircle = circle;
                    return {
                        ...circle,
                        connections: circle.connections.concat(lines.length),
                    };
                }
                return circle;
            })
        );
        const newConnect = lines.concat(
            connectNode(toCircle, fromCon, lines.length)
        );
        setLines(newConnect);
        setConnecting(!connecting);
        setFromCon({});
    };

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
                                <Paper className={classes.buttons}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={4}>
                                            <Button
                                                variant="contained"
                                                onClick={changePreorder}
                                                color={type === "Preorder" ? "secondary" : "primary"}
                                                className={classes.button}
                                            >
                                                Preorder
                      </Button>
                                        </Grid>
                                        <Grid item className={classes.button} xs={4}>
                                            <Button
                                                variant="contained"
                                                //onClick={() => {console.log(CON_GEN) }}
                                                onClick={changeInorder}
                                                color={type === "Inorder" ? "secondary" : "primary"}
                                                className={classes.button}
                                            >
                                                Inorder
                      </Button>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Button
                                                variant="contained"
                                                onClick={changePostorder}
                                                color={type === "Postorder" ? "secondary" : "primary"}
                                                className={classes.button}
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
                                                onClick={insertNode}
                                            >
                                                Insert
                      </Button>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={resetTree}
                                            >
                                                Reset
                      </Button>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                            <h2></h2>
                            <Paper className={classes.code}>
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
                            <Paper className={classes.paper}>
                                <h1>Graphing Algorithm: {type}</h1>
                                <h1>Step: {num}</h1>
                                <Stage width={WIDTH} height={HEIGHT}>
                                    <Layer>
                                        {visualArray.map((rect) => (
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
                                        {circles.map((circle) => (
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
                                                    onClick={selectCircle}
                                                    onDblClick={
                                                        connecting ? finalConnect : initialConnect
                                                    }
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
                                                        selectedRight.id === circle.id ? "red" : "black"
                                                    }
                                                    width={circle.width / 10}
                                                    height={circle.height / 10}
                                                    onClick={insertRight}
                                                />
                                                <Circle
                                                    x={circle.x - 40}
                                                    y={circle.y + 40}
                                                    id={circle.id}
                                                    stroke={
                                                        selectedLeft.id === circle.id ? "red" : "black"
                                                    }
                                                    width={circle.width / 10}
                                                    height={circle.height / 10}
                                                    onClick={insertLeft}
                                                />
                                            </React.Fragment>
                                        ))}
                                        {lines.map((line) => (
                                            <React.Fragment>
                                                <Line
                                                    id={line.id}
                                                    points={line.points}
                                                    stroke={line.stroke}
                                                    fill={"black"}
                                                    onClick={selectLine}
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
                  <Paper className={classes.fields}>
                                        <Grid container spacing={1}>
                                            <Grid item xs={2}></Grid>
                                            <Grid item>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={stepBackward}
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
                                                    onClick={stepForward}
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
                <ButtonBase className={classes.trashBtn} onClick={deleteBranch}>
                    <img src={trash} className={classes.trashImg} />
                </ButtonBase>
            </ThemeProvider>
        </Header>
    );
}
