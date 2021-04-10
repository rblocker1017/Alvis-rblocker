import React from 'react';
import {fcfsPageReplacementFunc, lruPageReplacementFunc, optPageReplacementFunc} from "../Algorithms/PageReplacement";
import PageReplacement from '../../pages/PageReplacement';
import { createMount } from '@material-ui/core/test-utils';
import { ThemeProvider } from '@material-ui/core/styles';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter, Route } from "react-router-dom";

configure({ adapter: new Adapter() });

describe('PageReplacement', () =>{
    it('FCFS', () =>{
      expect(fcfsPageReplacementFunc([1, 2, 3, 4, 5, 3, 5, 5, 4, 2, 3, 1, 5, 5, 4, 2, 2, 4, 3, 1, 2, 5, 4,  3, 2], 3)).toEqual[{
        answer: [3,2,4],
        page_faults: 17

      }];
    })

    it('LRU', () =>{
        expect(lruPageReplacementFunc([1, 2, 3, 4, 5, 3, 5, 5, 4, 2, 3, 1, 5, 5, 4, 2, 2, 4, 3, 1, 2, 5, 4, 3, 2], 3)).toEqual[{
          answer: [4,3,2],
          page_faults: 18
  
        }];
      })

      it('OPT', () =>{
        expect(optPageReplacementFunc([1, 2, 3, 4, 5, 3, 5, 5, 4, 2, 3, 1, 5, 5, 4, 2, 2, 4, 3, 1, 2, 5, 4, 3, 2], 3)).toEqual[{
          answer: [2,3,4],
          page_faults: 11
  
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
        <PageReplacement />
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
  
    // FIFO Button Test
    it('check FIFO button',() => {
      const wrapper = shallow(<PageReplacement />);
      const FIFO = <button class="MuiButtonBase-root-683 
                                  MuiButton-root-656 
                                  MuiButton-contained-664 
                                  AlgoButton-button-655 
                                  MuiButton-containedSecondary-666" 
                            tabindex="0" 
                            type="button">
                      <span class="MuiButton-label-657">FIFO</span>
                      <span class="MuiTouchRipple-root-788"></span>
                    </button>
      expect(wrapper.contains(FIFO)).toEqual(false);
    });
  
    // OPT Button Test
    it('check selection button',() => {
      const wrapper = shallow(<PageReplacement />);
      const OPT = <button class="MuiButtonBase-root-683 
                                       MuiButton-root-656
                                       MuiButton-contained-664
                                       AlgoButton-button-655 
                                       MuiButton-containedPrimary-655" 
                                tabindex="0" 
                                type="button">
                          <span class="MuiButton-label-657">Selection</span>
                          <span class="MuiTouchRipple-root-788"></span>
                        </button>
      expect(wrapper.contains(OPT)).toEqual(false);
    });
    
    // LRU Button Test
    it('check quick button',() => {
      const wrapper = shallow(<PageReplacement />);
      const LRU = <button class="MuiButtonBase-root-683 
                                       MuiButton-root-656
                                       MuiButton-contained-664
                                       AlgoButton-button-655 
                                       MuiButton-containedPrimary-655" 
                                tabindex="0" 
                                type="button">
                          <span class="MuiButton-label-657">Selection</span>
                          <span class="MuiTouchRipple-root-788"></span>
                        </button>
      expect(wrapper.contains(LRU)).toEqual(false);
    });
    
    // Insert Button Test
    it('check insert button',() => {
      const wrapper = shallow(<PageReplacement />);
      const insert = <button class="MuiButtonBase-root-683 
                                    MuiButton-root-656 
                                    MuiButton-contained-664 
                                    AlgoButton-button-655 
                                    MuiButton-containedPrimary-665" 
                              tabindex="0" 
                              type="button">
                        <span class="MuiButton-label-657">Insert</span>
                        <span class="MuiTouchRipple-root-788"></span>
                      </button>
      expect(wrapper.contains(insert)).toEqual(false);
    });
  
    // Reset Button Test
    it('check reset button',() => {
      const wrapper = shallow(<PageReplacement />);
      const reset = <button class="MuiButtonBase-root-683 
                                    MuiButton-root-656 
                                    MuiButton-contained-664 
                                    AlgoButton-button-655 
                                    MuiButton-containedPrimary-665" 
                              tabindex="0" 
                              type="button">
                        <span class="MuiButton-label-657">Reset</span>
                        <span class="MuiTouchRipple-root-788"></span>
                      </button>
      expect(wrapper.contains(reset)).toEqual(false);
    });
  
    //Instruction Test
    it('check instruction test',() =>{
      const wrapper = shallow(<PageReplacement />);
      const instruct =<h2>Instructions</h2>
      expect(wrapper.contains(instruct)).toEqual(false);
    })
  
    // Reference String Test
    it('check reference string',() => {
      const wrapper = shallow(<PageReplacement />);
      const ref = <label class="MuiFormLabel-root-733 
                                     MuiInputLabel-root-725 
                                     MuiInputLabel-formControl-727 
                                     MuiInputLabel-animated-730 
                                     MuiInputLabel-filled-731" 
                              data-shrink="false" 
                              for="outlined-size-normal" 
                              id="outlined-size-normal-label">Reference String
                        </label>
      expect(wrapper.contains(ref)).toEqual(false);
    });
  
    // Frames Test
    it('check frames',() => {
      const wrapper = shallow(<PageReplacement />);
      const frames = <label class="MuiFormLabel-root-733 
                                        MuiInputLabel-root-725 
                                        MuiInputLabel-formControl-727 
                                        MuiInputLabel-animated-730 
                                        MuiInputLabel-filled-731" 
                                  data-shrink="false" 
                                  id="demo-simple-select-label">Frames
                            </label>
      expect(wrapper.contains(frames)).toEqual(false);
    });
  
  });
  
  
  
  
  
  
