//sorting

import React, { useRef, useState, useEffect } from 'react';
import clsx from "clsx";
import Header from "../componenets/layout/header";
import { Button, Grid, Paper } from "@material-ui/core";
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import { grey, orange } from "@material-ui/core/colors";
import { select, axisBottom, axisRight, scaleLinear, scaleBand } from "d3";


const current = [4,5,7,2,6,12,8]
const arraysOfArrays = Sort(current)
var [stepCount, setStepCount] = useState(0);
var [stepInfo, setStepInfo] = useState();
let [data, setData] = useState(arraysOfArrays[0].data.split(',').map(Number))
let [swap1, setswap1] = useState(arraysOfArrays[0].swappedValue1)
let [swap2, setswap2] = useState(arraysOfArrays[0].swappedValue2)
const svgRef = useRef();

function Sort(a)
{   
    let len = a.length-1; 
    let array = a; 
    let answer = [];
    let list = [];
    let temp =0; 
    for(let i =0; i<len ; i++){
         
         for(let j = 0; j<len ; j++){
            
            if(array[j]> array[j+1] ){
                temp = array[j];
                array[j] = array[j+1]; 
                array[j+1] = temp; 
                answer.push({data: array.toString(),
                            swappedValue1: j,
                            swappedValue2: j+1
                
                });
            }
         }
    }
    return answer;

   
}

function stepForward(){
      
  if(stepCount<arraysOfArrays.length-1)
  {
  setStepCount(stepCount+1);
  console.log("StepCount in Next: "+stepCount)
  setData(arraysOfArrays[stepCount].data.split(',').map(Number))
  setswap1(arraysOfArrays[stepCount].swappedValue1);
  setswap2(arraysOfArrays[stepCount].swappedValue2);
  setStepInfo("In step:"+ (stepCount) +" We swap index: "+arraysOfArrays[stepCount].swappedValue1 + " and "+ arraysOfArrays[stepCount].swappedValue2);}
}

function stepBack(){
      
  if(stepCount>1)
  {
  setStepCount(stepCount-1);
  console.log("StepCount in Prev: "+stepCount)
  setData(arraysOfArrays[stepCount].data.split(',').map(Number))
  setswap1(arraysOfArrays[stepCount].swappedValue1);
  setswap2(arraysOfArrays[stepCount].swappedValue2);
  setStepInfo("In step:"+ (stepCount) +" We swap index: "+arraysOfArrays[stepCount].swappedValue1 + " and "+ arraysOfArrays[stepCount].swappedValue2);}
}


const listCurrent = arraysOfArrays.map((value, index) =>
<div><p> </p>
<p>Step :{++index} Array= {value.data}</p>
<p>Values Swapped: {value.swappedValue1} , {value.swappedValue2} </p>

</div>
);

useEffect(() => {
  let x = Math.max(...data)
  const svg = select(svgRef.current);
  const xScale = scaleBand()
    .domain(data.map((value, index) => index))
    .range([0, 300])
    .padding(0.5);


  

  const yScale = scaleLinear()
    .domain([0, x ])
    .range([150, 0]);

  const colorScale = scaleLinear()
    .domain([75, 100, 150])
    .range(["green", "green", "green"])
    .clamp(true);

  const xAxis = axisBottom(xScale).ticks(data.length);

  svg
    .select(".x-axis")
    .style("transform", "translateY(150px)")
    .call(xAxis).attr("font-size" , "15px");

  const yAxis = axisRight(yScale);
  svg
    .select(".y-axis")
    .style("transform", "translateX(303px)")
    .call(yAxis)
    .attr("font-size" , "13px");
  
     svg.selectAll("text")
           .data(data)
           .enter()
           .append("text")
           .text(function(d) { return d; })
           .attr("x", function(d,i){
              return xScale(i) + xScale.bandwidth() / 2;
           })
           .attr("y", function(d){
              return yAxis ;
           })
           .attr("font-family" , "sans-serif")
           .attr("font-size" , "12px")
           .attr("fill" , "white")
          .attr("text-anchor", "middle");

  svg
    .selectAll(".bar")
    .data(data)
    .join("rect")
    .attr("class", "bar")
    .style("transform", "scale(1, -1)")
    .attr("x", (value, index) => xScale(index))

    .attr("y", -150)
    .attr("width", xScale.bandwidth())
           
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
    .on("mouseleave", () => svg.select(".tooltip").remove())

    .attr("fill", (value, index) => {
      if(index == swap1  ){
        return "red"
      }
      if(index==swap2) {
      
        return "red"
      }else{
        return "green"
      }
      

    })
    .attr("height", value => 150 - yScale(value));

}, [data], swap1, swap2);

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
  let name = "test";

  const changeIns = () => {settype("Insertion"); handleClick1();}
  const changeSel = () => {settype("Selection"); handleClick2();}
  const changeQui = () => {settype("Quick"); handleClick3();}
  const changeBub = () => {settype("Bubble"); handleClick4();}
  const changeHea = () => {settype("Heap"); handleClick5();}
  const changeShe = () => {settype("Shell"); handleClick6();}

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: grey[900],
      },
      secondary: {
        main: grey[700],
      },
    },
  });
  return (
    <Header>
      <ThemeProvider theme={theme}>
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
                      <Button variant="contained" color="primary">
                        Insert
                      </Button>
                    </Grid>
                    <Grid item xs={3}>
                      <Button variant="contained" color="primary">
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
      </ThemeProvider>
    </Header>
  );
}
