import React, { Component } from "react";
import { Drawer, Divider, IconButton } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import ClassAccordian from "./ClassAccordian";
import ClassesResource from "../../../../resources/ClassList";
import { withStyles } from "@material-ui/styles";
const drawerWidth = 250;

const style = (theme) => ({
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
  });

class DrawerSidebar extends Component {
    constructor(props){
        super(props);
    }
    shouldComponentUpdate(nextProps, nextState){
        if(this.props.open === nextProps.open){
            return false;
        }
        return true;
    }
    componentDidMount(){
        console.log("test");
    }
    render() { 
        return (
                <Drawer
                    className={this.props.classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={this.props.open}
                    classes={{
                        paper: this.props.classes.drawerPaper,
                    }}
                    >
                    <div className={this.props.classes.drawerHeader}>
                        <IconButton onClick={this.props.toggle}>{this.props.theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}</IconButton>
                    </div>
                    <Divider />
                        {ClassesResource.map(algoObject => {
                            return (
                                <ClassAccordian algorithm={algoObject}/>
                            );
                        })}
                </Drawer>
        );
    }
}

export default withStyles(style)(DrawerSidebar)
