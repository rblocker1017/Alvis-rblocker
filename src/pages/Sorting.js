import React, { useRef, useState, useEffect } from 'react';
import clsx from "clsx";
import Header from "../componenets/layout/header";
import { Button, Grid, Paper, ButtonBase, Modal, Fade, Backdrop, TextField } from "@material-ui/core";
import { makeStyles, ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { grey, green, orange } from "@material-ui/core/colors";
import { select, axisBottom, axisRight, scaleLinear, scaleBand, max } from "d3";
import { Update } from '@material-ui/icons';
import trash from '../trash.png';
import { generateINIT } from './Shapes/SortingGenerator';
import { InsertModal } from "../componenets/Resources/InsertModal";

const SIZE = 6;
const INIT_VALUES = generateINIT(SIZE);
const INIT_ARRAY_BUNDLE = Sort(INIT_VALUES);


// Bubble sort function
// @param a - array of data to be sorted
function Sort(a)
{   
    // declare variables
    let len = a.length-1; 
    let array = a; 
    let answer = [{
        data: array.toString(),
        swappedValue1: -1,
        swappedValue2: -1}];
    let list = [];
    let temp = 0; 
    // repeat the bubble sort for the length of the algorithm
    for (let i = 0; i < len; i++){
        // the actual bubble sort part
        // for every item in the array, float it up through the array
         for(let j = 0; j<len ; j++){
            if(array[j]> array[j+1] ){
                temp = array[j];
                array[j] = array[j+1]; 
                array[j + 1] = temp; 
                // push an object every time a swap happens containing the data (aka the current array to string)
                // as well as the swapped values
                answer.push({data: array.toString(),
                            swappedValue1: j,
                    swappedValue2: j + 1
                });
            }
         }
    }
    return answer;
}

// Insertion Sort fuction
// @param b - array of data to be sorted
function Insertion(b)
{
  // declare variables
  let lenInsert = b.length;
  let arrayInsert = b; 
  // repeat the insertion sort for the length of the algorithm
  for (let i =1; i <lenInsert; i++){
    let currentInsert = arrayInsert[i];
    let j =i;
    //shift larger values to the right
    while (j >0 && arrayInsert[j-1] > 0){
      arrayInsert[j] = arrayInsert[j-1];
      j--
    } 
    arrayInsert[j] =  currentInsert;
  }
  return arrayInsert;
}

// Selection Sort fuction
// @param c - array of data to be sorted
function Selection(c)
{
  //declare variables
  let lenSelect = c.length;
  let arraySelect =c;
  let answer = [{
    data: arraySelect.toString(),
    swappedValue1: -1,
    swappedValue2: -1}];
  let temp =0;
  for(let i = 0; i < c-1; i++){
    let minimum = i;
    for(let j=i+1; j < lenSelect; j++){
      if(arraySelect[j] < arraySelect[minimum]){
        minimum = j;
      }
    }
    if(minimum != i){
      // swaps to elements in an array 
      temp = arraySelect[i];
      arraySelect[i] = arraySelect[minimum];
      arraySelect[minimum] = temp;
      // push an object every time a swap happens containing the data (aka the current array to string)
      // as well as the swapped values
      answer.push({data: arraySelect.toString(),
                  swappedValue1: i,
                  swappedValue2: minimum
      });
    }
  }
  return answer;
}

// Heap Sort fuction
//sets up maximumum of heap
function maximumHeap(d, len, i)
{ 
  let left = i * 2 + 1;
  let right = left + 1;
  let maximum = i;
  if(left < len && d[left]>d[maximum])
  {
    maximum = left;
  }
  if(right < len && d[right] > d[maximum])
  {
    maximum = right;
  }
  if(maximum !== i)
  {
    [d[i],d[maximum]] = [d[maximum], d[i]]; //swaps elements
    maximumHeap(d,len,maximum)
  }
  return d;
}

// @param d - array of data to be sorted
function HeapSort(d)
{
  //declare variables
  let lenHeap = d.length;
  let a = Math.floor(lenHeap/2-1);
  let b = lenHeap - 1;
  while(a >= 0)
  {
    maximumHeap(d,lenHeap,a);
    b --;
  }
  while(b >= 0)
  {
    [d[0], d[b]] = [d[b], d[0]]; //swaps elements
    maximumHeap(d, b, 0);
    b--;
  } 
  return d;
}

// Quick Sort fuction
function partitionQuick(d, left, right)
{
  while (left <= right)
  {
    while(d[left] < d[Math.floor((left + right)/2)])
    {
      left ++;
    }
    while(d[right] > d[Math.floor((left + right)/2)])
    {
      right --;
    }
    if (left <= right)
    {
      [d[left], d[right]] = [d[right] , d[left]]; //swaps elements
      left ++;
      right --;
    }
  }
  return left;
}

// @param e - array of data to be sorted
function Quick(e, left, right)
{
  //declare variable
  let lenQuick = e.length;
  let i = partitionQuick(e, left, right);
  left = left || 0;
  right = right || lenQuick -1;
  if(left < i-1)
  {
    Quick(e, left, i-1);
  }
  if(right > i)
  {
    Quick(e, i, right);
  }
  return e;
}

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
            let lastPart = newArray;
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
        let tempArray = newArray;
        newArray.splice(selected, 1)
        updateArray(newArray.concat());
    }
    const updateArray = (array) => {
        let arrayBundle = Sort(array);
        setSwap1(arrayBundle[0].swappedValue1);
        setSwap2(arrayBundle[0].swappedValue2);
        setNewArray(arrayBundle[0].data.split(',').map(Number));
        setArraysOfArrays(arrayBundle);
        setSelected(-1);
    }

  const handleClick1 = () => {
    if (flag1) setFlag1(!flag1);
    setFlag2(true);
    setFlag3(true);
    setFlag4(true);
    setFlag5(true);
    setFlag6(true);
  };

  const handleClick2 = () => {
    if (flag2) setFlag2(!flag2);
    setFlag1(true);
    setFlag3(true);
    setFlag4(true);
    setFlag5(true);
    setFlag6(true);
  };

  const handleClick3 = () => {
    if (flag3) setFlag3(!flag3);
    setFlag1(true);
    setFlag2(true);
    setFlag4(true);
    setFlag5(true);
    setFlag6(true);
  };

  const handleClick4 = () => {
    if (flag4) setFlag4(!flag4);
    setFlag1(true);
    setFlag2(true);
    setFlag3(true);
    setFlag5(true);
    setFlag6(true);
  };

  const handleClick5 = () => {
    if (flag5) setFlag5(!flag5);
    setFlag1(true);
    setFlag2(true);
    setFlag3(true);
    setFlag4(true);
    setFlag6(true);
  };

  const handleClick6 = () => {
    if (flag6) setFlag6(!flag6);
    setFlag1(true);
    setFlag2(true);
    setFlag3(true);
    setFlag4(true);
    setFlag5(true);
    };

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


    const listCurrent = arraysOfArrays.map((value, index) =>
        <div><p> </p>
            <p>Step :{++index} Array= {value.data}</p>
            <p>Values Swapped: {value.swappedValue1} , {value.swappedValue2} </p>
        </div>
    );

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
        console.log(svgRef.current);
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
    }, [newArray, selected], swap1, swap2, test);

  const changeIns = () => {settype("Insertion"); handleClick1();}
  const changeSel = () => {settype("Selection"); handleClick2();}
  const changeQui = () => {settype("Quick"); handleClick3();}
  const changeBub = () => {settype("Bubble"); handleClick4();}
  const changeHea = () => {settype("Heap"); handleClick5();}
  const changeShe = () => {settype("Shell"); handleClick6();}

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: green[900],
      },
      secondary: {
        main: green[700],
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
                        onClick={changeIns}
                        color={flag1 ? "primary" : "secondary"}
                      >
                        Insertion
                      </Button>
                    </Grid>
                    <Grid item className={classes.button} xs={4}>
                      <Button
                        variant="contained"
                        onClick={changeSel}
                        color={flag2 ? "primary" : "secondary"}
                        className={classes.button}
                      >
                        Selection
                      </Button>
                    </Grid>
                    <Grid item item xs={4}>
                      <Button
                        variant="contained"
                        className={classes.button}
                        onClick={changeQui}
                        color={flag3 ? "primary" : "secondary"}
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
                        onClick={changeBub}
                        color={flag4 ? "primary" : "secondary"}
                      >
                        Bubble
                      </Button>
                    </Grid>
                    <Grid item item xs={4}>
                      <Button
                        variant="contained"
                        className={classes.button}
                        onClick={changeHea}
                        color={flag5 ? "primary" : "secondary"}
                      >
                        Heap
                      </Button>
                    </Grid>
                    <Grid item className={classes.button} xs={4}>
                      <Button
                        variant="contained"
                        className={classes.button}
                        onClick={changeShe}
                        color={flag6 ? "primary" : "secondary"}
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
                                          <Button variant="contained" color="primary" onClick={ reset }>
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
