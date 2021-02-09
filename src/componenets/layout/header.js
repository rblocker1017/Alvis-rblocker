import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ScheduleIcon from '@material-ui/icons/Schedule';
import { Link, Container } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import SaveIcon from '@material-ui/icons/Save';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import AssessmentIcon from '@material-ui/icons/Assessment';
import NatureIcon from '@material-ui/icons/Nature';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import ListSubheader from '@material-ui/core/ListSubheader';
import Collapse from '@material-ui/core/Collapse';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';


const drawerWidth = 250;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
      position: 'fixed'
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    overflow: "auto"
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function PersistentDrawerLeft(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [routes,setRoutes] = useState();


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const CSC130 = [{name:"Binary Tree Traversal", url : "/BinaryTreeTraversal" , logo:NatureIcon}
                  ,{name:"Graphing", url : "/GraphingAlgorithm", logo:TrendingUpIcon},
                  {name: "Sorting", url: "/sorting", logo:AssessmentIcon}
                ]

  const CSC139 = [{name:"CPU Scheduling ", url : "/CpuScheduling", logo:ScheduleIcon}
                  ,{name: "Page Replacement", url:"/PageReplacement", logo:ScheduleIcon},
                  {name: "Disk Scheduling", url:"/FCFSDisk", logo:SaveIcon}
                ]
  
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
          <Typography variant="h5" noWrap align="center">
          Alvis Algorithm Visualizer
          </Typography>
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
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {CSC130.map((obj, index) => (
            <Link href={obj.url} ><ListItem button key={obj.name}>
              <ListItemIcon> <obj.logo></obj.logo></ListItemIcon>
              <ListItemText primary={obj.name} />
            </ListItem></Link>
          ))}
        </List>  
        <Divider />
        <p>CSC 139</p>
        <List>
          {CSC139.map((obj, index) => (
           <Link href={obj.url}> <ListItem button key={obj.name}>
              <ListItemIcon><obj.logo/></ListItemIcon>
              <ListItemText primary={obj.name} />
            </ListItem> </Link>
          ))}
        </List>

        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>CSC 130</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <NatureIcon />
            </ListItemIcon>
            <ListItemText primary="Binary Tree Traversal" />
          </ListItem>
        </List>

      </Collapse>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <TrendingUpIcon />
            </ListItemIcon>
            <ListItemText primary="Graphing" />
          </ListItem>
        </List>
      </Collapse>
      
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <AssessmentIcon />
            </ListItemIcon>
            <ListItemText primary="Sorting" />
          </ListItem>
        </List>
      </Collapse>

          </Typography>
        </AccordionDetails>        
      </Accordion>         
        <Divider />


        <Divider />                
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >          
          <Typography className={classes.heading}>CSC 139</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
           <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <ScheduleIcon />
            </ListItemIcon>
            <ListItemText primary="CPU Scheduling" />
          </ListItem>
        </List>

      </Collapse>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <ScheduleIcon />
            </ListItemIcon>
            <ListItemText primary="Page Replacement" />
          </ListItem>
        </List>
      </Collapse>
      
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <SaveIcon />
            </ListItemIcon>
            <ListItemText primary="Disk Scheduling" />
          </ListItem>
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
