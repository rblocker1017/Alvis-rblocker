import React, { useState } from "react";
import clsx from "clsx";
import Header from "../componenets/layout/header";
import { Button, Grid, Paper } from "@material-ui/core";
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import { grey, orange } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "125%",
    width: "100%",
  },
  buttons: {
    backgroundColor: grey[200],
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    width: "100%",
    height: "100%",
  },
  button: {
    width: "90%",
  },
  code: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "115%",
  },
  fields: {
    backgroundColor: grey[200],
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "100%",
  },
}));

export default function Sorting() {
  const classes = useStyles();
  const [type, settype] = useState("Insertion");
  const [flag1, setFlag1] = useState(true);
  const [flag2, setFlag2] = useState(true);
  const [flag3, setFlag3] = useState(true);
  const [flag4, setFlag4] = useState(true);
  const [flag5, setFlag5] = useState(true);
  const [flag6, setFlag6] = useState(true);

  const handleClick1 = () => {
    if (flag1) setFlag1(!flag1);
    setFlag2(true);
    setFlag3(true);
    setFlag4(true);
    setFlag5(true);
    setFlag6(true);
  };

  const handleClick2 = () => {
    if (flag2) setFlag2(!flag2);
    setFlag1(true);
    setFlag3(true);
    setFlag4(true);
    setFlag5(true);
    setFlag6(true);
  };

  const handleClick3 = () => {
    if (flag3) setFlag3(!flag3);
    setFlag1(true);
    setFlag2(true);
    setFlag4(true);
    setFlag5(true);
    setFlag6(true);
  };

  const handleClick4 = () => {
    if (flag4) setFlag4(!flag4);
    setFlag1(true);
    setFlag2(true);
    setFlag3(true);
    setFlag5(true);
    setFlag6(true);
  };

  const handleClick5 = () => {
    if (flag5) setFlag5(!flag5);
    setFlag1(true);
    setFlag2(true);
    setFlag3(true);
    setFlag4(true);
    setFlag6(true);
  };

  const handleClick6 = () => {
    if (flag6) setFlag6(!flag6);
    setFlag1(true);
    setFlag2(true);
    setFlag3(true);
    setFlag4(true);
    setFlag5(true);
  };
  let name = "test";

  const changeIns = () => {settype("Insertion"); handleClick1();}
  const changeSel = () => {settype("Selection"); handleClick2();}
  const changeQui = () => {settype("Quick"); handleClick3();}
  const changeBub = () => {settype("Bubble"); handleClick4();}
  const changeHea = () => {settype("Heap"); handleClick5();}
  const changeShe = () => {settype("Shell"); handleClick6();}

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: grey[900],
      },
      secondary: {
        main: grey[700],
      },
    },
  });
  return (
    <Header>
      <ThemeProvider theme={theme}>
        <Grid container direction="column">
          <Grid item></Grid>
          <Grid item container spacing={1}>
            <Grid item xs={3}>
              <Grid container direction="column">
                <Paper className={classes.buttons}>
                  <Grid container spacing={0}>
                    <Grid item xs={4}>
                      <Button
                        variant="contained"
                        className={classes.button}
                        onClick={changeIns}
                        color={flag1 ? "primary" : "secondary"}
                      >
                        Insertion
                      </Button>
                    </Grid>
                    <Grid item className={classes.button} xs={4}>
                      <Button
                        variant="contained"
                        onClick={changeSel}
                        color={flag2 ? "primary" : "secondary"}
                        className={classes.button}
                      >
                        Selection
                      </Button>
                    </Grid>
                    <Grid item item xs={4}>
                      <Button
                        variant="contained"
                        className={classes.button}
                        onClick={changeQui}
                        color={flag3 ? "primary" : "secondary"}
                      >
                        Quick
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <h1></h1>
                    </Grid>
                    <Grid item className={classes.button} xs={4}>
                      <Button
                        variant="contained"
                        className={classes.button}
                        onClick={changeBub}
                        color={flag4 ? "primary" : "secondary"}
                      >
                        Bubble
                      </Button>
                    </Grid>
                    <Grid item item xs={4}>
                      <Button
                        variant="contained"
                        className={classes.button}
                        onClick={changeHea}
                        color={flag5 ? "primary" : "secondary"}
                      >
                        Heap
                      </Button>
                    </Grid>
                    <Grid item className={classes.button} xs={4}>
                      <Button
                        variant="contained"
                        className={classes.button}
                        onClick={changeShe}
                        color={flag6 ? "primary" : "secondary"}
                      >
                        Shell
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <h1></h1>
                    </Grid>
                    <Grid item xs={7}>
                      <Button variant="contained" color="primary">
                        Insert
                      </Button>
                    </Grid>
                    <Grid item xs={3}>
                      <Button variant="contained" color="primary">
                        Reset
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <h2></h2>
              <Paper className={classes.code}>
                <h3>CODE</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </Paper>
            </Grid>
            <Grid item xs={9}>
              <Paper className={classes.paper}>
                <h1>Sorting: {type}</h1>
              </Paper>
              <h1></h1>
              <Grid item xs={12}>
                <form noValidate autoComplete="off">
                  <Paper className={classes.fields}>
                    <Grid container spacing={1}>
                      <Grid item xs={1}></Grid>
                      <Grid item xs={3}>
                        <Button variant="contained" color="primary">
                          Step Back
                        </Button>
                      </Grid>
                      <Grid item xs={3}>
                        <Button variant="contained" color="primary">
                          Pause
                        </Button>
                      </Grid>
                      <Grid item xs={3}>
                        <Button variant="contained" color="primary">
                          Step Forward
                        </Button>
                      </Grid>
                      <Grid item xs={2}></Grid>
                    </Grid>
                  </Paper>
                </form>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ThemeProvider>
    </Header>
  );
}
