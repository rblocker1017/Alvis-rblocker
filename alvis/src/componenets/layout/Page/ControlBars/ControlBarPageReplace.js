import { withStyles } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import React, { Component } from "react";

const styles = (themes) => ({
  formControl: {
    minWidth: 120,
  },
});

class ControlBarPageReplace extends Component {
  constructor(props) {
    super(props);
    this.classes = this.props.classes;
  }
  render() {
    return (
      <Grid container spacing={10}>
        <Grid item>
          <TextField
            id='outlined-size-normal'
            variant='filled'
            label='Reference String'
            onChange={this.props.input}
          />
        </Grid>
        <Grid item>
          <FormControl variant='filled' className={this.classes.formControl}>
            <InputLabel id='demo-simple-select-label'>Frames</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              onChange={this.props.frames}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={7}>7</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    );
  }
}
export default withStyles(styles)(ControlBarPageReplace);
