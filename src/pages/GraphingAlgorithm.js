import React, { useState } from 'react';
import Header from "../componenets/layout/header";
import { Button, Grid, Paper } from "@material-ui/core";
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { grey, orange } from '@material-ui/core/colors';
import { Stage, Layer, Rect, Circle, Star, Line } from 'react-konva';
import Konva from "konva";
import { generateCircles, generateConnectors, connectNode, getPoints } from "./Shapes/NodeGenerator"

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

const INIT = generateCircles(3, WIDTH, HEIGHT);

const CONNECT = generateConnectors(2, INIT);

export default function GraphingAlgorithm() {
    const classes = useStyles();
    const [type, setType] = useState("Prim");
    const [circles, setCircles] = React.useState(INIT);
    const [lines, setLines] = React.useState(CONNECT);
    const [connecting, setConnecting] = React.useState(false);
    const [fromCon, setFromCon] = React.useState({});

    const changePrim = () => setType("Prim");
    const changeDij = () => setType("Dijkstras");
    const changeKruskal = () => setType("Kruskal");

    const addCircle = (e) => {
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
            connections: []
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
                            points: points
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
        setCircles(
            circles.map((circle) => {
                return {
                    ...circle,
                    selected: circle.id === id
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
                    connected: circle.id === id
                }
            })
        );
    };

    const reset = (e) => {
        setCircles(INIT);
        setLines(CONNECT);
    }

    const finalConnect = (e) => {
        const id = e.target.id();
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
        const newConnect = lines.concat(connectNode(toCircle, fromCon, lines.length)); 
        setLines(newConnect);
        setConnecting(!connecting);
        setFromCon({});
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
                                                onClick={selectCircle}
                                                onDblClick={connecting ? finalConnect : initialConnect}
                                                onDragStart={handleDragStart}
                                                onDragEnd={handleDragEnd}
                                                onDragMove = { handleMove }
                                                draggable
                                            />
                                        ))}
                                        {lines.map((line) => (
                                            <Line
                                                id={line.id}
                                                points={line.points}
                                                stroke="black"
                                                fill="black"
                                            />
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
                                                <Button variant="contained" color="primary">Set Start</Button>
                                            </Grid>
                                            <Grid item>
                                                <Button variant="contained" color="primary">Set End</Button>
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