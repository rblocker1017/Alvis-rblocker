import { Grid, Paper, withStyles } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import React, { Component } from "react";
import Button from "./Button";

const styles = (theme) => ({
  buttons: {
    backgroundColor: grey[300],
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    width: "100%",
    height: "100%",
  },
});

class AlgoSuite extends Component {
  constructor(props) {
    super(props);
    this.classes = this.props.classes;
    this.algorithms = this.props.algorithms;
  }
  render() {
    return (
      <Paper className={this.classes.buttons}>
        <Grid container direction={"column"} spacing={3}>
          <Grid item container spacing={1} justify={"center"}>
            {this.algorithms.map((currentAlgo) => {
              return (
                <Grid item>
                  <Button
                    color={
                      this.props.type === currentAlgo.name
                        ? "secondary"
                        : "primary"
                    }
                    onClick={currentAlgo.func}
                    text={currentAlgo.name}
                  />
                </Grid>
              );
            })}
          </Grid>
          <Grid item container spacing={1} justify={"center"}>
            {this.props.extra === undefined
              ? null
              : this.props.extra.type === "buttons"
              ? this.props.extra.functions.map((currentAlgo) => {
                  return (
                    <Grid item>
                      <Button
                        color={
                          this.props.extra.selected === currentAlgo.name
                            ? "secondary"
                            : "primary"
                        }
                        onClick={currentAlgo.func}
                        text={currentAlgo.name}
                      />
                    </Grid>
                  );
                })
              : this.props.extra.component}
          </Grid>
          <Grid item container spacing={1} justify={"center"}>
            {this.props.insert !== undefined ? (
              <Grid item onClick={this.props.insert}>
                <Button color={"primary"} text={"Insert"} />
              </Grid>
            ) : null}
            <Grid item onClick={this.props.reset}>
              <Button color={"primary"} text={"Reset"} />
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}
export default withStyles(styles)(AlgoSuite);
