import { Paper, withStyles } from "@material-ui/core";
import React, { Component } from "react";
const styles = (theme) => ({
  code: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "100",
  },
});
class Instructions extends Component {
  constructor(props) {
    super(props);
    this.classes = this.props.classes;
    this.instruct = this.props.instruct;
  }
  render() {
    return (
      <Paper className={this.classes.code}>
        <h2>Instructions</h2>
        {this.instruct === undefined
          ? null
          : this.instruct.map((instruction) => {
              return (
                <div>
                  <b>{instruction}</b>
                  <br />
                </div>
              );
            })}
      </Paper>
    );
  }
}
export default withStyles(styles)(Instructions);
