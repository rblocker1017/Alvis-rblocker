import React from 'react';
import {
  kruskalAlgorithm,
  primAlgorithm,
  dijkstrasAlgorithm,
} from "../Algorithms/Graphing";
import sortConnectors from "../Shapes/NodeGenerator";
import GraphingAlgorithm from '../../pages/GraphingAlgorithm';
import { createMount } from '@material-ui/core/test-utils';
import { ThemeProvider } from '@material-ui/core/styles';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter, Route } from "react-router-dom";

configure({ adapter: new Adapter() });

let test1 = new Map();
let test2 = new Map();
for (let i = 0; i < 3; i++) {
  let circle = {
    type: "circle",
    id: test1.size,
    connections: [],
    connect: false,
    start: false,
    end: false,
  };
  if (i === 0) {
    circle = { ...circle, start: true };
    test2.set(circle.id, circle);
  }
  if (i === 2) circle = { ...circle, end: true };
  test1.set(circle.id, circle);
  if (i === 1) {
    circle = { ...circle, end: true };
    test2.set(circle.id, circle);
  }
}

let result = new Map();
let result2 = new Map();
let id0 = JSON.stringify([Number(1), Number(0)].sort());
let id1 = JSON.stringify([Number(2), Number(1)].sort());
let id2 = JSON.stringify([Number(2), Number(0)].sort());

const circle0 = test1.get(0);
const circle1 = test1.get(1);
const circle2 = test1.get(2);

const test2Circle0 = test2.get(0);
const test2Circle1 = test2.get(1);

const newConnection0 = {
  type: "line",
  id: id0,
  connections: [circle1.id, circle0.id],
  value: 10,
  connected: false,
};
const newConnection1 = {
  type: "line",
  id: id1,
  connections: [circle2.id, circle1.id],
  value: 5,
  connected: false,
};
const newConnection2 = {
  type: "line",
  id: id2,
  connections: [circle1.id, circle0.id],
  value: 8,
  connected: false,
};

const test2Connection0 = {
  type: "line",
  id: id0,
  connections: [test2Circle1.id, test2Circle0.id],
  value: 13,
  connected: false,
};

newConnection0.connections.sort(sortConnectors);
newConnection1.connections.sort(sortConnectors);
newConnection2.connections.sort(sortConnectors);

test2Connection0.connections.sort(sortConnectors);

// push connector id to the connecting circles and current connectors
//console.log();
circle1.connections.push(id0);
circle0.connections.push(id0);
test1.set(1, circle1);
test1.set(0, circle0);
result.set(id0, newConnection0);

circle2.connections.push(id1);
circle1.connections.push(id1);
test1.set(2, circle2);
test1.set(1, circle1);
result.set(id1, newConnection1);

circle2.connections.push(id2);
circle0.connections.push(id2);
test1.set(2, circle2);
test1.set(0, circle0);
result.set(id2, newConnection2);

test2Circle1.connections.push(id0);
test2Circle0.connections.push(id0);
test2.set(1, test2Circle1);
test2.set(0, test2Circle0);
result2.set(id0, test2Connection0);

let currentTest = "";

///////////// Prim's Algorithm Tests ///////////////////////////////////

currentTest = "Prim's Algorithm - ";

test(currentTest + "3 Nodes", () => {
  expect(primAlgorithm(0, 2, result)).toEqual(["[0,2]", "[1,2]"]);
});

test(currentTest + "2 Nodes", () => {
    expect(primAlgorithm(0, 1, result2)).toEqual(["[0,1]"]);
  });

test(currentTest + "Empty Graph", () => {
  expect(primAlgorithm(null, null, result)).toEqual([]);
});

///////////// Kruskal's Algorithm Tests ///////////////////////////////////

currentTest = "Kruskal's Algorithm - ";

test(currentTest + "3 Nodes", () => {
  expect(kruskalAlgorithm(null, null, result)).toEqual(["[1,2]", "[0,2]"]);
});

test(currentTest + "2 Nodes", () => {
  expect(kruskalAlgorithm(null, null, result2)).toEqual(["[0,1]"]);
});

test(currentTest + "Empty Graph", () => {
  expect(kruskalAlgorithm(null, null, [])).toEqual([]);
});

///////////// Dijkstra's Algorithm Tests ///////////////////////////////////

currentTest = "Dijkstra's Algorithm - ";

test(currentTest + "3 Nodes", () => {
  expect(dijkstrasAlgorithm(0, 2, result)).toEqual(["[0,2]", "[1,2]"]);
});

test(currentTest + " 2 Nodes", () => {
  expect(dijkstrasAlgorithm(0, 1, result2)).toEqual(["[0,1]"]);
});

test(currentTest + "Empty Graph", () => {
  expect(dijkstrasAlgorithm(null, null, [])).toEqual([]);
});

