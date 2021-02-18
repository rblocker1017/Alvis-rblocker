import React, { useState } from 'react';
import Header from "../componenets/layout/header";
import { Button, Grid, Paper } from "@material-ui/core";
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { grey, orange } from '@material-ui/core/colors';
import { Stage, Layer, Rect, Circle, Text, Line, Label, Tag } from 'react-konva';
import Konva from "konva";
import { generateCircles, generateConnectors, connectNode, getPoints, generateCirclesGraphing } from "./Shapes/NodeGenerator"
import { select } from 'd3';

const WIDTH = 950;
const HEIGHT = 450;

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

const INIT = generateCirclesGraphing(3, WIDTH, HEIGHT);

const CONNECT = generateConnectors(2, INIT);

function pointValues(circle) {
    if (circle.start) {
        return "START NODE"
    }
    else if (circle.end) {
        return "END NODE"
    }
    return "";
}

export default function GraphingAlgorithm() {
    const classes = useStyles();
    const [type, setType] = useState("Prim");
    const [circles, setCircles] = React.useState(INIT);
    const [lines, setLines] = React.useState(CONNECT);
    const [connecting, setConnecting] = React.useState(false);
    const [selected, setSelected] = React.useState({});


    const changePrim = () => setType("Prim");
    const changeDij = () => setType("Dijkstras");
    const changeKruskal = () => setType("Kruskal");

    //const setStart = (e) => {

    //}

    const addCircle = (e) => {
        const value = Math.floor(Math.random() * 100);
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
        setCircles(newcircles);
    };



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
    const handleMove = (e) => {
        const tempCircle = circles.find(circle => circle.id === e.target.id());
        const tempLines = lines;
        setCircles(
            circles.map((circle) => {
                if (tempCircle === circle) {
                    const newCircle = {
                        ...circle,
                        x: e.target.x(),
                        y: e.target.y()
                    }
                    circle.connections.forEach(connection => {
                        const other = tempLines[connection].connections.filter(otherCircle => otherCircle.id != tempCircle.id);
                        const points = getPoints(newCircle, other[0]);
                        tempLines[connection] = {
                            id: tempLines[connection].id,
                            connections: [newCircle, other[0]],
                            points: points,
                            value: tempLines[connection].value
                        }
                        setLines(tempLines);
                    });
                    return newCircle;
                }
                return circle;
            })
        );
    }

    const selectCircle = (e) => {
        const id = e.target.id();
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

    const setStart = (e) => {
        let tempCircles = []; 
        if (connecting && !selected.end) {
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
        else {
            tempCircles = circles;
        }
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
        setConnecting(!connecting);
        setSelected({});
    }

    const setEnd = (e) => {
        let tempCircles = [];
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
        else {
            tempCircles = circles;
        }
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
        setConnecting(!connecting);
        setSelected({});
    }

    const initialConnect = (e) => {

    };

    const reset = (e) => {
        setCircles(INIT);
        setLines(CONNECT);
    }

    const finalConnect = (e) => {
        const id = e.target.id();
        const oldCircles = circles;
        let toCircle = {};
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
        const newLine = connectNode(toCircle, selected, lines.length);
        if (JSON.stringify(toCircle) !== '{}') {
            setLines(lines.concat(newLine));

        }
        else {
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
                                            <Button variant="contained" color="primary" onClick={reset}>Reset</Button>
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
                                                    //onDblClick={connecting ? finalConnect : initialConnect}
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
                                                    stroke="black"
                                                    fill="black"
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