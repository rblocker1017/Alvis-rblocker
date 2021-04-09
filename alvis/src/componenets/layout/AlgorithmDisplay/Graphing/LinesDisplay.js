import React, {Component} from 'react';
import { Stage, Layer, Rect, Circle, Text, Line, Label, Tag } from 'react-konva';
import {pointValues} from './GraphingDisplayHelper';

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
                    <Label
                        x={(line.points[0] + line.points[2]) / 2}
                        y={(line.points[1] + line.points[3]) / 2}
                    >
                        <Tag
                            fill={"white"}
                        />
                        <Text
                            text={line.value}
                            fill="black"
                            fontSize={30}
                        />
                    </Label>
                </React.Fragment>
            ))
        );
    }
}
export default LinesDisplay;