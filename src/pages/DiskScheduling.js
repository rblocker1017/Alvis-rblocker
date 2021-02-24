import React, { useState, useRef } from 'react'
import Button from "@material-ui/core/Button"
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from "@material-ui/core/Grid"
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { grey, orange } from '@material-ui/core/colors';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import Header from '../componenets/layout/header';
import DiskGraph from "./DiskGraph";
import { values, scan, set } from 'd3';
import '../styles/DiskScheduling.css'


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: "115%",
        width: "100%"
    },
    graphingpaper: {
        padding: theme.spacing(3),
        textAlign: 'center',
        color: theme.palette.text.secondary,
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
}));

export default function FCFSDisk() {
    const classes = useStyles();
    const [data, setdata] = useState([
        ['x', 'Path'],
        [200, 0],
        [100, 2],
        [300, 3],
        [100, 4],
        [49, 5],
        [500, 6],
        [350, 7],
        [350, 8],
        [100, 9],
        [65, 10],
        [340, 11],
        [199, 12],
    ])
    const [starting, setstarting] = useState(0)
    const [input, setinput] = useState([])
    const [diskSize, setdiskSize] = useState(0)
    const [displayBoolean, setdisplayBoolean] = useState(false)
    const [type, settype] = useState("scan")
    const [direction, setdirection] = useState("inward")
    const [checked, setChecked] = useState(true);
    const [seekTime, setseekTime] = useState(0)
    let textInput1 = useRef(null);
    let textInput2 = useRef(null);
    let textInput3 = useRef(null);

    function renderDiskGraph() {
        switch (type) {
            case "fcfs":
                fcfsFunction();
                break;
            case "scan":
                if (direction === 'outward') {
                    scanOutwardsFunction();
                } else {
                    scanFunction();
                }
                break;
            case "look":
                if (direction === 'outward') {
                    lookOutwardsFunction();
                } else {
                    lookFunction();
                }
                break;
            case "cscan":
                if (direction === 'outward') {
                    cscanOutwardsFunction();
                } else {
                    cscanFunction();
                }
                break;
            case "clook":
                if (direction === 'outward') {
                    clookOutwardsFunction();
                } else {
                    clookFunction();
                }
                break;

            default:
                break;
        }
    }

    // all the functions
    function resetDiskGraph() {
        let answer = [[0, 0], [0, 1]];
        setdata(answer);
        setdisplayBoolean(true);
    }

    function fcfsFunction() {
        let answer = [];
        answer.push(['x', 'Path'])
        answer.push([parseInt(starting), 0])
        for (let i = 0; i < input.length; i++) {

            answer.push([input[i], i + 1]);
        }
        console.log("answer is: " + answer.toString());

        setdata(answer);
        setdisplayBoolean(true);
    }

    function scanFunction() {
        let answer = [];
        answer.push(['x', 'SCAN path'])
        answer.push([parseInt(starting), 0])
        let smaller = input.filter((values) => {
            console.log("Value is type : " + (typeof values))
            return values < starting;
        });
        smaller.sort(function (a, b) { return a - b });
        console.log("Smaller sorted: " + smaller)
        smaller.reverse();
        console.log("Smaller reversed :" + smaller)
        smaller.push(0);
        console.log('Smaller after all: ' + smaller);
        let larger = input.filter((values) => {
            return values >= starting;
        });
        larger = larger.sort();
        console.table(larger)
        for (let i = 0; i < smaller.length; i++) {
            answer.push([smaller[i], i + 1])
        }

        for (let i = 0; i < larger.length; i++) {
            answer.push([larger[i], i + smaller.length + 1])
        }


        setdata(answer);
        setdisplayBoolean(true);

    }
    function scanOutwardsFunction() {
        let answer = [];
        answer.push(['x', 'SCAN outwards path'])
        answer.push([parseInt(starting), 0])
        let smaller = input.filter((values) => {
            console.log("Value is type : " + (typeof values))
            return values < starting;
        });
        smaller.sort(function (a, b) { return a - b });
        console.log("Smaller sorted: " + smaller)
        smaller.reverse();
        console.log("Smaller reversed :" + smaller)

        console.log('Smaller after all: ' + smaller);
        let larger = input.filter((values) => {
            return values >= starting;
        });
        larger.push(diskSize);
        larger = larger.sort();
        console.table(larger)

        for (let i = 0; i < larger.length; i++) {
            answer.push([larger[i], i + 1])
        }
        for (let i = 0; i < smaller.length; i++) {
            answer.push([smaller[i], i + larger.length + 1])
        }


        setdata(answer);
        setdisplayBoolean(true);

    }

    function lookFunction() {
        let answer = [];
        answer.push(['x', 'Look path'])
        answer.push([parseInt(starting), 0])

        let smaller = input.filter((values) => {
            console.log("Value: " + values);
            console.log("Value" + (typeof values))

            return values < starting;
        });
        //smaller = smaller.sort().reverse();

        let larger = input.filter((values) => {
            return values >= starting;
        });
        larger = larger.sort(function (a, b) { return a - b });
        console.table(larger)
        for (let i = 0; i < smaller.length; i++) {
            answer.push([smaller[i], i + 1])
        }

        for (let i = 0; i < larger.length; i++) {
            answer.push([larger[i], i + smaller.length + 1])
        }


        setdata(answer);
        setdisplayBoolean(true);

    }
    function lookOutwardsFunction() {
        let answer = [];
        answer.push(['x', 'Look outwards path'])
        answer.push([parseInt(starting), 0])
        let smaller = input.filter((values) => {
            console.log("Value is type : " + (typeof values))
            return values < starting;
        });
        smaller.sort(function (a, b) { return a - b });
        console.log("Smaller sorted: " + smaller)
        smaller.reverse();
        console.log("Smaller reversed :" + smaller)

        console.log('Smaller after all: ' + smaller);
        let larger = input.filter((values) => {
            return values >= starting;
        });
        larger = larger.sort();
        console.table(larger)

        for (let i = 0; i < larger.length; i++) {
            answer.push([larger[i], i + 1])
        }
        for (let i = 0; i < smaller.length; i++) {
            answer.push([smaller[i], i + larger.length + 1])
        }


        setdata(answer);
        setdisplayBoolean(true);

    }
    function cscanFunction() {
        let answer = [];
        answer.push(['x', 'SCAN path'])
        answer.push([parseInt(starting), 0])
        let firstSmaller = input.filter((values) => {
            console.log("Value is type : " + (typeof values))
            return values < starting;
        });
        firstSmaller.sort(function (a, b) { return a - b });
        firstSmaller.reverse();
        firstSmaller.push(0)
        for (let i = 0; i < firstSmaller.length; i++) {
            answer.push([firstSmaller[i], i + 1])
        }

        let secondSmaller = input.filter((values) => {
            console.log("Value is type : " + (typeof values))
            return values < diskSize;
        });
        let difference = secondSmaller.filter(x => !firstSmaller.includes(x));
        difference.reverse();
        difference.unshift(diskSize)
        for (let i = 0; i < difference.length; i++) {
            answer.push([difference[i], i + difference.length + 1])
        }


        setdata(answer);
        setdisplayBoolean(true);

    }
    function cscanOutwardsFunction() {
        let answer = [];
        answer.push(['x', 'Cscan outwards path'])
        answer.push([parseInt(starting), 0])
        let firstSmaller = input.filter((values) => {
            console.log("Value is type : " + (typeof values))
            return values > starting;
        });
        firstSmaller.sort(function (a, b) { return a - b });
        // firstSmaller.reverse();
        firstSmaller.push(diskSize)
        for (let i = 0; i < firstSmaller.length; i++) {
            answer.push([firstSmaller[i], i + 1])
        }

        let secondSmaller = input.filter((values) => {
            console.log("Value is type : " + (typeof values))
            return values > 0;
        });



        let difference = secondSmaller.filter(x => !firstSmaller.includes(x));
        difference.reverse();
        difference.unshift(0)
        for (let i = 0; i < difference.length; i++) {
            answer.push([difference[i], i + difference.length + 1])
        }


        setdata(answer);
        setdisplayBoolean(true);

    }

    function clookFunction() {
        let answer = [];
        answer.push(['x', 'SCAN path'])
        answer.push([parseInt(starting), 0])
        let firstSmaller = input.filter((values) => {
            console.log("Value is type : " + (typeof values))
            return values < starting;
        });
        firstSmaller.sort(function (a, b) { return a - b });
        firstSmaller.reverse();
        for (let i = 0; i < firstSmaller.length; i++) {
            answer.push([firstSmaller[i], i + 1])
        }

        let secondSmaller = input.filter((values) => {
            console.log("Value is type : " + (typeof values))
            return values < diskSize;
        });
        let difference = secondSmaller.filter(x => !firstSmaller.includes(x));
        difference.sort(function (a, b) { return a - b }).reverse();
        difference.unshift(diskSize)
        for (let i = 0; i < difference.length; i++) {
            answer.push([difference[i], i + difference.length])
        }


        setdata(answer);
        setdisplayBoolean(true);

    }
    function clookOutwardsFunction() {
        let answer = [];
        answer.push(['x', 'cLook path'])
        answer.push([parseInt(starting), 0])
        let firstSmaller = input.filter((values) => {
            console.log("Value is type : " + (typeof values))
            return values > starting;
        });
        firstSmaller.sort(function (a, b) { return a - b });
        //firstSmaller.reverse();
        for (let i = 0; i < firstSmaller.length; i++) {
            answer.push([firstSmaller[i], i + 1])
        }

        let secondSmaller = input.filter((values) => {
            console.log("Value is type : " + (typeof values))
            return values > 0;
        });
        let difference = secondSmaller.filter(x => !firstSmaller.includes(x));
        difference.sort(function (a, b) { return a - b });
        difference.unshift(0)
        for (let i = 0; i < difference.length; i++) {
            answer.push([difference[i], i + difference.length])
        }


        setdata(answer);
        setdisplayBoolean(true);

    }

    const handleChange = (event) => {
        settype(event.target.value);
    };
    const handleChangeCheck = (event) => {
        setChecked(!checked);
    };
    const handleChangeDirection = (event) => {
        setdirection(event.target.value);
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
                                            <Button variant="contained" color="primary" value={'scan'} onClick={() => { settype("scan"); console.log("Selected: SCAN"); }} >SCAN</Button>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Button variant="contained" color="primary" value={'cscan'} onClick={() => { settype("cscan"); console.log("Selected: cscan"); }} >C-SCAN</Button>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Button variant="contained" color="primary" value={'look'} onClick={() => { settype("look"); console.log("Selected: LOOK"); }} >LOOK</Button>
                                        </Grid>
                                        <Grid item xs={12}><h1></h1></Grid>
                                        <Grid item xs={4}>
                                            <Button variant="contained" color="primary" value={'clook'} onClick={() => { settype("clook"); console.log("Selected: cLOOK"); }} >C-LOOK</Button>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Button variant="contained" color="primary" value={'fcfs'} onClick={() => { settype("fcfs"); console.log("Selected: FCFS"); }} >FCFS</Button>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Button variant="contained" color="primary" value={'sstf'} onClick={() => { settype("sstf"); console.log("Selected: SSTF"); }} >SSTF</Button>
                                        </Grid>
                                        <Grid item xs={12}><h1></h1></Grid>
                                        <Grid item xs={6}>
                                            <Button variant="contained" color="primary" value={'outward'} onClick={() => { setdirection("inward"); console.log("Selected: outward"); }} >Inwards</Button>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Button variant="contained" color="primary" value={'inward'} onClick={() => { setdirection("outward"); console.log("Selected: inward"); }} >Outwards</Button>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                            <h2></h2>
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
                            <Paper className={classes.graphingpaper}>
                                <h1>
                                    Disk Scheduling: {type} { type !== "fcfs" ? direction : "" }
                                </h1>
                                    <DiskGraph data={data} size={diskSize} > </DiskGraph>

                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}></div>
                            </Paper>
                            <Grid item xs={12}>
                                <form noValidate autoComplete="off">
                                    <Paper className={classes.fields}>
                                        <Grid container>
                                            <Grid item xs={4}>
                                                <TextField id="outlined-size-normal" variant="filled" label="Disk Size" inputRef={textInput1} type="text" onChange={(e) => { setdiskSize(e.target.value); }} />
                                            </Grid>
                                            <Grid item xs={4}>
                                                < TextField id="outlined-size-normal" variant="filled" label="Initial Position" color="black" inputRef={textInput2} type="text" onChange={(e) => { setstarting(parseInt(e.target.value)) }} />
                                            </Grid>
                                            <Grid item xs={4}>
                                                < TextField id="outlined-size-normal" variant="filled" label="Request Sequence" color="black" inputRef={textInput3} type="text" onChange={(e) => { setinput(e.target.value.split(',').map(Number)); }} />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <h1></h1>
                                                <Button variant="contained" color="primary" onClick={renderDiskGraph}>Run Disk Scheduling</Button>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <h1></h1>
                                                <Button variant="contained" color="primary" onClick={() => { renderDiskGraph(); setdiskSize(0); setstarting(0); setinput([]); { textInput1.current.value = ""; textInput2.current.value = ""; textInput3.current.value = ""; } }}>Reset</Button>
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
