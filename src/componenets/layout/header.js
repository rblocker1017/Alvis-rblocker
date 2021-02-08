import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Drawer, CssBaseline, AppBar, Toolbar, List, Typography, Divider, IconButton, ListItem, ListItemIcon, ListItemText, Link, ButtonBase } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ScheduleIcon from '@material-ui/icons/Schedule';
import SaveIcon from '@material-ui/icons/Save';
import AssessmentIcon from '@material-ui/icons/Assessment';
import NatureIcon from '@material-ui/icons/Nature';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import LinkRoute from 'react-router-dom/Link';

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

  const CSC130 = [{name:"Binary Tree Traversal", url : "/treeViewer" , logo:NatureIcon}
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
                  <ButtonBase component={ LinkRoute } to="/" >
                  <Typography variant="h5" noWrap align="center">
                          Alvis Algorithm Visualizer
                   </Typography>
                  </ButtonBase>
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
        
        <p>CSC 130</p>
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