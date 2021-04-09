import React, {Component} from 'react';
import { Stage, Layer, Rect, Circle, Text, Line, Label, Tag } from 'react-konva';

class LinesDisplay extends Component{
    render(){
        return(
            Array.from(this.props.lines.values()).map((line) => (
                <React.Fragment>
                    <Line
                        id={line.id}
                        points={line.points}
                        stroke={line.connected ? "red" : "black"}
                        hitStrokeWidth={25}
                        fill={"black"}
                        onClick={this.props.selectNode}
                    />
                </React.Fragment>
            ))
        );
    }
}
export default LinesDisplay;