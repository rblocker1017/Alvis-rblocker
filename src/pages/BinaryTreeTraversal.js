import { green, grey } from "@material-ui/core/colors";
import {
    createMuiTheme, withStyles
} from "@material-ui/core/styles";
import React, { Component } from "react";
import BTTDisplay from '../componenets/layout/AlgorithmDisplay/BTT/BTTDisplay';
import MainPage from "../componenets/layout/Page/MainPage";
import { inOrderTraversal, postOrderTraversal, preOrderTraversal } from './Algorithms/BinaryTreeTraversal';
import { createLeft, createRight, generateArray, generateBinaryTree, generateConnectorsBTT, newConnectNodeBTT } from "./Shapes/NodeGenerator";

const WIDTH = 1400;
const HEIGHT = 450;

const INIT = generateBinaryTree(9, WIDTH, HEIGHT);
const CON_GEN = generateConnectorsBTT(INIT);
const CONNECT = CON_GEN[0];
const CURRENT_CON = CON_GEN[1];

class BinaryTreeTraversal extends Component{
    constructor(props){
        super(props);
        this.classes = this.props.classes;
        this.state = {
            type: "",
            num: 0,
            circles: INIT,
            visualArray: [],
            algorithmArray: [],
            lines: CONNECT,
            connection: CURRENT_CON,
            selected: {id:-1},
            selectedRight: {},
            selectedLeft: {},
            fromCon: {},
            idNum: INIT.length
        };
        this.changeAlgo = this.changeAlgo.bind(this);
        this.stepForward = this.stepForward.bind(this);
        this.stepBackward = this.stepBackward.bind(this);
        this.selectCircle = this.selectCircle.bind(this);
        this.deleteBranch = this.deleteBranch.bind(this);
        this.deleteNode = this.deleteNode.bind(this);
        this.insertRight = this.insertRight.bind(this);
        this.insertLeft = this.insertLeft.bind(this);
        this.resetTree = this.resetTree.bind(this);
        this.insertNode = this.insertNode.bind(this);
    }
    changeAlgo(e){
        if(this.state.num === 0){
            this.setState({
                type: e.target.textContent
            });
        }
    }
    stepForward(){
        if (this.state.num < this.state.algorithmArray.length) {
            this.state.algorithmArray[this.state.num].stroke = "red";
            this.state.visualArray[this.state.num].value = this.state.algorithmArray[this.state.num].value;
            this.setState({
                num: this.state.num + 1,
                circles: this.state.circles.map(circle => {
                    if(this.state.algorithmArray[this.state.num].id === circle.id){
                        return {
                            ...circle,
                            stroke: "red"
                        };
                    }
                    return circle;
                }),
                visualArray: this.state.visualArray
            });
        }
    }
    stepBackward(){
        if (this.state.num - 1 < 0) return;
        else {
            //this.state.algorithmArray[this.state.num - 1].stroke = "black";
            this.state.visualArray[this.state.num - 1].value = null;
            this.setState({
                circles: this.state.circles.map(circle => {
                    if(this.state.algorithmArray[this.state.num - 1].id === circle.id){
                        return {
                            ...circle,
                            stroke: "black"
                        };
                    }
                    return circle;
                }),
                visualArray: this.state.visualArray,
                num: this.state.num - 1
            });
        }
    }
    selectCircle(e){
        if (this.state.num !== 0) {
            return null;
        }
        const id = e.target.id();
        // set connecting state to true
        console.log(this.state.selected);
        this.setState({
            selectedLeft: {},
            selectedRight: {},
            selected: this.state.selected.id === e.target.id() ? {id: -1} : this.state.circles.find((circle) => circle.id === e.target.id()),
            circles: this.state.circles.map((circle) => {
                if (circle.id == id) {
                    if (circle.id != this.state.selected.id) {
                        return {
                            ...circle,
                            stroke: "blue",
                            connected: true,
                        };
                    }
                }
                return {
                    ...circle,
                    stroke: "black",
                    connected: false,
                };
            })
        });
    };
    deleteBranch(e){
        const id = this.state.selected.id;
        let tempBundle;
        //console.log(lines);
        if (id != -1 && id != this.state.circles[0].id) {
            let node = this.state.circles.find((circle) => circle.id == id);
            tempBundle = this.deleteNode(node, this.state.circles.filter((circle) => circle.id != id), this.state.lines);
            // ** TODO **
            // disconnect node from the parent
            tempBundle[0] = tempBundle[0].map((circle) => {
                if (circle.leftChild !== null && circle.leftChild === node.id) {
                    return {
                        ...circle,
                        leftChild: null
                    };
                }
                else if (circle.rightChild !== null && circle.rightChild === node.id) {
                    return {
                        ...circle,
                        rightChild: null
                    };
                }
                return circle;
            });
            this.setState({
                circles: tempBundle[0],
                lines: tempBundle[1]
            });
        }
    }
    deleteNode(node, nodeArray, nodeConnections){

        let leftNodeArray = nodeArray;
        let rightNodeArray = nodeArray;
        let resultNodeArray = nodeArray;

        let newConnections = nodeConnections.filter((line) => {
            for (let i = 0; i < line.connections.length; i++) {
                if (line.connections[i] === node.id) {
                    console.log("test");
                    return false;
                }
            }
            return true;
        });
        let leftNodeConnections = newConnections;
        let rightNodeConnections = newConnections;
        //console.log(newConnections);
        if (node.leftChild != null) {
            let leftBundle = this.deleteNode(this.state.circles.find((circle) => node.leftChild === circle.id), nodeArray.filter((circle) => circle.id != node.leftChild), newConnections);
            leftNodeArray = leftBundle[0];
            leftNodeConnections = leftBundle[1];
            //console.log(leftNodeArray);
        }
        if (node.rightChild != null) {
            let rightBundle = this.deleteNode(this.state.circles.find((circle) => node.rightChild === circle.id), nodeArray.filter((circle) => circle.id != node.rightChild), newConnections);
            rightNodeArray = rightBundle[0];
            rightNodeConnections = rightBundle[1];
            //console.log(rightNodeArray);
        }
        resultNodeArray = leftNodeArray.filter((circle) => rightNodeArray.includes(circle));
        newConnections = leftNodeConnections.filter((line) => rightNodeConnections.includes(line));
        console.log(resultNodeArray);
        return [resultNodeArray, newConnections];
    }
    insertRight(e){
        this.resetTree();
        this.setState({
            selected: {id: -1},
            selectedLeft: {},
            selectedRight: this.state.circles.find((circle) => circle.id == e.target.id())
        });
    }

