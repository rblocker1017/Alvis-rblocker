import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import { Chart } from "react-google-charts";
import Header from "../componenets/layout/header";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(5),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function Fcfs(props) {
  const classes = useStyles();
  const [processes, setprocesses] = useState([]);
  const [quantum, setQuantum] = useState();

  function fcfs(processes, Quantum) {
    //let timeCounter = 0;
    let totalWaiting = 0;
    let totalTat = 0;
    //let procId = 0;
    let answer = [
      [
        { type: "string", label: "Task ID" },
        { type: "string", label: "Task Name" },
        { type: "string", label: "Process" },
        { type: "date", label: "Start Time" },
        { type: "date", label: "End Time" },
        { type: "number", label: "Duration" },
        { type: "number", label: "Percent Complete" },
        { type: "string", label: "Dependencies" },
      ],
    ];

    let processList = processes;

    processList.sort((a, b) => {
      return a.arrivalTime > b.arrivalTime ? 1 : -1;
    });

    //console.log(processList[0].arrivalTime)
    while (processList.filter((item) => item.burstTime > 0).length > 0) {
      processList.forEach(function (i) {
        //answer.push([procId++, i.name, i.name, new Date(0, 0, 0, 0, 0, timeCounter), new Date(0, 0, 0, 0, 0, timeCounter + i.burstTime), null, 100, null])
      }); // end for each
    } // end while
    setTurnaroundTime(totalTat / processList.length);
    setWaitingTime(totalWaiting / processList.length);

    return answer;
  }

  const [formProcess, setformProcess] = useState();
  const [formArrival, setformArrival] = useState();
  const [formBurst, setformBurst] = useState();
  const [displayBoolean, setDisplayBoolean] = useState(false);
  const [wairtingtime, setWaitingTime] = useState();
  const [turnaroundTime, setTurnaroundTime] = useState();

  const [data, setData] = useState([
    [
      { type: "string", label: "Task ID" },
      { type: "string", label: "Task Name" },
      { type: "string", label: "Process" },
      { type: "date", label: "Start Time" },
      { type: "date", label: "End Time" },
      { type: "number", label: "Duration" },
      { type: "number", label: "Percent Complete" },
      { type: "string", label: "Dependencies" },
    ],
    [
      "1",
      "P1",
      "P1",
      new Date(0, 0, 0, 0, 0, 0),
      new Date(0, 0, 0, 0, 0, 0),
      null,
      100,
      null,
    ],
  ]);

  // console.log("Data : " + data);
  const clickInput = () => {
    setData(fcfs(processes));
    data.forEach((i) => {
      // console.log("Data stream: " + i);
    });
    setDisplayBoolean(true);
  };

  const handleAddProc = () => {
    let temp = processes.slice();

    temp.push({
      name: formProcess,
      arrivalTime: parseInt(formArrival),
      burstTime: parseInt(formBurst),
    });
    setprocesses(temp);
    // console.log(temp);
    setDisplayBoolean(false);
  };
  const showProceses = processes.map((proc) => {
    return (
      <>
        <p>
          Process: {proc.name} Arrival Time: {proc.arrivalTime} Burst Time:{" "}
          {proc.burstTime}{" "}
        </p>
      </>
    );
  });

  return (
    <Header>
      <h1>Round Robin Gantt Chart</h1>

      <Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <form noValidate autoComplete='off'>
              <TextField
                id='outlined-size-normal'
                variant='outlined'
                label='Time Quantum'
                onChange={(e) => {
                  setQuantum(e.target.value);
                }}
              />
            </form>
            <form noValidate autoComplete='off'>
              <TextField
                id='outlined-size-normal'
                variant='outlined'
                label='Process'
                onChange={(e) => {
                  setformProcess(e.target.value);
                }}
              />
              <TextField
                id='outlined-size-normal'
                variant='outlined'
                label='Arrival Time'
                onChange={(e) => {
                  setformArrival(e.target.value);
                }}
              />
              <TextField
                id='outlined-size-normal'
                variant='outlined'
                label='Burst Time'
                onChange={(e) => {
                  setformBurst(e.target.value);
                }}
              />
            </form>
            <Button variant='contained' color='primary' onClick={handleAddProc}>
              Add Process
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Button variant='contained' color='primary' onClick={clickInput}>
              Run FCFS{" "}
            </Button>
          </Paper>
        </Grid>
      </Grid>
      {displayBoolean ? (
        <>
          <p></p>
          <Chart
            width={"90%"}
            height={"400px"}
            chartType='Gantt'
            loader={<div>Loading Chart</div>}
            data={data}
            options={{
              height: 400,
              gantt: {
                trackHeight: 30,
                criticalPathEnabled: false,
              },
            }}
            rootProps={{ "data-testid": "1" }}
          />
          <h3>Average Waiting Time: {wairtingtime} </h3>
          <h3>Average turnaound Time: {turnaroundTime} </h3>
        </>
      ) : null}

      <p>List of Processes: </p>
      {showProceses}
    </Header>
  );
}
