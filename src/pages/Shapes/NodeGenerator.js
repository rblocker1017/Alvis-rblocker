import React from 'react';
import { Circle } from 'react-konva';

export function generateCircles(numberCircles, canvasWidth, canvasHeight) {
    let circles = [];

    while (circles.length < numberCircles) {
        circles.push({
            id: circles.length,
            x : (Math.random() * (canvasWidth - 200)) + 100,
            y : (Math.random() * (canvasHeight - 200)) + 100,
            width : 100,
            height : 100,
            color : 'green',
            stroke : 'black',
            strokeWidth : 5,
            selected : false
            });
    }
    return circles;
}

export function getPoints(to, from) {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    console.log("test");
    let angle = Math.atan2(-dy, dx);

    const radius = 50

    return [
        from.x + -radius * Math.cos(angle + Math.PI),
        from.y + radius * Math.sin(angle + Math.PI),
        to.x + -radius * Math.cos(angle),
        to.y + radius * Math.sin(angle)
    ];
}
export function generateConnectors(numberConnectors, circles) {
    const num = 7;
    let result = [];
    while (result.length < num) {
        let from = circles[Math.floor(Math.random() * circles.length)];
        let to = circles[Math.floor(Math.random() * circles.length)];
        console.log("created");
        while (to === from) {
            to = circles[Math.floor(Math.random() * circles.length)];
        }
        console.log("pushing");
        result.push({
            id: result.length,
            to: to,
            from: from,
            points: getPoints(to, from)
        });
    }
    return result;
}

export function connectNode(to, from, idNum) {
    return {
        id: idNum,
        to: to,
        from: from,
        points: getPoints(to, from)
    };
}