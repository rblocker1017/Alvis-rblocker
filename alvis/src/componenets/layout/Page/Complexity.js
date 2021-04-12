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
        this.algorithms = this.props.algorithms
    }
    render(){
        return(
                this.props.algorithms.map( algorithm => {
                    if(algorithm.name === this.props.type && algorithm.time !== undefined && algorithm.space !== undefined){
                        return(
                            <Paper className={this.classes.code}>
                            <div>
                                <h2>Complexity</h2>
                                <h4>
                                    Time: {algorithm.time}
                                </h4>
                                <h4>
                                    Space: {algorithm.space}
                                </h4>
                            </div>
                            </Paper>
                        );

                    }
                })
        );
    }
}
export default withStyles(styles)(Complexity);