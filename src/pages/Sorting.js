import React, { createRef, useRef, useState, useEffect, Component } from 'react';
import clsx from "clsx";
import Header from "../componenets/layout/header";
import { Button, Grid, Paper, ButtonBase, Modal, Fade, Backdrop, TextField, withStyles } from "@material-ui/core";
import { makeStyles, ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { grey, green, orange } from "@material-ui/core/colors";
import { select, axisBottom, axisRight, scaleLinear, scaleBand } from "d3";
import { Update } from '@material-ui/icons';
import trash from '../trash.png';
import { generateINIT } from './Shapes/SortingGenerator';
import { InsertModal } from "../componenets/Resources/InsertModal";
import { bubble, insertion, selection, heapSort, quickSort, shellSort } from "./Algorithms/Sorting";
import Cookies from 'universal-cookie';

const SIZE = 15;
const INIT_VALUES = generateINIT(SIZE);
const INIT_ARRAY_BUNDLE = insertion(INIT_VALUES);

const styles = (theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
        height: "125%",
        width: "100%",
    },
    buttons: {
        backgroundColor: grey[200],
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
        width: "100%",
        height: "100%",
    },
    button: {
        width: "90%",
    },
    code: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
        height: "100%",
    },
    fields: {
        backgroundColor: grey[200],
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
        height: "100%",
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
    },
    insertPaper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

class Sorting extends Component{
    constructor(props){
        super(props);
        this.classes = this.props.classes;
        this.svgRef = createRef();
        this.state = {
            type: "Insertion",
            arraysOfArrays: INIT_ARRAY_BUNDLE,
            stepCount: 0,
            swap1: INIT_ARRAY_BUNDLE[0].swappedValue1,
            swap2: INIT_ARRAY_BUNDLE[0].swappedValue2,
            newArray: INIT_ARRAY_BUNDLE[0].data.split(',').map(Number),
            selected: -1,
            open: false,
            inputError: false,
            input : "",
            transitionArray: INIT_ARRAY_BUNDLE[0].data.split(',').map(Number)
        }
        this.changeAlgorithm = this.changeAlgorithm.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.insertValue = this.insertValue.bind(this);
        this.removeValue = this.removeValue.bind(this);
        this.reset = this.reset.bind(this);
        this.stepForward = this.stepForward.bind(this);
        this.stepBack = this.stepBack.bind(this);
        this.selectBar = this.selectBar.bind(this);
        this.updateGraph = this.updateGraph.bind(this);
    }
    changeAlgorithm(e){
        let currentType = e.target.textContent;
        if (this.state.stepCount !== 0) {
            return;
        }
        this.setState({
            type: currentType
        });
    }
    handleChange(e){
        this.setState({
            input: e.target.value
        });
    }

    handleClose(){
        this.setState({
            inputError: false,
            open: false
        });
    }

    handleOpen(){
        if (this.state.stepCount === 0) {
            this.setState({
                open: true
            });
        }
    }

    insertValue(){
        const regex = /[^0-9]/g;
        if (!regex.test(this.state.input) && this.state.input !== "" && parseInt(this.state.input) > 1 && parseInt(this.state.input) < 100) {
            let lastPart = this.state.transitionArray;
            let firstPart = lastPart.splice(0, this.state.selected + 1);
            this.setState({
                transitionArray: firstPart.concat(parseInt(this.state.input)).concat(lastPart),
            });
            this.handleClose();
        }
        else {
            this.setState({
                inputError: true
            });
        }
    }

    removeValue(){
        let tempArray = this.state.transitionArray;
        tempArray.splice(this.state.selected, 1)
        this.setState({
            transitionArray: tempArray.concat()
        });
    }

    reset() {
        let tempStep = 0;
        this.setState({
            stepCount: tempStep,
            newArray: this.state.arraysOfArrays[tempStep].data.split(',').map(Number),
            swap1: this.state.arraysOfArrays[tempStep].swappedValue1,
            swap2: this.state.arraysOfArrays[tempStep].swappedValue2,            
        });
    }

    stepForward() {
        if (this.state.stepCount === 0) {
            this.setState({
                selected: -1
            });
        }
        if (this.state.stepCount < this.state.arraysOfArrays.length - 1) {
            let tempStep = this.state.stepCount + 1;
            this.setState({
                stepCount: tempStep,
                newArray: this.state.arraysOfArrays[tempStep].data.split(',').map(Number),
                swap1: this.state.arraysOfArrays[tempStep].swappedValue1,
                swap2: this.state.arraysOfArrays[tempStep].swappedValue2,            
            });
        }
    }

