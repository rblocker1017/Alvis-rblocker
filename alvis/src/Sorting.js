import {
  Backdrop,
  Button,
  Fade,
  Grid,
  Modal,
  TextField,
  withStyles,
} from "@material-ui/core";
import { axisBottom, axisRight, scaleBand, scaleLinear, select } from "d3";
import React, { Component, createRef, Fragment } from "react";
import SortingDisplay from "../componenets/layout/AlgorithmDisplay/Sorting/SortingDisplay";
import MainPage from "../componenets/layout/Page/MainPage";
import {
  bubble,
  heapSort,
  insertion,
  quickSort,
  selection,
  shellSort,
} from "../../src/pages/Algorithms/Sorting";
import { generateINIT } from "./Shapes/SortingGenerator";

//Define size of the bar graph
//Generate initial value and array
const SIZE = 15;
const INIT_VALUES = generateINIT(SIZE);
const INIT_ARRAY_BUNDLE = insertion(INIT_VALUES);

//generate styles for React objects
const styles = (theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

//Sorting Algorithm Component
//displays all of the buttons and displays for the sorting algorithms
export class Sorting extends Component {
  //initialize states and binds local methods
  constructor(props) {
    super(props);
    this.classes = this.props.classes;
    this.svgRef = createRef();
    this.state = {
      type: "Insertion",
      arraysOfArrays: INIT_ARRAY_BUNDLE,
      stepCount: 0,
      swap1: INIT_ARRAY_BUNDLE[0].swappedValue1,
      swap2: INIT_ARRAY_BUNDLE[0].swappedValue2,
      newArray: INIT_ARRAY_BUNDLE[0].data.split(",").map(Number),
      selected: -1,
      open: false,
      inputError: false,
      input: "",
      transitionArray: INIT_ARRAY_BUNDLE[0].data.split(",").map(Number),
    };
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

  /* changeAlgorithm - change the current algorithm
   * @param e - the algorithm being switched to
   */
  changeAlgorithm(e) {
    let currentType = e.target.textContent;
    if (this.state.stepCount !== 0) {
      return;
    }
    //updated type to the new algorithm type
    this.setState({
      type: currentType,
    });
  }

  /* handleChange - handles change in textbox for insert input
   * @param e - the algorithm being switched to
   */
  handleChange(e) {
    //sets state of the input for the insert modal
    this.setState({
      input: e.target.value,
    });
  }

  //handleClose - close the input modal
  handleClose() {
    //clears the states of insert modal related states
    this.setState({
      inputError: false,
      open: false,
    });
  }

  //handleOpen - open the input modal
  handleOpen() {
    //sets open state to true as long as it is not mid algorithm display
    if (this.state.stepCount === 0) {
      this.setState({
        open: true,
      });
    }
  }

  //insertValue - user can insert value from number 1 to 100
  insertValue() {
    const regex = /[^0-9]/g;
    if (
      !regex.test(this.state.input) &&
      this.state.input !== "" &&
      parseInt(this.state.input) > 1 &&
      parseInt(this.state.input) < 100
    ) {
      let lastPart = this.state.transitionArray.concat();
      let firstPart = lastPart.splice(0, this.state.selected + 1);
      this.setState({
        transitionArray: firstPart
          .concat(parseInt(this.state.input))
          .concat(lastPart),
      });
      //clear selected states
      this.handleClose();
    } else {
      //otherwise, update input error state to display input error message
      this.setState({
        inputError: true,
      });
    }
  }

  //removeValue - user can remove bar or graph by clicking it and the trash
  removeValue() {
    let tempArray = this.state.transitionArray;
    tempArray.splice(this.state.selected, 1);
    this.setState({
      transitionArray: tempArray.concat(),
    });
  }

  //reset - resets the sorting
  reset() {
    let tempStep = 0;
    this.setState({
      stepCount: tempStep,
      newArray: this.state.arraysOfArrays[tempStep].data.split(",").map(Number),
      swap1: this.state.arraysOfArrays[tempStep].swappedValue1,
      swap2: this.state.arraysOfArrays[tempStep].swappedValue2,
    });
  }

  /* stepForward - visually steps forward through the sorting
   */
  stepForward() {
    if (this.state.stepCount === 0) {
      this.setState({
        selected: -1,
      });
    }
    if (this.state.stepCount < this.state.arraysOfArrays.length - 1) {
      let tempStep = this.state.stepCount + 1;
      this.setState({
        stepCount: tempStep,
        newArray: this.state.arraysOfArrays[tempStep].data
          .split(",")
          .map(Number),
        swap1: this.state.arraysOfArrays[tempStep].swappedValue1,
        swap2: this.state.arraysOfArrays[tempStep].swappedValue2,
      });
    }
  }

  /* stepBack - visually steps backward through the sorting
   */
  stepBack() {
    // If the step counter is
    if (this.state.stepCount > 0) {
      let tempStep = this.state.stepCount - 1;
      this.setState({
        stepCount: tempStep,
        newArray: this.state.arraysOfArrays[tempStep].data
          .split(",")
          .map(Number),
        swap1: this.state.arraysOfArrays[tempStep].swappedValue1,
        swap2: this.state.arraysOfArrays[tempStep].swappedValue2,
      });
    }
  }

  selectBar(d, i) {
    if (this.state.stepCount === 0) {
      this.setState({
        selected: i,
      });
    }
    /*
        if (this.state.selected === i) {
            this.setState({
                selected: -1
            });
        }*/
  }

  // updateGraph -
  updateGraph(newArray, selected, swap1, swap2) {
    let x = Math.max(...newArray);
    const svg = select(this.svgRef.current);
    const xScale = scaleBand()
      .domain(newArray.map((value, index) => index))
      .range([-200, 300])
      .padding(0.5);

    const yScale = scaleLinear().domain([0, x]).range([370, 5]);

    const colorScale = scaleLinear()
      .domain([75, 100, 150])
      .range(["green", "green", "green"])
      .clamp(true);

    const xAxis = axisBottom(xScale).ticks(newArray.length);

    svg
      .select(".x-axis")
      .style("transform", "translateY(370px)")
      .call(xAxis)
      .attr("font-size", "16px");

    const yAxis = axisRight(yScale);
    svg
      .select(".y-axis")
      .style("transform", "translateX(302px)")
      .call(yAxis)
      .attr("font-size", "13px");

    svg
      .selectAll("text")
      .data(newArray)
      .enter()
      .append("text")
      .text(function (d) {
        return d;
      })
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
      .attr("x", (value, index) => xScale(index)) //set the position in xScale
      .attr("y", -370) //set the position in yScale
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

      //set the color of char or graph when user clicks it
      //index - the char or graph
      //if a char or graph is selected, it is blue color; otherwise it is black color
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
          .join((enter) => enter.append("text").attr("y", yScale(value) - 4))
          .attr("class", "tooltip")
          .text(value)
          .attr("x", xScale(index) + xScale.bandwidth() / 2)
          .attr("text-anchor", "middle")
          .transition()
          .attr("y", yScale(value) - 8)
          .attr("opacity", 1);
      })
      .on("click", this.selectBar)
      .on("mouseleave", () => svg.select(".tooltip").remove())

      //set the color of the bar graph
      //switch the bar graph - if the index is equal swap1 then it is red color
      //if the index is equal swap2 then it is red color; otherwise it is green color
      .attr("fill", (value, index) => {
        if (index == swap1) {
          return "red";
        }
        if (index == swap2) {
          return "red";
        } else {
          return "green";
        }
      })

      //set the height of char or graph
      .attr("height", (value) => 370 - yScale(value));
  }
  componentDidMount() {
    this.updateGraph(
      this.state.newArray,
      this.state.selected,
      this.state.swap1,
      this.state.swap2
    );
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.state.type !== nextState.type ||
      this.state.stepCount !== nextState.stepCount ||
      this.state.transitionArray !== nextState.transitionArray ||
      this.state.selected !== nextState.selected ||
      this.state.open !== nextState.open ||
      this.state.inputError !== nextState.inputError ||
      this.state.transitionArray !== nextState.transitionArray
    ) {
      return true;
    }
    return false;
  }
  componentDidUpdate(prevProps, prevState) {
    console.log("updated");
    if (
      prevState.type !== this.state.type ||
      prevState.transitionArray !== this.state.transitionArray
    ) {
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
          newArray: arrayBundle[0].data.split(",").map(Number),
          arraysOfArrays: arrayBundle,
          selected: -1,
        });
      }
    }
    this.updateGraph(
      this.state.newArray,
      this.state.selected,
      this.state.swap1,
      this.state.swap2
    );
  }

  //render function
  render() {
    return (
      <Fragment>
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
                <Grid
                  container
                  direction='column'
                  alignItems='center'
                  justify='center'
                  spacing={2}
                >
                  <Grid item>
                    <h2>Insert a value between 1 and 100</h2>
                  </Grid>
                  <Grid item>
                    <TextField
                      error={this.state.inputError}
                      label='value'
                      helperText={this.state.inputError ? "Invalid value" : ""}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={this.insertValue}
                    >
                      Insert
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Fade>
        </Modal>
        <MainPage
          algorithms={[
            { name: "Insertion", func: this.changeAlgorithm },
            { name: "Selection", func: this.changeAlgorithm },
            { name: "Quick", func: this.changeAlgorithm },
            { name: "Bubble", func: this.changeAlgorithm },
            { name: "Heap", func: this.changeAlgorithm },
            { name: "Shell", func: this.changeAlgorithm },
          ]}
          display={{
            name: "Sorting Algorithms",
            type: this.state.type,
            step: this.state.stepCount,
            display: <SortingDisplay svgRef={this.svgRef} />,
            delete: this.removeValue,
            insert: this.handleOpen,
            reset: this.reset,
            extra: null,
          }}
          barFunctions={{
            forward: this.stepForward,
            back: this.stepBack,
          }}
        />
      </Fragment>
    );
  }
}

export default withStyles(styles)(Sorting);
