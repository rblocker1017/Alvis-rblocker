import React, { useRef, useState, useEffect } from 'react';
import clsx from "clsx";
import Header from "../componenets/layout/header";
import { Button, Grid, Paper, ButtonBase, Modal, Fade, Backdrop, TextField } from "@material-ui/core";
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

const useStyles = makeStyles((theme) => ({
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
}));


export default function Sorting() {

    const classes = useStyles();
    const [type, settype] = useState("Insertion");
    const [flag1, setFlag1] = useState(true);
    const [flag2, setFlag2] = useState(true);
    const [flag3, setFlag3] = useState(true);
    const [flag4, setFlag4] = useState(true);
    const [flag5, setFlag5] = useState(true);
    const [flag6, setFlag6] = useState(true);

    const [arraysOfArrays, setArraysOfArrays] = useState(INIT_ARRAY_BUNDLE);
    const [checked, setChecked] = useState(false)
    var [stepCount, setStepCount] = useState(0);
    var [stepInfo, setStepInfo] = useState();
    let [swap1, setSwap1] = useState(arraysOfArrays[0].swappedValue1)
    let [swap2, setSwap2] = useState(arraysOfArrays[0].swappedValue2)
    let [newArray, setNewArray] = useState(arraysOfArrays[0].data.split(',').map(Number));
    let [selected, setSelected] = useState(-1);
    const [test, setTest] = useState("tset");
    const [open, setOpen] = useState(false);
    const [inputError, setInputError] = useState(false);
    const [input, setInput] = useState("");
    const [transitionArray, setTransitionArray] = useState(arraysOfArrays[0].data.split(',').map(Number));

    const setCookie = () => {
        const cookies = new Cookies();
        cookies.set('cookie', { username: "David" }, { path: '/' });
        window.location.reload(false);
        //console.log();
    }

    const handleChange = (e) => {
        setInput(e.target.value);
        console.log(e.target.value);
    }

    const handleClose = () => {
        setInputError(false);
        setOpen(false);
    }

    const handleOpen = () => {
        if (stepCount === 0) {
            setOpen(true);
        }
    }

    const insertValue = () => {
        const regex = /[^0-9]/g;
        if (!regex.test(input) && input !== "" && parseInt(input) > 1 && parseInt(input) < 100) {
            let lastPart = transitionArray;
            let firstPart = lastPart.splice(0, selected + 1);
            updateArray(firstPart.concat(parseInt(input)).concat(lastPart));
            handleClose();
        }
        else {
            setInputError(true);
        }
    }

    const removeValue = () => {
        console.log(selected);
        let tempArray = transitionArray;
        transitionArray.splice(selected, 1)
        updateArray(transitionArray.concat());
    }
    const updateArray = (array) => {
        setTransitionArray(array);
    }
    useEffect(() => {
        let arrayBundle;
        switch (type) {
            case "Bubble":
                arrayBundle = bubble(transitionArray.concat());
                break;
            case "Selection":
                arrayBundle = selection(transitionArray.concat());
                break;
            case "Insertion":
                arrayBundle = insertion(transitionArray.concat());
                console.log(arrayBundle);
                break;
            case "Heap":
                arrayBundle = heapSort(transitionArray.concat());
                console.log(arrayBundle);
                break;
            case "Shell":
                arrayBundle = shellSort(transitionArray.concat());
                break;
            case "Quick":
                arrayBundle = quickSort(transitionArray.concat());
                break;
            default:
                arrayBundle = null;
                break;
        }
        if (arrayBundle !== null) {
            setSwap1(arrayBundle[0].swappedValue1);
            setSwap2(arrayBundle[0].swappedValue2);
            setNewArray(arrayBundle[0].data.split(',').map(Number));
            setArraysOfArrays(arrayBundle);
            setSelected(-1);
        }
    }, [type, transitionArray]);

    function reset() {
        let tempStep = 0;
        setStepCount(tempStep);
        setNewArray(arraysOfArrays[tempStep].data.split(',').map(Number))
        setSwap1(arraysOfArrays[tempStep].swappedValue1);
        setSwap2(arraysOfArrays[tempStep].swappedValue2);
        setStepInfo("In step:" + (tempStep) + " We swap index: " + arraysOfArrays[tempStep].swappedValue1 + " and " + arraysOfArrays[tempStep].swappedValue2);
    }

    function stepForward() {
        console.log(INIT_VALUES);
        if (stepCount === 0) {
            setSelected(-1);
        }
        if (stepCount < arraysOfArrays.length - 1) {
            let tempStep = stepCount + 1;
            setStepCount(tempStep);
            setNewArray(arraysOfArrays[tempStep].data.split(',').map(Number))
            setSwap1(arraysOfArrays[tempStep].swappedValue1);
            setSwap2(arraysOfArrays[tempStep].swappedValue2);
        }
    }

    function stepBack() {
        if (stepCount > 0) {
            let tempStep = stepCount - 1;
            setStepCount(tempStep);
            setNewArray(arraysOfArrays[tempStep].data.split(',').map(Number))
            setSwap1(arraysOfArrays[tempStep].swappedValue1);
            setSwap2(arraysOfArrays[tempStep].swappedValue2);
        }
    }
    const svgRef = useRef();

    function selectBar(d, i) {
        if (stepCount === 0) {
            setSelected(i);
        }
        if (selected === i) {
            console.log("test");
            setSelected(-1);
        }
    }

    useEffect(() => {
        let x = Math.max(...newArray)
        const svg = select(svgRef.current);
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
            .on("click", selectBar
            )
            .on("mouseleave", () => svg.select(".tooltip").remove())
            .attr("fill", (value, index) => {
                if (index == swap1) {
                    console.log(test);
                    return "red"
                }
                if (index == swap2) {

                    return "red"
                } else {
                    return "green"
                }
            })

            .attr("height", value => 370 - yScale(value))
    }, [newArray, selected], swap1, swap2);

    const changeAlgorithm = (e) => {
        let currentType = e.target.textContent;
        if (stepCount !== 0) {
            return null;
        }
        settype(currentType);
        console.log(e.target.textContent);
    }

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
                    className={classes.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                >
                    <Fade in={open}>
                        <div className={classes.insertPaper}>
                            <form>
                                <Grid container direction="column" alignItems="center" justify="center" spacing={2}>
                                    <Grid item>
                                        <h2 >Insert a value between 1 and 100</h2>
                                    </Grid>
                                    <Grid item>
                                        <TextField error={inputError} label="value" helperText={inputError ? "Invalid value" : ""} onChange={handleChange} />
                                    </Grid>
                                    <Grid item>
                                        <Button variant="contained" color="primary" onClick={insertValue}>Insert</Button>
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
                                <Paper className={classes.buttons}>
                                    <Grid container spacing={0}>
                                        <Grid item xs={4}>
                                            <Button
                                                variant="contained"
                                                className={classes.button}
                                                onClick={changeAlgorithm}
                                                color={type !== "Insertion" ? "primary" : "secondary"}
                                            >
                                                Insertion
                      </Button>
                                        </Grid>
                                        <Grid item className={classes.button} xs={4}>
                                            <Button
                                                variant="contained"
                                                onClick={changeAlgorithm}
                                                color={type !== "Selection" ? "primary" : "secondary"}
                                                className={classes.button}
                                            >
                                                Selection
                      </Button>
                                        </Grid>
                                        <Grid item item xs={4}>
                                            <Button
                                                variant="contained"
                                                className={classes.button}
                                                onClick={changeAlgorithm}
                                                color={type !== "Quick" ? "primary" : "secondary"}
                                            >
                                                Quick
                      </Button>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <h1></h1>
                                        </Grid>
                                        <Grid item className={classes.button} xs={4}>
                                            <Button
                                                variant="contained"
                                                className={classes.button}
                                                onClick={changeAlgorithm}
                                                color={type !== "Bubble" ? "primary" : "secondary"}
                                            >
                                                Bubble
                      </Button>
                                        </Grid>
                                        <Grid item item xs={4}>
                                            <Button
                                                variant="contained"
                                                className={classes.button}
                                                onClick={changeAlgorithm}
                                                color={type !== "Heap" ? "primary" : "secondary"}
                                            >
                                                Heap
                      </Button>
                                        </Grid>
                                        <Grid item className={classes.button} xs={4}>
                                            <Button
                                                variant="contained"
                                                className={classes.button}
                                                onClick={changeAlgorithm}
                                                color={type !== "Shell" ? "primary" : "secondary"}
                                            >
                                                Shell
                      </Button>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <h1></h1>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <Button variant="contained" color="primary" onClick={handleOpen}>
                                                Insert
                      </Button>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Button variant="contained" color="primary" onClick={reset}>
                                                Reset
                      </Button>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                            <h2></h2>
                            <Paper className={classes.code}>
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
                            <Paper className={classes.paper}>
                                <h1>Sorting: {type}</h1>
                                <h1>Step: {stepCount}</h1>
                                <svg ref={svgRef} >
                                    <g className="x-axis" />
                                    <g className="y-axis" />
                                </svg>
                            </Paper>
                            <h1></h1>
                            <Grid item xs={12}>
                                <form noValidate autoComplete="off">
                                    <Paper className={classes.fields}>
                                        <Grid container spacing={1}>
                                            <Grid item xs={1}></Grid>
                                            <Grid item xs={3}>
                                                <Button variant="contained" color="primary" onClick={stepBack}>
                                                    Step Back
                        </Button>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Button variant="contained" color="primary">
                                                    Pause
                        </Button>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Button variant="contained" color="primary" onClick={stepForward}>
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
                <ButtonBase className={classes.trashBtn} onClick={removeValue}>
                    <img src={trash} className={classes.trashImg} />
                </ButtonBase>
            </ThemeProvider>
        </Header>
    );
}
