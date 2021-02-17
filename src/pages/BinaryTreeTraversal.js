import React, { useState } from "react";
import Header from "../componenets/layout/header";
import { Button, Grid, Paper } from "@material-ui/core";
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import { grey, orange, green, amber } from "@material-ui/core/colors";
import {
  Stage,
  Layer,
  Rect,
  Circle,
  Text,
  Line,
  Label,
  Tag
} from "react-konva";
import Konva from "konva";
import {
  generateCircles,
  generateConnectors,
  connectNode,
  getPoints
} from "./Shapes/NodeGenerator";

const WIDTH = 950;
const HEIGHT = 450;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "125%",
    width: "100%"
  },
  buttons: {
    backgroundColor: grey[200],
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    width: "100%",
    height: "100%"
  },
  button: {
    width: "105%"
  },
  code: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "115%"
  },
  fields: {
    backgroundColor: grey[200],
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "100%"
  }
}));

const INIT = generateCircles(3, WIDTH, HEIGHT);

const CONNECT = generateConnectors(2, INIT);

export default function BinaryTreeTraversal() {
  const classes = useStyles();
  const [type, settype] = useState("Preorder");
  const [flag1, setFlag1] = useState(true);
  const [flag2, setFlag2] = useState(true);
  const [flag3, setFlag3] = useState(true);
  const [circles, setCircles] = React.useState(INIT);
  const [lines, setLines] = React.useState(CONNECT);
  const [connecting, setConnecting] = React.useState(false);
  const [fromCon, setFromCon] = React.useState({});
  const [tags, setTags] = React.useState({});
  const handleClick1 = () => {
    if (flag1) setFlag1(!flag1);
    setFlag2(true);
    setFlag3(true);
  };

  const handleClick2 = () => {
    if (flag2) setFlag2(!flag2);
    setFlag3(true);
    setFlag1(true);
  };

  const handleClick3 = () => {
    if (flag3) setFlag3(!flag3);
    setFlag1(true);
    setFlag2(true);
  };

  let name = "test";

  const changePreorder = () => {
    settype("Preorder");
    handleClick1();
  };
  const changeInorder = () => {
    settype("Inorder");
    handleClick2();
  };
  const changePostorder = () => {
    settype("Postorder");
    handleClick3();
  };

  const addCircle = e => {
    const value = Math.floor(Math.random() * 100);
    const newcircles = circles.concat({
      id: circles.length,
      x: Math.random() * (WIDTH - 200) + 100,
      y: Math.random() * (HEIGHT - 200) + 100,
      width: 100,
      height: 100,
      color: "green",
      stroke: "black",
      strokeWidth: 5,
      selected: false,
      connect: false,
      connections: [],
      value: value
    });
    setCircles(newcircles);
  };

  const handleDragStart = e => {
    const id = e.target.id();
    setCircles(
      circles.map(circle => {
        return {
          ...circle,
          isDragging: circle.id === id
        };
      })
    );
  };
  const handleDragEnd = e => {
    setCircles(
      circles.map(circle => {
        return {
          ...circle,
          isDragging: false
        };
      })
    );
  };
  const handleMove = e => {
    const tempCircle = circles.find(circle => circle.id === e.target.id());
    const tempLines = lines;
    setCircles(
      circles.map(circle => {
        if (tempCircle === circle) {
          const newCircle = {
            ...circle,
            x: e.target.x(),
            y: e.target.y()
          };
          circle.connections.forEach(connection => {
            const other = tempLines[connection].connections.filter(
              otherCircle => otherCircle.id != tempCircle.id
            );
            const points = getPoints(newCircle, other[0]);
            tempLines[connection] = {
              id: tempLines[connection].id,
              connections: [newCircle, other[0]],
              points: points,
              value: tempLines[connection].value
            };
            setLines(tempLines);
          });
          return newCircle;
        }
        return circle;
      })
    );
  };

  const selectCircle = e => {
    const id = e.target.id();
    setCircles(
      circles.map(circle => {
        return {
          ...circle,
          selected: circle.id === id
        };
      })
    );
  };

  const initialConnect = e => {
    const id = e.target.id();
    setConnecting(!connecting);
    setCircles(
      circles.map(circle => {
        if (circle.id == id) {
          setFromCon(circle);
        }
        return {
          ...circle,
          connected: circle.id === id
        };
      })
    );
  };

  const reset = e => {
    setCircles(INIT);
    setLines(CONNECT);
  };

  const finalConnect = e => {
    const id = e.target.id();
    let toCircle = {};
    setCircles(
      circles.map(circle => {
        if (circle.connected) {
          return {
            ...circle,
            connected: false,
            connections: circle.connections.concat(lines.length)
          };
        }
        if (circle.id === id) {
          toCircle = circle;
          return {
            ...circle,
            connections: circle.connections.concat(lines.length)
          };
        }
        return circle;
      })
    );
    const newConnect = lines.concat(
      connectNode(toCircle, fromCon, lines.length)
    );
    setLines(newConnect);
    setConnecting(!connecting);
    setFromCon({});
  };

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: grey[900]
      },
      secondary: {
        main: grey[700]
      }
    }
  });
  return (
    <Header>
      <ThemeProvider theme={theme}>
        <Grid container direction="column">
          <Grid item></Grid>
          <Grid item container spacing={1}>
            <Grid item xs={3}>
              <Grid container direction="column">
                <Paper className={classes.buttons}>
                  <Grid container spacing={1}>
                    <Grid item xs={4}>
                      <Button
                        variant="contained"
                        onClick={changePreorder}
                        color={flag1 ? "primary" : "secondary"}
                        className={classes.button}
                      >
                        Preorder
                      </Button>
                    </Grid>
                    <Grid item className={classes.button} xs={4}>
                      <Button
                        variant="contained"
                        onClick={changeInorder}
                        color={flag2 ? "primary" : "secondary"}
                        className={classes.button}
                      >
                        Inorder
                      </Button>
                    </Grid>
                    <Grid item xs={4}>
                      <Button
                        variant="contained"
                        onClick={changePostorder}
                        color={flag3 ? "primary" : "secondary"}
                        className={classes.button}
                      >
                        Postorder
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <h1></h1>
                    </Grid>
                    <Grid item xs={7}>
                      <Button variant="contained" color="primary">
                        Insert
                      </Button>
                    </Grid>
                    <Grid item xs={3}>
                      <Button variant="contained" color="primary">
                        Reset
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <h2></h2>
              <Paper className={classes.code}>
                <h3>CODE</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </Paper>
            </Grid>
            <Grid item xs={9}>
              <Paper className={classes.paper}>
                <h1>Graphing Algorithm: {type}</h1>
                <Stage width={WIDTH} height={HEIGHT}>
                  <Layer>
                    {circles.map(circle => (
                      <React.Fragment>
                        <Circle
                          key={circle.id}
                          id={circle.id}
                          x={circle.x}
                          y={circle.y}
                          width={circle.width}
                          height={circle.height}
                          fill={"green"}
                          opacity={0.8}
                          stroke={circle.connected ? "red" : "black"}
                          shadowColor="black"
                          shadowBlur={10}
                          shadowOpacity={0.6}
                          onClick={selectCircle}
                          onDblClick={
                            connecting ? finalConnect : initialConnect
                          }
                          onDragStart={handleDragStart}
                          onDragEnd={handleDragEnd}
                          onDragMove={handleMove}
                          draggable
                        />
                        <Text text={circle.value} x={circle.x} y={circle.y} />
                      </React.Fragment>
                    ))}
                    {lines.map(line => (
                      <React.Fragment>
                        <Line
                          id={line.id}
                          points={line.points}
                          stroke="black"
                          fill="black"
                        />
                        <Label
                          x={(line.points[0] + line.points[2]) / 2}
                          y={(line.points[1] + line.points[3]) / 2}
                        >
                          <Tag fill={"white"} />
                          <Text text={line.value} fill="black" />
                        </Label>
                      </React.Fragment>
                    ))}
                  </Layer>
                </Stage>
              </Paper>
              <h1></h1>
              <Grid item xs={12}>
                <form noValidate autoComplete="off">
                  ``
                  <Paper className={classes.fields}>
                    <Grid container spacing={1}>
                      <Grid item xs={2}></Grid>
                      <Grid item>
                        <Button variant="contained" color="primary">
                          Step Back
                        </Button>
                      </Grid>
                      <Grid item xs={2}></Grid>
                      <Grid item>
                        <Button variant="contained" color="primary">
                          Pause
                        </Button>
                      </Grid>
                      <Grid item xs={2}></Grid>
                      <Grid item>
                        <Button variant="contained" color="primary">
                          Step Forward
                        </Button>
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
