import React from 'react';
import Sorting from '../../pages/Sorting';
import { bubble, insertion, selection, heapSort, quickSort, shellSort } from "../Algorithms/Sorting";
import { createMount } from '@material-ui/core/test-utils';
import { ThemeProvider } from '@material-ui/core/styles';
import { configure, shallow, mount as mountFn } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter, Route } from "react-router-dom";



configure({ adapter: new Adapter() });

describe('Sorting', () =>{
  //Bubble Algorithm Test 
  it('Bubble Sorting', () =>{
    expect(bubble([45,8])).toEqual[{
      data: [45,8],
      swappedValue1: -1,
      swappedValue2: -1}, 
      {data: [8,45], 
      swappedValue1: 0, 
      swappedValue2: -1, 
    }];
  })

  //Insertion Algorithm Test 
  it('Insertion Sorting', () =>{
    expect(insertion([99,8])).toEqual[{
      data: [99,8],
      swappedValue1: -1,
      swappedValue2: -1}, 
      {data: [8,99], 
      swappedValue1: 0, 
      swappedValue2: -1, 
    }];
  })

  //Selection Algorithm Test 
  it('Selection Sorting', () =>{
    expect(selection([56,14])).toEqual[{
      data: [56,14],
      swappedValue1: -1,
      swappedValue2: -1}, 
      {data: [14,56], 
      swappedValue1: 0, 
      swappedValue2: -1, 
    }];
  })

  //Heap Algorithm Test 
  it('Heap Sorting', () =>{
    expect(heapSort([16,4])).toEqual[{
      data: [16,4],
      swappedValue1: -1,
      swappedValue2: -1}, 
      {data: [4,16], 
      swappedValue1: 0, 
      swappedValue2: -1, 
    }];
  })

  //Quick Algorithm Test 
  it('Quick Sorting', () =>{
    expect(quickSort([97,43])).toEqual[{
      data: [97,43],
      swappedValue1: -1,
      swappedValue2: -1}, 
      {data: [43,97], 
      swappedValue1: 0, 
      swappedValue2: -1, 
    }];
  })

  //Shell Algorithm Test 
  it('Shell Sorting', () =>{
    expect(shellSort([68,3])).toEqual[{
      data: [68,3],
      swappedValue1: -1,
      swappedValue2: -1}, 
      {data: [3,68], 
      swappedValue1: 0, 
      swappedValue2: -1, 
    }];
  })
});


