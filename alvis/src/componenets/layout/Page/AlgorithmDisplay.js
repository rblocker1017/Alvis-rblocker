import { Paper, withStyles } from "@material-ui/core";
import React, { Component } from "react";

const WIDTH = 1400;
const HEIGHT = 600;

const styles = (theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "100%",
    width: "100%",
  },
});

class AlgorithmDisplay extends Component {
  constructor(props) {
    super(props);
    this.classes = this.props.classes;
  }
  render() {
    return (
      <Paper className={this.classes.paper}>
        <h1>
          {this.props.display.name}: {this.props.display.type}{" "}
        </h1>
        {this.props.display.step !== null ? (
          <h1>Step: {this.props.display.step}</h1>
        ) : null}
        {this.props.display.display}
      </Paper>
    );
  }
}
export default withStyles(styles)(AlgorithmDisplay);
