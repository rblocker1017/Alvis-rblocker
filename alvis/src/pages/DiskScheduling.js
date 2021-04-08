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
import DiskGraph from "../componenets/layout/AlgorithmDisplay/DiskScheduling/DiskGraph";
import DiskSchedulingDisplay from '../componenets/layout/AlgorithmDisplay/DiskScheduling/DiskSchedulingDisplay';
import MainPage from "../componenets/layout/Page/MainPage";

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
            direction: "Outwards",
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
        console.log(this.state.type);
        this.setState({
            type: e.target.textContent
        });
    }
    changeDirection(e){
        console.log("direction");
        this.setState({
            direction: e.target.textContent
        });
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
                if (this.state.direction === "Outwards") {
                    data = Algorithms.scanOutwardsFunction(this.state.starting, this.state.input, this.state.diskSize);
                } else {
                    data = Algorithms.scanFunction(this.state.starting, this.state.input);
                }
                break;
            case "look":
                if (this.state.direction === "Outwards") {
                    data = Algorithms.lookOutwardsFunction(this.state.starting, this.state.input);
                } else {
                    data = Algorithms.lookFunction(this.state.starting, this.state.input);
                }
                break;
            case "cscan":
                if (this.state.direction === "Outwards") {
                    data = Algorithms.lookOutwardsFunction(this.state.starting, this.state.input, this.state.diskSize);
                } else {
                    data = Algorithms.cscanFunction(this.state.starting, this.state.input, this.state.diskSize);
                }
                break;
            case "clook":
                if (this.state.direction === "Outwards") {
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
            <MainPage
                algorithms={[
                    {name: "scan",func: this.changeAlgo},
                    {name: "c-scan", func: this.changeAlgo},
                    {name: "look", func: this.changeAlgo},
                    {name: "c-look",func: this.changeAlgo},
                    {name: "fcfs", func: this.changeAlgo},
                    {name: "sstf", func: this.changeAlgo}
                ]}
                selectedAlgo={this.state.type}
                extraOption = {{
                    type: "buttons",
                    functions: [
                        {name: "Inwards", func: this.changeDirection},
                        {name: "Outwards", func: this.changeDirection}
                    ],
                    selected: this.state.direction
                }}
                display = {{
                    name: "Disk Scheduling",
                    type: this.state.type,
                    step: null,
                    display: <DiskSchedulingDisplay 
                        type= {this.state.type}
                        data = {this.state.data}
                        diskSize = {this.state.diskSize}
                    />,
                    insert: null,
                    delete: null,
                    reset: this.resetDiskGraph,
                    extra: null
                }}
                barFunctions = {{
                    setDiskSize: this.setDiskSize,
                    setStarting: this.setStarting,
                    setInput: this.setInput,
                    renderDiskGraph: this.renderDiskGraph,
                    reset: this.reset
                }}
            />
        );
    }
}
export default (FCFSDisk);