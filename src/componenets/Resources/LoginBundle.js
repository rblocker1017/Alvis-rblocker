import React, { Component } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Collapse, Drawer, CssBaseline, AppBar, Toolbar, List, Typography, Divider, IconButton, ListItem, ListItemIcon, ListItemText, Link, ButtonBase, Grid, Button } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ScheduleIcon from "@material-ui/icons/Schedule";
import SaveIcon from "@material-ui/icons/Save";
import AssessmentIcon from "@material-ui/icons/Assessment";
import NatureIcon from "@material-ui/icons/Nature";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import LinkRoute from "react-router-dom/Link";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { Route, Switch } from "react-router-dom";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import trophy from "../../awesome-trophy.png";
import Cookies from "universal-cookie";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export default class LoginBundle extends Component {
  constructor(props) {
    super(props);
    this.cookie = this.props.cookie;
    this.title = (
      <ButtonBase component={LinkRoute} to="/">
        <Typography variant="h5" noWrap align="center">
          Alvis Algorithm Visualizer
        </Typography>
      </ButtonBase>
    );
  }

  deleteCookie() {
    const cookies = new Cookies();
    cookies.remove("cookie");
    window.location.replace(window.location.href);
  }
  render() {
    if (this.cookie === undefined) {
      return (
        <React.Fragment>
          {this.title}
          <Grid container alignItems={"center"} direction={"row"} justify={"flex-end"} spacing={2}>
            <Grid item>
              <ButtonBase component={LinkRoute} to="/Login">
                <Typography variant="button" noWrap align="center">
                  Login
                </Typography>
              </ButtonBase>
            </Grid>
          </Grid>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        {this.title}
        <Grid container alignItems={"center"} direction={"row"} justify={"flex-end"} spacing={2}>
          <Button
            component={LinkRoute}
            to="/Achievements"
            color="inherit"
            className={{
              marginLeft: "auto",
              marginRight: "1%",
              textTransform: "none",
            }}
          >
            <img src={trophy} />
            <Typography variant="button" noWrap align="center">
              Achievements
            </Typography>
          </Button>
          <Grid item>
            <ButtonBase onClick={this.deleteCookie}>
              <Typography variant="button" noWrap align="center">
                Logout
              </Typography>
            </ButtonBase>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}
