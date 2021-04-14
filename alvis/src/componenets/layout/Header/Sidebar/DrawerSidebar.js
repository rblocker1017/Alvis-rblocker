import { Divider, Drawer, IconButton } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import React, { Component } from "react";
import ClassesResource from "../../../../resources/ClassList";
import ClassAccordian from "./ClassAccordian";

const drawerWidth = 250;

export default class DrawerSidebar extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.open === nextProps.open) {
      return false;
    }
    return true;
  }
  componentDidMount() {
    console.log("test");
  }
  render() {
    console.log("test");
    return (
      <Drawer
        className={this.props.classes.drawer}
        variant='persistent'
        anchor='left'
        open={this.props.open}
        classes={{
          paper: this.props.classes.drawerPaper,
        }}
      >
        <div className={this.props.classes.drawerHeader}>
          <IconButton onClick={this.props.toggle}>
            {this.props.theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        {ClassesResource.map((algoObject) => {
          return <ClassAccordian algorithm={algoObject} />;
        })}
      </Drawer>
    );
  }
}
