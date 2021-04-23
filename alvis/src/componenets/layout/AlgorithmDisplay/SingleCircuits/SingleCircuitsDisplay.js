import React, { Component } from 'react';
import { Layer, Stage } from 'react-konva';
import AND from './AND';
import NAND from './NAND';
import OR from './OR';
import NOR from './NOR';
import XOR from './XOR';
import XNOR from './XNOR';
import NOT from './NOT';
// Define width and height of the of the webapp canvas
const WIDTH = 1370;
const HEIGHT = 450;

export default class SingleCircuitsDisplay extends Component{
    render() {
        let displayCircuit;
        switch(this.props.type){
            case "AND":
                displayCircuit = (
                    <AND 
                        firstBit = {this.props.firstBit}
                        secondBit = {this.props.secondBit}
                        result = {this.props.result}
                    />
                );
                break;
            case "NAND":
                displayCircuit = (
                    <NAND 
                        firstBit = {this.props.firstBit}
                        secondBit = {this.props.secondBit}
                        result = {this.props.result}
                    />
                );
                break;
            case "OR":
                displayCircuit = (
                    <OR 
                        firstBit = {this.props.firstBit}
                        secondBit = {this.props.secondBit}
                        result = {this.props.result}
                    />
                );
                break;
            case "NOR":
                displayCircuit = (
                    <NOR 
                        firstBit = {this.props.firstBit}
                        secondBit = {this.props.secondBit}
                        result = {this.props.result}
                    />
                );
                break;
            case "XOR":
                displayCircuit = (
                    <XOR 
                        firstBit = {this.props.firstBit}
                        secondBit = {this.props.secondBit}
                        result = {this.props.result}
                    />
                );
                break;
            case "XNOR":
                displayCircuit = (
                    <XNOR 
                        firstBit = {this.props.firstBit}
                        secondBit = {this.props.secondBit}
                        result = {this.props.result}
                    />
                );
                break;
            case "NOT":
                displayCircuit = (
                    <NOT 
                        firstBit = {this.props.firstBit}
                        secondBit = {this.props.secondBit}
                        result = {this.props.result}
                    />
                );
                break;
        }
        return (
            <Stage width={WIDTH} height={HEIGHT}>
                <Layer>
                    {displayCircuit}
                </Layer>
            </Stage>
        );
    }
}