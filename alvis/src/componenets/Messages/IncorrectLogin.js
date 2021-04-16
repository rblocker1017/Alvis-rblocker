import React, { Component } from "react";
export default class IncorrectLogin extends Component {
  render(props) {
    if (this.props.valid) {
      return null;
    }
    return <b1 style={{ color: "red" }}>Incorrect Login Information</b1>;
  }
}
