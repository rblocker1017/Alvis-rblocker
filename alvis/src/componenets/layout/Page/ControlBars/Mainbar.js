import { Grid, Paper, withStyles } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import React, { Component } from "react";
import ControlBarCPUScheduling from "./ControlBarCPUScheduling";
import ControlBarDiskScheduling from "./ControlBarDiskScheduling";
import ControlBarPageReplace from "./ControlBarPageReplace";
import ControlBarStartEnd from "./ControlBarStartEnd";
import ControlBarStep from "./ControlBarStep";
const styles = (theme) => ({
    fields: {
        backgroundColor: grey[300],
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
        height: "100%",
    }
});
class Mainbar extends Component{
    constructor(props){
        super(props);
        this.classes = this.props.classes
        this.bar = []
        switch(this.props.name){
            case "CPU Scheduling":
                this.bar.push(<ControlBarCPUScheduling 
                    clickInput={this.props.barFunctions.clickInput}
                />);
                break;
            case "Page Replacement":
                this.bar.push(<ControlBarPageReplace 
                    frames={this.props.barFunctions.frames}
                    input={this.props.barFunctions.input}
                />);
                break;
            case "Disk Scheduling":
                this.bar.push(<ControlBarDiskScheduling 
                    setDiskSize = {this.props.barFunctions.setDiskSize}
                    setStarting = {this.props.barFunctions.setStarting}
                    setInput = {this.props.barFunctions.setInput}
                    renderDiskGraph = {this.props.barFunctions.renderDiskGraph}
                />);
                break;
            case "Graphing Algorithms":
                this.bar.push(<ControlBarStep 
                    forward={this.props.barFunctions.forward} 
                    back={this.props.barFunctions.back}
                />);
                this.bar.push(<ControlBarStartEnd 
                    start={this.props.barFunctions.start}
                    end={this.props.barFunctions.end}
                />);
                break;
            case "Binary Tree Traversal":
            case "Sorting Algorithms":
                this.bar.push(<ControlBarStep 
                    forward = {this.props.barFunctions.forward}
                    back = {this.props.barFunctions.back}
                />);
                break;
            default:
                this.bar = null;
                //this.bar.push(<h1>Un-Implemented Bar</h1>);
                break;
        }
    }
    render(){
        return(
            this.bar === null ? null :
                <Paper className={this.classes.fields}>
                    <Grid container direction="row" justify="space-around">
                        {this.bar.map(item => {
                            return (
                                <Grid item>
                                    {item}
                                </Grid>
                            )
                        })}
                    </Grid>
                </Paper>
        );
    }
}
export default withStyles(styles)(Mainbar);
