import React, { useState } from "react";
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
    newConnectNodeBTT
} from "./Shapes/NodeGenerator";
import trash from '../trash.png';

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
        '&:hover': {
            '& $trashImg': {
                opacity: 1
            }
        }
    },
    trashImg: {
        opacity: 0.55
    }
    /*TRASH BUTTON END*/
}));

const INIT = generateBinaryTree(9, WIDTH, HEIGHT);
const CON_GEN = generateConnectorsBTT(INIT);
const CONNECT = CON_GEN[0];
const CURRENT_CON = CON_GEN[1];
const INORDER = inOrderTraversalHelper(INIT);
const PREORDER = preOrderTraversalHelper(INIT);
const POSTORDER = postOrderTraversalHelper(INIT);
const ARRAY = generateArray(INIT.length, WIDTH, HEIGHT);

export default function BinaryTreeTraversal() {
    const classes = useStyles();
    const [type, settype] = useState("Preorder");
    const [flag1, setFlag1] = useState(true);
    const [flag2, setFlag2] = useState(true);
    const [flag3, setFlag3] = useState(true);
    const [num, changeIteration] = useState(0);
    const [circles, setCircles] = React.useState(INIT);
    const [visualArray, setVisualArray] = React.useState(ARRAY);
    const [inOrderArray, setInorder] = React.useState(INORDER);
    const [preOrderArray, setPreorder] = React.useState(PREORDER);
    const [postOrderArray, setPostorder] = React.useState(POSTORDER);
    const [lines, setLines] = React.useState(CONNECT);
    const [connection, setConnections] = React.useState(CURRENT_CON);
    const [selected, setSelected] = React.useState({ id: -1 });
    const [selectedRight, setSelectedRight] = React.useState({});
    const [selectedLeft, setSelectedLeft] = React.useState({});
    const [connecting, setConnecting] = React.useState(false);
    const [fromCon, setFromCon] = React.useState({});
    const [tags, setTags] = React.useState({});

    /*
     * These 3 click methods handle the different buttons clicked: Preorder, Inorder, Postorder
     */
    const handleClick1 = () => {
        if (flag1) setFlag1(!flag1);
        resetTree();
        setFlag2(true);
        setFlag3(true);
    };

    const handleClick2 = () => {
        if (flag2) setFlag2(!flag2);
        resetTree();
        setFlag3(true);
        setFlag1(true);
        //inOrder();

        //let displayArray = [];
        //inOrder(circles[0], displayArray);
        //return displayArray;
    };

    const handleClick3 = () => {
        if (flag3) setFlag3(!flag3);
        resetTree();
        setFlag1(true);
        setFlag2(true);
    };

    /*
     * These 6 step methods handle the different steps being iterated for each algorithm
     */
    const stepForwardInorder = () => {
        let tempCircles = circles;
        if (num < tempCircles.length) {
            tempCircles[inOrderArray[num]].stroke = "red";
            visualArray[num].value = tempCircles[inOrderArray[num]].value;
            changeIteration(num + 1);
        }
        setCircles(tempCircles);
        setVisualArray(visualArray);
        return setCircles(tempCircles), setVisualArray(visualArray);
    };

    const stepBackInorder = () => {
        let tempCircles = circles;
        let tempArray = visualArray;
        if (num - 1 < 0) return;
        //if (num >= tempCircles.length) changeIteration(num - 1);
        else {
            //console.log(tempCircles[inOrderArray[num]].value);
            tempCircles[inOrderArray[num - 1]].stroke = "black";
            tempArray[num - 1].value = null;
            setCircles(tempCircles);
            setVisualArray(tempArray);
            if (num - 1 >= 0) changeIteration(num - 1);
            console.log(num);
            return setCircles(tempCircles), setVisualArray(tempArray);
        }
    };

    const stepForwardPreorder = () => {
        let tempCircles = circles;
        if (num < tempCircles.length) {
            tempCircles[preOrderArray[num]].stroke = "red";
            visualArray[num].value = tempCircles[preOrderArray[num]].value;
            changeIteration(num + 1);
        }
        setCircles(tempCircles);
        setVisualArray(visualArray);
        return setCircles(tempCircles), setVisualArray(visualArray);
    };

    const stepBackPreorder = () => {
        let tempCircles = circles;
        if (num - 1 < 0) return;
        else {
            tempCircles[preOrderArray[num - 1]].stroke = "black";
            visualArray[num - 1].value = null;
            setCircles(tempCircles);
            setVisualArray(visualArray);
            if (num - 1 >= 0) changeIteration(num - 1);
            return setCircles(tempCircles), setVisualArray(visualArray);
        }
    };

    const stepForwardPostorder = () => {
        let tempCircles = circles;
        if (num < tempCircles.length) {
            tempCircles[postOrderArray[num]].stroke = "red";
            visualArray[num].value = tempCircles[postOrderArray[num]].value;
            changeIteration(num + 1);
        }
        setCircles(tempCircles);
        setVisualArray(visualArray);
        return setCircles(tempCircles), setVisualArray(visualArray);
    };

    const stepBackPostorder = () => {
        let tempCircles = circles;
        if (num - 1 < 0) return;
        else {
            tempCircles[postOrderArray[num - 1]].stroke = "black";
            visualArray[num - 1].value = null;
            setCircles(tempCircles);
            setVisualArray(visualArray);
            if (num - 1 >= 0) changeIteration(num - 1);
            return setCircles(tempCircles), setVisualArray(visualArray);
        }
    };

    // Work in progress to make an automatic traversal
    const inOrder = () => {
        /*if (root !== null) {
          circles[root.id].stroke = "red";
          console.log(circles[root.id].stroke);
          setCircles(circles);
          root.stroke = "black";
          setCircles(circles);
          inOrder(root.leftChild, array);
          array.push(root.value);
          inOrder(root.rightChild, array);
        }
        */
    };

    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    let name = "test";

    const changePreorder = () => {
        settype("Preorder");
        handleClick1();
    };
    const changeInorder = () => {
        settype("Inorder");
        handleClick2();
    };
    const changePostorder = () => {
        settype("Postorder");
        handleClick3();
    };

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
        setConnecting(true);
        setCircles(
            circles.map((circle) => {
                if (circle.id == id) {
                    if (circle.id != selected.id) {
                        setSelected(circle);
                        return {
                            ...circle,
                            stroke: "blue",
                            connected: true
                        }
                    }
                    setSelected({ id: -1 });
                }
                return {
                    ...circle,
                    stroke: "black",
                    connected: false
                }
            })
        );
    };
    const deleteNode = (e) => {
        console.log(lines);
        const id = selected.id;
        if (id != -1) {
            setCircles(circles.filter(circle => circle.id != id));
            setLines(lines.filter(line => !line.id.includes(JSON.stringify(id))));
            setSelected({ id: -1 });
        }
    }

    const insertRight = (e) => {
        setSelectedLeft({});
        setSelectedRight(circles.filter(circle => circle.id == e.target.id())[0]);
    }

    const insertLeft = (e) => {
        setSelectedRight({});
        console.log(circles.filter(circle => circle.id == e.target.id()));
        setSelectedLeft(circles.filter(circle => circle.id == e.target.id())[0]);
    }

    const insertNode = (e) => {
        if (Object.keys(selectedLeft).length !== 0) {
            setSelectedLeft({});
            const child = createLeft(selectedLeft, circles.length, WIDTH)
            const connectionBundle = newConnectNodeBTT(selectedLeft, child, connection, true);
            setLines(lines.concat(connectionBundle[0]));
            setCircles(circles.concat(child));
        }
        else if (Object.keys(selectedRight).length !== 0) {
            setSelectedRight({});
            const child = createRight(selectedRight, circles.length, WIDTH)
            const connectionBundle = newConnectNodeBTT(selectedRight, child, connection, false);
            setLines(lines.concat(connectionBundle[0]));
            setCircles(circles.concat(child));
        }
    }

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

    const resetTree = () => {
        circles.forEach((circle) => (circle.stroke = "black"));
        visualArray.forEach((rect) => (rect.value = null));
        setCircles(circles);
        setVisualArray(visualArray);
        changeIteration(0);
        return setCircles(circles);
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
                                                color={flag1 ? "primary" : "secondary"}
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
                                                color={flag2 ? "primary" : "secondary"}
                                                className={classes.button}
                                            >
                                                Inorder
                      </Button>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Button
                                                variant="contained"
                                                onClick={changePostorder}
                                                color={flag3 ? "primary" : "secondary"}
                                                className={classes.button}
                                            >
                                                Postorder
                      </Button>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <h1></h1>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <Button variant="contained" color="primary" onClick={insertNode}>
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
                                <h1>Step: { num }</h1>
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
                                                <Text text={circle.value} x={circle.x} y={circle.y} fill="white" />
                                                <Circle
                                                    x={circle.x + 40}
                                                    y={circle.y + 40}
                                                    id={circle.id}
                                                    stroke={selectedRight.id === circle.id ? "red" : "black"}
                                                    width={circle.width / 10}
                                                    height={circle.height / 10}
                                                    onClick={insertRight}
                                                />
                                                <Circle
                                                    x={circle.x - 40}
                                                    y={circle.y + 40}
                                                    id={circle.id}
                                                    stroke={selectedLeft.id === circle.id ? "red" : "black"}
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
                                                    onClick={
                                                        !flag1
                                                            ? stepBackPreorder
                                                            : !flag2
                                                                ? stepBackInorder
                                                                : !flag3
                                                                    ? stepBackPostorder
                                                                    : null
                                                    }
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
                                                    onClick={
                                                        !flag1
                                                            ? stepForwardPreorder
                                                            : !flag2
                                                                ? stepForwardInorder
                                                                : !flag3
                                                                    ? stepForwardPostorder
                                                                    : null
                                                    }
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
                <ButtonBase className={classes.trashBtn} onClick={deleteNode}>
                    <img src={trash} className={classes.trashImg} />
                </ButtonBase>
            </ThemeProvider>
        </Header>
    );
}
