import React, {Component} from 'react';
import { Stage, Layer, Circle, Text, Line, Label, Tag } from 'react-konva';
import ArrayDisplay from './ArrayDisplay';
import CirclesDisplay from './CirclesDisplay';
import LinesDisplay from './LinesDisplay';
import SubCircleDisplay from './SubCircleDisplay';

// Define width and height of the of the webapp canvas
const WIDTH = 1370;
const HEIGHT = 450;

class BTTDisplay extends Component{
    render(){
        return(
            <Stage width={WIDTH} height={HEIGHT} draggable>
                <Layer>
                    <CirclesDisplay 
                        type={this.props.type}
                        circles={this.props.circles}
                        connecting={this.props.connecting}
                        selectNode={this.props.selectNode}
                        finalConnect={this.props.finalConnect}
                        handleDragStart={this.props.handleDragStart}
                        handleDragEnd={this.props.handleDragEnd}
                        handleMove={this.props.handleMove}
                        clearSelected={this.props.clearSelected}
                    />
                    <SubCircleDisplay 
                        circles = {this.props.circles}
                        insertRight = {this.props.insertRight}
                        insertLeft = {this.props.insertLeft}
                        selectedLeft = {this.props.selectedLeft}
                        selectedRight = {this.props.selectedRight}
                    />
                    <LinesDisplay
                        lines={this.props.lines}
                        selectNode={this.props.selectNode}
                    />
                    <ArrayDisplay 
                        visualArray = {this.props.visualArray}
                    />
                </Layer>
            </Stage>
        );
    }
}

export default BTTDisplay;
