import React, { useRef, useEffect } from "react";
import { select, hierarchy, tree, linkHorizontal } from "d3";
import useResizeObserver from "./resizeObserver";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function TreeChart({ data }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  // we save data to see if it changed
  const previouslyRenderedData = usePrevious(data);

  // will be called initially and on every data change
  useEffect(() => {
    const svg = select(svgRef.current);

    // use dimensions from useResizeObserver,
    // but use getBoundingClientRect on initial render
    // (dimensions are null for the first render)
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect();

    // transform hierarchical data
    const root = hierarchy(data);
    const treeLayout = tree().size([height, width]);

    const linkGenerator = linkHorizontal()
      .x(link => link.y)
      .y(link => link.x);

    // enrich hierarchical data with coordinates
    treeLayout(root);

    console.warn("descendants", root.descendants());
    console.warn("links", root.links());

    // nodes
    svg
      .selectAll(".node")
      .data(root.descendants())
      .join(enter => enter.append("circle").attr("opacity", 0))
      .attr("class", "node")
      .attr("cx", node => node.y)
      .attr("cy", node => node.x)
      .attr("r", 4)
      .transition()
      .duration(500)
      .delay(node => node.depth * 300)
      .attr("opacity", 1);

    // links
    const enteringAndUpdatingLinks = svg
      .selectAll(".link")
      .data(root.links())
      .join("path")
      .attr("class", "link")
      .attr("d", linkGenerator)
      .attr("stroke-dasharray", function() {
        const length = this.getTotalLength();
        return `${length} ${length}`;
      })
      .attr("stroke", "black")
      .attr("fill", "none")
      .attr("opacity", 1);

    if (data !== previouslyRenderedData) {
      enteringAndUpdatingLinks
        .attr("stroke-dashoffset", function() {
          return this.getTotalLength();
        })
        .transition()
        .duration(500)
        .delay(link => link.source.depth * 500)
        .attr("stroke-dashoffset", 0);
    }

    // labels
    svg
      .selectAll(".label")
      .data(root.descendants())
      .join(enter => enter.append("text").attr("opacity", 0))
      .attr("class", "label")
      .attr("x", node => node.y)
      .attr("y", node => node.x - 12)
      .attr("text-anchor", "middle")
      .attr("font-size", 24)
      .text(node => node.data.name)
      .transition()
      .duration(500)
      .delay(node => node.depth * 300)
      .attr("opacity", 1);
  }, [data, dimensions, previouslyRenderedData]);

  return (
    <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
      <svg ref={svgRef}></svg>
    </div>
  );
}


let tree = [

  {
    name: '1',
    children: [
      {
    
        name: '43',
        
        attributes: {
          Visit: "2"
        },children:[{
          name: '57',
          attributes:{
           Visit:  "1"
          }},
          
          {
            name: '79',

          },
          
        ]
      },
      {
        name: '57',
        size: 4000,
        attributes:{
          swapped: "with 43"
        }
      },
    ],
  },
];


function inorder (input)
{
var toReturn = []
input.map(item => {
  
  

  if (item.children === null || item.children === undefined) {
    return toReturn
  }

  var rightNode = item.children[0] 
  var leftNode = item.children[1]

  if (rightNode !== undefined || rightNode !== null) {
    toReturn.concat(inorder([rightNode]))
  }
  
  toReturn.push(item.name)

  if (leftNode !== undefined || leftNode !== null) {
    toReturn.concat(inorder([leftNode]))
  }
})
return toReturn
}



function preorder (input)
{
var toReturn = []
input.map(item => {
  
  

  if (item.children === null || item.children === undefined) {
    return toReturn
  }

  var rightNode = item.children[0] 
  var leftNode = item.children[1]

  toReturn.push(item.name)

  if (rightNode !== undefined || rightNode !== null) {
    toReturn.concat(inorder([rightNode]))
  }
  
  

  if (leftNode !== undefined || leftNode !== null) {
    toReturn.concat(inorder([leftNode]))
  }
})
return toReturn
}


function preorder (input)
{
var toReturn = []
input.map(item => {
  
  

  if (item.children === null || item.children === undefined) {
    return toReturn
  }

  var rightNode = item.children[0] 
  var leftNode = item.children[1]

 

  if (rightNode !== undefined || rightNode !== null) {
    toReturn.concat(inorder([rightNode]))
  }
  
  if (leftNode !== undefined || leftNode !== null) {
    toReturn.concat(inorder([leftNode]))
  }
  
   toReturn.push(item.name)
})
return toReturn
}

export default TreeChart;
