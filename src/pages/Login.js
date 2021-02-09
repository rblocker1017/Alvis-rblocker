import React from "react";
import { Button, Grid, Box, Paper, Typography, Divider } from "@material-ui/core";
import { makeStyles, ThemeProvider, useTheme } from '@material-ui/core/styles';
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
    info:
    {
        width: "40%",
        color: "#747474"
    },
    divider:
    {
        width: "100%"
    },
    login:
    {
        width: "50%",
        height: "100%"
    }
}));

export default function Login() {
    const classes = useStyles();
    const theme = useTheme();

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
            <Grid container direction={"row"} spacing={1}  alignItems={"baseline"}>
                <Grid item className={classes.info}>
                    <Box >
                        <Box pl={"25%"}>
                            <Typography variant={"h1"} justify="flex-start" >
                                    ALVIS
                            </Typography>
                        </Box>
                        <Box pl={"25%"} className={classes.divider}>
                            <Divider />
                        </Box>
                        <Box pl={"25%"}>
                            <Typography variant={"b1"} align="baseline" >
                                An Interactive Algorithm Visualizer for
                                Computer Science courses making
                                learning more enjoyable and challenging
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid item className={classes.login}>
                    <Paper elevation={3}>
                        test
                    </Paper>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}