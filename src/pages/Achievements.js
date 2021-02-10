import React, { useState } from 'react'
import Header from "../componenets/layout/header"
import { Typography, Grid, Paper, Divider, Table, TableBody, TableCell, TableContainer, TableHead,TableRow, TextField, MenuItem, InputLabel,FormControl,Select } from "@material-ui/core"
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';


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
    button: {
      marginLeft: 'auto',
      textTransform: 'none',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 180,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
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

    const [sort, setSort] = React.useState('');

    const handleChange = (event) => {
      setSort(event.target.value);
    };
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
                    <Grid container alignItems={"center"} direction={"row"} justify={"center"} spacing={"5"}>
                        <Grid item> <h1>Achievements</h1></Grid>
                        <Grid item><TextField id="filled-basic" label="Search" variant="filled" /></Grid>
                        <Grid item>
                          <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="simple-select">Sort by</InputLabel>
                            <Select
                              labelId="simple-select"
                              id="simple-select"
                              value={sort}
                              onChange={handleChange}
                              label="Sort by"
                              >
                              <MenuItem value={1}>Achievement</MenuItem>
                              <MenuItem value={2}>Status</MenuItem>
                              <MenuItem value={3}>Completion Date</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        </Grid>
                        <Grid container alignItems={"center"} direction={"column"}>
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