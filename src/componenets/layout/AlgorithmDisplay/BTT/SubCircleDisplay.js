import React, {Component} from 'react';
import { Stage, Layer, Rect, Circle, Text, Line, Label, Tag } from 'react-konva';

class SubCircleDisplay extends Component{
    render(){
        console.log(this.props.circles);
        return(
            Array.from(this.props.circles.values()).map((circle) => (
                <React.Fragment>
                    <Circle
                        x={circle.x + 40}
                        y={circle.y + 40}
                        id={circle.id}
                        stroke={"black"}
                        width={circle.width / 10}
                        height={circle.height / 10}
                    />
                    <Circle
                        x={circle.x - 40}
                        y={circle.y + 40}
                        id={circle.id}
                        stroke={"black"}
                        width={circle.width / 10}
                        height={circle.height / 10}
                    />
                </React.Fragment>
            ))
        )
    }
}
export default SubCircleDisplay;