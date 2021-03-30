import React, {Component} from 'react';
import { Stage, Layer, Circle, Text, Line, Label, Tag } from 'react-konva';
import CirclesDisplay from './CirclesDisplay';
import LinesDisplay from './LinesDisplay';

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
                    <LinesDisplay
                        lines={this.props.lines}
                        selectNode={this.props.selectNode}
                    />
                </Layer>
            </Stage>
        );
    }
}

export default BTTDisplay;
