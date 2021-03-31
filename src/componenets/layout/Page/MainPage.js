import React, { Component } from "react";
import Header from "../Header/header";
import { ButtonBase, Grid, Paper, withStyles } from "@material-ui/core";
import trash from "../../../resources/trash.png";
import {
    ThemeProvider,
    createMuiTheme,
} from "@material-ui/core/styles";
import { grey, green} from "@material-ui/core/colors";
import AlgoSuite from "./AlgorithmSuite";
import ControlBar from "./ControlBars/Mainbar";
import AlgorithmDisplay from "./AlgorithmDisplay";
import Instructions from "./Instructions";
import TrashButton from "./TrashButton";

const styles = (theme) => ({
    root: {
        flexGrow: 1,
    }
});
const theme = createMuiTheme({
    palette: {
        primary: {
            main: green[900],
        },
        secondary: {
            main: grey[700],
        },
    },
});

class MainPage extends Component {
    constructor(props){
        super(props)
        this.algorithms = this.props.algorithms; 
    }
    render() {
        return(
            <Header>
            <ThemeProvider theme={theme}>
                <Grid container direction="column">
                    <Grid item container spacing={1}>
                        <Grid item container direction="column" spacing={5} xs={3}>
                            <Grid item>
                                <AlgoSuite
                                    type = {this.props.selectedAlgo}
                                    algorithms={this.algorithms} 
                                    extra = {this.props.extraOption}
                                    insert={this.props.display.insert}
                                    reset={this.props.display.reset}
                                />
                            </Grid>
                            <Grid item>
                                <Instructions />
                            </Grid>
                        </Grid>
                        <Grid item container direction="column" spacing={1} xs={9}>
                            <Grid item>
                                <AlgorithmDisplay 
                                    display={this.props.display}
                                />
                            </Grid>
                            <Grid item>
                                <ControlBar 
                                    name={this.props.display.name}
                                    barFunctions={this.props.barFunctions}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                {
                    this.props.display.delete !== null ?
                    <TrashButton onClick={this.props.display.delete} /> :
                    null
                }
            </ThemeProvider>
        </Header>
        );
    }
}
export default withStyles(styles)(MainPage)