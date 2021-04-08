import { green, grey } from '@material-ui/core/colors';
import { createMuiTheme, withStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';
import PageReplacementDisplay from "../componenets/layout/AlgorithmDisplay/PageReplacement/PageReplacementDisplay";
import MainPage from "../componenets/layout/Page/MainPage";
import * as Algorithms from './Algorithms/PageReplacement';

var str1 = "Step 1: Enter a string by clicking on the Reference String box with the format 'x, y, z...'   For example, the reference string of 1, 2, 3, 2, 3, 5, 4 is acceptable."
var str2 = "Step 2: Enter a frame by clicking on the frame button and selecting a number."
var str3 = "Step 3: Press the FIFO, LRU, or OPT buttons to select the algorithm."
var str4 = "Step 4: Press the RESET button to remove the current reference string and Frame count."

class PageReplacement extends Component{
    constructor(props){
        super(props);
        this.classes = this.props.classes;
        this.state = {
            answer: [],
            type: "FIFO",   // determines which algorithm we are currently looking at 
            frames: [],
            input: [],
            value: "",
            faultCount: 0
        }
        this.instructions = [];
        this.instructions.push(str1);
        this.instructions.push(str2);
        this.instructions.push(str3);
        this.instructions.push(str4);
        this.setInput = this.setInput.bind(this);
        this.setFrames = this.setFrames.bind(this);
        this.runAlgorithm = this.runAlgorithm.bind(this);
        this.renderPageReplacement = this.renderPageReplacement.bind(this);
        this.reset = this.reset.bind(this);
    }
    setInput(e){
        this.setState({
            input: e.target.value.split(',').map(Number)
        });
    }
    setFrames(e){   // takes in frames count and sets them to value of Frames 
        this.setState({
            frames: e.target.value
        });
    }
    runAlgorithm(e){    // takes in algorithm type, changes to it, and then runs algorithm
        this.setState({
            type: e.target.textContent
        });
        this.renderPageReplacement(e.target.textContent);
    }
    renderPageReplacement(newType) {    // takes in new Algorithm type, and runs according to current values
        let bundle;
        switch (newType) {
            case "FIFO":
                bundle = Algorithms.fcfsPageReplacementFunc(this.state.input, this.state.frames);
                break;
            case "LRU":
                bundle = Algorithms.lruPageReplacementFunc(this.state.input, this.state.frames);
                break;
            case "OPT":
                bundle = Algorithms.optPageReplacementFunc(this.state.input, this.state.frames);
                break;
            default:
                break;
        }
        this.setState({
            answer: bundle.answer,
            faultCount: bundle.faults,
        });
    }
    reset() {   // resets page replacement reference string and frame count, but doesn't remove page fault display
        this.setState({
            value: "",
            input: this.state.value.split(',').map(Number),
            answer: Algorithms.fcfsPageReplacementFunc(0, 0).answer,
        });
        Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = "")
        );
    }
    render(){
        const tableHeader = this.state.input.map((page) => {
            return (
                <th style={{ border: "1px solid black", width: "45px", color: 'Black', fontSize: "40px", align: 'center' }} >{page}</th>
            );
        })
    
        const displayTable = this.state.answer.map((ans) => {
            console.log(ans)
            return (
                <td>
                    {ans.column.map((page) => {
                        if (JSON.stringify(page) !== '""') {    // changes "" from boxes without a reference string value to blank for better visuals
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
        return(
            <MainPage
                algorithms={[
                    {name: "FIFO",func: this.runAlgorithm},
                    {name: "OPT", func: this.runAlgorithm},
                    {name: "LRU", func: this.runAlgorithm}
                ]}
                display = {{
                    name: "Page Replacement",
                    type: this.state.type,
                    step: null,
                    display: <PageReplacementDisplay 
                        tableHeader = {tableHeader}
                        answer = {this.state.answer}
                        faultCount = {this.state.faultCount}
                    />,
                    insert: null,
                    delete: null,
                    reset: this.reset,
                    extra: null
                }}
                instruct = {this.instructions}
                //instruct = str1 + <br /> + str2 + str3 + str4 // Changes str1, str2, str3... to change instructions display
                barFunctions = {{
                    frames: this.setFrames,
                    input: this.setInput
                }}
            />

        );
    }
}

export default (PageReplacement)