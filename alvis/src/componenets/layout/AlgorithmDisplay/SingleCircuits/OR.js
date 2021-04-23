import React, {Component} from "react";
import { Stage, Layer, Shape, Line, Text } from 'react-konva';
export default class OR extends Component{
    render(){
        return(
            <React.Fragment>
                    <Text
                        fontSize={50}
                        text={this.props.firstBit.value}
                        onClick={this.props.firstBit.onClick}
                        x={555}
                        y={75}
                        fill="black"
                    />
                    <Line 
                        points={[585, 100, 785, 100]}
                        stroke={'black'}
                        strokeWidth={5}
                    />
                    <Text
                        fontSize={50}
                        text={this.props.secondBit.value}
                        onClick={this.props.secondBit.onClick}
                        x={555}
                        y={175}
                        fill="black"
                    />
                    <Line 
                        points={[585, 200, 785, 200]}
                        stroke={'black'}
                        strokeWidth={5}
                    />
                    <Text
                        fontSize={50}
                        text={this.props.result}
                        x={880}
                        y={125}
                        fill="black"
                    />
                    <Line 
                        points={[775, 150, 875, 150]}
                        stroke={'black'}
                        strokeWidth={5}
                    />
                    <Shape
                    sceneFunc={(context, shape) => {
                        context.beginPath();
                        context.moveTo(635, 50);
                        context.quadraticCurveTo(835, 150, 635, 250);
                        context.quadraticCurveTo(1055, 150, 635, 50);
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