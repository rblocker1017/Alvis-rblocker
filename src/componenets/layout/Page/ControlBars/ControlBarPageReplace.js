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
            <Grid container spacing={10}>
                <Grid item>
                    <TextField id="outlined-size-normal" variant="filled" label="Reference String"
                        onChange={this.props.input}
                    />
                </Grid>
                <Grid item>
                    <FormControl variant="filled" className={this.classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Frames</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            onChange={this.props.frames}
                        >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={6}>6</MenuItem>
                            <MenuItem value={7}>7</MenuItem>
                            <MenuItem value={8}>8</MenuItem>
                            <MenuItem value={9}>9</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        );
    }
}
export default withStyles(styles) (ControlBarPageReplace);