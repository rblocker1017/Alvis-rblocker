import React from "react";
import { Button, Grid, Box, Paper, Typography, Divider, ButtonBase, TextField, FormControlLabel, Checkbox } from "@material-ui/core";
import { makeStyles, ThemeProvider, useTheme, createMuiTheme } from '@material-ui/core/styles';
import LinkRoute from 'react-router-dom/Link';
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
    root:
    {
        flexGrow: 1
    },
    back:
    {
        backgroundColor: "#215E25",
        color: "#FFFFFF",
        '&:hover':
        {
            backgroundColor: "#174019"
        }
    },
    submit:
    {
        backgroundColor: "#215E25",
        color: "#FFFFFF",
        width: "50%",
        '&:hover':
        {
            backgroundColor: "#174019"
        }
    },
    info:
    {
        width: "40%",
        color: "#747474"
    },
    divider:
    {
        width: "100%"
    },
    logDivider:
    {
        width: "30%",
        color: "#FFFFFF"
    },
    body:
    {
        width: "100%",
        height: "100%"
    },
    login:
    {
        width: "200%",
        height: "100%"
    },
    link:
    {
        color: "#03b9ff"
    },
    input:
    {
        width: "50%"
    }
    

}));

export default function Login() {
    const classes = useStyles();
    const theme = createMuiTheme({
        typography:
        {
            button:
            {
                fontSize: 10
            }
        }
    });

    function handleSubmit(event) {
        alert("test");
        event.preventDefault();
    }

    return (
        <ThemeProvider theme={theme}>
            <Grid container direction={"row"} justify={"flex-start"}>
                <Grid item>
                    <Box m={4}>
                        <Button component={LinkRoute} to="/" variant="contained" className={classes.back}>
                            Back
                        </Button>
                    </Box>
                </Grid>
            </Grid>
            <Grid container direction={"row"} spacing={10} alignItems={"baseline"} className={classes.body}>
                <Grid item className={classes.info}>
                    <Box pl={"25%"}>
                        <Box>
                            <Typography variant={"h1"} justify="flex-start" >
                                    ALVIS
                            </Typography>
                        </Box>
                        <Box className={classes.divider}>
                            <Divider />
                        </Box>
                        <Box>
                            <Typography variant={"b1"} align="baseline" >
                                An Interactive Algorithm Visualizer for
                                Computer Science courses making
                                learning more enjoyable and challenging
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid item >
                    <form onSubmit={handleSubmit}>
                        <Paper elevation={10} className={classes.login}>
                            <Box>
                                <Grid container direction={"column"} justify={"center"}>
                                    <Grid item>
                                        <Box pt={5}>
                                            <Typography variant={"h2"}>
                                                    Log In
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Box pt={2}>
                                            <Typography variant={"h6"}>
                                                {"New User? "} 
                                                <ButtonBase component={LinkRoute} to="/Register">
                                                    <Typography variant={"h6"} className={classes.link}>
                                                        Create an account!
                                                    </Typography>
                                                </ButtonBase>
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Box pt={2}>
                                            <TextField label="Email" variant="outlined" className={classes.input} />
                                        </Box>
                                        <Box pt={1}>
                                            <TextField label="Password" variant="outlined" className={classes.input} />
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Box pl={"20%"} pr={"20%"}>
                                            <Grid container direction={"row"} justify={"space-around"} alignItems={"center"}>
                                                <Grid item>
                                                    <FormControlLabel control={<Checkbox color={"#000000"} />} label={<Typography variant={"button"}>Remember Me</Typography>} labelPlacement={"end"} />
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
                                            <Button variant={"contained"} type={"submit"} className={classes.submit}>
                                                <Typography variant={"h6"}>
                                                    Log In
                                                </Typography>
                                            </Button>
                                        </Box>
                                        <Box pt={1} pb={1} pl={"25%"} pr={"25%"}>
                                            <Grid container direction={"row"} alignItems={"center"} justify={"space-around"}>
                                                <Grid item className={classes.logDivider}>
                                                    <Divider />
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant={"subtitle1"}>
                                                        Or
                                                    </Typography>
                                                </Grid>
                                                <Grid item className={classes.logDivider}>
                                                    <Divider />
                                                </Grid>
                                            </Grid>
                                        </Box>
                                        <Box>
                                            <Button variant={"contained"} type={"submit"} className={classes.submit}>
                                                <Typography variant={"h6"}>
                                                    Continue with Google
                                                </Typography>
                                            </Button>
                                        </Box>
                                        <Box pt={1}>
                                            <Button variant={"contained"} type={"submit"} className={classes.submit}>
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