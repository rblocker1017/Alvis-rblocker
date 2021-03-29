import {
  preOrderTraversal,
  inOrderTraversal,
  postOrderTraversal,
} from "../Algorithms/BinaryTreeTraversal";

/////////////// 3 NODE TEST ////////////////////

let test1 = [
  {
    id: 0,
    parent: null,
    leftChild: 1,
    rightChild: 2,
  },
  {
    id: 1,
    parent: 0,
    leftChild: null,
    rightChild: null,
  },
  {
    id: 2,
    parent: 0,
    leftChild: null,
    rightChild: null,
  },
];

/////////////// 1 NODE TEST ////////////////////

let test2 = [
  {
    id: 0,
    parent: null,
    leftChild: null,
    rightChild: null,
  },
];

/////////////// Empty Tree ////////////////////

let test3 = [];

/////////////// 5 NODE ONLY LEFT TREE (LINKED LIST) ////////////////////

let test4 = [];
for (let i = 0; i < 5; i++) {
  if (i === 0) {
    test4.push({
      id: i,
      parent: null,
      leftChild: i + 1,
      rightChild: null,
    });
  } else {
    test4.push({
      id: i,
      parent: i - 1,
      leftChild: i + 1,
      rightChild: null,
    });
  }
}

/////////////// 5 NODE ONLY RIGHT TREE (LINKED LIST) ////////////////////

let test5 = [];
for (let i = 0; i < 5; i++) {
  if (i === 0) {
    test5.push({
      id: i,
      parent: null,
      leftChild: null,
      rightChild: i + 1,
    });
  } else {
    test5.push({
      id: i,
      parent: i - 1,
      leftChild: null,
      rightChild: i + 1,
    });
  }
}

let NODE_TEST = "";

/////////////// 3 NODE TEST ////////////////////

NODE_TEST = " - 3 Node Tree";

test("Preorder Traversal" + NODE_TEST, () => {
  let firstTest = [];
  preOrderTraversal(test1[0], firstTest, test1);
  let test1Output = [test1[0], test1[1], test1[2]];
  expect(test1Output).toEqual(firstTest);
});

test("Inorder Traversal" + NODE_TEST, () => {
  let firstTest = [];
  inOrderTraversal(test1[0], firstTest, test1);
  let test1Output = [test1[1], test1[0], test1[2]];
  expect(test1Output).toEqual(firstTest);
});

test("Postorder Traversal" + NODE_TEST, () => {
  let firstTest = [];
  postOrderTraversal(test1[0], firstTest, test1);
  let test1Output = [test1[1], test1[2], test1[0]];
  expect(test1Output).toEqual(firstTest);
});

/////////////// 1 NODE TEST ////////////////////

NODE_TEST = "- 1 Node Tree";

test("Preorder Traversal" + NODE_TEST, () => {
  let secondTest = [];
  preOrderTraversal(test2[0], secondTest, test2);
  let outputTest2 = [test2[0]];
  expect(outputTest2).toEqual(secondTest);
});

test("Inorder Traversal" + NODE_TEST, () => {
  let secondTest = [];
  inOrderTraversal(test2[0], secondTest, test2);
  let outputTest2 = [test2[0]];
  expect(outputTest2).toEqual(secondTest);
});

test("Postorder Traversal" + NODE_TEST, () => {
  let secondTest = [];
  postOrderTraversal(test2[0], secondTest, test2);
  let outputTest2 = [test2[0]];
  expect(outputTest2).toEqual(secondTest);
});

/////////////// Empty Tree ////////////////////

NODE_TEST = "- Empty Tree";

test("Preorder Traversal" + NODE_TEST, () => {
  let thirdTest = [];
  preOrderTraversal(test3[0], thirdTest, test3);
  let outputTest3 = [];
  expect(outputTest3).toEqual(thirdTest);
});

test("Inorder Traversal" + NODE_TEST, () => {
  let thirdTest = [];
  inOrderTraversal(test3[0], thirdTest, test3);
  let outputTest3 = [];
  expect(outputTest3).toEqual(thirdTest);
});

test("Postorder Traversal" + NODE_TEST, () => {
  let thirdTest = [];
  postOrderTraversal(test3[0], thirdTest, test3);
  let outputTest3 = [];
  expect(outputTest3).toEqual(thirdTest);
});

/////////////// 5 NODE ONLY LEFT TREE (LINKED LIST) ////////////////////

NODE_TEST = "- 5 Node Tree Leftwards";

test("Preorder Traversal" + NODE_TEST, () => {
  let fourthTest = [];
  preOrderTraversal(test4[0], fourthTest, test4);
  let outputTest4 = [];
  test4.forEach((circle) => outputTest4.push(circle));
  expect(outputTest4).toEqual(fourthTest);
});

test("Inorder Traversal" + NODE_TEST, () => {
  let fourthTest = [];
  inOrderTraversal(test4[0], fourthTest, test4);
  let outputTest4 = [];
  for (let i = test4.length - 1; i >= 0; i--) outputTest4.push(test4[i]);
  expect(outputTest4).toEqual(fourthTest);
});

test("Postorder Traversal" + NODE_TEST, () => {
  let fourthTest = [];
  postOrderTraversal(test4[0], fourthTest, test4);
  let outputTest4 = [];
  for (let i = test4.length - 1; i >= 0; i--) outputTest4.push(test4[i]);
  expect(outputTest4).toEqual(fourthTest);
});

/////////////// 5 NODE ONLY RIGHT TREE (LINKED LIST) ////////////////////

NODE_TEST = "- 5 Node Tree Rightwards";

test("Preorder Traversal" + NODE_TEST, () => {
  let fifthTest = [];
  preOrderTraversal(test5[0], fifthTest, test5);
  let outputTest5 = [];
  test5.forEach((circle) => outputTest5.push(circle));
  expect(outputTest5).toEqual(fifthTest);
});

test("Inorder Traversal" + NODE_TEST, () => {
  let fifthTest = [];
  inOrderTraversal(test5[0], fifthTest, test5);
  let outputTest5 = [];
  test5.forEach((circle) => outputTest5.push(circle));
  expect(outputTest5).toEqual(fifthTest);
});

test("Postorder Traversal" + NODE_TEST, () => {
  let fifthTest = [];
  postOrderTraversal(test5[0], fifthTest, test5);
  let outputTest5 = [];
  for (let i = test5.length - 1; i >= 0; i--) outputTest5.push(test5[i]);
  expect(outputTest5).toEqual(fifthTest);
});
