import React from "react";
import { Circle } from "react-konva";

export function generateCircles(numberCircles, canvasWidth, canvasHeight) {
  let circles = [];

  while (circles.length < numberCircles) {
    const value = Math.floor(Math.random() * 100);
    circles.push({
      id: circles.length,
      x: Math.random() * (canvasWidth - 200) + 100,
      y: Math.random() * (canvasHeight - 200) + 100,
      width: 100,
      height: 100,
      color: "green",
      stroke: "black",
      strokeWidth: 5,
      selected: false,
      connections: [],
      value: value
    });
  }
  return circles;
}

export function generateTree(numberCircles, canvasWidth, canvasHeight) {
  let circles = [];

  while (circles.length < numberCircles) {
    const value = Math.floor(Math.random() * 100);
    if (circles.length == 0) {
      circles.push({
        id: circles.length,
        x: canvasWidth/2,
        y: canvasHeight,
        width: 100,
        height: 100,
        color: "green",
        stroke: "black",
        strokeWidth: 5,
        selected: false,
        connections: [],
        value: value
      });
    } else {
      circles.push({
        id: circles.length,
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        color: "green",
        stroke: "black",
        strokeWidth: 5,
        selected: false,
        connections: [],
        value: value
      });
    }
  }
  return circles;
}

export function getPoints(to, from) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  let angle = Math.atan2(-dy, dx);

  const radius = 50;

  return [
    from.x + -radius * Math.cos(angle + Math.PI),
    from.y + radius * Math.sin(angle + Math.PI),
    to.x + -radius * Math.cos(angle),
    to.y + radius * Math.sin(angle)
  ];
}

const sortConnectors = (a, b) => {
  if (a.id < b.id) {
    return -1;
  } else if (a.id > b.id) {
    return 1;
  }
  return 0;
};

export function generateConnectors(numberConnectors, circles) {
  let result = [];
  while (result.length < numberConnectors) {
    const value = Math.floor(Math.random() * 100);
    let fromIndex = Math.floor(Math.random() * circles.length);
    let toIndex = Math.floor(Math.random() * circles.length);
    while (toIndex === fromIndex) {
      toIndex = Math.floor(Math.random() * circles.length);
    }

    const from = circles[fromIndex];
    const to = circles[toIndex];

    const newConnection = {
      id: result.length,
      connections: [to, from],
      points: getPoints(to, from),
      value: value
    };
    newConnection.connections.sort(sortConnectors);

    let exists = false;

    result.forEach(oldConnection => {
      oldConnection.connections.sort(sortConnectors);
      if (
        oldConnection.connections[0] === newConnection.connections[0] &&
        oldConnection.connections[1] === newConnection.connections[1]
      ) {
        exists = true;
        console.log("repeating");
      }
    });

    if (exists === true) {
      continue;
    }
    circles[fromIndex].connections.push(result.length);
    circles[toIndex].connections.push(result.length);
    result.push(newConnection);
  }
  return result;
}

export function connectNode(to, from, idNum) {
  const value = Math.floor(Math.random() * 100);
  return {
    id: idNum,
    connections: [to, from],
    points: getPoints(to, from),
    value: value
  };
}

export function buildGraph() {}
