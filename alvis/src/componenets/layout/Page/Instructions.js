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
        console.log(this.instruct);
        return(
            <Paper className={this.classes.code}>
                <h2>Instructions</h2>
                {this.instruct === undefined ? null : this.instruct.map(instruction => {
                    return(
                        <div>
                            <p1>
                                {instruction}
                            </p1>
                            <br />
                        </div>
                    );
                })}
            </Paper>
        );
    }
}
export default withStyles(styles)(Instructions);