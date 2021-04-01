import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Button, Grid, Paper, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, MenuItem, InputLabel, FormControl, Select } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: "transparent",
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        backgroundColor: "transparent",
        boxShadow: "none",
        overflow: "hidden",
        height: "100%",
        width: "100%"
    }
}));

export default class Achievement {
    
    constructor(name){
        this.achievementName = name;
        this.completed = false;
        this.achievemenDescription = "No Description Provided";
    }



    set name(name){
        this.achievementName = name;
    }

    get name(){
        return this.achievementName;
    }




   set description(desc){
       this.achievemenDescription = desc;
   }

   get description(){
       return this.achievemenDescription;
   }

    set status(isCompleted){
        this.completed = isCompleted;
    }

    get status(){
        if (this.completed == true){
            return "Completed"
        }
        else {
            return "Incomplete"
        }
        
    }

     

    /*get card(){
        return  <div className={classes.paperOverlay}>
            <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Sample Icon
                        </Typography>
                    <Typography variant="h5" component="h2">
                        Name: {this.name}
                        </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        Description: {this.description}
                        </Typography>
                    <Typography variant="body2" component="p">
                        Date: Completed on X/X/XXXX
                        <br />
                        {'Category: A Sample Category for the achievement'}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        </div>
    }*/


}