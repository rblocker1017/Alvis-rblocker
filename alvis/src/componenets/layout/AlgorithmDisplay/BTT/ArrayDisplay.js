import React, { Component } from "react";
import { Rect, Text } from "react-konva";

class ArrayDisplay extends Component {
  render() {
    return this.props.visualArray.map((rect) =>
      this.props.step ? (
        <React.Fragment>
          <Rect
            x={rect.x}
            y={rect.y}
            width={rect.width}
            height={rect.height}
            stroke={rect.stroke}
            strokeWidth={rect.strokeWidth}
            value={rect.value}
          />
          <Text
            text={rect.value}
            fontSize={20}
            x={rect.x + 40}
            y={rect.y + 40}
          />
        </React.Fragment>
      ) : null
    );
  }
}

export default ArrayDisplay;
