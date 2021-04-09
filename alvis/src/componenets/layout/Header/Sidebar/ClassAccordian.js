import React, { Component } from "react";
import { Collapse, List, Typography } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AlgorithmItem from "./AlgorithmItem";

export default class ClassAccordian extends Component {
    constructor(props) {
        super(props);
        this.algoObject = this.props.algorithm;
    }
    render() {
        return (
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
                    <Typography>{this.algoObject.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <Collapse in={true} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {this.algoObject.data.map((obj) => {
                                    console.log("test")
                                    return < AlgorithmItem item = { obj } />
                                })}
                            </List>
                        </Collapse>
                    </Typography>
                </AccordionDetails>
            </Accordion>
        );
    }
}