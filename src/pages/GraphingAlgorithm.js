import React, { useState } from 'react'
import Header from "../componenets/layout/header"
import { Button, Grid, Paper } from "@material-ui/core"
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { grey, orange } from '@material-ui/core/colors';
import { Stage, Layer, Rect, Circle, Star, Line } from 'react-konva';
import Konva from "konva";

const WIDTH = 950;
const HEIGHT = 450;
let ID = 10;

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        //height: "125%",
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
        //color: "#03b9ff"
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

function generateShapes() {
    const n = 5;
    let circles = [];

    while (circles.length < n) {
        circles.push({
            id: circles.length,
            x: (Math.random() * (WIDTH - 200)) + 100,
            y: (Math.random() * (HEIGHT - 200)) + 100,
            width: 100,
            height: 100,
            color: 'green',
            isDragging: false
        });
    }
    return circles;
}

const INIT = generateShapes();

function getPoints(to, from) {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    console.log("test");
    let angle = Math.atan2(-dy, dx);

    const radius = 50

    return [
        from.x + -radius * Math.cos(angle + Math.PI),
        from.y + radius * Math.sin(angle + Math.PI),
        to.x + -radius * Math.cos(angle),
        to.y + radius * Math.sin(angle)
    ];
}

function generateConnectors() {
    const num = 7;
    let result = [];
    while (result.length < num) {
        let from = INIT[Math.floor(Math.random() * INIT.length)];
        let to = INIT[Math.floor(Math.random() * INIT.length)];
        console.log("created");
        while (to === from) {
            to = INIT[Math.floor(Math.random() * INIT.length)];
        }
        console.log("pushing");
        result.push({
            id: result.length,
            points: getPoints(to, from)
        });
    }
    return result;
}

const CONNECT = generateConnectors();


export default function GraphingAlgorithm() {
    const classes = useStyles();
    const [type, setType] = useState("Prim");
    const [stars, setStars] = React.useState(INIT);
    const [lines, setLines] = React.useState(CONNECT);
    const [circles, setCircles] = useState(INIT);
    const [idNum, setIdNum] = useState(0);

    const changePrim = () => setType("Prim");
    const changeDij = () => setType("Dijkstras");
    const changeKruskal = () => setType("Kruskal");

    const addCircle = (e) => {
        ID++;
        const newStars = stars.concat({
            id: ID,
            x: Math.random() * WIDTH,
            y: Math.random() * HEIGHT
        });
        setStars(newStars);
    };

    const handleDragStart = (e) => {
        const id = e.target.id();
        setStars(
            stars.map((star) => {
                return {
                    ...star,
                    isDragging: star.id === id,
                    color: 'red'
                };
            })
        );
    };
    const handleDragEnd = (e) => {
        setStars(
            stars.map((star) => {
                return {
                    ...star,
                    isDragging: false,
                    color: 'green'
                };
            })
        );
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
                                            <Button variant="contained" color="primary">Reset</Button>
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
                                        {stars.map((star) => (
                                            <Circle
                                                key={star.id}
                                                id={star.id}
                                                x={star.x}
                                                y={star.y}
                                                width={star.width}
                                                height={star.height}
                                                numPoints={5}
                                                innerRadius={20}
                                                outerRadius={40}
                                                fill={star.isDragging ? 'red' : 'green'}
                                                opacity={0.8}
                                                draggable
                                                shadowColor="black"
                                                shadowBlur={10}
                                                shadowOpacity={0.6}
                                                shadowOffsetX={star.isDragging ? 10 : 5}
                                                shadowOffsetY={star.isDragging ? 10 : 5}
                                                scaleX={star.isDragging ? 1.2 : 1}
                                                scaleY={star.isDragging ? 1.2 : 1}
                                                onDragStart={handleDragStart}
                                                onDragEnd={handleDragEnd}
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