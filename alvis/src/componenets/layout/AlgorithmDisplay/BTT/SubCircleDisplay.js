import React, {Component} from 'react';
import { Stage, Layer, Rect, Circle, Text, Line, Label, Tag } from 'react-konva';

class SubCircleDisplay extends Component{
    render(){
        return(
            Array.from(this.props.circles.values()).map((circle) => (
                <React.Fragment>
                    <Circle
                        x={circle.x + 20}
                        y={circle.y + 20}
                        id={circle.id}
                        stroke={this.props.selectedRight.id === circle.id ? "red" : "black"}
                        width={circle.width / 5}
                        height={circle.height / 5}
                        hitStrokeWidth={25}
                        onClick={this.props.insertRight}
                    />
                    <Circle
                        x={circle.x - 20}
                        y={circle.y + 20}
                        id={circle.id}
                        stroke={this.props.selectedLeft.id === circle.id ? "red" : "black"}
                        width={circle.width / 5}
                        height={circle.height / 5}
                        hitStrokeWidth={25}
                        onClick={this.props.insertLeft}
                    />
                </React.Fragment>
            ))
        )
    }
}
export default SubCircleDisplay;