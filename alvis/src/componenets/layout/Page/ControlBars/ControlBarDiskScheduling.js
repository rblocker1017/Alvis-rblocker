import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import React, { Component } from "react";

class ControlBarDiskScheduling extends Component {
  render() {
    return (
      <form noValidate autoComplete='off'>
        <Grid container>
          <Grid item xs={4}>
            <TextField
              id='outlined-size-normal'
              variant='filled'
              label='Disk Size'
              type='text'
              onChange={this.props.setDiskSize}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              id='outlined-size-normal'
              variant='filled'
              label='Initial Position'
              color='black'
              type='text'
              onChange={this.props.setStarting}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              id='outlined-size-normal'
              variant='filled'
              label='Request Sequence'
              color='black'
              type='text'
              onChange={this.props.setInput}
            />
          </Grid>
          <Grid item xs={12}>
            <h1></h1>
            <Button
              variant='contained'
              color='primary'
              onClick={this.props.renderDiskGraph}
            >
              Run Disk Scheduling
            </Button>
          </Grid>
          <Grid item xs={12}>
            <h1></h1>
            <Button
              variant='contained'
              color='primary'
              onClick={this.props.reset}
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  }
}
export default ControlBarDiskScheduling;
