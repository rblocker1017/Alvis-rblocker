import {fcfsPageReplacementFunc, lruPageReplacementFunc, optPageReplacementFunc} from "../Algorithms/PageReplacement";

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
