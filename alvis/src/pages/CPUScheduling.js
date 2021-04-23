import { FormControlLabel } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";
import { animated, useSpring } from "react-spring/web.cjs";
import CPUSchedulingStats from "../componenets/Extras/CPUScheduling/CPUSchedulingStats";
import CPUSchedulingDisplay from "../componenets/layout/AlgorithmDisplay/CPUScheduling/CPUSchedulingDisplay";
import MainPage from "../componenets/layout/Page/MainPage";
import * as Algorithms from "./Algorithms/CPUScheduling";

const styles = (theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paperOverlay: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    textAlign: "center",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: 500,
  },
});

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

var str1 =
  "Step 1: Choose from one of the 6 algorithm types using the buttons above (Use the checkbox to toggle between preemptive and non-premptive priority).";
var str2 =
  "Step 2: Click the INSERT button and enter in a name for the prcoess and values for its arrival time, burst time, priority, and time quantum.";
var str3 =
  "Step 3: Once you have entered all the processes you want, press the run button to generate a GANTT Chart for the data.";
var str4 =
  "Step 4: Press the RESET button to remove the all the processes from the list and start again.";

class CPUScheduling extends Component {
  constructor(props) {
    super(props);
    this.classes = this.props.classes;
    this.state = {
      open: false,
      processes: [],
      type: "",
      checked: false,
      formProcess: null,
      processError: false,
      formArrival: null,
      arrivalError: false,
      formBurst: null,
      burstError: false,
      waitingTime: 0,
      priority: 0,
      priorityError: false,
      selected: {},
      displayBoolean: false,
      turnaroundTime: 0,
      data: [
        [
          { type: "string", label: "Task ID" },
          { type: "string", label: "Task Name" },
          { type: "string", label: "Process" },
          { type: "date", label: "Start Time" },
          { type: "date", label: "End Time" },
          { type: "number", label: "Duration" },
          // { type: 'number', label: 'Percent Complete' },
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
      ],
    };
    this.instructions = [];
    this.instructions.push(str1);
    this.instructions.push(str2);
    this.instructions.push(str3);
    this.instructions.push(str4);
    this.changeAlgo = this.changeAlgo.bind(this);
    this.reset = this.reset.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.clickInput = this.clickInput.bind(this);
    this.handleAddProc = this.handleAddProc.bind(this);
    this.setformArrival = this.setformArrival.bind(this);
    this.setformBurst = this.setformBurst.bind(this);
    this.setformProcess = this.setformProcess.bind(this);
    this.setQuantum = this.setQuantum.bind(this);
    this.setpriority = this.setpriority.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.handleChangeCheck = this.handleChangeCheck.bind(this);
    this.selectRow = this.selectRow.bind(this);
  }

  changeAlgo(e) {
    if(e.target.textContent === "Priority"){
      this.reset();
    }
    this.setState({
      type: e.target.textContent,
    });
  }

  reset() {
    this.setState({
      displayBoolean: false,
      turnaroundTime: null,
      waitingTime: null,
      quantum: null,
      processes: [],
    });
  }

  handleOpen() {
    this.setState({
      open: true,
    });
  }

  handleClose() {
    this.setState({
      open: false,
      formProcess: null,
      processError: false,
      formArrival: null,
      arrivalError: false,
      formBurst: null,
      burstError: false,
      priority: null,
      priorityError: false
    });
  }

  handleChange(event) {
    this.setState({
      type: event.target.value,
    });
  }
  clickInput() {
    if (this.state.type === "") {
      return;
    }
    let bundle;
    if (!this.state.checked) {
      switch (this.state.type) {
        case "FCFS":
          bundle = Algorithms.fcfs(this.state.processes);
          break;
        case "SJF":
          bundle = Algorithms.sjf(this.state.processes);
          break;
        case "RR":
          bundle = Algorithms.roundRobin(this.state.processes, this.state.quantum);
          break;
        case "Priority":
          bundle = Algorithms.priorityFunc(this.state.processes);
          break;
        default:
          break;
      }
    } else {
      switch (this.state.type) {
        case "FCFS":
          bundle = Algorithms.fcfs(this.state.processes);
          break;
        case "SJF":
          bundle = Algorithms.sjfFuncPreemptive(this.state.processes);
          break;
        case "RR":
          bundle = Algorithms.roundRobin(this.state.processes, this.state.quantum);
          break;
        case "Priority":
          bundle = Algorithms.priorityFuncPreemptive(this.state.processes);
          break;
        default:
          break;
      }
    }
    this.setState({
      turnaroundTime: bundle.turnaroundTime,
      waitingTime: bundle.waitingTime,
      data: bundle.answer,
      displayBoolean: true,
    });
  }
  handleAddProc() {
    let error = false;
    const regex = /[^0-9]/g;
    let temp = this.state.processes.slice();
    console.log(this.state.priority);
    if(temp.some(process => process.name === this.state.formProcess)){
      this.setState({
        processError: true
      });
      error = true;
    }
    else{
      this.setState({
        processError: false
      });
    }
    if(regex.test(this.state.formArrival)){
      this.setState({
        arrivalError: true
      });
      error = true;
    }
    else{
      this.setState({
        arrivalError: false
      });
    }
    if(regex.test(this.state.formBurst)){
      this.setState({
        burstError: true
      });
      error = true;
    }
    else{
      this.setState({
        burstError: false
      });
    }
    if(this.state.type === "Priority" && regex.test(this.state.priority)){
      this.setState({
        priorityError: true
      });
      error = true;
    }
    else{
      this.setState({
        priorityError: false
      });
    }
    if(!error){
      error = false;
      temp.push({
        name: this.state.formProcess,
        arrivalTime: parseInt(this.state.formArrival),
        burstTime: parseInt(this.state.formBurst),
        priority: parseInt(this.state.priority),
        select: false,
      });
      //Empty the inputs on the pop-up form, then set the values to null
      Array.from(document.querySelectorAll("input")).forEach(
        (input) => (input.value = "")
      );
      this.setState({
        processes: temp,
        formProcess: null,
        displayBoolean: false,
        processError: false,
        formArrival: null,
        arrivalError: false,
        formBurst: null,
        burstError: false,
        priority: null,
        priorityError: false
      });
    }
  }
  setformArrival(e) {
    this.setState({
      formArrival: e.target.value,
    });
  }
  setformBurst(e) {
    this.setState({
      formBurst: e.target.value,
    });
  }
  setformProcess(e) {
    this.setState({
      formProcess: e.target.value,
    });
  }
  setQuantum(e) {
    this.setState({
      quantum: e.target.value,
    });
  }
  setpriority(e) {
    this.setState({
      priority: e.target.value,
    });
  }
  deleteRow() {
    this.setState({
      processes: this.state.processes.filter((process) => !process.select),
    });
  }

  handleChangeCheck(event) {
    // console.log(this.state.checked);
    this.setState({
      checked: !this.state.checked,
    });
  }

  selectRow(e) {
    const name = e.target.id;
    let tempProcesses = this.state.processes;
    if (name === this.state.selected.name) {
      this.setState({
        selected: {},
      });
      tempProcesses = this.state.processes.map((process) => {
        if (process.select) {
          return {
            ...process,
            select: false,
          };
        }
        return process;
      });
    } else {
      tempProcesses = tempProcesses.map((process) => {
        if (name === process.name) {
          this.setState({
            selected: process,
          });
          return {
            ...process,
            select: true,
          };
        }
        return {
          ...process,
          select: false,
        };
      });
    }
    this.setState({
      processes: tempProcesses,
    });
  }
  render() {
    return (
      <Fragment>
        <MainPage
          algorithms={[
            { name: "FCFS", func: this.changeAlgo },
            { name: "SJF", func: this.changeAlgo },
            { name: "Priority", func: this.changeAlgo },
            {name: "RR",func: this.changeAlgo},
            //{ name: "SRTF", func: this.changeAlgo },
          ]}
          extraOption={{
            type: "custom",
            component: (
              <FormControlLabel
                labelPlacement={"end"}
                control={
                  <Checkbox
                    onChange={this.handleChangeCheck}
                    checked={this.state.checked}
                    name='checkedB'
                    inputProps={{ "aria-label": "primary checkbox" }}
                    color={"#000000"}
                  />
                }
                label={
                  <Typography variant={"caption"}>
                    Preemptive Priority
                  </Typography>
                }
              />
            ),
          }}
          extraDisplay={
            <CPUSchedulingStats
              selectRow={this.selectRow}
              type={this.state.type}
              processes={this.state.processes}
              waitingTime={this.state.waitingTime}
              turnaroundTime={this.state.turnaroundTime}
            />
          }
          display={{
            name: "CPU Scheduling",
            type: this.state.type,
            step: null,
            display: (
              <CPUSchedulingDisplay
                data={this.state.data}
                displayBoolean={this.state.displayBoolean}
              />
            ),
            insert: this.handleOpen,
            delete: this.deleteRow,
            reset: this.reset,
          }}
          instruct={this.instructions}
          barFunctions={{
            clickInput: this.clickInput,
          }}
        />
        <Modal
          justify='center'
          alignItems='center'
          className={this.classes.modal}
          open={this.state.open}
          onClose={this.handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={this.state.open}>
            <Grid>
              <Grid item xs={12} container justify='center' alignItems='center'>
                <Paper className={this.classes.paperOverlay}>
                  <h1>CPU Scheduling: {this.state.type} </h1>
                  <form noValidate autoComplete='on'>
                    <Box pt={2}>
                      <TextField
                        id='outlined-size-normal'
                        variant='outlined'
                        error={this.state.processError}
                        helperText={this.state.processError ? "Invalid Process" : ""}
                        label='Process'
                        onChange={this.setformProcess}
                      />
                    </Box>
                    <Box pt={2}>
                      <TextField
                        id='outlined-size-normal'
                        variant='outlined'
                        error={this.state.arrivalError}
                        helperText={this.state.arrivalError ? "Invalid Arrival Time" : ""}
                        label='Arrival Time'
                        onChange={this.setformArrival}
                      />
                    </Box>
                    <Box pt={2}>
                      <TextField
                        id='outlined-size-normal'
                        variant='outlined'
                        error={this.state.burstError}
                        helperText={this.state.burstError ? "Invalid Burst Time" : ""}
                        label='Burst Time'
                        onChange={this.setformBurst}
                      />
                    </Box>
                  </form>
                  {this.state.type === "RR" ? (
                    <form noValidate autoComplete='on'>
                      <Box pt={2}>
                        <TextField
                          id='outlined-size-normal'
                          variant='outlined'
                          label='Time Quantum'
                          defaultValue={this.state.quantum}
                          onChange={this.setQuantum}
                        />
                      </Box>
                    </form>
                  ) : null}
                  {this.state.type === "Priority" ? (
                    <form noValidate autoComplete='on'>
                      <Box pt={2}>
                        <TextField
                          id='outlined-size-normal'
                          variant='outlined'
                          error={this.state.priorityError}
                          helperText={this.state.priorityError ? "Invalid Priority" : ""}
                          label='Priority'
                          onChange={this.setpriority}
                        />
                      </Box>
                    </form>
                  ) : null}
                  <Grid container spacing={1} justify='center'>
                    <Grid item xs={4}>
                      <Box pt={2}>
                        <Button
                          variant='contained'
                          color='primary'
                          onClick={this.handleAddProc}
                        >
                          Add Process
                        </Button>
                      </Box>
                    </Grid>
                    <Grid item>
                      <Box pt={2}>
                        <Button
                          variant='contained'
                          color='primary'
                          onClick={this.handleClose}
                        >
                          Close
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Fade>
        </Modal>
      </Fragment>
    );
  }
}

export default withStyles(styles)(CPUScheduling);
