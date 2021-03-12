import React, { useRef, useEffect, useState } from "react";
import Header from '../componenets/layout/header'
import Button from '@material-ui/core/Button';
import "./d3Sample/D3sampleStyle.css";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { select, axisBottom, axisRight, scaleLinear, scaleBand } from "d3";


export default function BubbleSort(props) {
    // '14 2'.split(' ').map(Number);
    const current = [4, 5, 7, 2, 6, 12, 8]
    const arraysOfArrays = bubble_Sort(current)
    var [stepCount, setStepCount] = useState(0);
    var [stepInfo, setStepInfo] = useState();
    let [data, setData] = useState(arraysOfArrays[0].data.split(',').map(Number))
    let [swap1, setswap1] = useState(arraysOfArrays[0].swappedValue1)
    let [swap2, setswap2] = useState(arraysOfArrays[0].swappedValue2)

    function nextStep() {

        if (stepCount < arraysOfArrays.length - 1) {
            setStepCount(stepCount + 1);
            console.log("StepCount in Next: " + stepCount)
            setData(arraysOfArrays[stepCount].data.split(',').map(Number))
            setswap1(arraysOfArrays[stepCount].swappedValue1);
            setswap2(arraysOfArrays[stepCount].swappedValue2);
            setStepInfo("In step:" + (stepCount) + " We swap index: " + arraysOfArrays[stepCount].swappedValue1 + " and " + arraysOfArrays[stepCount].swappedValue2);
        }


    }
    function prevStep() {

        if (stepCount > 1) {
            setStepCount(stepCount - 1);
            console.log("StepCount in Prev: " + stepCount)
            setData(arraysOfArrays[stepCount].data.split(',').map(Number))
            setswap1(arraysOfArrays[stepCount].swappedValue1);
            setswap2(arraysOfArrays[stepCount].swappedValue2);
            setStepInfo("In step:" + (stepCount) + " We swap index: " + arraysOfArrays[stepCount].swappedValue1 + " and " + arraysOfArrays[stepCount].swappedValue2);
        }


    }
    const svgRef = useRef();


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
            .domain([0, x])
            .range([150, 0]);

        const colorScale = scaleLinear()
            .domain([75, 100, 150])
            .range(["green", "green", "green"])
            .clamp(true);

        const xAxis = axisBottom(xScale).ticks(data.length);

        svg
            .select(".x-axis")
            .style("transform", "translateY(150px)")
            .call(xAxis).attr("font-size", "15px");

        const yAxis = axisRight(yScale);
        svg
            .select(".y-axis")
            .style("transform", "translateX(303px)")
            .call(yAxis)
            .attr("font-size", "13px");

        svg.selectAll("text")
            .data(data)
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
                if (index == swap1) {
                    return "red"
                }
                if (index == swap2) {

                    return "red"
                } else {
                    return "green"
                }


            })
            .attr("height", value => 150 - yScale(value));



    }, [data], swap1, swap2);


    return (
        <div>

            <Header>
                <Paper>
                    <Grid container spacing={3}>
                        <Grid item xs={12}><h2> Bubble Sort Visualization</h2>
                            <h3 >{stepInfo}</h3>
                            <svg ref={svgRef} >
                                <g className="x-axis" />
                                <g className="y-axis" />
                            </svg>
                            <p></p>
                        </Grid>
                        <Grid item xs={6}>
                            <Button variant="contained" color="primary" onClick={prevStep} >
                                Previous Step
                </Button>
                        </Grid>

                        <Grid item xs={6}>
                            <Button variant="contained" color="primary" onClick={nextStep}>Next Step</Button>
                        </Grid>
                    </Grid>
                </Paper>


            </Header>


        </div>
    )

}


function bubble_Sort(a) {
    let len = a.length - 1;
    let array = a;
    let answer = [];
    let list = [];
    let temp = 0;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
            if (array[j] > array[j + 1]) {
                temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
                answer.push({
                    data: array.toString(),
                    swappedValue1: j,
                    swappedValue2: j + 1

                });
            }
        }
    }
    return answer;
}
