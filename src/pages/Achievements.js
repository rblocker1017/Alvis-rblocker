import React, { useState } from "react";
import Header from "../componenets/layout/header";
import {
  Button,
  Grid,
  Paper,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
} from "@material-ui/core";
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import MenuList from "@material-ui/core/MenuList";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import SearchBar from "material-ui-search-bar";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "transparent",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    backgroundColor: "transparent",
    boxShadow: "none",
    overflow: "hidden",
    height: "100%",
    width: "100%",
  },
  paperOverlay: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: 0,
    borderRadius: 1,
  },
  divider: {
    width: "50%",
  },
  body: {
    width: "40%",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 180,
  },
  table: {
    minWidth: 700,
  },
  th: {
    fontWeight: "bold",
  },
  tc: {
    border: "1px solid rgba(224, 224, 224, 1)",
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
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

function createData(name, status, date, details) {
  return { name, status, date, details };
}

const originalRows = [
  createData(
    "Binary Search Traversal",
    "Completed",
    "Completed on X/X/XXXX",
    "view"
  ),
  createData("Graphing", "Incomplete"),
  createData("Sorting", "Incomplete"),
  createData("CPU Scheduling", "Incomplete"),
  createData("Page Replacement", "Incomplete"),
  createData("Disk Scheduling", "Incomplete"),
];

export default function Achievements() {
  const classes = useStyles();
  const [sort, setSort] = useState("");
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState(originalRows);
  const [searched, setSearched] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setSort(event.target.value);
  };

  const requestSearch = (searchedVal) => {
    const filterRows = originalRows.filter((row) => {
      return row.name.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filterRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: grey[900],
      },
    },
  });

  return (
    <Header>
      <ThemeProvider theme={theme}>
        <Paper className={classes.paper}>
          <Grid
            container
            alignItems={"center"}
            direction={"row"}
            justify={"center"}
            spacing={"5"}
          >
            <Grid item>
              <h1>Achievements</h1>
            </Grid>
            <Grid item>
              <SearchBar
                value={searched}
                onChange={(searchVal) => requestSearch(searchVal)}
                onCancelSearch={() => cancelSearch()}
              />
            </Grid>
            <Grid item>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel>Sort by</InputLabel>
                <Select
                  labelId="simple-select"
                  value={sort}
                  onChange={handleChange}
                  label="Sort by"
                >
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
            <Grid item>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.th} align="center">
                        Achievement
                      </TableCell>
                      <TableCell className={classes.th} align="center">
                        Status
                      </TableCell>
                      <TableCell className={classes.th} align="center">
                        Completion Date
                      </TableCell>
                      <TableCell className={classes.th} align="center">
                        Details
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell
                          className={classes.tc}
                          align="center"
                          component="th"
                          scope="row"
                        >
                          {row.name}
                        </TableCell>
                        <TableCell className={classes.tc} align="center">
                          {row.status}
                        </TableCell>
                        <TableCell className={classes.tc} align="center">
                          {row.date}
                        </TableCell>
                        {/* Below is view detailed achievements overlay---------------------------- */}
                        <TableCell className={classes.tc} align="center">
                          {
                            <div>
                              <buttons
                                type="button"
                                className={classes.button}
                                onClick={handleOpen}
                              >
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
                                  classes: {
                                    root: classes.root,
                                  },
                                }}
                                PaperProps={{
                                  classes: {
                                    root: classes.paper,
                                  },
                                }}
                              >
                                <div className={classes.paperOverlay}>
                                  <Card className={classes.root}>
                                    <CardContent>
                                      <Typography
                                        className={classes.title}
                                        color="textSecondary"
                                        gutterBottom
                                      >
                                        Sample Icon
                                      </Typography>
                                      <Typography variant="h5" component="h2">
                                        Name: Sample Achievement
                                      </Typography>
                                      <Typography
                                        className={classes.pos}
                                        color="textSecondary"
                                      >
                                        Description: A sample description of the
                                        achievement.
                                      </Typography>
                                      <Typography variant="body2" component="p">
                                        Date: Completed on X/X/XXXX
                                        <br />
                                        {
                                          "Category: A Sample Category for the achievement"
                                        }
                                      </Typography>
                                    </CardContent>
                                    <CardActions>
                                      <Button size="small">Learn More</Button>
                                    </CardActions>
                                  </Card>
                                </div>
                              </Modal>
                            </div>
                          }
                        </TableCell>
                        {/* END view detailed achievements overlay---------------------------- */}
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