    stepBack() {
        if (this.state.stepCount > 0) {
            let tempStep = this.state.stepCount - 1;
            this.setState({
                stepCount: tempStep,
                newArray: this.state.arraysOfArrays[tempStep].data.split(',').map(Number),
                swap1: this.state.arraysOfArrays[tempStep].swappedValue1,
                swap2: this.state.arraysOfArrays[tempStep].swappedValue2,            
            });
        }
    }
    selectBar(d, i) {
        if (this.state.stepCount === 0) {
            this.setState({
                selected: i
            });
        }
        /*
        if (this.state.selected === i) {
            this.setState({
                selected: -1
            });
        }*/
    }
    updateGraph(newArray, selected, swap1, swap2){
        let x = Math.max(...newArray)
        const svg = select(this.svgRef.current);
        const xScale = scaleBand()
            .domain(newArray.map((value, index) => index))
            .range([-200, 300])
            .padding(0.5);

        const yScale = scaleLinear()
            .domain([0, x])
            .range([370, 5]);

        const colorScale = scaleLinear()
            .domain([75, 100, 150])
            .range(["green", "green", "green"])
            .clamp(true);

        const xAxis = axisBottom(xScale).ticks(newArray.length);

        svg
            .select(".x-axis")
            .style("transform", "translateY(370px)")
            .call(xAxis).attr("font-size", "16px");

        const yAxis = axisRight(yScale);
        svg
            .select(".y-axis")
            .style("transform", "translateX(302px)")
            .call(yAxis)
            .attr("font-size", "13px");

        svg.selectAll("text")
            .data(newArray)
            .enter()
            .append("text")
            .text(function (d) { return d; })
            .attr("x", function (d, i) {
                return xScale(i) + xScale.bandwidth() / 2;
            })
            .attr("y", function (d) {
                return yAxis;
            })
            .attr("font-family", "sans-serif")
            .attr("font-size", "12px")
            .attr("fill", "white")
            .attr("text-anchor", "middle");

        svg
            .selectAll(".bar")
            .data(newArray)
            .join("rect")
            .attr("class", "bar")
            .style("transform", "scale(1, -1)")
            .attr("x", (value, index) => xScale(index))
            .attr("y", -370)
            .attr("id", (value, index) => {
                return index;
            })
            .attr("width", xScale.bandwidth())
            .attr("stroke-width", (value, index) => {
                if (index === selected) {
                    return 5;
                }
                return 1;
            })
            .attr("stroke", (value, index) => {
                if (index === selected) {
                    return "blue";
                }
                return "black";
            })
            .on("mouseenter", (value, index) => {
                svg
                    .selectAll(".tooltip")
                    .data([value])
                    .join(enter => enter.append("text").attr("y", yScale(value) - 4))
                    .attr("class", "tooltip")
                    .text(value)
                    .attr("x", xScale(index) + xScale.bandwidth() / 2)
                    .attr("text-anchor", "middle")
                    .transition()
                    .attr("y", yScale(value) - 8)
                    .attr("opacity", 1);
            })
            .on("click", this.selectBar
            )
            .on("mouseleave", () => svg.select(".tooltip").remove())
            .attr("fill", (value, index) => {
                if (index == swap1) {
                    return "red"
                }
                if (index == swap2) {

                    return "red"
                } else {
                    return "green"
                }
            })

            .attr("height", value => 370 - yScale(value))
    }
    componentDidMount(){
        this.updateGraph(this.state.newArray, this.state.selected, this.state.swap1, this.state.swap2);
    }
    shouldComponentUpdate(nextProps, nextState){
        if(this.state.type !== nextState.type || 
            this.state.stepCount !== nextState.stepCount || 
            this.state.transitionArray !==  nextState.transitionArray || 
            this.state.selected !== nextState.selected || 
            this.state.open !== nextState.open ||
            this.state.inputError !== nextState.inputError){
                console.log(this.state.selected);
                console.log(nextState.selected);
                return true;
        }
        return false;
    }
    componentDidUpdate(prevProps, prevState){
        if(prevState.type !== this.state.type || prevState.transitionArray !== this.state.transitionArray){
            let arrayBundle;
            switch (this.state.type) {
                case "Bubble":
                    arrayBundle = bubble(this.state.transitionArray.concat());
                    break;
                case "Selection":
                    arrayBundle = selection(this.state.transitionArray.concat());
                    break;
                case "Insertion":
                    arrayBundle = insertion(this.state.transitionArray.concat());
                    console.log(arrayBundle);
                    break;
                case "Heap":
                    arrayBundle = heapSort(this.state.transitionArray.concat());
                    console.log(arrayBundle);
                    break;
                case "Shell":
                    arrayBundle = shellSort(this.state.transitionArray.concat());
                    break;
                case "Quick":
                    arrayBundle = quickSort(this.state.transitionArray.concat());
                    break;
                default:
                    arrayBundle = null;
                    break;
            }
            if (arrayBundle !== null) {
                this.setState({
                    swap1: arrayBundle[0].swappedValue1,
                    swap2: arrayBundle[0].swappedValue2,
                    newArray: arrayBundle[0].data.split(',').map(Number),
                    arraysOfArrays: arrayBundle,
                    selected: -1
                });
            }
    
        }
        this.updateGraph(this.state.newArray, this.state.selected, this.state.swap1, this.state.swap2);
    }
    render(){
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
        return (
            <Header>
                <ThemeProvider theme={theme}>
                    <Modal
                        className={this.classes.modal}
                        open={this.state.open}
                        onClose={this.handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                    >
                        <Fade in={this.state.open}>
                            <div className={this.classes.insertPaper}>
                                <form>
                                    <Grid container direction="column" alignItems="center" justify="center" spacing={2}>
                                        <Grid item>
                                            <h2 >Insert a value between 1 and 100</h2>
                                        </Grid>
                                        <Grid item>
                                            <TextField error={this.state.inputError} label="value" helperText={this.state.inputError ? "Invalid value" : ""} onChange={this.handleChange} />
                                        </Grid>
                                        <Grid item>
                                            <Button variant="contained" color="primary" onClick={this.insertValue}>Insert</Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </div>
                        </Fade>
                    </Modal>
                    <Grid container direction="column">
                        <Grid item></Grid>
                        <Grid item container spacing={1}>
                            <Grid item xs={3}>
                                <Grid container direction="column">
                                    <Paper className={this.classes.buttons}>
                                        <Grid container spacing={0}>
                                            <Grid item xs={4}>
                                                <Button
                                                    variant="contained"
                                                    className={this.classes.button}
                                                    onClick={this.changeAlgorithm}
                                                    color={this.state.type !== "Insertion" ? "primary" : "secondary"}
                                                >
                                                    Insertion
                          </Button>
                                            </Grid>
                                            <Grid item className={this.classes.button} xs={4}>
                                                <Button
                                                    variant="contained"
                                                    onClick={this.changeAlgorithm}
                                                    color={this.state.type !== "Selection" ? "primary" : "secondary"}
                                                    className={this.classes.button}
                                                >
                                                    Selection
                          </Button>
                                            </Grid>
                                            <Grid item item xs={4}>
                                                <Button
                                                    variant="contained"
                                                    className={this.classes.button}
                                                    onClick={this.changeAlgorithm}
                                                    color={this.state.type !== "Quick" ? "primary" : "secondary"}
                                                >
                                                    Quick
                          </Button>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <h1></h1>
                                            </Grid>
                                            <Grid item className={this.classes.button} xs={4}>
                                                <Button
                                                    variant="contained"
                                                    className={this.classes.button}
                                                    onClick={this.changeAlgorithm}
                                                    color={this.state.type !== "Bubble" ? "primary" : "secondary"}
                                                >
                                                    Bubble
                          </Button>
                                            </Grid>
                                            <Grid item item xs={4}>
                                                <Button
                                                    variant="contained"
                                                    className={this.classes.button}
                                                    onClick={this.changeAlgorithm}
                                                    color={this.state.type !== "Heap" ? "primary" : "secondary"}
                                                >
                                                    Heap
                          </Button>
                                            </Grid>
                                            <Grid item className={this.classes.button} xs={4}>
                                                <Button
                                                    variant="contained"
                                                    className={this.classes.button}
                                                    onClick={this.changeAlgorithm}
                                                    color={this.state.type !== "Shell" ? "primary" : "secondary"}
                                                >
                                                    Shell
                          </Button>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <h1></h1>
                                            </Grid>
                                            <Grid item xs={7}>
                                                <Button variant="contained" color="primary" onClick={this.handleOpen}>
                                                    Insert
                          </Button>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Button variant="contained" color="primary" onClick={this.reset}>
                                                    Reset
                          </Button>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>
                                <h2></h2>
                                <Paper className={this.classes.code}>
                                    <h3>CODE</h3>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                                        do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                        Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                        laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                                        irure dolor in reprehenderit in voluptate velit esse cillum
                                        dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                                        cupidatat non proident, sunt in culpa qui officia deserunt
                                        mollit anim id est laborum.
                    </p>
                                </Paper>
                            </Grid>
                            <Grid item xs={9}>
                                <Paper className={this.classes.paper}>
                                    <h1>Sorting: {this.state.type}</h1>
                                    <h1>Step: {this.state.stepCount}</h1>
                                    <svg ref={this.svgRef} >
                                        <g className="x-axis" />
                                        <g className="y-axis" />
                                    </svg>
                                </Paper>
                                <h1></h1>
                                <Grid item xs={12}>
                                    <form noValidate autoComplete="off">
                                        <Paper className={this.classes.fields}>
                                            <Grid container spacing={1}>
                                                <Grid item xs={1}></Grid>
                                                <Grid item xs={3}>
                                                    <Button variant="contained" color="primary" onClick={this.stepBack}>
                                                        Step Back
                            </Button>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <Button variant="contained" color="primary">
                                                        Pause
                            </Button>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <Button variant="contained" color="primary" onClick={this.stepForward}>
                                                        Step Forward
                            </Button>
                                                </Grid>
                                                <Grid item xs={2}></Grid>
                                            </Grid>
                                        </Paper>
                                    </form>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <ButtonBase className={this.classes.trashBtn} onClick={this.removeValue}>
                        <img src={trash} className={this.classes.trashImg} />
                    </ButtonBase>
                </ThemeProvider>
            </Header>
        );
    }
}

export default withStyles(styles)(Sorting);