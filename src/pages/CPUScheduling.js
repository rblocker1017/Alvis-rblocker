import React, { useEffect, useState, useRef, Component } from 'react'

import { Chart } from "react-google-charts";
import Header from "../componenets/layout/header"
import Button from "@material-ui/core/Button"
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid"
import Paper from '@material-ui/core/Paper';
import { GridListTileBar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ButtonBase } from '@material-ui/core';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';

import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import MenuList from '@material-ui/core/MenuList';
import { useSpring, animated } from 'react-spring/web.cjs';

import { FormControlLabel } from '@material-ui/core';
import { grey, green } from '@material-ui/core/colors';
import trash from '../trash.png';



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        margin: 'auto',
        height: "100%",
        width: "80%"
    },
    popup: {
        padding: theme.spacing(2),
        textAlign: 'center',
        top: "50%",
        color: theme.palette.text.secondary,
        margin: 'auto',
        height: "150%",
        width: 500
    },

    paperOverlay: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        textAlign: 'center',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width: 500
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
        width: "90%"
    },
    chkbox:
    {
        width: "10%"
    },
    code:
    {

        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: "100%"
    },
    fields:
    {
        backgroundColor: grey[200],
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: "100%",
        width: "200%"
    },

    table: {
        maxWidth: 250,
    },
    th: {
        fontWeight: 'bold'
    },
    tc: {
        border: '2px solid rgba(224, 224, 224, 1)'
    },
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
}));

const Fade = React.forwardRef(function Fade(props, ref) {
    const { in: open, children, onEnter, onExited, ...other } = props;
    const style = useSpring({
        from: { opacity: 0 },
        to: { opacity: open ? 1 : 0 },
        onStart: () => {
            if (open && onEnter) {
                onEnter();
            }
        },
        onRest: () => {
            if (!open && onExited) {
                onExited();
            }
        },
    });

    return (
        <animated.div ref={ref} style={style} {...other}>
            {children}
        </animated.div>
    );
});

Fade.propTypes = {
    children: PropTypes.element,
    in: PropTypes.bool.isRequired,
    onEnter: PropTypes.func,
    onExited: PropTypes.func,
};

