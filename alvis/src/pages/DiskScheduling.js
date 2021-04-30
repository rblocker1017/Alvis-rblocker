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
        this.instructions = [
          "Step 1: select the algorithm with one of the buttons on the top left of the screen",
          "Step 2: select inward or outward",
          "Step 3: Enter disk size and initial position",
          "Step 4: Enter the request sequence seperated by commas",
          "Step 5: click Run Disk Schedueling to update the graph",
          "Step 6: mouse over parts of the graph to inspect it",
          "Step 7: click reset graph to zero out the graph.",
        ];    
    }

    /* changeAlgo - switches the algorithm
     * @param e - the algorithm being switched to
     */
    changeAlgo(e) {
        console.log(this.state.type);
        this.setState({
            type: e.target.textContent
        });
    }

    /* changeDirection - switches direction of scan when applicable
     * @param e - sets inward/outward direction
     */
    changeDirection(e){
        console.log("direction");
        this.setState({
            direction: e.target.textContent
        });
    }

    /* setDiskSize - takes input value to set disk size
     * @param e - value to be stored as disk size
     */
    setDiskSize(e){
        this.setState({
            diskSize: e.target.value
        });
    }

    /* setStarting - takes input value to set starting position
     * @param e - value to be stored as initial head position
     */
    setStarting(e){
        this.setState({
            starting: e.target.value
        });
    }

    /* setInput - takes input string to set head positions
     * @param e - string value to be stored
     */
    setInput(e){
        this.setState({
            input: e.target.value.split(',').map(Number)
        });
    }

    /* reset - resets disk graph
     */
    reset(){
        this.renderDiskGraph();
        this.setState({
            diskSize: 0,
            starting: 0,
            input: []
        });

    /* renderDiskGraph - renders the disk graph algorithm visualizer
     * using data provided by user input to set state
     * for disk graph display conditions
     */
    }
    renderDiskGraph() {
        let data;
        switch (this.state.type) {
            case "fcfs":
                data = Algorithms.fcfsFunction(this.state.starting, this.state.input);
                break;
            case "sstf":
                data = Algorithms.sstfFunction(this.state.starting, this.state.input);
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
            case "c-scan":
                if (this.state.direction === "Outwards") {
                    data = Algorithms.lookOutwardsFunction(this.state.starting, this.state.input, this.state.diskSize);
                } else {
                    data = Algorithms.cscanFunction(this.state.starting, this.state.input, this.state.diskSize);
                }
                break;
            case "c-look":
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

    /* render - functionality to show algorithm selection menu
     *          takes user input and converts to data to be processed into state
     */
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
                    delete: null,
                    reset: this.reset,
                    extra: null
                }}
                barFunctions = {{
                    setDiskSize: this.setDiskSize,
                    setStarting: this.setStarting,
                    setInput: this.setInput,
                    renderDiskGraph: this.renderDiskGraph,
                    reset: this.reset
                }}
                instruct={this.instructions}
            />
        );
    }
}
export default (FCFSDisk);
