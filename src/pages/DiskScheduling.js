import Button from "@material-ui/core/Button";
import { green, grey } from '@material-ui/core/colors';
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import { createMuiTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React, { Component } from 'react';
import Header from '../componenets/layout/header';
import '../styles/DiskScheduling.css';
import * as Algorithms from './Algorithms/DiskScheduling';
import DiskGraph from "./DiskGraph";

const styles = (theme) => ({
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
});

class FCFSDisk extends Component{
    constructor(props){
        super(props);
        this.classes = this.props.classes;
        this.state = {
            data: [        
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
                [199, 12],],
            starting: 0,
            input: [],
            diskSize: false,
            displayBoolean: false,
            type: "scan",
            outward: true,
            checked: true
        }
        this.theme = createMuiTheme({
            palette: {
                primary: {
                    main: green[900],
                },
                secondary: {
                    main: grey[700],
                },
            },
        });
        this.changeAlgo = this.changeAlgo.bind(this);
        this.changeDirection = this.changeDirection.bind(this);
        this.setDiskSize = this.setDiskSize.bind(this);
        this.setStarting = this.setStarting.bind(this);
        this.setInput = this.setInput.bind(this);
        this.reset = this.reset.bind(this);
        this.renderDiskGraph = this.renderDiskGraph.bind(this);
    }
    changeAlgo(e) {
        this.setState({
            type: e.target.textContent
        });
    }
    changeDirection(e){
        if(e.target.textContent === "Outwards"){
            this.setState({
                outward: true
            });
        }
        else{
            this.setState({
                outward: false
            });
        }
    }
    setDiskSize(e){
        this.setState({
            diskSize: e.target.value
        });
    }
    setStarting(e){
        this.setState({
            starting: e.target.value
        });
    }
    setInput(e){
        this.setState({
            input: e.target.value.split(',').map(Number)
        });
    }
    reset(){
        this.renderDiskGraph();
        this.setState({
            diskSize: 0,
            starting: 0,
            input: []
        });
    }
    renderDiskGraph() {
        let data;
        switch (this.state.type) {
            case "fcfs":
                data = Algorithms.fcfsFunction(this.state.starting, this.state.input);
                break;
            case "scan":
                if (this.state.outward) {
                    data = Algorithms.scanOutwardsFunction(this.state.starting, this.state.input, this.state.diskSize);
                } else {
                    data = Algorithms.scanFunction(this.state.starting, this.state.input);
                }
                break;
            case "look":
                if (this.state.outward) {
                    data = Algorithms.lookOutwardsFunction(this.state.starting, this.state.input);
                } else {
                    data = Algorithms.lookFunction(this.state.starting, this.state.input);
                }
                break;
            case "cscan":
                if (this.state.outward) {
                    data = Algorithms.lookOutwardsFunction(this.state.starting, this.state.input, this.state.diskSize);
                } else {
                    data = Algorithms.cscanFunction(this.state.starting, this.state.input, this.state.diskSize);
                }
                break;
            case "clook":
                if (this.state.outward) {
                    data = Algorithms.clookOutwardsFunction(this.state.starting, this.state.input);
                } else {
                    data = Algorithms.clookFunction(this.state.starting, this.state.input, this.state.diskSize)
                }
                break;

            default:
                break;
        }
        this.setState({
            data: data,
            displayBoolean: false
        });
    }
    render(){
        return (
            <Header>
                <ThemeProvider theme={this.theme}>
                    <Grid container direction="column">
                        <Grid item></Grid>
                        <Grid item container spacing={1}>
                            <Grid item xs={3}>
                                <Grid container direction="column">
                                    <Paper className={this.classes.buttons}>
                                        <Grid container spacing={0}>
                                            <Grid item xs={4}>
                                                <Button variant="contained" color={this.state.type === "scan" ? "secondary" : "primary"} value={'scan'} onClick={this.changeAlgo} >scan</Button>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Button variant="contained" color={this.state.type === "cscan" ? "secondary" : "primary"} value={'cscan'} onClick={this.changeAlgo} >c-scan</Button>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Button variant="contained" color={this.state.type === "look" ? "secondary" : "primary"} value={'look'} onClick={this.changeAlgo} >look</Button>
                                            </Grid>
                                            <Grid item xs={12}><h1></h1></Grid>
                                            <Grid item xs={4}>
                                                <Button variant="contained" color={this.state.type === "clook" ? "secondary" : "primary"} value={'clook'} onClick={this.changeAlgo} >c-look</Button>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Button variant="contained" color={this.state.type === "fcfs" ? "secondary" : "primary"} value={'fcfs'} onClick={this.changeAlgo} >fcfs</Button>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Button variant="contained" color={this.state.type === "sstf" ? "secondary" : "primary"} value={'sstf'} onClick={this.changeAlgo} >sstf</Button>
                                            </Grid>
                                            <Grid item xs={12}><h1></h1></Grid>
                                            <Grid item xs={6}>
                                                <Button variant="contained" color={this.state.outward === "inward" ? "secondary" : "primary"} value={'outward'} onClick={this.changeDirection} >Inwards</Button>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Button variant="contained" color={this.state.outward === "outward" ? "secondary" : "primary"} value={'inward'} onClick={this.changeDirection} >Outwards</Button>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>
                                <h2></h2>
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
                            <Grid item xs={9}>
                                <Paper className={this.classes.graphingpaper}>
                                    <h1>
                                        Disk Scheduling: {this.state.type} { this.state.type !== "fcfs" ? this.state.direction : "" }
                                    </h1>
                                        <DiskGraph data={this.state.data} size={this.state.diskSize} > </DiskGraph>
    
                                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}></div>
                                </Paper>
                                <Grid item xs={12}>
                                    <form noValidate autoComplete="off">
                                        <Paper className={this.classes.fields}>
                                            <Grid container>
                                                <Grid item xs={4}>
                                                    <TextField id="outlined-size-normal" variant="filled" label="Disk Size" type="text" onChange={this.setDiskSize} />
                                                </Grid>
                                                <Grid item xs={4}>
                                                    < TextField id="outlined-size-normal" variant="filled" label="Initial Position" color="black" type="text" onChange={this.setStarting} />
                                                </Grid>
                                                <Grid item xs={4}>
                                                    < TextField id="outlined-size-normal" variant="filled" label="Request Sequence" color="black" type="text" onChange={this.setInput} />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <h1></h1>
                                                    <Button variant="contained" color="primary" onClick={this.renderDiskGraph}>Run Disk Scheduling</Button>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <h1></h1>
                                                    <Button variant="contained" color="primary" onClick={this.reset}>Reset</Button>
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
}
export default withStyles(styles)(FCFSDisk);