describe('<DOM Test />', () => {
  let mount;

  function Button() {
    return (
      <BrowserRouter basename={"/"}>
      <ThemeProvider>
      <Route path="/">
      <GraphingAlgorithm />
      </Route>
       
      </ThemeProvider>
      </BrowserRouter>
    );
  }

  beforeEach(() => {
    mount = createMount();
  });

  
afterEach(() => {
    mount.cleanUp();
  });

  it('should work', () => {
    const wrapper = shallow(<Button />);
    expect(wrapper)
  });

  // Prim Button Test
  it('check Prim button',() => {
    const wrapper = shallow(<GraphingAlgorithm />);
    const prim = <button class="MuiButtonBase-root-960 
                                     MuiButton-root-933 
                                     MuiButton-contained-941 
                                     AlgoButton-button-932 
                                     MuiButton-containedSecondary-943" 
                              tabindex="0" type="button">
                        <span class="MuiButton-label-934">Prim</span>
                        <span class="MuiTouchRipple-root-969"></span>
                      </button>
    expect(wrapper.contains(prim)).toEqual(false);
  });

  // Dijkstras Button Test
  it('check Dijkstras button',() => {
    const wrapper = shallow(<GraphingAlgorithm />);
    const dij = <button class="MuiButtonBase-root-960 
                                     MuiButton-root-933 
                                     MuiButton-contained-941 
                                     AlgoButton-button-932 
                                     MuiButton-containedPrimary-942" 
                              tabindex="0" 
                              type="button">
                        <span class="MuiButton-label-934">Dijkstras</span>
                        <span class="MuiTouchRipple-root-969"></span>
                      </button>
    expect(wrapper.contains(dij)).toEqual(false);
  });

  // Kruskal Button Test
  it('check Kruskal button',() => {
    const wrapper = shallow(<GraphingAlgorithm />);
    const kruskal = <button class="MuiButtonBase-root-960 
                                 MuiButton-root-933 
                                 MuiButton-contained-941 
                                 AlgoButton-button-932 
                                 MuiButton-containedPrimary-942" 
                          tabindex="0" 
                          type="button">
                    <span class="MuiButton-label-934">Kruskal</span>
                    <span class="MuiTouchRipple-root-969"></span>
                  </button>
    expect(wrapper.contains(kruskal)).toEqual(false);
  });

  // Insert Button Test
  it('check insert button',() => {
    const wrapper = shallow(<GraphingAlgorithm />);
    const insert = <button class="MuiButtonBase-root-960 
                                  MuiButton-root-933 
                                  MuiButton-contained-941 
                                  AlgoButton-button-932 
                                  MuiButton-containedPrimary-942" 
                            tabindex="0" 
                            type="button">
                      <span class="MuiButton-label-934">Insert</span>
                      <span class="MuiTouchRipple-root-969"></span>
                    </button>
    expect(wrapper.contains(insert)).toEqual(false);
  });

  // Reset Button Test
  it('check reset button',() => {
    const wrapper = shallow(<GraphingAlgorithm />);
    const reset = <button class="MuiButtonBase-root-960 
                                 MuiButton-root-933 
                                 MuiButton-contained-941 
                                 AlgoButton-button-932 
                                 MuiButton-containedPrimary-942" 
                          tabindex="0" 
                          type="button">
                    <span class="MuiButton-label-934">Reset</span>
                    <span class="MuiTouchRipple-root-969"></span>
                  </button>
    expect(wrapper.contains(reset)).toEqual(false);
  });

  //Instruction Test
  it('check instruction test',() =>{
    const wrapper = shallow(<GraphingAlgorithm />);
    const instruct =<h2>Instructions</h2>
    expect(wrapper.contains(instruct)).toEqual(false);
  })

  // StepBack Button Test
  it('check step back button',() => {
    const wrapper = shallow(<GraphingAlgorithm />);
    const stepback = <button class="MuiButtonBase-root-960 
                                    MuiButton-root-933 
                                    MuiButton-contained-941 
                                    AlgoButton-button-932 
                                    MuiButton-containedPrimary-942" 
                              tabindex="0" 
                              type="button">
                        <span class="MuiButton-label-934">Step Back</span>
                        <span class="MuiTouchRipple-root-969"></span></button>
    expect(wrapper.contains(stepback)).toEqual(false);
  });

  // StepForward Button Test
  it('check step forward button',() => {
    const wrapper = shallow(<GraphingAlgorithm />);
    const stepforward = <button class="MuiButtonBase-root-960 
                                    MuiButton-root-933 
                                    MuiButton-contained-941 
                                    AlgoButton-button-932 
                                    MuiButton-containedPrimary-942" 
                              tabindex="0" 
                              type="button">
                        <span class="MuiButton-label-934">Step Back</span>
                        <span class="MuiTouchRipple-root-969"></span></button>
    expect(wrapper.contains(stepforward)).toEqual(false);
  });

  // Set Start Button Test
  it('check step forward button',() => {
    const wrapper = shallow(<GraphingAlgorithm />);
    const setStart = <button class="MuiButtonBase-root-960 
                                    MuiButton-root-933 
                                    MuiButton-contained-941 
                                    AlgoButton-button-932 
                                    MuiButton-containedPrimary-942" 
                              tabindex="0" 
                              type="button">
                        <span class="MuiButton-label-934">Set Start</span>
                        <span class="MuiTouchRipple-root-969"></span>
                      </button>
    expect(wrapper.contains(setStart)).toEqual(false);
  });

  // Set End Button Test
  it('check step forward button',() => {
    const wrapper = shallow(<GraphingAlgorithm />);
    const setEnd = <button class="MuiButtonBase-root-960 
                                    MuiButton-root-933 
                                    MuiButton-contained-941 
                                    AlgoButton-button-932 
                                    MuiButton-containedPrimary-942" 
                              tabindex="0" 
                              type="button">
                        <span class="MuiButton-label-934">Set End</span>
                        <span class="MuiTouchRipple-root-969"></span>
                      </button>
    expect(wrapper.contains(setEnd)).toEqual(false);
  });

});






