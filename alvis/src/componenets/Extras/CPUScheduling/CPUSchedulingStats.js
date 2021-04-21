import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    margin: "auto",
    height: "100%",
    width: "80%",
  },
  popup: {
    padding: theme.spacing(2),
    textAlign: "center",
    top: "50%",
    color: theme.palette.text.secondary,
    margin: "auto",
    height: "125%",
    width: 500,
  },

  paperOverlay: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    textAlign: "center",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: 500,
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
  chkbox: {
    width: "10%",
  },
  code: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "70%",
  },
  fields: {
    backgroundColor: grey[200],
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "100%",
    width: "200%",
  },
  averages: {
    backgroundColor: grey[200],
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },

  table: {
    maxWidth: 250,
  },
  th: {
    fontWeight: "bold",
  },
  tc: {
    border: "2px solid rgba(224, 224, 224, 1)",
  },
  trashBtn: {
    position: "fixed",
    top: "85%",
    right: "1%",
    "&:hover": {
      "& $trashImg": {
        opacity: 1,
      },
    },
  },
  trashImg: {
    opacity: 0.55,
  },
});

class CPUSchedulingStats extends Component {
  constructor(props) {
    super(props);
    this.classes = this.props.classes;
  }
  render() {
    return (
      <div style={{ height: "450px", width: "500px" }}>
        <Grid
          item
          container
          direction='column'
          justify='flex-end'
          alignItems='stretch'
          spacing={1}
        >
          <TableContainer componenet={Grid}>
            <Table className={this.classes.table} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell className={this.classes.th} align='center'>
                    Process Name
                  </TableCell>
                  <TableCell className={this.classes.th} align='center'>
                    Arrival Time
                  </TableCell>
                  <TableCell className={this.classes.th} align='center'>
                    Burst Time
                  </TableCell>
                  {this.props.type === "Priority" ? (
                    <TableCell className={this.classes.th} align='center'>
                      Priority
                    </TableCell>
                  ) : null}
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.processes.map((row) => (
                  <TableRow key={row.name} onClick={this.props.selectRow}>
                    <TableCell
                      id={row.name}
                      className={this.classes.tc}
                      style={
                        row.select
                          ? { backgroundColor: "green", color: "white" }
                          : { backgroundColor: "white" }
                      }
                      align='center'
                      component='th'
                      scope='row'
                    >
                      {row.name}
                    </TableCell>
                    <TableCell
                      id={row.name}
                      className={this.classes.tc}
                      style={
                        row.select
                          ? { backgroundColor: "green", color: "white" }
                          : { backgroundColor: "white" }
                      }
                      align='center'
                    >
                      {row.arrivalTime}
                    </TableCell>
                    <TableCell
                      id={row.name}
                      className={this.classes.tc}
                      style={
                        row.select
                          ? { backgroundColor: "green", color: "white" }
                          : { backgroundColor: "white" }
                      }
                      align='center'
                    >
                      {row.burstTime}
                    </TableCell>
                    {this.props.type === "Priority" ? (
                      <TableCell
                        id={row.name}
                        className={this.classes.tc}
                        style={
                          row.select
                            ? { backgroundColor: "green", color: "white" }
                            : { backgroundColor: "white" }
                        }
                        align='center'
                      >
                        {row.priority}
                      </TableCell>
                    ) : null}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Grid
            item
            xs={8}
            container
            direction='column'
            justify='flex-end'
            alignItems='flex-start'
          >
            <Paper className={this.classes.averages}>
              <h4> Average Waiting Time: {this.props.waitingTime} </h4>
              <h4> Average Turnaound Time: {this.props.turnaroundTime} </h4>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default withStyles(styles)(CPUSchedulingStats);
