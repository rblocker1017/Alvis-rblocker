//generates the initial value
//SIZE - number of graph
export function generateINIT(SIZE) {
  //declare variable
  let tempArray = [];
  for (let i = 0; i < SIZE; i++) {
    tempArray.push(Math.floor(Math.random() * 99) + 1);
  }
  return tempArray;
}
