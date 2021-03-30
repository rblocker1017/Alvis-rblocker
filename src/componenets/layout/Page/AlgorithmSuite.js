import Button from "./Button";
import React, { Component } from "react";
import { Grid, Paper, withStyles } from "@material-ui/core";
import { grey} from "@material-ui/core/colors";

const styles = (theme) => ({
    buttons: {
        backgroundColor: grey[300],
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
        width: "100%",
        height: "100%",
    }
});

class AlgoSuite extends Component {
    constructor(props){
        super(props);
        this.classes = this.props.classes;
        this.algorithms = this.props.algorithms;
    }
    render(){
        return(
            <Paper className={this.classes.buttons}>
                <Grid container direction={"column"} spacing={"3"}>
                    <Grid item container spacing={1} justify={"center"}>
                        {this.algorithms.map((currentAlgo) => {
                            return (
                                <Grid item>
                                    <Button
                                        onClick={currentAlgo.func}
                                        text={currentAlgo.name}
                                    />
                                </Grid>
                            );
                        })}
                    </Grid>
                    <Grid item container spacing={1} justify={"center"}>
                        <Grid item onClick={this.props.insert}>
                            <Button
                                text={"Insert"}
                            />
                        </Grid>
                        <Grid item onClick={this.props.reset}>
                            <Button
                                text={"Reset"}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}
export default withStyles(styles)(AlgoSuite)