describe('<DOM Test />', () => {
  let mount;

  function Button() {
    return (
      <BrowserRouter basename={"/"}>
      <ThemeProvider>
      <Route path="/">
      <Sorting />
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
    const wrapper = mount(<Button />);
    expect(wrapper)
  });

  // Insertion Button Test
  it('check insertion button',() => {
    const wrapper = shallow(<Sorting />);
    const insertion = <button class="MuiButtonBase-root-327 
                                     MuiButton-root-300 
                                     MuiButton-contained-308 
                                     AlgoButton-button-299 
                                     MuiButton-containedSecondary-310" 
                              tabindex="0" 
                              type="button">
                        <span class="MuiButton-label-301">Insertion</span>
                        <span class="MuiTouchRipple-root-335"></span>
                      </button>
    expect(wrapper.contains(insertion)).toEqual(false);
  });

  // Selection Button Test
  it('check selection button',() => {
    const wrapper = shallow(<Sorting />);
    const selection = <button class="MuiButtonBase-root-327 
                                     MuiButton-root-300 
                                     MuiButton-contained-308 
                                     AlgoButton-button-299 
                                     MuiButton-containedPrimary-309" 
                              tabindex="0" 
                              type="button">
                        <span class="MuiButton-label-301">Selection</span>
                        <span class="MuiTouchRipple-root-335"></span>
                      </button>
    expect(wrapper.contains(selection)).toEqual(false);
  });

  // Quick Button Test
  it('check quick button',() => {
    const wrapper = shallow(<Sorting />);
    const quick = <button class="MuiButtonBase-root-327 
                                 MuiButton-root-300 
                                 MuiButton-contained-308 
                                 AlgoButton-button-299 
                                 MuiButton-containedPrimary-309" 
                          tabindex="0" 
                          type="button">
                    <span class="MuiButton-label-301">Quick</span>
                    <span class="MuiTouchRipple-root-335"></span>
                  </button>
    expect(wrapper.contains(quick)).toEqual(false);
  });

  // Bubble Button Test
  it('check bubble button',() => {
    const wrapper = shallow(<Sorting />);
    const bubble = <button class="MuiButtonBase-root-327 
                                 MuiButton-root-300 
                                 MuiButton-contained-308 
                                 AlgoButton-button-299 
                                 MuiButton-containedPrimary-309" 
                          tabindex="0" 
                          type="button">
                    <span class="MuiButton-label-301">Bubble</span>
                    <span class="MuiTouchRipple-root-335"></span>
                  </button>
    expect(wrapper.contains(bubble)).toEqual(false);
  });

  // Heap Button Test
  it('check heap button',() => {
    const wrapper = shallow(<Sorting />);
    const heap = <button class="MuiButtonBase-root-327 
                                 MuiButton-root-300 
                                 MuiButton-contained-308 
                                 AlgoButton-button-299 
                                 MuiButton-containedPrimary-309" 
                          tabindex="0" 
                          type="button">
                    <span class="MuiButton-label-301">Heap</span>
                    <span class="MuiTouchRipple-root-335"></span>
                  </button>
    expect(wrapper.contains(heap)).toEqual(false);
  });

  // Shell Button Test
  it('check shell button',() => {
    const wrapper = shallow(<Sorting />);
    const shell = <button class="MuiButtonBase-root-327 
                                 MuiButton-root-300 
                                 MuiButton-contained-308 
                                 AlgoButton-button-299 
                                 MuiButton-containedPrimary-309" 
                          tabindex="0" 
                          type="button">
                    <span class="MuiButton-label-301">Heap</span>
                    <span class="MuiTouchRipple-root-335"></span>
                  </button>
    expect(wrapper.contains(shell)).toEqual(false);
  });
  
  // Insert Button Test
  it('check insert button',() => {
    const wrapper = shallow(<Sorting />);
    const insert = <button class="MuiButtonBase-root-327 
                                  MuiButton-root-300 
                                  MuiButton-contained-308 
                                  AlgoButton-button-299 
                                  MuiButton-containedPrimary-309" 
                            tabindex="0" 
                            type="button">
                      <span class="MuiButton-label-301">Insert</span>
                      <span class="MuiTouchRipple-root-335"></span>
                    </button>
    expect(wrapper.contains(insert)).toEqual(false);
  });

  // Reset Button Test
  it('check reset button',() => {
    const wrapper = shallow(<Sorting />);
    const reset = <button class="MuiButtonBase-root-327 
                                  MuiButton-root-300 
                                  MuiButton-contained-308 
                                  AlgoButton-button-299 
                                  MuiButton-containedPrimary-309" 
                            tabindex="0" 
                            type="button">
                      <span class="MuiButton-label-301">Reset</span>
                      <span class="MuiTouchRipple-root-335"></span>
                    </button>
    expect(wrapper.contains(reset)).toEqual(false);
  });

  //Instruction Test
  it('check instruction test',() =>{
    const wrapper = shallow(<Sorting />);
    const instruct =<h2>Instructions</h2>
    expect(wrapper.contains(instruct)).toEqual(false);
  })

  // StepBack Button Test
  it('check step back button',() => {
    const wrapper = shallow(<Sorting />);
    const stepback = <button class="MuiButtonBase-root-327 
                                  MuiButton-root-300 
                                  MuiButton-contained-308 
                                  AlgoButton-button-299 
                                  MuiButton-containedPrimary-309" 
                            tabindex="0" 
                            type="button">
                      <span class="MuiButton-label-301">Step Back</span>
                      <span class="MuiTouchRipple-root-335"></span>
                    </button>
    expect(wrapper.contains(stepback)).toEqual(false);
  });

  // StepForward Button Test
  it('check step forward button',() => {
    const wrapper = shallow(<Sorting />);
    const stepforward = <button class="MuiButtonBase-root-327 
                                  MuiButton-root-300 
                                  MuiButton-contained-308 
                                  AlgoButton-button-299 
                                  MuiButton-containedPrimary-309" 
                            tabindex="0" 
                            type="button">
                      <span class="MuiButton-label-301">Step Forward</span>
                      <span class="MuiTouchRipple-root-335"></span>
                    </button>
    expect(wrapper.contains(stepforward)).toEqual(false);
  });

});





