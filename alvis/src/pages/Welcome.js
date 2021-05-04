import { Divider, Grid, Paper } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import React from "react";
import Header from "../componenets/layout/Header/header"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
    height: "100%",
    width: "100%",
  },
  divider: {
    width: "25%",
  },
  body: {
    width: "40%",
  },
}));

export default function Welcome() {
  const classes = useStyles();

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: grey[900],
      },
    },
  });
  return (
    <Header>
      <ThemeProvider theme={theme}>
        <Paper className={classes.paper}>
          <Grid container alignItems={"center"} direction={"column"}>
            <Grid item>
              <h1>ALVIS</h1>
            </Grid>
            <Grid item>
              <h2>Algorithm Visualizer</h2>
            </Grid>
            <Grid item className={classes.divider}>
              <Divider />
            </Grid>
            <Grid item className={classes.divider}>
              <br />
            </Grid>
            <Grid item className={classes.body}>
              <b>
              ALVIS aims to enhance the undergraduate curriculum by using user-controlled animated visualizers. 
              These interactive animations will be for topics taught in Sac State upper-division Computer Science classes. 
              Students will be able to change parameters of the animations to help enhance their understanding of the concepts 
              and make learning them more enjoyable.
              </b>
              <br />
              <br />
              <b>
                For now, the following classes ALVIS supports are:
              </b>
              <br />
              <b>
                * CSC 130
              </b>
              <br />
              <b>
                * CSC 139
              </b>
              <br />
              <b>
                There are plans to implement features/classes such as: 
              </b>
              <br />
              <b>
                * CSC 137 Algorithms
              </b>
              <br />
              <b>
                * Achievement System
              </b>
              <br />
              <b>
                * SSO for both google and sac state
              </b>
            </Grid>
          </Grid>
        </Paper>
      </ThemeProvider>
    </Header>
  );
}
