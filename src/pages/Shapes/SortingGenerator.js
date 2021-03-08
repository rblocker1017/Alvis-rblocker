export function generateINIT(SIZE) {
    let tempArray = [];
    for (let i = 0; i < SIZE; i++) {
        tempArray.push(Math.floor(Math.random() * 99) + 1);
    }
    return tempArray;
}