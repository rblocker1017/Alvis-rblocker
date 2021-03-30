import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid"
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';
import { grey, green } from '@material-ui/core/colors';

const styles = (theme) => ({
    table: {
        backgroundColor: green[900],
        color: grey[200],
        textAlign: 'center',
        padding: theme.spacing(1)
    }
});

class PageReplacementDisplay extends Component{
    constructor(props){
        super(props);
        this.classes = this.props.classes;
    }
    render(){
        return(
            <React.Fragment>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <table>
                        <tr>{this.props.tableHeader}</tr>
                        {this.props.answer.map((ans) => {
        console.log(ans)
        return (
            <td>
                {ans.column.map((page) => {
                    if (JSON.stringify(page) !== '""') {
                        return (
                        <tr>
                            <td style={{ border: "1px solid black", width: "50px", backgroundColor: 'darkgreen', color: 'white', fontSize: "40px", }} >{JSON.stringify(page)}</td>
                        </tr>
                        )
                    }
                    {
                        return (
                            <tr>
                                <td style={{ border: "1px solid black", width: "50px", height: "61px", backgroundColor: 'darkgreen', color: 'white', fontSize: "40px", }} ></td>
                            </tr>
                        )
                    }
                })}
                <p>{ans.fault}</p>
            </td>
            );
            })}
            </table>
                </div>
                <Grid item container>
                    <Grid item xs={5}></Grid>
                    <Grid item xs={2}>
                        <Typography className={this.classes.table} variant="h5" gutterBottom>
                            Page Faults = {this.props.faultCount}
                        </Typography>

                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(PageReplacementDisplay);