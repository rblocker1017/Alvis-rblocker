import {
  Box,
  Button,
  ButtonBase,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import Axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import LinkRoute from "react-router-dom/Link";
import Cookies from "universal-cookie";
import IncorrectLogin from "../componenets/Messages/IncorrectLogin";

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
    fontSize: 14,
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
    width: "23%",
    color: "#FFFFFF",
  },
  body: {
    width: "100%",
    height: "100%",
  },
  login: {
    width: "200%",
    height: "100%",
  },
  link: {
    color: "#03b9ff",
  },
  input: {
    width: "50%",
  },
  checkbox: {
    color: "#000000",
  },
}));
export default function Login() {
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const [badLog, setBadLog] = useState(false);
  const classes = useStyles();
  const theme = createMuiTheme({
    typography: {
      button: {
        fontSize: 10,
      },
    },
  });

  let history = useHistory();

  function handleSubmit(event) {
    if (String(password) === "") {
      alert("Please enter a password.");
    } else {
      Axios.post("http://localhost:3001/login", {
        loginEmail: email,
        loginPassword: password,
      }).then((response) => {
        if (String(response.data) == "true") {
          //console.log("Correct username and password");

          const cookies = new Cookies();
          cookies.set("cookie", { username: "email" }, { path: "/" });
          history.push("/");
          //window.location.assign("/");
        } else {
          // Unvalidated
          setBadLog(true);
          //console.log("Incorrect email and password combination.");
        }
      });
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container direction={"row"} justify={"flex-start"}>
        <Grid item>
          <Box m={4}>
            <Button
              component={LinkRoute}
              to='/'
              variant='contained'
              id='Back'
              className={classes.back}
            >
              Back
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Grid
        container
        direction={"row"}
        spacing={10}
        alignItems={"baseline"}
        className={classes.body}
      >
        <Grid item className={classes.info}>
          <Box pl={"25%"}>
            <Box>
              <Typography variant={"h1"} justify='flex-start'>
                ALVIS
              </Typography>
            </Box>
            <Box className={classes.divider}>
              <Divider />
            </Box>
            <Box>
              <Typography variant={"b1"}>
                An Interactive Algorithm Visualizer for Computer Science courses
                making learning more enjoyable and challenging
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item>
          <form onSubmit={handleSubmit}>
            <Paper elevation={10} className={classes.login}>
              <Box>
                <Grid container direction={"column"} justify={"center"}>
                  <Grid item>
                    <Box pt={5}>
                      <Typography variant={"h2"}>Log In</Typography>
                    </Box>
                  </Grid>
                  {badLog ? (
                    <Grid item>
                      <IncorrectLogin />
                    </Grid>
                  ) : null}
                  <Grid item>
                    <Box pt={2}>
                      <Typography variant={"h6"}>
                        {"New User? "}
                        <ButtonBase component={LinkRoute} to='/Register'>
                          <Typography variant={"h6"} className={classes.link}>
                            Create an account!
                          </Typography>
                        </ButtonBase>
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box pt={2}>
                      <TextField
                        label='Email'
                        variant='outlined'
                        className={classes.input}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                    </Box>
                    <Box pt={1}>
                      <TextField
                        label='Password'
                        variant='outlined'
                        type='password'
                        className={classes.input}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box>
                      <Grid
                        container
                        direction={"row"}
                        justify={"center"}
                        alignItems={"center"}
                      >
                        <Grid item>
                          <FormControlLabel
                            control={<Checkbox className={classes.checkbox} />}
                            label={
                              <Typography variant={"button"}>
                                Remember Me
                              </Typography>
                            }
                            labelPlacement={"end"}
                          />
                        </Grid>
                        <Grid item>
                          <ButtonBase>
                            <Typography variant={"button"}>
                              Forgot Password?
                            </Typography>
                          </ButtonBase>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box>
                      <Button
                        variant={"contained"}
                        className={classes.submit}
                        onClick={() => handleSubmit()}
                      >
                        <Typography variant={"h6"}>Log In</Typography>
                      </Button>
                    </Box>
                    <Box p={1}>
                      <Grid
                        container
                        direction={"row"}
                        alignItems={"center"}
                        justify={"center"}
                        spacing={"2"}
                      >
                        <Grid item className={classes.logDivider}>
                          <Divider />
                        </Grid>
                        <Grid item>
                          <Typography variant={"subtitle1"}>Or</Typography>
                        </Grid>
                        <Grid item className={classes.logDivider}>
                          <Divider />
                        </Grid>
                      </Grid>
                    </Box>
                    <Box>
                      <Button
                        variant={"contained"}
                        type={"submit"}
                        className={classes.submit}
                      >
                        <Typography variant={"h6"}>
                          Continue with Google
                        </Typography>
                      </Button>
                    </Box>
                    <Box pt={1}>
                      <Button
                        variant={"contained"}
                        type={"submit"}
                        className={classes.submit}
                      >
                        <Typography variant={"h6"}>
                          Continue with MySacState
                        </Typography>
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
