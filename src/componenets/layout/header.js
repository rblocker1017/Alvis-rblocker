import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Collapse,
  Drawer,
  CssBaseline,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Link,
  ButtonBase,
  Grid,
  Button,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ScheduleIcon from "@material-ui/icons/Schedule";
import SaveIcon from "@material-ui/icons/Save";
import AssessmentIcon from "@material-ui/icons/Assessment";
import NatureIcon from "@material-ui/icons/Nature";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import {Link as LinkRoute} from "react-router-dom";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { Route, Switch } from "react-router-dom";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import trophy from "../../awesome-trophy.png";
import LoginBundle from "../Resources/LoginBundle";
import Cookies from "universal-cookie";

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
      position: "fixed",
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    overflow: "auto",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  achievementButton: {
    marginLeft: "auto",
    marginRight: "1%",
    textTransform: "none",
  },
}));

export default function PersistentDrawerLeft(props) {
  const cookies = new Cookies();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [routes, setRoutes] = useState();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const CSC130 = [
    { name: "Binary Tree Traversal", url: "/BinaryTreeTraversal", logo: NatureIcon },
    { name: "Graphing", url: "/GraphingAlgorithm", logo: TrendingUpIcon },
    { name: "Sorting", url: "/sorting", logo: AssessmentIcon },
  ];

  const CSC139 = [
    { name: "CPU Scheduling ", url: "/CpuScheduling", logo: ScheduleIcon },
    { name: "Page Replacement", url: "/PageReplacement", logo: FileCopyIcon },
    { name: "Disk Scheduling", url: "/FCFSDisk", logo: SaveIcon },
  ];

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <LoginBundle cookie={cookies.get("cookie")} />
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>{theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}</IconButton>
        </div>
        <Divider />

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography className={classes.heading}>CSC 130</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {CSC130.map((obj, index) => (
                    <Link component={LinkRoute} to={obj.url}>
                      <ListItem button key={obj.name}>
                        <ListItemIcon>
                          {" "}
                          <obj.logo></obj.logo>
                        </ListItemIcon>
                        <ListItemText primary={obj.name} />
                      </ListItem>
                    </Link>
                  ))}
                </List>
              </Collapse>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Divider />

        <Divider />
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
            <Typography className={classes.heading}>CSC 139</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {CSC139.map((obj, index) => (
                    <Link component={LinkRoute} to={obj.url}>
                      <ListItem button key={obj.name}>
                        <ListItemIcon>
                          <obj.logo />
                        </ListItemIcon>
                        <ListItemText primary={obj.name} />
                      </ListItem>{" "}
                    </Link>
                  ))}
                </List>
              </Collapse>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Divider />
      </Drawer>

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {props.children}
      </main>
    </div>
  );
}
