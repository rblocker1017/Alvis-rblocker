import { Grid, withStyles } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import React, { Component } from "react";
import Button from "../Button";

const styles = (theme) => ({
  fields: {
    backgroundColor: grey[300],
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "100%",
  },
});
class ControlBar extends Component {
  constructor(props) {
    super(props);
    this.classes = this.props.classes;
  }
  render() {
    return (
      <Grid container item spacing={10} justify='center'>
        <Grid item>
          <Button
            onClick={this.props.back}
            color={"primary"}
            text='Step Back'
          />
        </Grid>
        <Grid item>
          <Button
            onClick={this.props.forward}
            color={"primary"}
            text='Step Forward'
          />
        </Grid>
      </Grid>
    );
  }
}
export default withStyles(styles)(ControlBar);
