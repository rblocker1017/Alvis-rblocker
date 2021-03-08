import React, { Component } from "react";

export default class PathNotFound extends Component {
    render(props) {
        if (this.props.display) {
            return (<h1>Step: { this.props.step }</h1>);
        }
        return <h1 style={{color: "red"}}>No Connecting Path</h1>;
    }
}