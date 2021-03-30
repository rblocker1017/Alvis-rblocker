import { withStyles, Button } from "@material-ui/core";
import React, { Component } from "react";

const styles = (theme) => ({
    button: {
        width: "100%",
    },
});

class AlgoButton extends Component {
    render(){
        const classes = this.props.classes;
        return(
            <Button
                variant="contained"
                color={"primary"}
                onClick={this.props.onClick}
                className={classes.button}
            >
                {this.props.text}
            </Button>
        );
    }
}
export default withStyles(styles)(AlgoButton)