import React, { useState } from 'react'
import clsx from 'clsx';
import Header from "../componenets/layout/header"
import Button from "@material-ui/core/Button"
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid"
import Paper from '@material-ui/core/Paper';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
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
    height: "100%"
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

export default function PageReplacement() {
    const classes = useStyles();
    const [frames, setframes] = useState(2);
    const [input, setinput] = useState([]);
    const [displayBoolean, setDisplayBoolean] = useState(false);
    const [answer, setAnswer] = useState([]);
    const [type, settype] = useState("fcfs")

    function renderPageReplacement() {
        switch (type) {
            case "fcfs":
                setAnswer(fcfsPageReplacement(input, frames));
                setDisplayBoolean(true);
                break;
            case "lru":
                setAnswer(lruPageReplacement(input, frames));
                setDisplayBoolean(true);
                break;
            case "opt":
                setAnswer(optPageReplacement(input, frames));
                setDisplayBoolean(true);
                break;
            default:
                break;
        }

    }


    const [faultCount, setFaultcount] = useState(0);

    function fcfsPageReplacement(pages, frames) {
        console.log("FCFS ran.");

        let s = new Set()
        let answer = []
        let indexes = []
        let page_faults = 0;
        let prevStruct = []
        for (let i = 0; i < pages.length; i++) {
            //prev struct keeps the order of the numbers correct. Set has unpredictable order.

            console.log("For Loop");
            if (s.size < frames) {

                if (!s.has(pages[i])) {
                    s.add(pages[i]);
                    prevStruct = [...s]
                    page_faults += 1;
                    let arr = {
                        column: [...s],
                        fault: "Fault"
                    }
                    answer.push({
                        column: [...s],
                        fault: "❌"
                    });
                    console.log("Set: " + arr.toString())
                    indexes.push(pages[i]);
                    continue;
                }



            } else {

                if (!s.has(pages[i])) {
                    let val = indexes.shift();


                    s.delete(val);
                    s.add(pages[i])
                    console.log(prevStruct)
                    const orderedAnswer = prevStruct.map(page => {
                        if (s.has(page)) {
                            return page;
                        } else {
                            return pages[i];
                        }
                    })
                    prevStruct = orderedAnswer;
                    answer.push({
                        column: orderedAnswer,
                        fault: "❌ "
                    });
                    indexes.push(pages[i])
                    page_faults += 1;
                    continue;
                }

            }

            answer.push({
                column: prevStruct,
                fault: "✔️"
            });


        }
        setFaultcount(page_faults);
        return answer

    }

    function lruPageReplacement(pages, frames) {
        console.log("Lru ran.");

        let s = new Set()
        let answer = []
        let indexes = []
        let page_faults = 0;
        let lruArr = [];
        let prevStruct = []

        for (let i = 0; i < pages.length; i++) {
            console.log("For Loop");
            if (s.size < frames) {

                if (!s.has(pages[i])) {
                    s.add(pages[i]);
                    prevStruct = [...s]
                    page_faults += 1;
                    let arr = {
                        column: [...s],
                        fault: "Fault"
                    }
                    answer.push({
                        column: [...s],
                        fault: "❌"
                    });

                    //if(pages[i] !== lruArr[0])
                    lruArr.unshift(pages[i])

                    console.log("Set: " + arr.toString())
                    indexes.push(pages[i]);
                    continue;
                }





            } else {
                console.log("Getting val: for " + pages[i] + "---" + lruArr.toString())
                if (!s.has(pages[i])) {

                    lruArr.pop();

                    let val = lruArr[2]
                    lruArr.unshift(pages[i])
                    console.log("val: " + val)

                    console.log("Lru arr Length: " + lruArr.length);


                    s.delete(val);
                    s.add(pages[i])
                    const orderedAnswer = prevStruct.map(page => {
                        if (s.has(page)) {
                            return page;
                        } else {
                            return pages[i];
                        }
                    })

                    answer.push({
                        column: orderedAnswer,
                        fault: "❌ "
                    });
                    prevStruct = orderedAnswer;
                    indexes.push(pages[i])
                    page_faults += 1;
                    continue;
                }
                lruArr.unshift(pages[i]);
            }


            answer.push({
                column: prevStruct,
                fault: "✔️"
            });


        }
        setFaultcount(page_faults);
        return answer

    }
    function optPageReplacement(pages, frames) {
        console.log("OPT ran.");

        let s = new Set()
        let answer = []
        let indexes = []
        let page_faults = 0;
        let prevStruct = []
        for (let i = 0; i < pages.length; i++) {
            //prev struct keeps the order of the numbers correct. Set has unpredictable order.

            console.log("For Loop");
            if (s.size < frames) {

                if (!s.has(pages[i])) {
                    s.add(pages[i]);
                    prevStruct = [...s]
                    page_faults += 1;
                    let arr = {
                        column: [...s],
                        fault: "Fault"
                    }
                    answer.push({
                        column: [...s],
                        fault: "❌"
                    });
                    console.log("Set: " + arr.toString())
                    indexes.push(pages[i]);
                    continue;
                }



            } else {

                if (!s.has(pages[i])) {

                    let val;
                    let tempSet = new Set(s)

                    if (!prevStruct.slice(i, pages.length).includes(pages[i])) {
                        let tempArr = [...prevStruct]
                        val = tempArr.shift();
                    } else {

                        for (let j = i + 1; j < pages.length; j++) {
                            if (tempSet.has(pages[j])) {
                                console.log("OPT " + pages[i])
                                val = pages[j]
                                tempSet.delete(pages[j]);
                                console.log('Temp set: ', tempSet)
                            }


                        }
                    }
                    console.log("VAL after for: " + val)



                    s.delete(val);
                    s.add(pages[i])
                    console.log(prevStruct)
                    const orderedAnswer = prevStruct.map(page => {
                        if (s.has(page)) {
                            return page;
                        } else {
                            return pages[i];
                        }
                    })
                    prevStruct = orderedAnswer;
                    answer.push({
                        column: orderedAnswer,
                        fault: "❌ "
                    });
                    indexes.push(pages[i])
                    page_faults += 1;
                    continue;
                }

            }

            answer.push({
                column: prevStruct,
                fault: "✔️"
            });


        }
        setFaultcount(page_faults);
        return answer


    }
    const takeInput = () => {
        setAnswer(fcfsPageReplacement(input, frames));
        setDisplayBoolean(true);
        console.log(answer.toString());



    }


    const tableHeader = input.map((page) => {
        return (
            <th style={{ color: 'Green', fontSize: "30px" }} >{page}</th>


        );



    })

    const displayTable = answer.map((ans) => {
        return (<>

            <td>
                {ans.column.map((page) =>
                    <tr style={{ color: 'Black', fontSize: "30px" }} >{JSON.stringify(page)}</tr>
                )}
                <p>{ans.fault}</p>
            </td>


        </>

        );

  })
  const handleChange = (event) => {
    settype(event.target.value);
  };
  const theme = createMuiTheme({
    palette:{
      primary:{
        main: grey[900],
      }
    }
  })
  return (
    <Header>
      <ThemeProvider theme = {theme}>
        <Grid container direction = "column">
          <Grid item></Grid>
          <Grid item container spacing = {1}>
            <Grid item xs = {3}>
              <Grid container direction = "column">
                <Paper className={classes.buttons}>
                <Grid container spacing = {0}>
                <Grid item xs = {4}>
                 <Button variant="contained" color = "primary">FIFO</Button>
                </Grid>
                <Grid item xs = {4}>
                  <Button variant="contained" color = "primary">OPT</Button>
                </Grid>
                <Grid item xs = {4}>
                  <Button variant="contained" color = "primary">LRU</Button>
                </Grid>
                <Grid item xs = {12}>
                  <h1>
                  </h1>
                </Grid>
                <Grid item xs = {7}>
                  <Button variant="contained" color = "primary">Insert</Button>
                </Grid>
                <Grid item xs = {3}>
                  <Button variant="contained" color = "primary">Reset</Button>
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
          <Grid item xs = {9}>
          <Paper className={classes.paper}>
            <h1>
              Page Replacement
            </h1>
          </Paper>
            <h1>
            </h1>
          <Grid item xs = {12}>
          <form noValidate autoComplete="off">
            <Paper className={classes.fields}>
              <Grid container>
                <Grid item xs = {1}>
              </Grid>
                <Grid item xs = {5}>
                  <TextField id="outlined-size-normal" variant="filled" label="Reference String"/>
                </Grid>
              <Grid item xs = {5}>
                < TextField id="outlined-size-normal" variant="filled" label="Frame" color = "black"/>
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
