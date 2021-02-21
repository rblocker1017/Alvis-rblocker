import React, { useState } from 'react'
import Button from "@material-ui/core/Button"
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from "@material-ui/core/Grid"
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import Header from '../componenets/layout/header';
import DiskGraph from "./DiskGraph";
import { values, scan, set } from 'd3';
import '../styles/DiskScheduling.css'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function FCFSDisk() {
  const classes = useStyles();
  const [data, setdata] = useState([
    ['x', 'Path'],
    [200, 0],
    [100, 2],
    [300, 3],
    [100, 4],
    [49, 5],
    [500, 6],
    [350, 7],
    [350, 8],
    [100, 9],
    [65, 10],
    [340, 11],
    [199, 12],
  ])
  const [starting, setstarting] = useState(0)
  const [input, setinput] = useState([])
  const [diskSize, setdiskSize] = useState(0)
  const [displayBoolean, setdisplayBoolean] = useState(false)
  const [type, settype] = useState("scan")
  const [direction, setdirection] = useState("inward")
  const [checked, setChecked] = useState(true);
  const [seekTime, setseekTime] = useState(0)
  function renderDiskGraph() {
    switch (type) {
      case "fcfs":
        fcfsFunction();
        break;
      case "scan":
        if(direction === 'outward'){
          scanOutwardsFunction();
        }else{
        scanFunction();}
        break;
      case "look":
        if(direction === 'outward'){
          lookOutwardsFunction();
        }else{
        lookFunction();}
        break;
      case "cscan":
        if(direction === 'outward'){
          cscanOutwardsFunction();
        }else{
        cscanFunction();}
        break;
        case "clook":
          if(direction === 'outward'){
            clookOutwardsFunction();
          }else{
          clookFunction();}
          break;
      
      default:
        break;
    }
  }

  // all the functions
  function fcfsFunction() {
    let answer = [];
    answer.push(['x', 'Path'])
    answer.push([parseInt(starting), 0])
    for (let i = 0; i < input.length; i++) {

      answer.push([input[i], i + 1]);
    }
    console.log("answer is: " + answer.toString());

    setdata(answer);
    setdisplayBoolean(true);
  }

  function scanFunction() {
    let answer = [];
    answer.push(['x', 'SCAN path'])
    answer.push([parseInt(starting), 0])
    let smaller = input.filter((values) => {
      console.log("Value is type : " + (typeof values))
      return values < starting;
    });
    smaller.sort(function (a, b) { return a - b });
    console.log("Smaller sorted: " + smaller)
    smaller.reverse();
    console.log("Smaller reversed :" + smaller)
    smaller.push(0);
    console.log('Smaller after all: ' + smaller);
    let larger = input.filter((values) => {
      return values >= starting;
    });
    larger = larger.sort();
    console.table(larger)
    for (let i = 0; i < smaller.length; i++) {
      answer.push([smaller[i], i + 1])
    }

    for (let i = 0; i < larger.length; i++) {
      answer.push([larger[i], i + smaller.length + 1])
    }


    setdata(answer);
    setdisplayBoolean(true);

  }
  function scanOutwardsFunction() {
    let answer = [];
    answer.push(['x', 'SCAN outwards path'])
    answer.push([parseInt(starting), 0])
    let smaller = input.filter((values) => {
      console.log("Value is type : " + (typeof values))
      return values < starting;
    });
    smaller.sort(function (a, b) { return a - b });
    console.log("Smaller sorted: " + smaller)
    smaller.reverse();
    console.log("Smaller reversed :" + smaller)

    console.log('Smaller after all: ' + smaller);
    let larger = input.filter((values) => {
      return values >= starting;
    });
    larger.push(diskSize);
    larger = larger.sort();
    console.table(larger)
    
    for (let i = 0; i < larger.length; i++) {
      answer.push([larger[i], i + 1])
    }
    for (let i = 0; i < smaller.length; i++) {
      answer.push([smaller[i], i + larger.length + 1])
    }


    setdata(answer);
    setdisplayBoolean(true);

  }

  function lookFunction() {
    let answer = [];
    answer.push(['x', 'Look path'])
    answer.push([parseInt(starting), 0])

    let smaller = input.filter((values) => {
      console.log("Value: " + values);
      console.log("Value" + (typeof values))

      return values < starting;
    });
    //smaller = smaller.sort().reverse();

    let larger = input.filter((values) => {
      return values >= starting;
    });
    larger = larger.sort(function (a, b) { return a - b });
    console.table(larger)
    for (let i = 0; i < smaller.length; i++) {
      answer.push([smaller[i], i + 1])
    }

    for (let i = 0; i < larger.length; i++) {
      answer.push([larger[i], i + smaller.length + 1])
    }


    setdata(answer);
    setdisplayBoolean(true);

  }
  function lookOutwardsFunction() {
    let answer = [];
    answer.push(['x', 'Look outwards path'])
    answer.push([parseInt(starting), 0])
    let smaller = input.filter((values) => {
      console.log("Value is type : " + (typeof values))
      return values < starting;
    });
    smaller.sort(function (a, b) { return a - b });
    console.log("Smaller sorted: " + smaller)
    smaller.reverse();
    console.log("Smaller reversed :" + smaller)

    console.log('Smaller after all: ' + smaller);
    let larger = input.filter((values) => {
      return values >= starting;
    });
    larger = larger.sort();
    console.table(larger)
    
    for (let i = 0; i < larger.length; i++) {
      answer.push([larger[i], i + 1])
    }
    for (let i = 0; i < smaller.length; i++) {
      answer.push([smaller[i], i + larger.length + 1])
    }


    setdata(answer);
    setdisplayBoolean(true);

  }
  function cscanFunction() {
    let answer = [];
    answer.push(['x', 'SCAN path'])
    answer.push([parseInt(starting), 0])
    let firstSmaller = input.filter((values) => {
      console.log("Value is type : " + (typeof values))
      return values < starting;
    });
    firstSmaller.sort(function (a, b) { return a - b });
    firstSmaller.reverse();
    firstSmaller.push(0)
    for (let i = 0; i < firstSmaller.length; i++) {
      answer.push([firstSmaller[i], i + 1])
    }

    let secondSmaller = input.filter((values) => {
      console.log("Value is type : " + (typeof values))
      return values < diskSize;
    });
    let difference = secondSmaller.filter(x => !firstSmaller.includes(x));
    difference.reverse();
    difference.unshift(diskSize)
    for (let i = 0; i < difference.length; i++) {
      answer.push([difference[i], i + difference.length +1])
    }


    setdata(answer);
    setdisplayBoolean(true);

  }
  function cscanOutwardsFunction() {
    let answer = [];
    answer.push(['x', 'Cscan outwards path'])
    answer.push([parseInt(starting), 0])
    let firstSmaller = input.filter((values) => {
      console.log("Value is type : " + (typeof values))
      return values > starting;
    });
    firstSmaller.sort(function (a, b) { return a - b });
   // firstSmaller.reverse();
    firstSmaller.push(diskSize)
    for (let i = 0; i < firstSmaller.length; i++) {
      answer.push([firstSmaller[i], i + 1])
    }

    let secondSmaller = input.filter((values) => {
      console.log("Value is type : " + (typeof values))
      return values > 0;
    });


    
    let difference = secondSmaller.filter(x => !firstSmaller.includes(x));
    difference.reverse();
    difference.unshift(0)
    for (let i = 0; i < difference.length; i++) {
      answer.push([difference[i], i + difference.length +1])
    }


    setdata(answer);
    setdisplayBoolean(true);

  }

  function clookFunction() {
    let answer = [];
    answer.push(['x', 'SCAN path'])
    answer.push([parseInt(starting), 0])
    let firstSmaller = input.filter((values) => {
      console.log("Value is type : " + (typeof values))
      return values < starting;
    });
    firstSmaller.sort(function (a, b) { return a - b });
    firstSmaller.reverse();
    for (let i = 0; i < firstSmaller.length; i++) {
      answer.push([firstSmaller[i], i + 1])
    }

    let secondSmaller = input.filter((values) => {
      console.log("Value is type : " + (typeof values))
      return values < diskSize;
    });
    let difference = secondSmaller.filter(x => !firstSmaller.includes(x));
    difference.sort(function (a, b) { return a - b }).reverse();
    difference.unshift(diskSize)
    for (let i = 0; i < difference.length; i++) {
      answer.push([difference[i], i + difference.length])
    }


    setdata(answer);
    setdisplayBoolean(true);

  }
  function clookOutwardsFunction() {
    let answer = [];
    answer.push(['x', 'cLook path'])
    answer.push([parseInt(starting), 0])
    let firstSmaller = input.filter((values) => {
      console.log("Value is type : " + (typeof values))
      return values > starting;
    });
    firstSmaller.sort(function (a, b) { return a - b });
    //firstSmaller.reverse();
    for (let i = 0; i < firstSmaller.length; i++) {
      answer.push([firstSmaller[i], i + 1])
    }

    let secondSmaller = input.filter((values) => {
      console.log("Value is type : " + (typeof values))
      return values > 0;
    });
    let difference = secondSmaller.filter(x => !firstSmaller.includes(x));
    difference.sort(function (a, b) { return a - b });
    difference.unshift(0)
    for (let i = 0; i < difference.length; i++) {
      answer.push([difference[i], i + difference.length])
    }


    setdata(answer);
    setdisplayBoolean(true);

  }

  const handleChange = (event) => {
    settype(event.target.value);
  };
  const handleChangeCheck = (event) => {
    setChecked(!checked);
  };
  const handleChangeDirection = (event) => {
    setdirection(event.target.value);
  };

  return (
    <div>
      <Header>
        <Paper className={classes.paper}>
          <h2>Disk Scheduling</h2>

          <TextField id="outlined-size-normal" variant="outlined" label="Disk Size" onChange={(e) => { setdiskSize(e.target.value) }} />
          <TextField id="outlined-size-normal" variant="outlined" label="Initial Position" onChange={(e) => { setstarting(parseInt(e.target.value)) }} />
          <TextField id="outlined-size-normal" variant="outlined" label="Request sequence " onChange={(e) => { setinput(e.target.value.split(',').map(Number)) }} />
          {type === 'scan' || type === 'look' || type === 'cscan'|| type ==='clook' ? <>

            <br></br> <h2>Direction</h2>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={direction}
              onChange={handleChangeDirection}
            >
              <MenuItem value={'outward'} onChange={() => { setdirection("outward"); console.log("Selected: outward"); }}>Outwards</MenuItem>

              <MenuItem value={'inward'} onClick={() => { setdirection("inward"); console.log("Selected: inward"); }}>Inwards</MenuItem>
           
            </Select>
            
            {type =='cscan' || type =='clook' ? <> <h2>"Giant Leap"<Checkbox
        checked={checked}
        name="checkedB"
        onChange={handleChangeCheck}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      /> </h2>
      </> : null}
      
      <br></br> </> : null}

          <h2>Algorithm Select</h2>



          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={type}
            onChange={handleChange}
          >
            <MenuItem value={'fcfs'} onChange={() => { settype("fcfs"); console.log("Selected: FCFS"); }}>FCFS</MenuItem>

            <MenuItem value={'sstf'} onClick={() => { settype("sstf"); console.log("Selected: SSTF"); }}>SSTF</MenuItem>

            <MenuItem value={'scan'} onClick={() => { settype("scan"); console.log("Selected: SCAN"); }}>SCAN</MenuItem>
            <MenuItem value={'cscan'} onClick={() => { settype("cscan"); console.log("Selected: cscan"); }}>C-scan</MenuItem>
            <MenuItem value={'look'} onClick={() => { settype("look"); console.log("Selected: LOOK"); }}>LOOK</MenuItem>
            <MenuItem value={'clook'} onClick={() => { settype("clook"); console.log("Selected: cLOOK"); }}>c-look</MenuItem>

          </Select>
         

          <Paper className={classes.paper}>
            <Button variant="contained" color="primary" onClick={renderDiskGraph}>Run Page Replacement</Button>
          </Paper>
          {displayBoolean ? <>
          {/*<p>Seek Time = {seekTime}</p>*/}
            <Paper className={classes.paper}>
              <DiskGraph data={data} size={diskSize} > </DiskGraph> </Paper>

              
          </> : null}
        </Paper>


      </Header>
    </div>
  )
}
