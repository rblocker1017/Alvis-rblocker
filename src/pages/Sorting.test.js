import React from 'react';
import Sorting from '../Algorithms/Sorting';
import { bubble, insertion, selection, heapSort, quickSort, shellSort } from "../Algorithms/Sorting";

describe('Sorting', () =>{
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

  it('Selection Sorting', () =>{
    expect(insertion([56,14])).toEqual[{
      data: [56,14],
      swappedValue1: -1,
      swappedValue2: -1}, 
      {data: [14,56], 
      swappedValue1: 0, 
      swappedValue2: -1, 
    }];
  })

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
