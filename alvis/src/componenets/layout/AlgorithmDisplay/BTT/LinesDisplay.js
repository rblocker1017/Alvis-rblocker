import React, { Component } from "react";
import { Line } from "react-konva";

class LinesDisplay extends Component {
  render() {
    return Array.from(this.props.lines.values()).map((line) => (
      <React.Fragment>
        <Line
          id={line.id}
          points={line.points}
          stroke={line.connected ? "red" : "black"}
          hitStrokeWidth={25}
          fill={"black"}
        />
      </React.Fragment>
    ));
  }
}
export default LinesDisplay;
