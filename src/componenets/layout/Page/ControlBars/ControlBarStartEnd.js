import React, {Component} from 'react';
import { Grid, Paper, withStyles } from "@material-ui/core";
import Button from "../Button";
import { grey} from "@material-ui/core/colors";

const styles = (theme) => ({
    fields: {
        backgroundColor: grey[300],
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
        height: "100%",
    }
});
class ControlBarStartEnd extends Component{
    constructor(props){
        super(props);
        this.classes = this.props.classes
    }
    render(){
        return(
            <Grid container item spacing={10} justify="center">
                <Grid item>
                    <Button
                        onClick = {this.props.start}
                        color={"primary"}
                        text="Set Start"
                    />
                </Grid>
                <Grid item>
                    <Button
                        onClick = {this.props.end}
                        color={"primary"}
                        text="Set End"
                    />
                </Grid>
            </Grid>
        );
    }
}
export default withStyles(styles)(ControlBarStartEnd);