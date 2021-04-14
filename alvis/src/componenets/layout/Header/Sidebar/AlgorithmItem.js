import { Link, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import React, { Component } from "react";
import LinkRoute from "react-router-dom/Link";
export default class AlgorithmItem extends Component {
  constructor(props) {
    super(props);
    this.obj = this.props.item;
  }
  render() {
    return (
      <Link component={LinkRoute} to={this.obj.url}>
        <ListItem button key={this.obj.name}>
          <ListItemIcon>
            {" "}
            <this.obj.logo></this.obj.logo>
          </ListItemIcon>
          <ListItemText primary={this.obj.name} />
        </ListItem>
      </Link>
    );
  }
}
