import {
  kruskalAlgorithm,
  primAlgorithm,
  dijkstrasAlgorithm,
} from "../Algorithms/Graphing";

const sortConnectors = (a, b) => {
    if (a.id < b.id) {
        return -1;
    }
    else if (a.id > b.id) {
        return 1;
    }
    return 0;
}

let test1 = new Map();
for (let i = 0; i < 3; i++) {
  let circle = {
    type: "circle",
    id: test1.size,
    connections: [],
    connect: false,
    start: false,
    end: false,
  };
  if (i === 0) circle = { ...circle, start: true };
  if (i === 2) circle = { ...circle, end: true };
  test1.set(circle.id, circle);
}

let result = new Map();
// get a random value, and two random circles that are different form eachother
let id0 = JSON.stringify([Number(1), Number(0)].sort());
let id1 = JSON.stringify([Number(2), Number(1)].sort());
let id2 = JSON.stringify([Number(2), Number(0)].sort());

const circle0 = test1.get(0);
const circle1 = test1.get(1);
const circle2 = test1.get(2);

const newConnection0 = {
  type: "line",
  id: id0,
  connections: [circle1.id, circle0.id],
  value: 10,
  connected: false,
};
const newConnection1 = {
  type: "line",
  id: id1,
  connections: [circle2.id, circle1.id],
  value: 5,
  connected: false,
};
const newConnection2 = {
  type: "line",
  id: id2,
  connections: [circle1.id, circle0.id],
  value: 8,
  connected: false,
};

newConnection0.connections.sort(sortConnectors);
newConnection1.connections.sort(sortConnectors);
newConnection2.connections.sort(sortConnectors);

// push connector id to the connecting circles and current connectors
//console.log();
circle1.connections.push(id0);
circle0.connections.push(id0);
test1.set(1, circle1);
test1.set(0, circle0);
result.set(id0, newConnection0);

circle2.connections.push(id1);
circle1.connections.push(id1);
test1.set(2, circle2);
test1.set(1, circle1);
result.set(id1, newConnection1);

circle2.connections.push(id2);
circle0.connections.push(id2);
test1.set(2, circle2);
test1.set(0, circle0);
result.set(id2, newConnection2);

let output = ["[0,2]", "[1,2]"];
console.log((dijkstrasAlgorithm(0, 2, result)));
test("Prim's Alogrithm" , () => {
    expect(primAlgorithm(0, 2, result)).toEqual(output);
});

test("Prim's Alogrithm - Empty Graph" , () => {
    expect(primAlgorithm(null, null, result)).toEqual([]);
});

test("To Be Or Not To Be" , () => {
    expect(true).toBeTruthy();
})
