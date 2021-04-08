import React, {Component} from 'react';
import { Paper, withStyles } from "@material-ui/core";
const styles = (theme) => ({
    code: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
        height: "100",
    }
});
class Instructions extends Component {
    constructor(props){
        super(props);
        this.classes = this.props.classes;
        this.instruct = this.props.instruct;
    }
    render(){
        return(
            <Paper className={this.classes.code}>
                <h2>Instructions</h2>
                <p>
                    {this.instruct}
                </p>
            </Paper>
        );
    }
}
export default withStyles(styles)(Instructions);