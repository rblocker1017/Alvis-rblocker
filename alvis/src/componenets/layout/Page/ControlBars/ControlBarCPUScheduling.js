import { Grid } from "@material-ui/core";
import React, { Component } from "react";
import Button from "../Button";

class ControlBarCPUScheduling extends Component {
  render() {
    return (
      <Grid item xs={4}>
        <Button text={"Run"} color='primary' onClick={this.props.clickInput}>
          Run
        </Button>
      </Grid>
    );
  }
}
export default ControlBarCPUScheduling;
