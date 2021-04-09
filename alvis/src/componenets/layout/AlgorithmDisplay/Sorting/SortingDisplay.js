import React, {Component} from 'react';

// Define width and height of the of the webapp canvas
const WIDTH = 1370;
const HEIGHT = 450;

class SortingDisplay extends Component{
    render(){
        return(
            <div style={{height: "450px", width: "1370px"}}>
                <svg ref={this.props.svgRef} >
                    <g className="x-axis" />
                    <g className="y-axis" />
                </svg>
            </div>
        );
    }
}

export default SortingDisplay;
