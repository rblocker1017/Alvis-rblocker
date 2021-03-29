import { inOrderTraversal } from "../Algorithms/BinaryTreeTraversal";

test("inOrderTraversal", () => {
  let circles = [];
  circles.push({
    id: circles.length,
    parent: null,
    leftChild: 1,
    rightChild: 2,
  });
  circles.push({
    id: circles.length,
    parent: 0,
    leftChild: null,
    rightChild: null,
  });
  circles.push({
    id: circles.length,
    parent: 0,
    leftChild: null,
    rightChild: null,
  });
  let inputCircles = [];
  inOrderTraversal(circles[0], inputCircles, circles)
  let circlesOutput = [circles.find((circle) => circle.id === circles[0].leftChild), circles[0], circles.find((circle) => circle.id === circles[0].rightChild)];
  expect(circlesOutput).toEqual(inputCircles);
});
