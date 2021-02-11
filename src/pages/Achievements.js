import React, { useState } from 'react'
import Header from "../componenets/layout/header"
import { Button, Grid, Paper, Divider, Table, TableBody, TableCell, TableContainer, TableHead,TableRow, TextField, MenuItem, InputLabel,FormControl,Select } from "@material-ui/core"
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { grey, orange } from '@material-ui/core/colors';
import MenuList from '@material-ui/core/MenuList';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring/web.cjs';


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
    paperOverlay: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
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
    buttons: {
        backgroundColor: grey[200],
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        width: "100%",
        height: "100%"
    },
    button: {
        width: "90%"
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
}));



function createData(name, status, date, details) {
  return { name, status, date, details };
}

function createDesc(icon, name, description, category, date) {
  return { icon, name, description, category, date };
}

const rows = [
  createData('Achievement1', 'Completed', 'Completed on X/X/XXXX', 'view'),
  createData('Achievement2', 'Incomplete'),
  createData('Achievement3', 'Incomplete'),
  createData('Achievement4', 'Incomplete'),
  createData('Achievement5', 'Incomplete'),
];

const rows2 = [
  createDesc('Refer Icon Here', 'Completed', 'Sample Desciption here', 'Sample Category', 'Completed on X/X/XXXX',),
];

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

export default function Achievements() {
    const classes = useStyles();
    const [sort, setSort] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

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
                        <Grid item><h1>Achievements</h1></Grid>
                        <Grid item><TextField id="filled-basic" label="Search" variant="filled" /></Grid>
                        <Grid item>
                          <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="simple-select">Sort</InputLabel>
                            <Select
                              labelId="simple-select"
                              id="simple-select"
                              value={sort}
                              onChange={handleChange}
                              label="Sort"
                              >
                              <MenuItem value="">
                              </MenuItem>
                              <MenuItem value={1}>Achievement</MenuItem>
                              <MenuItem value={2}>Status</MenuItem>
                              <MenuItem value={3}>Completition Date</MenuItem>
                              <MenuItem value={4}>Details</MenuItem>
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
                                  <TableCell className={classes.th} align="center">Details</TableCell>
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
                                    <TableCell className={classes.tc} align="center">{
                                      <div>
                                        <buttons type="button" className={classes.button} onClick={handleOpen}>
                                        
                                        <MenuList>
                                          <MenuItem align="center">View</MenuItem>
                                        </MenuList>
                                      </buttons>
                                      <Modal
                                              aria-labelledby="View Detailed Achievement"
                                              aria-describedby="Achievement will have details here"
                                              className={classes.modal}
                                              open={open}
                                              onClose={handleClose}
                                              closeAfterTransition
                                              BackdropComponent={Backdrop}
                                              BackdropProps={{
                                                timeout: 500,
                                              }}
                                            >
                                              <Fade in={open}>
                                                <div className={classes.paperOverlay}>
                                                  <h2 id="spring-modal-title">View Detailed Achievement</h2>
                                                  <p id="spring-modal-description">Achievement will have details here.</p>
                                                </div>
                                              </Fade>
                                          </Modal>
                                    </div>
                                    }</TableCell>
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