import React, { useState } from 'react'
import Header from "../componenets/layout/header"
import { Button, Grid, Paper } from "@material-ui/core"
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { grey, orange } from '@material-ui/core/colors';
import { Stage, Layer, Rect, Circle } from 'react-konva';


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
        color: "#03b9ff"
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

export default function GraphingAlgorithm() {
    const classes = useStyles();
    const [type, settype] = useState("Prim")

    let name = "test";

    const changePrim = () => settype("Prim");
    const changeDij = () => settype("Dijkstras");
    const changeKruskal = () => settype("Kruskal");

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
                                        <Grid item  xs={4}>
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
                                            <Button variant="contained" color="primary">Insert</Button>
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
                                <Stage width={1000} height={450}>
                                    <Layer>
                                        <Rect width={50} height={50} fill="red" draggable/>
                                        <Circle x={200} y={200} stroke="black" radius={50} draggable/>
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