/* inOrderTraversal - performs the in-order traversal for the given tree
 * @param root - the current node traversing the tree
 * @param array - the array where all of the values are being appended to
 * @param circles - an array filled with the tree structure
 * @return after each iteration is done
 */
export function inOrderTraversal(root, array, circles){
    if (root !== undefined) {
        if (root.leftChild !== null)
            inOrderTraversal(circles.find((circle) => circle.id === root.leftChild), array, circles);
        circles.forEach((circle) => {
            if (circle.id === root.id) {
                array.push(circle);
            }
        });
        if (root.rightChild !== null)
            inOrderTraversal(circles.find((circle) => circle.id === root.rightChild), array, circles);
    }
};

/* preOrderTraversal - performs the pre-order traversal for the given tree
 * @param root - the current node traversing the tree
 * @param array - the array where all of the values are being appended to
 * @param circles - an array filled with the tree structure
 * @return after each iteration is done
 */
export function preOrderTraversal(root, array, circles){
    if (root !== undefined) {
        circles.map((circle) => {
            if (circle.id === root.id) array.push(circle);
        });
        if (root.leftChild !== null)
            preOrderTraversal(circles.find((circle) => circle.id === root.leftChild), array, circles);
        if (root.rightChild !== null)
            preOrderTraversal(circles.find((circle) => circle.id === root.rightChild), array, circles);
    }
};

/* postOrderTraversal - performs the post-order traversal for the given tree
 * @param root - the current node traversing the tree
 * @param array - the array where all of the values are being appended to
 * @param circles - an array filled with the tree structure
 * @return after each iteration is done
 */
export function postOrderTraversal(root, array, circles){
    if (root !== undefined) {
        if (root.leftChild !== null)
            postOrderTraversal(circles.find((circle) => circle.id === root.leftChild), array, circles);
        if (root.rightChild !== null)
            postOrderTraversal(circles.find((circle) => circle.id === root.rightChild), array, circles);
        circles.map((circle) => {
            if (circle.id === root.id) array.push(circle);
        });
    }
};