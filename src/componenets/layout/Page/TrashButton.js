import React, {Component} from 'react';
import Header from "../Header/header";
import { ButtonBase, Grid, Paper, withStyles } from "@material-ui/core";
import trash from "../../../resources/trash.png";
const styles = (theme) => ({
    trashBtn: {
        position: "fixed",
        top: "85%",
        right: "1%",
        "&:hover": {
            "& $trashImg": {
                opacity: 1,
            },
        },
    },
    trashImg: {
        opacity: 0.55,
    },
});
class TrashButton extends Component{
    constructor(props){
        super(props);
        this.classes = this.props.classes
    }
    render(){
        return (
            <ButtonBase className={this.classes.trashBtn} onClick={this.props.onClick}>
                <img src={trash} className={this.classes.trashImg} />
            </ButtonBase>
        );
    }
}
export default withStyles(styles)(TrashButton);