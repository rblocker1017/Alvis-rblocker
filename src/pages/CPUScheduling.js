import React, { useEffect, useState, useRef, Component } from 'react'

import { Chart } from "react-google-charts";
import Header from '../componenets/layout/Header/header'
import Button from "@material-ui/core/Button"
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid"
import Paper from '@material-ui/core/Paper';
import { GridListTileBar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ButtonBase } from '@material-ui/core';
import { withStyles, makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
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

import CPUSchedulingDisplay from '../componenets/layout/AlgorithmDisplay/CPUScheduling/CPUSchedulingDisplay';
import MainPage from "../componenets/layout/Page/MainPage";
import * as Algorithms from './Algorithms/CPUScheduling';
import CPUSchedulingStats from '../componenets/Extras/CPUScheduling/CPUSchedulingStats';
import { Fragment } from 'react';


const styles = (theme) => ({
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
        height: "125%",
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
        height: "70%"
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
    averages:
    {
        backgroundColor: grey[200],
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
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

class CPUScheduling extends Component{
    constructor(props){
        super(props);
        this.classes = this.props.classes;
        this.state = {
            open: false,
            processes: [],
            type: "",
            checked: false,
            formProcess: null,
            formArrival: null,
            formBurst: null,
            waitingTime: null,
            priority: 0,
            selected: {},
            displayBoolean: false,
            turnaroundTime: 0,
            data: [
                [
                    { type: 'string', label: 'Task ID' },
                    { type: 'string', label: 'Task Name' },
                    { type: 'string', label: 'Process' },
                    { type: 'date', label: 'Start Time' },
                    { type: 'date', label: 'End Time' },
                    { type: 'number', label: 'Duration' },
                    // { type: 'number', label: 'Percent Complete' },
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
            ]
        };
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

    changeAlgo(e){
        this.setState({
            type: e.target.textContent
        });
    }

    reset() {
        this.setState({
            displayBoolean: false,
            turnaroundTime: null,
            waitingTime: null,
            quantum: null,
            processes: []
        });
    }

    handleOpen(){
        this.setState({
            open: true
        });
    }

    handleClose(){
        this.setState({
            open: false
        });
    }

    handleChange(event){
        this.setState({
            type: event.target.value
        });
    }
    clickInput(){
        if(this.state.type === ""){
            return
        }
        let bundle;
        if (!this.state.checked) {
            switch (this.state.type) {
                case 'FCFS':
                    bundle = Algorithms.fcfs(this.state.processes);
                    break;
                case 'SJF':
                    bundle = Algorithms.sjf(this.state.processes);
                    break;
                case 'RR':
                    bundle = Algorithms.roundRobin(this.state.processes);
                    break;
                case 'Priority':
                    bundle = Algorithms.priorityFunc(this.state.processes);
                    break;
                case 'SRTF':
                    bundle = Algorithms.sjfFuncPreemptive(this.state.processes);
                default:
                    break;
            }
        }
        else {
            switch (this.state.type) {
                case 'FCFS':
                    bundle = Algorithms.fcfs(this.state.processes);
                    break;
                case 'SJF':
                    bundle = Algorithms.sjf(this.state.processes);
                    break;
                case 'RR':
                    bundle = Algorithms.roundRobin(this.state.processes);
                    break;
                case 'Priority':
                    bundle = Algorithms.priorityFuncPreemptive(this.state.processes);
                    break;
                case 'SRTF':
                    bundle = Algorithms.sjfFuncPreemptive(this.state.processes);
                default:
                    break;
            }
        }
        this.setState({
            turnaroundTime: bundle.turnaroundTime,
            waitingtime: bundle.waitingTime,
            data: bundle.answer,
            displayBoolean: true
        });
    }
    handleAddProc(){
        let temp = this.state.processes.slice();
        temp.push({ name: this.state.formProcess, arrivalTime: parseInt(this.state.formArrival), burstTime: parseInt(this.state.formBurst), priority: (parseInt(this.state.priority)), select: false });
        if (this.state.formProcess === null) {
            this.setState({
                formArrival: null,
                formBurst: null
            });
            alert("Please enter Process name");
        }
        else if (this.state.formArrival === null) {
            this.setState({
                formProcess: null,
                setformBurst: null
            });
            alert("Please enter integer for Arrival Time");
        }
        else if (this.state.formBurst === null) {
            this.setState({
                formProcess: null,
                formArrival: null
            });
            alert("Please enter integer for Burst Time");
        }
        else {
            this.setState({
                processes: temp,
                displayBoolean: false
            });
        }

        //Empty the inputs on the pop-up form, then set the values to null
        Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = "")
        );
        this.setState({
            formProcess: null,
            formArrival: null,
            formBurst: null
        });
    }
    setformArrival(e){
        this.setState({
            formArrival: e.target.value
        });
    }
    setformBurst(e){
        this.setState({
            formBurst: e.target.value
        });
    }
    setformProcess(e){
        this.setState({
            formProcess: e.target.value
        });
    }
    setQuantum(e){
        this.setState({
            quantum: e.target.value
        });
    }
    setpriority(e){
        this.setState({
            priority: e.target.value
        });
    }
    deleteRow(){
        this.setState({
            processes: this.state.processes.filter(process => !process.select)
        });
    }

    handleChangeCheck(event){
        this.setState({
            checked: !this.state.checked
        });
    }

    selectRow(e){
        const name = e.target.id;
        let tempProcesses = this.state.processes
        if (name === this.state.selected.name) {
            this.setState({
                selected: {}
            });
            tempProcesses = this.state.processes.map(process => {
                if (process.select) {
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
                    this.setState({
                        selected: process
                    });
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
        this.setState({
            processes: tempProcesses
        });
    }
    render(){
        const theme = createMuiTheme({
            palette: {
                primary: {
                    main: green[900],
                },
                secondary: {
                    main: grey[700],
                }
            }
        })
        return (
            <Fragment>
                <MainPage
                    algorithms={[
                        {name: "FCFS",func: this.changeAlgo},
                        {name: "SJF", func: this.changeAlgo},
                        {name: "Priority", func: this.changeAlgo},
                        {name: "RR",func: this.changeAlgo},
                        {name: "SRTF", func: this.changeAlgo}
                    ]}
                    extraOption = {{
                        type: "custom",
                        component: <FormControlLabel 
                        labelPlacement={"end"}
                        control={<Checkbox
                            onChange={this.handleChangeCheck}
                            checked={this.state.checked}
                            name="checkedB"
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                            color={"#000000"} />}
                            label={<Typography variant={"caption"}>
                                Preemptive Priority
                            </Typography>} labelPlacement={"bottom"} />
                    }}
                    extraDisplay={
                        <CPUSchedulingStats 
                            selectRow = {this.selectRow}
                            type = {this.state.type}
                            processes = {this.state.processes}
                            waitingTime = {this.props.waitingTime}
                            turnaroundTime = {this.props.turnaroundTime}
                        />
                    }
                    display = {{
                        name: "CPU Scheduling",
                        type: this.state.type,
                        step: null,
                        display: <CPUSchedulingDisplay 
                            data = {this.state.data}
                            displayBoolean = {this.state.displayBoolean}
                        />,
                        insert: this.handleOpen,
                        delete: this.deleteRow,
                        reset: this.reset,
                    }}
                    barFunctions = {{
                        clickInput: this.clickInput
                    }}
                />
                <Modal
                    justify="center"
                    alignItems="center"
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
                        <Grid >
                            <Grid item xs={12} container justify="center" alignItems="center">
                                <Paper className={this.classes.paperOverlay}>
                                    <h1>CPU Scheduling: {this.state.type} </h1>
                                    <form noValidate autoComplete="on">
                                        <Box pt={2}>
                                            <TextField id="outlined-size-normal" variant="outlined" label="Process" onChange={this.setformProcess} />
                                        </Box>
                                        <Box pt={2}>
                                            <TextField id="outlined-size-normal" variant="outlined" label="Arrival Time" onChange={this.setformArrival} />
                                        </Box>
                                        <Box pt={2}>
                                            <TextField id="outlined-size-normal" variant="outlined" label="Burst Time" onChange={this.setformBurst} />
                                        </Box>

                                    </form>
                                    {this.state.type === "RR" ? <form noValidate autoComplete="on">
                                        <Box pt={2}>
                                            <TextField id="outlined-size-normal" variant="outlined" label="Time Quantum" defaultValue={this.state.quantum} onChange={this.setQuantum } />
                                        </Box>
                                    </form>
                                        : null}
                                    {this.state.type === "Priority" ? <form noValidate autoComplete="on">
                                        <Box pt={2}>
                                            <TextField id="outlined-size-normal" variant="outlined" label="Priority" onChange={this.setpriority} />
                                        </Box>
                                    </form>
                                        : null}
                                    <Grid container spacing={1} justify="center">
                                        <Grid item xs={4}>
                                            <Box pt={2}>
                                                <Button variant="contained" color="primary" onClick={this.handleAddProc}>Add Process</Button>
                                            </Box>
                                        </Grid>
                                        <Grid item>
                                            <Box pt={2}>
                                                <Button variant="contained" color="primary" onClick={this.handleClose} >Close</Button>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Fade>
                </Modal>
            </Fragment>
            /*
            <Header>
                <ThemeProvider theme={theme}>
                    <Grid container direction="column">
                        <Grid item container spacing={1}>
                            <Grid item xs={3}>
                                <Grid container direction="column">
                                    <Paper className={this.classes.buttons}>
                                        <Grid container spacing={0}>
                                            <Grid item xs={4}>
                                                <Button variant="contained" color={"primary"} className={this.classes.button} onClick={this.changeAlgo}>FCFS
                                                   {/* <input type="radio" name="fcfsRadio" id="fcfsRadio" value="option1"></input> */
                                                /*</Button>
                                            </Grid>
                                            <Grid item className={this.classes.button} xs={4}>
                                                <Button variant="contained" color={"primary"} className={this.classes.button} onClick={this.changeAlgo}>SJF
                                                
                                                </Button>
                                            </Grid>
                                            <Grid item className={this.classes.button} xs={4}>
                                                <Button variant="contained" color={"primary"} className={this.classes.button} onClick={this.changeAlgo}>Priority
                                                
                                                </Button>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <h1></h1>
                                            </Grid>
                                            <Grid item className={this.classes.button} xs={4}>
                                                <Button variant="contained" color={"primary"} className={this.classes.button} onClick={this.changeAlgo}>RR
                                                
                                                </Button>
                                            </Grid>
                                            <Grid item item xs={4}>
                                                <Button variant="contained" color={"primary"} className={this.classes.button} onClick={this.changeAlgo}>SRTF
                                                
                                                </Button>
                                            </Grid>
                                            <Grid item>
                                                <FormControlLabel control={<Checkbox
                                                    onChange={this.handleChangeCheck}
                                                    checked={this.state.checked}
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
                                                <Button variant="contained" color="primary" onClick={this.handleOpen}>Insert</Button>
                                            </Grid>
                                            <div>
                                                <Modal
                                                    justify="center"
                                                    alignItems="center"
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
                                                        <Grid >
                                                            <Grid item xs={12} container justify="center" alignItems="center">
                                                                <Paper className={this.classes.paperOverlay}>
                                                                    <h1>CPU Scheduling: {this.state.type} </h1>
                                                                    <form noValidate autoComplete="on">
                                                                        <Box pt={2}>
                                                                            <TextField id="outlined-size-normal" variant="outlined" label="Process" onChange={this.setformProcess} />
                                                                        </Box>
                                                                        <Box pt={2}>
                                                                            <TextField id="outlined-size-normal" variant="outlined" label="Arrival Time" onChange={this.setformArrival} />
                                                                        </Box>
                                                                        <Box pt={2}>
                                                                            <TextField id="outlined-size-normal" variant="outlined" label="Burst Time" onChange={this.setformBurst} />
                                                                        </Box>
    
                                                                    </form>
                                                                    {this.state.type === "RR" ? <form noValidate autoComplete="on">
                                                                        <Box pt={2}>
                                                                            <TextField id="outlined-size-normal" variant="outlined" label="Time Quantum" defaultValue={this.state.quantum} onChange={this.setQuantum } />
                                                                        </Box>
                                                                    </form>
                                                                        : null}
                                                                    {this.state.type === "Priority" ? <form noValidate autoComplete="on">
                                                                        <Box pt={2}>
                                                                            <TextField id="outlined-size-normal" variant="outlined" label="Priority" onChange={this.setpriority} />
                                                                        </Box>
                                                                    </form>
                                                                        : null}
                                                                    <Grid container spacing={1} justify="center">
                                                                        <Grid item xs={4}>
                                                                            <Box pt={2}>
                                                                                <Button variant="contained" color="primary" onClick={this.handleAddProc}>Add Process</Button>
                                                                            </Box>
                                                                        </Grid>
                                                                        <Grid item>
                                                                            <Box pt={2}>
                                                                                <Button variant="contained" color="primary" onClick={this.handleClose} >Close</Button>
                                                                            </Box>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Paper>
                                                            </Grid>
                                                        </Grid>
                                                    </Fade>
                                                </Modal>
                                            </div>
                                            <Grid item xs={4}>
                                                <Button variant="contained" color="primary" onClick={this.clickInput}>Run  </Button>
                                            </Grid>
                                            <Grid>
                                                <Button variant="contained" color="primary" onClick={this.reset}>Reset</Button>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>
                                <h2>
                                </h2>
                                <Paper className={this.classes.code}>
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
                                <Paper className={this.classes.paper}>
                                    <h1>CPU Scheduling: {this.state.type}</h1>
                                    {this.state.type === "RR" ? <h3>Time Quantum = {this.state.quantum}</h3>
                                        : null}
                                    {this.displayBoolean ?
                                        <>
                                            <p></p>
                                            <Chart
                                                width={'90%'}
                                                height={'400px'}
                                                chartType="Gantt"
                                                loader={<div>Loading Chart</div>}
                                                data={this.state.data}
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
                                <Grid item xs={4} container direction="column" justify="flex-start" alignItems="stretch" spacing={1}>
                                    <TableContainer componenet={Grid}>
                                        <Table className={this.classes.table} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell className={this.classes.th} align="center">Process Name</TableCell>
                                                    <TableCell className={this.classes.th} align="center">Arrival Time</TableCell>
                                                    <TableCell className={this.classes.th} align="center">Burst Time</TableCell>
                                                    {this.state.type === "Priority" ? <TableCell className={this.classes.th} align="center">Priority</TableCell>
                                                        : null}
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {this.state.processes.map((row) => (
                                                    <TableRow key={row.name} onClick={this.selectRow}>
                                                        <TableCell id={row.name} className={this.classes.tc} style={row.select ? { backgroundColor: "green", color: "white" } : { backgroundColor: "white" }} align="center" component="th" scope="row">
                                                            {row.name}
                                                        </TableCell>
                                                        <TableCell id={row.name} className={this.classes.tc} style={row.select ? { backgroundColor: "green", color: "white" } : { backgroundColor: "white" }} align="center">
                                                            {row.arrivalTime}
                                                        </TableCell>
                                                        <TableCell id={row.name} className={this.classes.tc} style={row.select ? { backgroundColor: "green", color: "white" } : { backgroundColor: "white" }} align="center">
                                                            {row.burstTime}
                                                        </TableCell>
                                                        {this.state.type === "Priority" ? <TableCell id={row.name} className={this.classes.tc} style={row.select ? { backgroundColor: "green", color: "white" } : { backgroundColor: "white" }} align="center">
                                                            {row.burstTime}
                                                        </TableCell>
                                                            : null}
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <Grid item xs={8} container direction="column" justify="flex-end" alignItems="flex-start">
                                        <Paper className={this.classes.averages}>
                                            <h4>  Average Waiting Time: {this.state.waitingtime} </h4>
                                            <h4> Average Turnaound Time: {this.state.turnaroundTime} </h4>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={10} container direction="row" justify="center">
                                <form noValidate autoComplete="off">
                                    <Paper className={this.classes.fields}>
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
                    <ButtonBase className={this.classes.trashBtn} onClick={this.deleteRow}>
                        <img src={trash} className={this.classes.trashImg} />
                    </ButtonBase>
                </ThemeProvider>
            </Header>*/
        );
    }
}

export default withStyles(styles)(CPUScheduling);