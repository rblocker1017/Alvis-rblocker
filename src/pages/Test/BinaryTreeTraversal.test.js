import { inOrderTraversal } from "../Algorithms/BinaryTreeTraversal";

test("inOrderTraversal", () => {
  let circles = [];
  circles.push({
    id: circles.length,
    parent: null,
    leftChild: null,
    rightChild: null,
  });
  circles.push({
    id: circles.length,
    parent: circles[0],
    leftChild: null,
    rightChild: null,
  });
  circles.push({
    id: circles.length,
    parent: circles[0],
    leftChild: null,
    rightChild: null,
  });
  circles[0].leftChild = circles[1];
  circles[0].rightChild = circles[2];
  let inputCircles = [];
  inOrderTraversal(circles[0], inputCircles, circles)
  let circlesOutput = [circles[1], circles[0], circles[2]];
  expect(inputCircles).toEqual(circlesOutput);
});
