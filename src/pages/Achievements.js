import React, { useState } from 'react'
import Header from "../componenets/layout/header"
import { Button, Grid, Paper, Divider, Table, TableBody, TableCell, TableContainer, TableHead,TableRow } from "@material-ui/core"
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
    },
    table: {
      minWidth: 700,
    },
    th: {
      fontWeight: 'bold'
    },
    tc: {
      border: '1px solid rgba(224, 224, 224, 1)'
    },
}));

function createData(name, status, date) {
  return { name, status, date };
}

const rows = [
  createData('Achievement1', 'Completed', 'Completed on X/X/XXXX'),
  createData('Achievement2', 'Incomplete'),
  createData('Achievement3', 'Incomplete'),
  createData('Achievement4', 'Incomplete'),
  createData('Achievement5', 'Incomplete'),
];

export default function Achievements() {
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
                                Achievements
                            </h1>
                        </Grid>
                        <Grid item className={classes.divider}>
                            <Divider />
                        </Grid>
                        <Grid item >
                          <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="simple table">
                              <TableHead>
                                <TableRow>
                                  <TableCell className={classes.th} align="center">Achievement</TableCell>
                                  <TableCell className={classes.th} align="center">Status</TableCell>
                                  <TableCell className={classes.th} align="center">Completion Date</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {rows.map((row) => (
                                  <TableRow key={row.name}>
                                    <TableCell className={classes.tc} align="center" component="th" scope="row">
                                      {row.name}
                                    </TableCell>
                                    <TableCell className={classes.tc} align="center">{row.status}</TableCell>
                                    <TableCell className={classes.tc} align="center">{row.date}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Grid>
                    </Grid>
                </Paper>
            </ThemeProvider>
        </Header>
    );
}