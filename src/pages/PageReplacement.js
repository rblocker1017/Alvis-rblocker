import React, { useState } from 'react'
import clsx from 'clsx';
import Header from "../componenets/layout/header"
import Button from "@material-ui/core/Button"
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid"
import Paper from '@material-ui/core/Paper';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { grey, green } from '@material-ui/core/colors';
import * as Functions from './Functionality/PageReplacementFunctions';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    table: {
        backgroundColor: green[900],
        color: grey[200],
        textAlign: 'center',
        padding: theme.spacing(1)
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: 600,
        width: "100%",
        fixed: true
    },
    buttons:
    {
        backgroundColor: grey[200],
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: "100%"
    },
    code:
    {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: "75%"
    },
    fields:
    {
        backgroundColor: grey[200],
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: "100%"
    },
    formControl: {
        minWidth: 120
    },
}));

export default function PageReplacement() {
    const classes = useStyles();
    const [displayBoolean, setDisplayBoolean] = useState(false);
    const [answer, setAnswer] = useState([]);
    const [type, settype] = useState("FIFO")
    const [frames, setframes] = useState([]);
    const [input, setinput] = useState([]);
    const [value, setValue] = useState("");
    const [faultCount, setFaultcount] = useState(0);

    function runAlgorithm(e){
        settype(e.target.textContent);
        renderPageReplacement(e.target.textContent);
    }

    function renderPageReplacement(newType) {
        let bundle;
        switch (newType) {
            case "FIFO":
                bundle = Functions.fcfsPageReplacementFunc(input, frames);
                break;
            case "LRU":
                bundle = Functions.lruPageReplacementFunc(input, frames);
                break;
            case "OPT":
                bundle = Functions.optPageReplacementFunc(input, frames);
                break;
            default:
                break;
        }
        setAnswer(bundle.answer);
        setFaultcount(bundle.faults);
        setDisplayBoolean(true);
    }
    function reset() {
        setValue("");
        setinput(value.split(',').map(Number))
        setAnswer(Functions.fcfsPageReplacementFunc(0, 0).answer);
        setDisplayBoolean(false);
        Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = "")
        );
    }

    const tableHeader = input.map((page) => {
        return (
            <th style={{ border: "1px solid black", width: "45px", color: 'Black', fontSize: "40px", align: 'center' }} >{page}</th>
        );

    })

    const displayTable = answer.map((ans) => {
        console.log(ans)
        return (
            <td>
                {ans.column.map((page) => {
                    if (JSON.stringify(page) !== '""') {
                        return (
                        <tr>
                            <td style={{ border: "1px solid black", width: "50px", backgroundColor: 'darkgreen', color: 'white', fontSize: "40px", }} >{JSON.stringify(page)}</td>
                        </tr>
                        )
                    }
                    {
                        return (
                            <tr>
                                <td style={{ border: "1px solid black", width: "50px", height: "61px", backgroundColor: 'darkgreen', color: 'white', fontSize: "40px", }} ></td>
                            </tr>
                        )
                    }
                })}
                <p>{ans.fault}</p>
            </td>
        );
    })
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
                                    <Grid container spacing={0}>
                                        <Grid item xs={4}>
                                            <Button variant="contained" color={type === "FIFO" ? "secondary" : "primary"} onClick={runAlgorithm}>FIFO</Button>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Button variant="contained" color={type === "OPT" ? "secondary" : "primary"} onClick={runAlgorithm}>OPT</Button>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Button variant="contained" color={type === "LRU" ? "secondary" : "primary"} onClick={runAlgorithm}>LRU</Button>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <h1>
                                            </h1>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <Button variant="contained" color="primary" onClick={() => console.log(answer)}>Insert</Button>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Button variant="contained" color="primary" onClick={() => reset()}>Reset</Button>
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
                                    Page Replacement: {type}
                                </h1>
                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <table>
                                        <tr>{
                                            tableHeader}</tr>
                                        {displayTable}
                                    </table>
                                </div>

                                <Grid item container>
                                    <Grid item xs={5}></Grid>
                                    <Grid item xs={2}>
                                        <Typography className={classes.table} variant="h5" gutterBottom>
                                            Page Faults = {faultCount}
                                        </Typography>

                                    </Grid>
                                </Grid>
                            </Paper>
                            <h1>
                            </h1>
                            <Grid item xs={12}>
                                <form noValidate autoComplete="off">
                                    <Paper className={classes.fields}>
                                        <Grid container>
                                            <Grid item xs={1}>
                                            </Grid>
                                            <Grid item xs={5}>
                                                <TextField id="outlined-size-normal" variant="filled" label="Reference String"
                                                    onChange={(e) => { setinput(e.target.value.split(',').map(Number)) }}
                                                />
                                            </Grid>
                                            <Grid item xs={5}>
                                                <FormControl variant="filled" className={classes.formControl}>
                                                    <InputLabel id="demo-simple-select-label">Frames</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        onChange={(e) => { setframes(e.target.value) }}
                                                    >
                                                        <MenuItem value={1}>1</MenuItem>
                                                        <MenuItem value={2}>2</MenuItem>
                                                        <MenuItem value={3}>3</MenuItem>
                                                        <MenuItem value={4}>4</MenuItem>
                                                        <MenuItem value={5}>5</MenuItem>
                                                        <MenuItem value={6}>6</MenuItem>
                                                        <MenuItem value={7}>7</MenuItem>
                                                        <MenuItem value={8}>8</MenuItem>
                                                        <MenuItem value={9}>9</MenuItem>
                                                    </Select>
                                                </FormControl>
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