import React, {Component} from "react";
import { Stage, Layer, Shape, Line, Text, Circle } from 'react-konva';
export default class NAND extends Component{
    render(){
        return(
            <React.Fragment>
                    <Text
                        fontSize={50}
                        text={this.props.firstBit.value}
                        onClick={this.props.firstBit.onClick}
                        x={555}
                        y={125}
                        fill="black"
                    />
                    <Line 
                        points={[585, 150, 685, 150]}
                        stroke={'black'}
                        strokeWidth={5}
                    />
                    <Text
                        fontSize={50}
                        text={this.props.result}
                        x={950}
                        y={125}
                        fill="black"
                    />
                    <Line 
                        points={[875, 150, 925, 150]}
                        stroke={'black'}
                        strokeWidth={5}
                    />
                    <Circle
                        x={885} 
                        y={150}
                        width={15}
                        height={15}
                        fill={'white'}
                        stroke={'black'}
                    />
                    <Shape
                        sceneFunc={(context, shape) => {
                            context.beginPath();
                            context.moveTo(685, 50);
                            context.lineTo(685, 250);
                            context.lineTo(875, 150);
                            //context.quadraticCurveTo(955, 150, 805, 50);
                            context.closePath();
                            // (!) Konva specific method, it is very important
                            context.fillStrokeShape(shape);
                        }}
                        fill={'green'}
                        stroke="black"
                        strokeWidth={4}
                    />
            </React.Fragment>
        );
    }
}