export default function CpuScheduling(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [processes, setprocesses] = useState([])
    const [quantum, setQuantum] = useState();
    const [type, settype] = useState("")
    const [checked, setChecked] = useState(false)

    let name = "test";

    const changeFCFS = () => settype("FCFS");
    const changeSJF = () => settype("SJF");
    const changeRR = () => settype("RR");
    const changeSRTF = () => settype("SRTF");
    const changePri = () => settype("Priority");



    const theme = createMuiTheme({
        palette: {
            primary: {
                main: green[900],
            }
        }
    })

    function fcfs(processes) {
        let timeCounter = 0;
        let totalWaiting = 0;
        let totalResponse = 0;
        let totalTat = 0;
        let procId = 0;
        let answer = [[
            { type: 'string', label: 'Task ID' },
            { type: 'string', label: 'Task Name' },
            { type: 'string', label: 'Process' },
            { type: 'date', label: 'Start Time' },
            { type: 'date', label: 'End Time' },
            { type: 'number', label: 'Duration' },
            { type: 'number', label: 'Percent Complete' },
            { type: 'string', label: 'Dependencies' },
        ],]


        let processList = processes;

        processList.sort((a, b) => {
            return (a.arrivalTime > b.arrivalTime) ? 1 : -1
        })






        processList.forEach(function (i) {
            console.log(i);

            if (i.arrivalTime > timeCounter) {
                timeCounter = i.arrivalTime;
            }
            totalResponse += timeCounter;
            totalTat += timeCounter + i.burstTime - i.arrivalTime;
            totalWaiting += timeCounter - i.arrivalTime
            answer.push([procId++, i.name, i.name, new Date(0, 0, 0, 0, 0, timeCounter), new Date(0, 0, 0, 0, 0, timeCounter + i.burstTime), null, 100, null])
            timeCounter = timeCounter + i.burstTime;

        })

        setTurnaroundTime((totalTat / processList.length).toFixed(2))
        //setResponseTime((totalResponse / processList.length).toFixed(2))
        setWaitingTime((totalWaiting / processList.length).toFixed(2))



        return answer;

    }

    function sjf(processes) {
        let timeCounter = 0;
        let totalWaiting = 0;
        let totalTat = 0;
        let procId = 0;
        let answer = [[
            { type: 'string', label: 'Task ID' },
            { type: 'string', label: 'Task Name' },
            { type: 'string', label: 'Process' },
            { type: 'date', label: 'Start Time' },
            { type: 'date', label: 'End Time' },
            { type: 'number', label: 'Duration' },
            { type: 'number', label: 'Percent Complete' },
            { type: 'string', label: 'Dependencies' },
        ],]


        let processList = processes;

        processList.sort((a, b) => {
            return (a.burstTime > b.burstTime) ? 1 : -1
        })





        console.log(processList[0].arrivalTime)

        processList.forEach(function (i) {
            console.log(i);

            if (i.arrivalTime > timeCounter) {
                timeCounter = i.arrivalTime;
            }
            totalTat += timeCounter + i.burstTime - i.arrivalTime;
            totalWaiting += timeCounter - i.arrivalTime
            answer.push([procId++, i.name, i.name, new Date(0, 0, 0, 0, 0, timeCounter), new Date(0, 0, 0, 0, 0, timeCounter + i.burstTime), null, 100, null])
            timeCounter = timeCounter + i.burstTime;

        })

        setTurnaroundTime((totalTat / processList.length).toFixed(2))
        setWaitingTime((totalWaiting / processList.length).toFixed(2))



        return answer;

    }

    function roundRobin(processes) {
        let timeCounter = 0;
        let totalWaiting = 0;
        let totalTat = 0;
        let procId = 0;
        let answer = [[
            { type: 'string', label: 'Task ID' },
            { type: 'string', label: 'Task Name' },
            { type: 'string', label: 'Process' },
            { type: 'date', label: 'Start Time' },
            { type: 'date', label: 'End Time' },
            { type: 'number', label: 'Duration' },
            { type: 'number', label: 'Percent Complete' },
            { type: 'string', label: 'Dependencies' },
        ],]


        let processList = [...processes];
        processList.sort((a, b) => {
            return (a.arrivalTime > b.arrivalTime) ? 1 : -1
        })
        while (true) {



            let breakFlag = true;
            let jobSet = new Set();
            processList.forEach(function (i) {

                console.log("Quantum: " + parseInt(quantum))
                //if (i.arrivalTime > timeCounter) {
                //  timeCounter = i.arrivalTime;
                //}
                console.log("Burst time of " + i.name + " ---" + i.burstTime)
                let randVal = Math.floor(Math.random() * 10000);
                console.log("Time Counter: ", timeCounter)

                if (i.arrivalTime <= timeCounter) {
                    jobSet.add(i.name);
                    if (i.burstTime > parseInt(quantum)) {
                        breakFlag = false;
                        answer.push([randVal, i.name, i.name, new Date(0, 0, 0, 0, 0, timeCounter), new Date(0, 0, 0, 0, 0, timeCounter + parseInt(quantum)), null, 100, null])

                        i.burstTime = i.burstTime - parseInt(quantum);
                        timeCounter = timeCounter + parseInt(quantum);

                    } else if (i.burstTime <= parseInt(quantum) && i.burstTime > 0) {
                        breakFlag = false;
                        console.log("Burst time <= quan: " + i.burstTime)
                        answer.push([randVal, i.name, i.name, new Date(0, 0, 0, 0, 0, timeCounter), new Date(0, 0, 0, 0, 0, timeCounter + i.burstTime), null, 100, null])
                        timeCounter = timeCounter + i.burstTime;
                        i.burstTime = 0;
                        jobSet.delete(i.name);
                    }
                } else {
                    if (jobSet.size === 0) {
                        let tempBool = false;
                        let checkList = [...processes]
                        checkList.forEach(p => {
                            if (p.arrivalTime <= timeCounter) {
                                tempBool = true
                            }
                        })

                        if (tempBool) {
                            breakFlag = false;
                        } else {
                            timeCounter += 1;
                        }


                    }

                }


                totalTat += timeCounter + i.burstTime - i.arrivalTime;
                totalWaiting += timeCounter - i.arrivalTime

            })
            // check if proc in future exits. 

            let tempList = [...processes]
            let checkFuture = false;
            tempList.forEach(p => {
                if (p.arrivalTime > timeCounter) {
                    checkFuture = true;

                }
            })


            if (breakFlag) {
                break;
            }


        }
        setTurnaroundTime(totalTat / processList.length)
        setWaitingTime(totalWaiting / processList.length)



        return answer;

    }

    function priorityFunc(processes) {
        let timeCounter = 0;
        let totalWaiting = 0;
        let totalTat = 0;
        let procId = 0;
        let answer = [[
            { type: 'string', label: 'Task ID' },
            { type: 'string', label: 'Task Name' },
            { type: 'string', label: 'Process' },
            { type: 'date', label: 'Start Time' },
            { type: 'date', label: 'End Time' },
            { type: 'number', label: 'Duration' },
            { type: 'number', label: 'Percent Complete' },
            { type: 'string', label: 'Dependencies' },
        ],]


        let processList = processes;

        processList.sort((a, b) => {
            return (a.priority > b.priority) ? 1 : -1
        })





        console.log('Priotity: ', processList[0].priority)

        processList.forEach(function (i) {
            console.log(i);

            if (i.arrivalTime > timeCounter) {
                timeCounter = i.arrivalTime;
            }
            totalTat += timeCounter + i.burstTime - i.arrivalTime;
            totalWaiting += timeCounter - i.arrivalTime
            answer.push([procId++, i.name, i.name, new Date(0, 0, 0, 0, 0, timeCounter), new Date(0, 0, 0, 0, 0, timeCounter + i.burstTime), null, 100, null])
            timeCounter = timeCounter + i.burstTime;

        })

        setTurnaroundTime(totalTat / processList.length)
        setWaitingTime(totalWaiting / processList.length)



        return answer;

    }
    function priorityFuncPreemptive(processes) {
        let timeCounter = 0;
        let totalWaiting = 0;
        let totalTat = 0;
        let procId = 0;



        let processList = [...processes];
        processList.sort((a, b) => {
            return (a.arrivalTime > b.arrivalTime) ? 1 : -1
        })
        let completed = 0;
        let usedProc = new Set();
        let startTime = 0
        let trackerArray = []
        let vizBuild = []
        for (let i = 0; completed != processList.length; i++) {
            let filteredList = processList.filter((proc) => {
                return (proc.arrivalTime <= i && proc.arrivalTime >= 0) && proc.burstTime > 0;
            })
            console.log('filteredList: ', filteredList)
            let priorSort = filteredList.sort((proc1, proc2) => {
                return proc1.priority - proc2.priority
            })
            console.log('Priority Sort: ', priorSort);

            if (priorSort.length > 0) {

                trackerArray[i] = priorSort[0].name;

                let obj = processList.find((o, i) => {
                    if (o.name === priorSort[0].name && o.burstTime > 0) {
                        console.log('O is : ', o)
                        processList[i].burstTime = processList[i].burstTime - 1;
                        if (processList[i].burstTime == 0) {
                            completed++;
                        }
                        return true; // stop searching
                    }
                });

            }
        }
        console.log('Tracker Array: ', trackerArray);
        let starting = null;
        let startingTime = null;

        for (let i = 0; i <= trackerArray.length; i++) {
            if (trackerArray[i] != null) {
                if (starting === null) {
                    starting = trackerArray[i]
                    startingTime = i;
                } else {
                    console.log('current Item: ' + trackerArray[i] + ' Starting Item: ' + starting)
                    if (trackerArray[i] != starting) {
                        vizBuild.push({ name: starting, startTime: startingTime, endingTime: i });
                        starting = trackerArray[i];
                        startingTime = i;
                    }
                    if (trackerArray[i + 1] == null) {
                        vizBuild.push({ name: starting, startTime: startingTime, endingTime: i });
                        break;
                    }


                }


                // The == and != operators consider null equal to only null or undefined
            }
        }



        let answer = [[
            { type: 'string', label: 'Task ID' },
            { type: 'string', label: 'Task Name' },
            { type: 'string', label: 'Process' },
            { type: 'date', label: 'Start Time' },
            { type: 'date', label: 'End Time' },
            { type: 'number', label: 'Duration' },
            { type: 'number', label: 'Percent Complete' },
            { type: 'string', label: 'Dependencies' },
        ],] // building answer so we can pass it to visualization code. 



        vizBuild.forEach((i) => {
            let randVal = Math.floor(Math.random() * 10000);
            answer.push([randVal, i.name, i.name, new Date(0, 0, 0, 0, 0, i.startTime), new Date(0, 0, 0, 0, 0, i.endingTime), null, 100, null])
        })

        console.log("VIZ build: ", vizBuild);


        setTurnaroundTime(totalTat / processList.length)
        setWaitingTime(totalWaiting / processList.length)



        return answer;

    }



    function sjfFuncPreemptive(processes) {
        let timeCounter = 0;
        let totalWaiting = 0;
        let totalTat = 0;
        let procId = 0;



        let processList = [...processes];
        processList.sort((a, b) => {
            return (a.arrivalTime > b.arrivalTime) ? 1 : -1
        })
        let completed = 0;
        let usedProc = new Set();
        let startTime = 0
        let trackerArray = []
        let vizBuild = []
        for (let i = 0; completed != processList.length; i++) {
            let filteredList = processList.filter((proc) => {
                return (proc.arrivalTime <= i && proc.arrivalTime >= 0) && proc.burstTime > 0;
            })
            console.log('filteredList: ', filteredList)
            let priorSort = filteredList.sort((proc1, proc2) => {
                return proc1.burstTime - proc2.burstTime
            })
            console.log('Priority Sort: ', priorSort);

            if (priorSort.length > 0) {

                trackerArray[i] = priorSort[0].name;

                let obj = processList.find((o, i) => {
                    if (o.name === priorSort[0].name && o.burstTime > 0) {
                        console.log('O is : ', o)
                        processList[i].burstTime = processList[i].burstTime - 1;
                        if (processList[i].burstTime == 0) {
                            completed++;
                        }
                        return true; // stop searching
                    }
                });

            }
        }
        console.log('Tracker Array: ', trackerArray);
        let starting = null;
        let startingTime = null;

        for (let i = 0; i <= trackerArray.length; i++) {
            if (trackerArray[i] != null) {
                if (starting === null) {
                    starting = trackerArray[i]
                    startingTime = i;
                } else {
                    console.log('current Item: ' + trackerArray[i] + ' Starting Item: ' + starting)
                    if (trackerArray[i] != starting) {
                        vizBuild.push({ name: starting, startTime: startingTime, endingTime: i });
                        starting = trackerArray[i];
                        startingTime = i;
                    }
                    if (trackerArray[i + 1] == null) {
                        vizBuild.push({ name: starting, startTime: startingTime, endingTime: i });
                        break;
                    }


                }


                // The == and != operators consider null equal to only null or undefined
            }
        }

        let answer = [[
            { type: 'string', label: 'Task ID' },
            { type: 'string', label: 'Task Name' },
            { type: 'string', label: 'Process' },
            { type: 'date', label: 'Start Time' },
            { type: 'date', label: 'End Time' },
            { type: 'number', label: 'Duration' },
            { type: 'number', label: 'Percent Complete' },
            { type: 'string', label: 'Dependencies' },
        ],] // building answer so we can pass it to visualization code. 



        vizBuild.forEach((i) => {
            let randVal = Math.floor(Math.random() * 10000);
            answer.push([randVal, i.name, i.name, new Date(0, 0, 0, 0, 0, i.startTime), new Date(0, 0, 0, 0, 0, i.endingTime), null, 100, null])
        })

        console.log("VIZ build: ", vizBuild);


        setTurnaroundTime(totalTat / processList.length)
        setWaitingTime(totalWaiting / processList.length)



        return answer;

    }

    function reset() {
        setDisplayBoolean(false);
        setTurnaroundTime(null);
        setWaitingTime(null);
        setQuantum(null);
        let empty = [];
        setprocesses(empty);
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        settype(event.target.value);
    };



    const [formProcess, setformProcess] = useState()
    const [formArrival, setformArrival] = useState()
    const [formBurst, setformBurst] = useState()
    const [displayBoolean, setDisplayBoolean] = useState(false);
    const [waitingtime, setWaitingTime] = useState();
    const [turnaroundTime, setTurnaroundTime] = useState();
    const [priority, setpriority] = useState(0)
    const [selected, setSelected] = useState({});

    function createData(procName, arrivalTime, burstTime, priority) {
        return { procName, arrivalTime, burstTime, priority };
    }

    const rows = [
        createData('Process Name', 'Arrival Time', 'Burst Time', 'Priority'),
    ]



    const [data, setData] = useState([
        [
            { type: 'string', label: 'Task ID' },
            { type: 'string', label: 'Task Name' },
            { type: 'string', label: 'Process' },
            { type: 'date', label: 'Start Time' },
            { type: 'date', label: 'End Time' },
            { type: 'number', label: 'Duration' },
            { type: 'number', label: 'Percent Complete' },
            { type: 'string', label: 'Dependencies' },
        ],
        [
            '1',
            'P1',
            'P1',
            new Date(0, 0, 0, 0, 0, 0),
            new Date(0, 0, 0, 0, 0, 0),
            null,
            100,
            null,
        ],


    ])

    console.log("Data : " + data)
    const clickInput = () => {
        if (!checked) {
            switch (type) {
                case 'First Come First Serve':
                    setData(fcfs(processes));
                    setDisplayBoolean(true);
                    break;
                case 'Shortest Job First':
                    setData(sjf(processes));
                    setDisplayBoolean(true);
                    break;
                case 'Round Robin':
                    setData(roundRobin(processes));
                    setDisplayBoolean(true);
                    break;
                case 'Priority':
                    setData(priorityFunc(processes));
                    setDisplayBoolean(true);
                    break;
                case 'Shortest Remaining Job First':
                    setData(sjfFuncPreemptive(processes));
                    setDisplayBoolean(true);
                default:
                    break;
            }
        }
        else {
            switch (type) {
                case 'First Come First Serve':
                    setData(fcfs(processes));
                    setDisplayBoolean(true);
                    break;
                case 'Shortest Job First':
                    setData(sjf(processes));
                    setDisplayBoolean(true);
                    break;
                case 'Round Robin':
                    setData(roundRobin(processes));
                    setDisplayBoolean(true);
                    break;
                case 'Preemptive Priority':
                    setData(priorityFuncPreemptive(processes));
                    setDisplayBoolean(true);
                    break;
                case 'Shortest Remaining Job First':
                    setData(sjfFuncPreemptive(processes));
                    setDisplayBoolean(true);
                default:
                    break;
            }
        }

        data.forEach(i => { console.log("Data stream: " + i) })
    }

    const handleAddProc = () => {
        let temp = processes.slice();

        temp.push({ name: formProcess, arrivalTime: parseInt(formArrival), burstTime: parseInt(formBurst), priority: (parseInt(priority)), select: false });
        setprocesses(temp);
        console.log(temp);
        setDisplayBoolean(false);
    }

    function addRow(table, procName, arrivalTime, burstTime, timeQ, Priority) {
        var newdata = { procName, arrivalTime, burstTime, timeQ, Priority }
        table.concat(newdata);
        return table;


    }

    const addRowRR = () => {

    }

    const addRowPriority = () => {

    }


    const showProceses = processes.map((proc) => {
        if (proc.Name == null || proc.arrivalTime == null || proc.BurstTime == null) {

        }
        else {
            return (
                addRow(proc.name, proc.arrivalTime, proc.BurstTime, proc.quantum, proc.priority)
                //<>
                // <p>Process: {proc.name} Arrival Time: {proc.arrivalTime} Burst Time: {proc.burstTime} {type === 'priority' ? <>Priority: {proc.priority}</> : null}</p>
                //</>
            );
        }


    })

    const handleChangeCheck = (event) => {
        setChecked(!checked);
    };

    const selectRow = (e) => {
        const name = e.target.id;
        let tempProcesses = processes
        if (name === selected.name) {
            tempProcesses = processes.map(process => {
                if (process.select) {
                    setSelected({});
                    return {
                        ...process,
                        select: false
                    }
                }
                return process;
            });
        }
        else {
            tempProcesses = tempProcesses.map(process => {
                if (name === process.name) {
                    setSelected(process);
                    return {
                        ...process,
                        select: true
                    }
                }
                return {
                    ...process,
                    select: false
                };
            });
        }
        setprocesses(tempProcesses);
    }


    return (

        <Header>
            <ThemeProvider theme={theme}>
                <Grid container direction="column">
                    <Grid item container spacing={1}>
                        <Grid item xs={3}>
                            <Grid container direction="column">
                                <Paper className={classes.buttons}>
                                    <Grid container spacing={0}>
                                        <Grid item xs={4}>
                                            <Button variant="contained" color="primary" className={classes.button} onClick={() => { settype("First Come First Serve"); console.log("Selected: FCFS"); }}>FCFS
                                               {/* <input type="radio" name="fcfsRadio" id="fcfsRadio" value="option1"></input> */}
                                            </Button>
                                        </Grid>
                                        <Grid item className={classes.button} xs={4}>
                                            <Button variant="contained" color="primary" className={classes.button} onClick={() => { settype("Shortest Job First"); console.log("Selected: SJF"); }}>SJF
                                            
                                            </Button>
                                        </Grid>
                                        <Grid item className={classes.button} xs={4}>
                                            <Button variant="contained" color="primary" className={classes.button} onClick={() => { settype("Priority"); console.log("Selected: priority"); }}>Priority
                                            
                                            </Button>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <h1></h1>
                                        </Grid>
                                        <Grid item className={classes.button} xs={4}>
                                            <Button variant="contained" color="primary" className={classes.button} onClick={() => { settype("Round Robin"); console.log("Selected: RR"); }}>RR
                                            
                                            </Button>
                                        </Grid>
                                        <Grid item item xs={4}>
                                            <Button variant="contained" color="primary" className={classes.button} onClick={() => { settype("Shortest Remaining Job First"); console.log("Selected: SRJF"); }}>SRTF
                                            
                                            </Button>
                                        </Grid>
                                        <Grid item>
                                            <FormControlLabel control={<Checkbox
                                                onChange={handleChangeCheck}
                                                checked={checked}
                                                name="checkedB"
                                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                                color={"#000000"} />}
                                                label={<Typography variant={"caption"}>Preemptive Priority</Typography>} labelPlacement={"bottom"} />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <h1>
                                            </h1>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Button variant="contained" color="primary" onClick={handleOpen}>Insert</Button>
                                        </Grid>
                                        <div>
                                            <Modal
                                                className={classes.modal}
                                                open={open}
                                                onClose={handleClose}
                                                closeAfterTransition
                                                BackdropComponent={Backdrop}
                                                BackdropProps={{
                                                    timeout: 500,
                                                }}
                                            >
                                                <Fade in={open}>


                                                    <Grid>
                                                        <Grid item xs={12}>
                                                            <Paper className={classes.paperOverlay}>
                                                                <h1>CPU Scheduling: {type} </h1>
                                                                <form noValidate autoComplete="on">
                                                                    <TextField id="outlined-size-normal" variant="outlined" label="Process" onChange={(e) => { setformProcess(e.target.value) }} />
                                                                    <TextField id="outlined-size-normal" variant="outlined" label="Arrival Time" onChange={(e) => { setformArrival(e.target.value) }} />
                                                                    <TextField id="outlined-size-normal" variant="outlined" label="Burst Time" onChange={(e) => { setformBurst(e.target.value) }} />


                                                                </form>
                                                                {type === "Round Robin" ? <form noValidate autoComplete="on">
                                                                    <TextField id="outlined-size-normal" variant="outlined" label="Time Quantum" defaultValue={quantum} onChange={(e) => { setQuantum(e.target.value) }} />
                                                                </form>
                                                                    : null}
                                                                {type === "Priority" ? <form noValidate autoComplete="on">
                                                                    <TextField id="outlined-size-normal" variant="outlined" label="Priority" onChange={(e) => { setpriority(e.target.value) }} />
                                                                </form>
                                                                    : null}

                                                                <Grid item xs={12}>
                                                                    <Button variant="contained" color="primary" onClick={handleAddProc}>Add Process</Button>
                                                                </Grid>
                                                            </Paper>
                                                        </Grid>
                                                    </Grid>
                                                </Fade>
                                            </Modal>
                                        </div>
                                        <Grid item xs={4}>
                                            <Button variant="contained" color="primary" onClick={clickInput}>Run  </Button>
                                        </Grid>
                                        <Grid>
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
                        <Grid item xs={8} container direction="column" justify="flex-start" alignItems="stretch">
                            <Paper className={classes.paper}>
                                <h1>CPU Scheduling: {type}</h1>
                                {type === "Round Robin" ? <h3>Time Quantum = {quantum}</h3>
                                    : null}
                                {displayBoolean ?
                                    <>
                                        <p></p>
                                        <Chart
                                            width={'90%'}
                                            height={'400px'}
                                            chartType="Gantt"
                                            loader={<div>Loading Chart</div>}
                                            data={data}
                                            options={{
                                                height: 400,
                                                gantt: {
                                                    trackHeight: 30,
                                                    criticalPathEnabled: false,
                                                    defaultStartDate: new Date(0, 0, 0, 0, 0, 0),
                                                    animation:
                                                    {
                                                        startup: true,
                                                        easing: 'linear',
                                                        duration: 1500,
                                                    },
                                                    enableInteractivity: false,
                                                },
                                            }}
                                            chartEvents={[
                                                {
                                                    eventName: 'animationfinish',
                                                    callback: () => {
                                                        console.log('Animation Finished')
                                                    },
                                                },
                                            ]}

                                            rootProps={{ 'data-testid': '1' }}
                                        />

                                    </>
                                    : null}


                            </Paper>


                            <Grid item xs={4} container direction="column" justify="flex-start" alignItems="stretch">
                                <TableContainer componenet={Grid}>
                                    <Table className={classes.table} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className={classes.th} align="center">Process Name</TableCell>
                                                <TableCell className={classes.th} align="center">Arrival Time</TableCell>
                                                <TableCell className={classes.th} align="center">Burst Time</TableCell>
                                                {type === "Priority" ? <TableCell className={classes.th} align="center">Priority</TableCell>
                                                    : null}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {processes.map((row) => (
                                                <TableRow key={row.name} onClick={selectRow}>
                                                    <TableCell id={row.name} className={classes.tc} style={row.select ? { backgroundColor: "green", color: "white" } : { backgroundColor: "white" }} align="center" component="th" scope="row">

                                                        {row.name}
                                                    </TableCell>
                                                    <TableCell id={row.name} className={classes.tc} style={row.select ? { backgroundColor: "green", color: "white" } : { backgroundColor: "white" }} align="center">
                                                        {row.arrivalTime}
                                                    </TableCell>
                                                    <TableCell id={row.name} className={classes.tc} style={row.select ? { backgroundColor: "green", color: "white" } : { backgroundColor: "white" }} align="center">
                                                        {row.burstTime}
                                                    </TableCell>
                                                    {type === "Priority" ? <TableCell id={row.name} className={classes.tc} style={row.select ? { backgroundColor: "green", color: "white" } : { backgroundColor: "white" }} align="center">
                                                        {row.burstTime}
                                                    </TableCell>
                                                        : null}
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <Grid item xs={8} container direction="column" justify="flex-end" alignItems="flex-start">
                                    <h4>  Average Waiting Time: {waitingtime} </h4>
                                    <h4> Average Turnaound Time: {turnaroundTime} </h4>
                                </Grid>
                            </Grid>

                        </Grid>
                        <Grid item xs={10} container direction="row" justify="center">
                            <form noValidate autoComplete="off">
                                <Paper className={classes.fields}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={1}></Grid>
                                        <Grid item>
                                            <Button variant="contained" color="primary">
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
                                            <Button variant="contained" color="primary">
                                                Step Forward
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </form>
                        </Grid>
                    </Grid>
                </Grid>
                <ButtonBase className={classes.trashBtn}>
                    <img src={trash} className={classes.trashImg} />
                </ButtonBase>
            </ThemeProvider>
        </Header>
    )
}

