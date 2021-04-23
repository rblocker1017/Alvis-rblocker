import { breakList } from "prelude-ls";
import React, { Component } from "react";
import SingleCircuitsDisplay from "../componenets/layout/AlgorithmDisplay/SingleCircuits/SingleCircuitsDisplay";
import MainPage from "../componenets/layout/Page/MainPage";

export default class SingleCircuits extends Component{
    constructor(props){
        super(props);
        this.state = {
            type: "AND",
            firstBit: 0,
            secondBit: 0,
            resultBit: 0
        }
        this.changeType = this.changeType.bind(this);
        this.toggleFirstBit = this.toggleFirstBit.bind(this);
        this.toggleSecondBit = this.toggleSecondBit.bind(this);
        this.updateResult = this.updateResult.bind(this);
    }
    changeType(e) {
        this.setState({
            type: e.target.textContent,
        });
        this.updateResult(e.target.textContent);
    }
    toggleFirstBit(){
        if(this.state.firstBit === 0){
            this.setState({ firstBit: 1 });
        }
        else{
            this.setState({ firstBit: 0 });
        }
        this.updateResult(this.state.type)
    }
    toggleSecondBit(){
        if(this.state.secondBit === 0){
            this.setState({ secondBit: 1 });
        }
        else{
            this.setState({ secondBit: 0 });
        }
        this.updateResult(this.state.type)
    }
    updateResult(type){
        let tempResult;
        switch(type){
            case "AND":
                tempResult = this.state.firstBit & this.state.secondBit;
                break;
            case "NAND":
                tempResult = !(this.state.firstBit & this.state.secondBit) ? 1 : 0;
                break;
            case "OR":
                tempResult = this.state.firstBit | this.state.secondBit;
                break;
            case "NOR":
                tempResult = !(this.state.firstBit | this.state.secondBit) ? 1 : 0;
                break;
            case "XOR":
                tempResult = this.state.firstBit === this.state.secondBit ? 0 : 1;
                break;
            case "XNOR":
                tempResult = this.state.firstBit === this.state.secondBit ? 1 : 0;
                break;
            case "NOT":
                tempResult = !this.state.firstBit ? 1 : 0;
                break;
        }
        console.log(tempResult);
        this.setState({
            resultBit: tempResult
        });
    }
    render(){
        return(
            <MainPage 
                algorithms = {[
                    {name: "AND", func: this.changeType},
                    {name: "NAND", func: this.changeType},
                    {name: "OR", func: this.changeType},
                    {name: "NOR", func: this.changeType},
                    {name: "XOR", func: this.changeType},
                    {name: "XNOR", func: this.changeType},
                    {name: "NOT", func: this.changeType},
                ]}
                display = {{
                    name: "Single Circuits",
                    type: this.state.type,
                    step: null,
                    display: 
                    <SingleCircuitsDisplay 
                        type = {this.state.type}
                        firstBit = {{
                            value: this.state.firstBit,
                            onClick: this.toggleFirstBit
                        }}
                        secondBit = {{
                            value: this.state.secondBit,
                            onClick: this.toggleSecondBit
                        }}
                        result={this.state.resultBit}
                    />,
                }}
            />
        );
    }
}