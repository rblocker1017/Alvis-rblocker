import { Grid, withStyles } from "@material-ui/core";
import { green, grey } from "@material-ui/core/colors";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import React, { Component } from "react";
import Header from "../Header/header";
import AlgorithmDisplay from "./AlgorithmDisplay";
import AlgoSuite from "./AlgorithmSuite";
import Complexity from "./Complexity";
import ControlBar from "./ControlBars/Mainbar";
import Instructions from "./Instructions";
import TrashButton from "./TrashButton";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
});
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

class MainPage extends Component {
  render() {
    console.log(this.props.algorithms);
    return (
      <Header>
        <ThemeProvider theme={theme}>
          <Grid container direction='column'>
            <Grid item container spacing={1}>
              <Grid item container direction='column' spacing={5} xs={3}>
                <Grid item>
                  <AlgoSuite
                    type={this.props.display.type}
                    algorithms={this.props.algorithms}
                    extra={this.props.extraOption}
                    insert={this.props.display.insert}
                    reset={this.props.display.reset}
                  />
                </Grid>
                <Grid item>
                  <Complexity
                    algorithms={this.props.algorithms}
                    type={this.props.display.type}
                  />
                </Grid>
                <Grid item>
                  <Instructions instruct={this.props.instruct} />
                </Grid>
              </Grid>
              {this.props.extraDisplay === undefined ? (
                <Grid item container direction='column' spacing={1} xs={9}>
                  <Grid item>
                    <AlgorithmDisplay display={this.props.display} />
                  </Grid>
                  <Grid item>
                    <ControlBar
                      name={this.props.display.name}
                      barFunctions={this.props.barFunctions}
                    />
                  </Grid>
                </Grid>
              ) : (
                <Grid item container direction='column' spacing={1} xs={6}>
                  <Grid item>
                    <AlgorithmDisplay display={this.props.display} />
                  </Grid>
                  <Grid item>
                    <ControlBar
                      name={this.props.display.name}
                      barFunctions={this.props.barFunctions}
                    />
                  </Grid>
                </Grid>
              )}
              {this.props.extraDisplay === undefined ? null : (
                <Grid item container direction='column' spacing={1} xs={3}>
                  {this.props.extraDisplay}
                </Grid>
              )}
            </Grid>
          </Grid>
          {this.props.display.delete !== null ? (
            <TrashButton onClick={this.props.display.delete} />
          ) : null}
        </ThemeProvider>
      </Header>
    );
  }
}
export default withStyles(styles)(MainPage);
