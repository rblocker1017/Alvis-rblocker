// Bubble sort function
// @param a - array of data to be sorted
export function bubble(a) {
    // declare variables
    let len = a.length - 1;
    let array = a;
    let answer = [{
        data: array.toString(),
        swappedValue1: -1,
        swappedValue2: -1
    }];
    let list = [];
    let temp = 0;
    // repeat the bubble sort for the length of the algorithm
    for (let i = 0; i < len; i++) {
        // the actual bubble sort part
        // for every item in the array, float it up through the array
        for (let j = 0; j < len; j++) {
            if (array[j] > array[j + 1]) {
                temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
                // push an object every time a swap happens containing the data (aka the current array to string)
                // as well as the swapped values
                answer.push({
                    data: array.toString(),
                    swappedValue1: j,
                    swappedValue2: j + 1
                });
            }
        }
    }
    return answer;
}

// Insertion Sort fuction
// @param b - array of data to be sorted
export function insertion(b) {
    // declare variables
    let lenInsert = b.length;
    let arrayInsert = b;
    let answer = [{
        data: arrayInsert.toString(),
        swappedValue1: -1,
        swappedValue2: -1
    }];
    // repeat the insertion sort for the length of the algorithm
    for (let i = 1; i < lenInsert; i++) {
        let currentInsert = arrayInsert[i];
        let j = i;
        let swap1, swap2;
        //shift larger values to the right
        while (j > 0 && arrayInsert[j] < arrayInsert[j - 1]) {
            swap1 = arrayInsert[j];
            swap2 = arrayInsert[j - 1];
            arrayInsert[j] = swap2;
            arrayInsert[j - 1] = swap1;
            j--;
        }
        answer.push({
            data: arrayInsert.toString(),
            swappedValue1: j,
            swappedValue2: -1
        })
    }
    return answer;
}

// Selection Sort fuction
// @param c - array of data to be sorted
export function selection(c) {
    //declare variables
    let lenSelect = c.length;
    let arraySelect = c;
    let answer = [{
        data: arraySelect.toString(),
        swappedValue1: -1,
        swappedValue2: -1
    }];
    let temp = 0;
    for (let i = 0; i < lenSelect - 1; i++) {
        let minimum = i;
        for (let j = i + 1; j < lenSelect; j++) {
            if (arraySelect[j] < arraySelect[minimum]) {
                minimum = j;
            }
        }
        if (minimum != i) {
            // swaps to elements in an array 
            temp = arraySelect[i];
            arraySelect[i] = arraySelect[minimum];
            arraySelect[minimum] = temp;
            // push an object every time a swap happens containing the data (aka the current array to string)
            // as well as the swapped values
            answer.push({
                data: arraySelect.toString(),
                swappedValue1: i,
                swappedValue2: minimum
            });
        }
    }
    return answer;
}

// Heap Sort fuction
//sets up maximumum of heap
function maximumHeap(d, len, i, answer) {
    let left = i * 2 + 1;
    let right = left + 1;
    let maximum = i;
    if (left < len && d[left] > d[maximum]) {
        maximum = left;
    }
    if (right < len && d[right] > d[maximum]) {
        maximum = right;
    }
    if (maximum !== i) {
        [d[i], d[maximum]] = [d[maximum], d[i]]; //swaps elements
        answer.push({
            data: d.toString(),
            swappedValue1: i,
            swappedValue2: maximum
        });
        console.log(d[i] + " " + d[maximum]);
        maximumHeap(d, len, maximum, answer)
    }
    return answer;
}

// @param d - array of data to be sorted
export function heapSort(d) {
    //declare variables
    let lenHeap = d.length;
    let a = Math.floor(lenHeap / 2 - 1);
    let b = lenHeap - 1;
    let answer = [{
        data: d.toString(),
        swappedValue1: -1,
        swappedValue2: -1
    }];
    while (a >= 0) {
        maximumHeap(d, lenHeap, a, answer);
        a--;
    }
    while (b >= 0) {
        let swap1 = d[0];
        let swap2 = d[b];
        d[0] = swap2;
        d[b] = swap1;
        answer.push({
            data: d.toString(),
            swappedValue1: 0,
            swappedValue2: b
        });
        console.log(swap1 + " " + swap2)
        maximumHeap(d, b, 0, answer);
        b--;
    }
    return answer;
}
/*
 * Quicksort code based off os psudocode from geeksforgeeks.com/quick-sort/
 */
function partitionQuick(e, left, right, answer) {
    let pivot = e[right];
    let i = left - 1;
    for (let j = left; j <= right - 1; j++) {
        if (e[j] < pivot) {
            i++;
            e[i] = [e[j], e[j] = e[i]][0];
            answer.push({
                data: e.toString(),
                swappedValue1: i,
                swappedValue2: j
            });
        }
    }
    e[i + 1] = [e[right], e[right] = e[i + 1]][0];
    answer.push({
        data: e.toString(),
        swappedValue1: i + 1,
        swappedValue2: right
    });
    return i + 1;
}

// @param e - array of data to be sorted
function Quick(e, left, right, answer) {
    if (left < right) {
        let pi = partitionQuick(e, left, right, answer);

        Quick(e, left, pi - 1, answer);
        Quick(e, pi + 1, right, answer);
    }
    return e;
}

export function quickSort(e) {
    let answer = [{
        data: e.toString(),
        swappedValue1: -1,
        swappedValue2: -1
    }];
    Quick(e, 0, e.length - 1, answer);
    return answer;
}

//Shell Sort Function
// @param f - array of data to be sorted
export function shellSort(f) {
    //declare variable
    let len1 = f.length;
    let len = Math.floor(len1 / 2);
    let answer = [{
        data: f.toString(),
        swappedValue1: -1,
        swappedValue2: -1
    }];
    while (len > 0) {
        for (let i = len; i < len1; i++) {
            //declare variables
            let j = i;
            let temp = f[i];

            while (j >= len && f[j - len] > temp) {
                f[j] = f[j - len];
                j = j - len;
            }
            f[j] = temp;
            answer.push({
                data: f.toString(),
                swappedValue1: j,
                swappedValue2: i
            })
        }
        len = Math.floor(len / 2);
    }
    return answer;
}
