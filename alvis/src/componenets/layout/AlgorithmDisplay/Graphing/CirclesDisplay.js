import React, { Component } from "react";
import { Circle, Label, Tag, Text } from "react-konva";
import { pointValues } from "./GraphingDisplayHelper";

class CirclesDisplay extends Component {
  render() {
    return Array.from(this.props.circles.values()).map((circle) => (
      <React.Fragment>
        <Label x={circle.x} y={circle.y - 20}>
          <Tag
            pointerDirection='down'
            fill={
              circle.start ||
              (circle.end &&
                this.props.type !== "Prim" &&
                this.props.type !== "Kruskal")
                ? "green"
                : ""
            }
            pointerWidth={25}
            pointerHeight={10}
            stroke={
              circle.start ||
              (circle.end &&
                this.props.type !== "Prim" &&
                this.props.type !== "Kruskal")
                ? "black"
                : ""
            }
          />
          <Text
            fontSize={20}
            align='center'
            text={pointValues(circle, this.props.type)}
            fill={"white"}
            width={100}
          />
        </Label>
        <Circle
          key={circle.id}
          id={circle.id}
          x={circle.x}
          y={circle.y}
          width={circle.width}
          height={circle.height}
          fill={"green"}
          opacity={0.8}
          stroke={circle.connected ? "red" : "black"}
          shadowColor='black'
          shadowBlur={10}
          shadowOpacity={0.6}
          onClick={
            this.props.connecting
              ? this.props.finalConnect
              : this.props.selectNode
          }
          onDragMove={this.props.handleMove}
          hitStrokeWidth={25}
          draggable
        />
        <Text
          id={circle.id}
          fontSize={20}
          text={circle.id}
          x={circle.x - 5}
          y={circle.y - 7}
          fill='white'
          onClick={
            this.props.connecting
              ? this.props.finalConnect
              : this.props.selectNode
          }
          onDragMove={this.props.handleMove}
          draggable
        />
      </React.Fragment>
    ));
  }
}
export default CirclesDisplay;
