export function inOrderTraversal(root, array, circles){
    if (root !== undefined) {
        if (root.leftChild !== null)
            inOrderTraversal(circles.find((circle) => circle.id === root.leftChild.id), array, circles);
        circles.forEach((circle) => {
            if (circle.id === root.id) {
                array.push(circle);
            }
        });
        if (root.rightChild !== null)
            inOrderTraversal(circles.find((circle) => circle.id === root.rightChild.id), array, circles);
    }
};

export function preOrderTraversal(root, array, circles){
    if (root !== undefined) {
        circles.map((circle) => {
            if (circle.id === root.id) array.push(circle);
        });
        if (root.leftChild !== null)
            preOrderTraversal(circles.find((circle) => circle.id === root.leftChild.id), array, circles);
        if (root.rightChild !== null)
            preOrderTraversal(circles.find((circle) => circle.id === root.rightChild.id), array, circles);
    }
};

export function postOrderTraversal(root, array, circles){
    if (root !== undefined) {
        if (root.leftChild !== null)
            postOrderTraversal(circles.find((circle) => circle.id === root.leftChild.id), array, circles);
        if (root.rightChild !== null)
            postOrderTraversal(circles.find((circle) => circle.id === root.rightChild.id), array, circles);
        circles.map((circle) => {
            if (circle.id === root.id) array.push(circle);
        });
    }
};