    insertLeft(e){
        this.resetTree();
        this.setState({
            selected: {id: -1},
            selectedRight: {},
            selectedLeft: this.state.circles.find((circle) => circle.id == e.target.id())
        });
    }
    resetTree(){
        this.setState({
            circles: this.state.circles.map((circle) => {
                return{
                    ...circle,
                    stroke: "black"
                };
            }),
            visualArray: this.state.visualArray.map((rect) => {
                return{
                    ...rect,
                    value: null
                }
            }),
            num: 0
        });
    }
    insertNode(e){
        if (Object.keys(this.state.selectedLeft).length !== 0) {
            const child = createLeft(this.state.selectedLeft, this.state.idNum, WIDTH);
            if (child.id === -1) {
                return -1;
            }
            const connectionBundle = newConnectNodeBTT(
                this.state.selectedLeft,
                child,
                this.state.connection,
                true
            );
            this.setState({
                selectedLeft: {},
                lines: this.state.lines.concat(connectionBundle[0]),
                circles: this.state.circles.concat(child),
                idNum: this.state.idNum + 1
            });
        } else if (Object.keys(this.state.selectedRight).length !== 0) {
            const child = createRight(this.state.selectedRight, this.state.idNum, WIDTH);
            if (child.id === -1) {
                return -1;
            }
            const connectionBundle = newConnectNodeBTT(
                this.state.selectedRight,
                child,
                this.state.connection,
                false
            );
            this.setState({
                selectedRight: {},
                lines: this.state.lines.concat(connectionBundle[0]),
                circles: this.state.circles.concat(child),
                idNum: this.state.idNum + 1
            });
        }
    };
    shouldComponentUpdate(nextProps, nextState){
        if(this.state.lines !== nextState.lines ||
            this.state.type !== nextState.type ||
            this.state.circles !== nextState.circles || 
            this.state.num !== nextState.num ||
            this.state.selectedLeft !== nextState.selectedLeft ||
            this.state.selectedRight !== nextState.selectedRight){
                return true;
        }
        return false;
    }
    componentDidUpdate(prevProps, prevState){
        if(prevState.lines !== this.state.lines || prevState.type !== this.state.type){
            let array = [];
            //this.resetTree();
            switch (this.state.type) {
                case "Preorder":
                    preOrderTraversal(this.state.circles[0], array, this.state.circles);
                    break;
                case "Postorder":
                    postOrderTraversal(this.state.circles[0], array, this.state.circles);
                    break;
                case "Inorder":
                    inOrderTraversal(this.state.circles[0], array, this.state.circles);
                    break;
            }
            console.log(array);
            this.setState({
                algorithmArray: array,
                visualArray: generateArray(array.length, WIDTH, HEIGHT)
            });
        }
    }
    render(){
        const theme = createMuiTheme({
            palette: {
                primary: {
                    main: green[900],
                },
                secondary: {
                    main: grey[700],
                },
            },
        });
        return (
            <MainPage
            algorithms={[
                {name: "Preorder",func: this.changeAlgo},
                {name: "Inorder", func: this.changeAlgo},
                {name: "Postorder", func: this.changeAlgo}
            ]}
            display = {{
                name: "Binary Tree Traversal",
                type: this.state.type,
                step: this.state.num,
                display: <BTTDisplay 
                    circles={this.state.circles} 
                    lines={this.state.lines} 
                    type={this.state.type}
                    visualArray = {this.state.visualArray}
                    insertRight = {this.insertRight}
                    insertLeft = {this.insertLeft}
                    selectedRight = {this.state.selectedRight}
                    selectedLeft = {this.state.selectedLeft}
                    connecting={null}
                    selectNode={this.selectCircle}
                    finalConnect={null}
                    handleDragStart={null}
                    handleDragEnd={null}
                    handleMove={null}
                    clearSelected={null}
                />,
                delete: this.deleteBranch,
                insert: this.insertNode,
                reset: this.resetTree,
                extra: null
            }}
            barFunctions = {{
                forward: this.stepForward,
                back: this.stepBackward
            }}
        />
        );
    }
}

export default (BinaryTreeTraversal);