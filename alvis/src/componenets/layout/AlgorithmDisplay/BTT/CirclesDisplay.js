import React, {Component} from 'react';
import { Stage, Layer, Rect, Circle, Text, Line, Label, Tag } from 'react-konva';

class CirclesDisplay extends Component{
    render(){
        return(
                Array.from(this.props.circles.values()).map((circle) => (
                    <React.Fragment>
                        <Circle
                            key={circle.id}
                            id={circle.id}
                            x={circle.x} 
                            y={circle.y}
                            width={circle.width}
                            height={circle.height}
                            fill={'green'}
                            opacity={0.8}
                            stroke={circle.connected ? 'blue' : circle.stroke}
                            shadowColor="black"
                            shadowBlur={10}
                            shadowOpacity={0.6}
                            onClick={this.props.selectNode}
                        />
                        <Text
                            fontSize={20}
                            text={circle.value}
                            x={circle.x - 5}
                            y={circle.y - 7}
                            fill="white"
                        />
                    </React.Fragment>
                ))
        );
    }
}
export default CirclesDisplay;