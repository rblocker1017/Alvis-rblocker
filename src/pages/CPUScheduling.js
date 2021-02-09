import React, { useEffect, useState, useRef, Component } from 'react'
import * as d3 from "d3";

import { Chart } from "react-google-charts";
import Header from "../componenets/layout/header"
import Button from "@material-ui/core/Button"
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid"
import Paper from '@material-ui/core/Paper';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import { grey, orange } from '@material-ui/core/colors';
import { tree } from 'd3';



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: "125%",
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
        width: "90%"
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

export default function CpuScheduling(props) {
    const classes = useStyles();
    const [processes, setprocesses] = useState([])
    const [quantum, setQuantum] = useState();
    const [type, settype] = useState("fcfs")
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
                main: grey[900],
            }
        }
    })

    function fcfs(processes) {
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
            return (a.arrivalTime > b.arrivalTime) ? 1 : -1
        })






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

    const handleChange = (event) => {
        settype(event.target.value);
    };


    const [formProcess, setformProcess] = useState()
    const [formArrival, setformArrival] = useState()
    const [formBurst, setformBurst] = useState()
    const [displayBoolean, setDisplayBoolean] = useState(false);
    const [wairtingtime, setWaitingTime] = useState();
    const [turnaroundTime, setTurnaroundTime] = useState();
    const [priority, setpriority] = useState(0)



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

        switch (type) {
            case 'fcfs':
                setData(fcfs(processes));
                setDisplayBoolean(true);
                break;
            case 'sjf':
                if (!checked) {
                    setData(sjf(processes));
                    setDisplayBoolean(true);
                } else {
                    setData(sjfFuncPreemptive(processes));
                    setDisplayBoolean(true);
                }
                break;
            case 'roundRobin':
                setData(roundRobin(processes));
                setDisplayBoolean(true);
                break;
            case 'priority':
                if (!checked) {
                    setData(priorityFunc(processes));
                    setDisplayBoolean(true);
                }
                else {
                    setData(priorityFuncPreemptive(processes));
                    setDisplayBoolean(true);
                }
                break;


            default:
                break;
        }

        data.forEach(i => { console.log("Data stream: " + i) })

    }

    const handleAddProc = () => {
        let temp = processes.slice();

        temp.push({ name: formProcess, arrivalTime: parseInt(formArrival), burstTime: parseInt(formBurst), priority: (parseInt(priority)) });
        setprocesses(temp);
        console.log(temp);
        setDisplayBoolean(false);
    }
    const showProceses = processes.map((proc) => {
        return (<>

            <p>Process: {proc.name} Arrival Time: {proc.arrivalTime} Burst Time: {proc.burstTime} {type === 'priority' ? <>Priority: {proc.priority}</> : null}</p>
        </>
        );

    })

    const handleChangeCheck = (event) => {
        setChecked(!checked);
    };


    return (

        <Header>
            <h1>CPU Scheduling</h1>
            
            <ThemeProvider theme={theme}>
                <Grid container direction="column">
                    <Grid item></Grid>
                    <Grid item container spacing={1}>
                        <Grid item xs={3}>
                            <Grid container direction="column">
                                <Paper className={classes.buttons}>
                                    <Grid container spacing={0}>
                                        <Grid item  xs={4}>
                                            <Button variant="contained" color="primary" className={classes.button} onClick={changeFCFS}>FCFS</Button>
                                        </Grid>
                                        <Grid item className={classes.button} xs={4}>
                                            <Button variant="contained" color="primary" className={classes.button} onClick={changeSJF}>SJF</Button>
                                        </Grid>
                                        <Grid item xs ={12}>
                                            <h1>
                                            </h1>
                                        </Grid>
                                        <Grid item className={classes.button} xs={4}>
                                            <Button variant="contained" color="primary" className={classes.button} onClick={changeRR}>RR</Button>
                                        </Grid>
                                        <Grid item item xs={4}>
                                            <Button variant="contained" color="primary" className={classes.button} onClick={changeSRTF}>SRTF</Button>
                                        </Grid>
                                        <Grid item className={classes.button} xs={4}>
                                            <Button variant="contained" color="primary" className={classes.button} onClick={changePri}>Priority</Button>
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
                      
                      
            


            <Grid >
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <form noValidate autoComplete="on">
                            <TextField id="outlined-size-normal" variant="outlined" label="Process" onChange={(e) => { setformProcess(e.target.value) }} />
                            <TextField id="outlined-size-normal" variant="outlined" label="Arrival Time" onChange={(e) => { setformArrival(e.target.value) }} />
                            <TextField id="outlined-size-normal" variant="outlined" label="Burst Time" onChange={(e) => { setformBurst(e.target.value) }} />


                        </form>
                        {type === "roundRobin" ? <form noValidate autoComplete="on">
                            <TextField id="outlined-size-normal" variant="outlined" label="Time Quantum" onChange={(e) => { setQuantum(e.target.value) }} />
                        </form>
                            : null}
                        {type === "priority" ? <form noValidate autoComplete="on">
                            <TextField id="outlined-size-normal" variant="outlined" label="Priority" onChange={(e) => { setpriority(e.target.value) }} />
                        </form>
                            : null}
                        <h3>Algorithm Select</h3>
                        {type === 'sjf' || type === 'priority' ? <> <h2>Preemptive<Checkbox
                            checked={checked}
                            name="checkedB"
                            onChange={handleChangeCheck}
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        /> </h2>
                        </> : null}

                        {type === 'roundRobin' ? <> <h2>Preemptive<Checkbox disabled checked inputProps={{ 'aria-label': 'disabled checked checkbox' }} /> </h2>
                        </> : null}

                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={type}
                            onChange={handleChange}
                        >
                            <MenuItem value={'fcfs'} onChange={() => { settype("fcfs"); console.log("Selected: FCFS"); }}>FCFS</MenuItem>

                            <MenuItem value={'roundRobin'} onClick={() => { settype("roundRobin"); console.log("Selected: RR"); }}>Round Robin</MenuItem>
                            <MenuItem value={'sjf'} onClick={() => { settype("sjf"); console.log("Selected: SJF"); }}>SJF</MenuItem>
                            <MenuItem value={'priority'} onClick={() => { settype("priority"); console.log("Selected: priority"); }}>Priority</MenuItem>

                        </Select>
                    </Paper>
                </Grid>
                <Grid item xs={12}>

                    <Paper className={classes.paper}>

                        <Button variant="contained" color="primary" onClick={handleAddProc}>Add Process</Button>
                        <Button variant="contained" color="primary" onClick={clickInput}>Run  </Button>

                    </Paper>


                </Grid>


            </Grid>
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
                                defaultStartDate: new Date(0, 0, 0, 0, 0, 0)
                            },



                        }}
                        rootProps={{ 'data-testid': '1' }}

                    />
                    <h3>Average Waiting Time: {wairtingtime} </h3>
                    <h3>Average turnaound Time: {turnaroundTime} </h3>
                </>
                : null}

            <Grid> item xs={2}
            <p>List of Processes: </p>
            {showProceses}
            </Grid> 
                    
                    </Grid>
                </Grid>
            </ThemeProvider>
        </Header>
    )
}

