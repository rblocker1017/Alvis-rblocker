import React, {Component} from 'react';
import { Grid, Paper, withStyles } from "@material-ui/core";
import Button from "../Button";

class ControlBarCPUScheduling extends Component{
    render(){
        return(
            <Grid item xs={4}>
                <Button text={"Run"} color="primary" onClick={this.props.clickInput}>
                    Run
                </Button>
            </Grid>
        );
    }
}
export default ControlBarCPUScheduling;