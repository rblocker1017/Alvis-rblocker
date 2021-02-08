import React, { useState } from 'react'
import Header from "../componenets/layout/header"
import { Button, Grid, Paper } from "@material-ui/core"
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
        height: "125%",
        width: "100%"
    },
    buttons:
    {
        backgroundColor: grey[200],
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        width: "100%",
        height: "100%"
    },
    button:
    {
        width: "90%"
    },
    code:
    {

        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: "115%"
    },
    fields:
    {
        backgroundColor: grey[200],
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: "100%"
    }
}));


export default function BinaryTreeTraversal() {
    const classes = useStyles();
    const [type, settype] = useState("Preorder")
    const [flag1, setFlag1] = useState(true);
    const [flag2, setFlag2] = useState(true);
    const [flag3, setFlag3] = useState(true);
  
    const handleClick1 = () => {
        setFlag1(!flag1);
        setFlag2(true);
        setFlag3(true);
    };

    const handleClick2 = () => {
        setFlag2(!flag2);
        setFlag3(true);
        setFlag1(true);
    };

    const handleClick3 = () => {
        setFlag3(!flag3);
        setFlag1(true);
        setFlag2(true);
    };




    let name = "test";

    const changePreorder = () => settype("Preorder");
    const changeInorder = () => settype("Inorder");
    const changePostorder = () => settype("Postorder");
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
                <Grid container direction="column">
                    <Grid item></Grid>
                    <Grid item container spacing={1}>
                        <Grid item xs={3}>
                            <Grid container direction="column">
                                <Paper className={classes.buttons}>
                                    <Grid container spacing={0}>
                                        <Grid item  xs={4}>
                                            <Button variant="contained" onClick={changePreorder} onClick={handleClick1} color={flag1 ? "primary" : "secondary"} className={classes.button}>Preorder</Button>
                                        </Grid>
                                        <Grid item className={classes.button} xs={4}>
                                        <Button variant="contained" onClick={changePreorder} onClick={handleClick2} color={flag2 ? "primary" : "secondary"} className={classes.button}>Inorder</Button>
                                        </Grid>
                                        <Grid item xs={4}>
                                        <Button variant="contained" onClick={changePreorder} onClick={handleClick3} color={flag3 ? "primary" : "secondary"} className={classes.button}>Postorder</Button>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <h1>
                                            </h1>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <Button variant="contained" color="primary">Insert</Button>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Button variant="contained" color="primary">Reset</Button>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                            <h2>
                            </h2>
                            <Paper className={classes.code}>
                                <h3>
                                    CODE
              </h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                            </Paper>
                        </Grid>
                        <Grid item xs={9}>
                            <Paper className={classes.paper}>
                                <h1>
                                    Graphing Algorithm: {type}
            </h1>
                            </Paper>
                            <h1>
                            </h1>
                            <Grid item xs={12}>
                                <form noValidate autoComplete="off">``
                                    <Paper className={classes.fields}>
                                        <Grid container spacing={1}>
                                            <Grid item xs={2}>
                                            </Grid>
                                            <Grid item >
                                                <Button variant="contained" color="primary">Step Back</Button>
                                            </Grid>
                                            <Grid item xs={2}>
                                            </Grid>
                                            <Grid item >
                                                <Button variant="contained" color="primary">Pause</Button>
                                            </Grid>
                                            <Grid item xs={2}>
                                            </Grid>
                                            <Grid item >
                                                <Button variant="contained" color="primary">Step Forward</Button>
                                            </Grid>
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