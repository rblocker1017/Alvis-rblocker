import React, { useState } from "react";
import { Button, Grid, Box, Paper, Typography, Divider, ButtonBase, TextField, FormControlLabel, Checkbox } from "@material-ui/core";
import { makeStyles, ThemeProvider, useTheme, createMuiTheme } from "@material-ui/core/styles";
import LinkRoute from "react-router-dom/Link";
import Axios from "axios";
import { green } from "@material-ui/core/colors";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  back: {
    backgroundColor: "#215E25",
    color: "#FFFFFF",
    "&:hover": {
      backgroundColor: "#174019",
    },
  },
  submit: {
    backgroundColor: "#215E25",
    color: "#FFFFFF",
    width: "50%",
    "&:hover": {
      backgroundColor: "#174019",
    },
  },
  info: {
    width: "40%",
    color: "#747474",
  },
  divider: {
    width: "100%",
  },
  logDivider: {
    width: "30%",
    color: "#FFFFFF",
  },
  body: {
    width: "100%",
    height: "100%",
  },
  Register: {
    width: "200%",
    height: "100%",
  },
  link: {
    color: "#03b9ff",
  },
  input: {
    width: "50%",
  },
}));
export default function Register() {
  const classes = useStyles();
  const [registerEmail, setEmail] = useState([]);
  const [registerPassword, setPassword] = useState([]);
  const [registerName, setName] = useState([]);
  const theme = createMuiTheme({
    typography: {
      button: {
        fontSize: 10,
      },
    },
  });

  const history = useHistory();

  function newRoute() {
    history.push("/Login");
  }

  function handleSubmit(event) {
    console.log(registerEmail);
    console.log(registerPassword);
    console.log(registerName);
  }

  const register = () => {
    Axios.post("https://shrouded-lowlands-01346.herokuapp.com/register", {
      email: registerEmail,
      password: registerPassword,
      username: registerName,
    }).then((response) => {
      console.log(response);
    });

    newRoute();
  };
  return (
    <ThemeProvider theme={theme}>
      <Grid container direction={"row"} justify={"flex-start"}>
        <Grid item>
          <Box m={4}>
            <Button component={LinkRoute} to="/Login" variant="contained" className={classes.back}>
              Back
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Grid container direction={"row"} spacing={10} alignItems={"baseline"} className={classes.body}>
        <Grid item className={classes.info}>
          <Box pl={"25%"}>
            <Box>
              <Typography variant={"h1"} justify="flex-start">
                ALVIS
              </Typography>
            </Box>
            <Box className={classes.divider}>
              <Divider />
            </Box>
            <Box>
              <Typography variant={"body1"} align="baseline">
                An Interactive Algorithm Visualizer for Computer Science courses making learning more enjoyable and challenging
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item>
          <form onSubmit={handleSubmit}>
            <Paper elevation={10} className={classes.Register}>
              <Box>
                <Grid container direction={"column"} justify={"center"}>
                  <Grid item>
                    <Box pt={5}>
                      <Typography variant={"h2"}>New Account</Typography>
                    </Box>
                  </Grid>

                  <Grid item>
                    <Box pt={2}>
                      <TextField
                        label="Your Name"
                        variant="outlined"
                        className={classes.input}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                    </Box>
                    <Box pt={2}>
                      <TextField
                        label="Your Email"
                        variant="outlined"
                        className={classes.input}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                    </Box>
                    <Box pt={2}>
                      <TextField
                        label="Password"
                        variant="outlined"
                        type="password"
                        className={classes.input}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                    </Box>
                    <Box pt={2}>
                      <TextField
                        label="Repeat your Password"
                        variant="outlined"
                        type="password"
                        className={classes.input}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                    </Box>
                  </Grid>
                  <Grid item>
                    <FormControlLabel
                      control={<Checkbox color={"#000000"} />}
                      label={<Typography variant={"button"}>I agree to all of the statements in the Terms of Service</Typography>}
                      labelPlacement={"end"}
                    />
                  </Grid>
                  <Grid item>
                    <Box pt={2}>
                      <Button variant={"contained"} className={classes.submit} onClick={() => register()}>
                        <Typography variant={"h6"}>Sign up</Typography>
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </form>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
