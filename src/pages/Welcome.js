import React, { useState } from 'react'
import Header from "../componenets/layout/header"
import { Button, Grid, Paper, Divider } from "@material-ui/core"
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { grey, orange } from '@material-ui/core/colors';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: "100%",
        width: "100%"
    },
    divider: {
        width: "50%"
    },
    body: {
        width: "40%"
    }
}));

export default function Welcome() {
    const classes = useStyles();

    const theme = createMuiTheme({
        palette: {
            primary: {
                main: grey[900],
            }
        }
    })
    return (
        <Header>
            <ThemeProvider theme={theme}>
                <Paper className={classes.paper}>
                    <Grid container alignItems={"center"} direction={"column"}>
                        <Grid item>
                            <h1>
                                test
                            </h1>
                        </Grid>
                        <Grid item className={classes.divider}>
                            <Divider />
                        </Grid>
                        <Grid item >
                            <h1>
                                Algorithm Visualizer
                            </h1>
                        </Grid>
                        <Grid item className={classes.body}>
                            <b>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                                incididunt ut labore et dolore magna aliqua. Eget duis at tellus at urna. 
                                Suspendisse sed nisi lacus sed viverra tellus in hac habitasse. 
                                At augue eget arcu dictum varius duis at consectetur. 
                                Sed sed risus pretium quam vulputate. Elit sed vulputate mi sit. 
                                Blandit aliquam etiam erat velit scelerisque in dictum non consectetur. 
                                Sagittis nisl rhoncus mattis rhoncus urna neque viverra. Vitae congue mauris rhoncus aenean vel elit. 
                                Vehicula ipsum a arcu cursus. Habitant morbi tristique senectus et. 
                                Cursus risus at ultrices mi tempus imperdiet nulla malesuada pellentesque. 
                                Mi in nulla posuere sollicitudin aliquam ultrices sagittis orci.
                            </b>
                            <br />
                            <br />
                            <b>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                                incididunt ut labore et dolore magna aliqua. Eget duis at tellus at urna. 
                                Suspendisse sed nisi lacus sed viverra tellus in hac habitasse. 
                                At augue eget arcu dictum varius duis at consectetur. 
                                Sed sed risus pretium quam vulputate. Elit sed vulputate mi sit. 
                                Blandit aliquam etiam erat velit scelerisque in dictum non consectetur. 
                                Sagittis nisl rhoncus mattis rhoncus urna neque viverra. Vitae congue mauris rhoncus aenean vel elit. 
                                Vehicula ipsum a arcu cursus. Habitant morbi tristique senectus et. 
                                Cursus risus at ultrices mi tempus imperdiet nulla malesuada pellentesque. 
                                Mi in nulla posuere sollicitudin aliquam ultrices sagittis orci.
                            </b>
                        </Grid>
                    </Grid>
                </Paper>
            </ThemeProvider>
        </Header>
    );
}