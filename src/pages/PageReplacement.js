import React, { useState } from 'react'
import clsx from 'clsx';
import Header from "../componenets/layout/header"
import Button from "@material-ui/core/Button"
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid"
import Paper from '@material-ui/core/Paper';
import { withStyles, makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { grey, green } from '@material-ui/core/colors';
import * as Algorithms from './Algorithms/PageReplacement';
import { Component } from 'react';
import MainPage from "../componenets/layout/Page/MainPage";
import PageReplacementDisplay from "../componenets/layout/AlgorithmDisplay/PageReplacement/PageReplacementDisplay";

const styles = (theme) => ({
    root: {
        flexGrow: 1,
    },
    table: {
        backgroundColor: green[900],
        color: grey[200],
        textAlign: 'center',
        padding: theme.spacing(1)
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: 600,
        width: "100%",
        fixed: true
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
    formControl: {
        minWidth: 120
    },
});

class PageReplacement extends Component{
    constructor(props){
        super(props);
        this.classes = this.props.classes;
        this.state = {
            answer: [],
            type: "FIFO",
            frames: [],
            input: [],
            value: "",
            faultCount: 0
        }
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
    setFrames(e){
        this.setState({
            frames: e.target.value
        });
    }
    runAlgorithm(e){
        this.setState({
            type: e.target.textContent
        });
        this.renderPageReplacement(e.target.textContent);
    }
    renderPageReplacement(newType) {
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
    reset() {
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
                        if (JSON.stringify(page) !== '""') {
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
                barFunctions = {{
                    frames: this.setFrames,
                    input: this.setInput
                }}
            />

        );
    }
}

export default withStyles(styles)(PageReplacement)