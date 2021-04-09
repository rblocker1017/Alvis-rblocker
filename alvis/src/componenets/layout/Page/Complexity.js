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
class Complexity extends Component {
    constructor(props){
        super(props);
        this.classes = this.props.classes;
        this.instruct = this.props.instruct;
    }
    render(){
        return(
            <Paper className={this.classes.code}>
                <h2>Complexity</h2>
                <h4>
                    Time: {this.props.time}
                </h4>
                <h4>
                    Space: {this.props.space}
                </h4>
            </Paper>
        );
    }
}
export default withStyles(styles)(Complexity);