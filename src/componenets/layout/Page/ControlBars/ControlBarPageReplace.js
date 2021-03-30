import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid"
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core';

const styles = (themes) => ({
    formControl: {
        minWidth: 120
    }
});

class ControlBarPageReplace extends Component{
    constructor(props){
        super(props);
        this.classes = this.props.classes;
    }
    render(){
        return(
            <Grid container >
                <Grid item xs={1}>
                </Grid>
                <Grid item xs={5}>
                    <TextField id="outlined-size-normal" variant="filled" label="Reference String"
                        onChange={this.props.input}
                    />
                </Grid>

            </Grid>
        );
    }
}
export default withStyles(styles) (ControlBarPageReplace);