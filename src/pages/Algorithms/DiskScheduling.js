export function fcfsFunction(starting, input) {
    let answer = [];
    answer.push(['x', 'Path'])
    answer.push([parseInt(starting), 0])
    for (let i = 0; i < input.length; i++) {

        answer.push([input[i], i + 1]);
    }
    console.log("answer is: " + answer.toString());
    return answer;
}

export function scanFunction(starting, input) {
    let answer = [];
    answer.push(['x', 'SCAN path'])
    answer.push([parseInt(starting), 0])
    let smaller = input.filter((values) => {
        console.log("Value is type : " + (typeof values))
        return values < starting;
    });
    smaller.sort(function (a, b) { return a - b });
    console.log("Smaller sorted: " + smaller)
    smaller.reverse();
    console.log("Smaller reversed :" + smaller)
    smaller.push(0);
    console.log('Smaller after all: ' + smaller);
    let larger = input.filter((values) => {
        return values >= starting;
    });
    larger = larger.sort();
    console.table(larger)
    for (let i = 0; i < smaller.length; i++) {
        answer.push([smaller[i], i + 1])
    }

    for (let i = 0; i < larger.length; i++) {
        answer.push([larger[i], i + smaller.length + 1])
    }
    return answer;
}

export function scanOutwardsFunction(starting, input, diskSize) {
    let answer = [];
    answer.push(['x', 'SCAN outwards path'])
    answer.push([parseInt(starting), 0])
    let smaller = input.filter((values) => {
        console.log("Value is type : " + (typeof values))
        return values < starting;
    });
    smaller.sort(function (a, b) { return a - b });
    console.log("Smaller sorted: " + smaller)
    smaller.reverse();
    console.log("Smaller reversed :" + smaller)

    console.log('Smaller after all: ' + smaller);
    let larger = input.filter((values) => {
        return values >= starting;
    });
    larger.push(diskSize);
    larger = larger.sort();
    console.table(larger)

    for (let i = 0; i < larger.length; i++) {
        answer.push([larger[i], i + 1])
    }
    for (let i = 0; i < smaller.length; i++) {
        answer.push([smaller[i], i + larger.length + 1])
    }
    return answer;
}

export function lookFunction(starting, input) {
    let answer = [];
    answer.push(['x', 'Look path'])
    answer.push([parseInt(starting), 0])
    let smaller = input.filter((values) => {
        console.log("Value: " + values);
        console.log("Value" + (typeof values))

        return values < starting;
    });
    //smaller = smaller.sort().reverse();
    let larger = input.filter((values) => {
        return values >= starting;
    });
    larger = larger.sort(function (a, b) { return a - b });
    console.table(larger)
    for (let i = 0; i < smaller.length; i++) {
        answer.push([smaller[i], i + 1])
    }
    for (let i = 0; i < larger.length; i++) {
        answer.push([larger[i], i + smaller.length + 1])
    }

    return answer;
}

export function lookOutwardsFunction(starting, input) {
    let answer = [];
    answer.push(['x', 'Look outwards path'])
    answer.push([parseInt(starting), 0])
    let smaller = input.filter((values) => {
        console.log("Value is type : " + (typeof values))
        return values < starting;
    });
    smaller.sort(function (a, b) { return a - b });
    smaller.reverse();
    let larger = input.filter((values) => {
        return values >= starting;
    });
    larger = larger.sort();
    console.table(larger)
    for (let i = 0; i < larger.length; i++) {
        answer.push([larger[i], i + 1])
    }
    for (let i = 0; i < smaller.length; i++) {
        answer.push([smaller[i], i + larger.length + 1])
    }
    return answer;
}

export function cscanFunction(starting, input, diskSize) {
    let answer = [];
    answer.push(['x', 'SCAN path'])
    answer.push([parseInt(starting), 0])
    let firstSmaller = input.filter((values) => {
        console.log("Value is type : " + (typeof values))
        return values < starting;
    });
    firstSmaller.sort(function (a, b) { return a - b });
    firstSmaller.reverse();
    firstSmaller.push(0)
    for (let i = 0; i < firstSmaller.length; i++) {
        answer.push([firstSmaller[i], i + 1])
    }

    let secondSmaller = input.filter((values) => {
        console.log("Value is type : " + (typeof values))
        return values < diskSize;
    });
    let difference = secondSmaller.filter(x => !firstSmaller.includes(x));
    difference.reverse();
    difference.unshift(diskSize)
    for (let i = 0; i < difference.length; i++) {
        answer.push([difference[i], i + difference.length + 1])
    }
    return answer;
}

export function cscanOutwardsFunction(starting, input, diskSize) {
    let answer = [];
    answer.push(['x', 'Cscan outwards path'])
    answer.push([parseInt(starting), 0])
    let firstSmaller = input.filter((values) => {
        console.log("Value is type : " + (typeof values))
        return values > starting;
    });
    firstSmaller.sort(function (a, b) { return a - b });
    // firstSmaller.reverse();
    firstSmaller.push(diskSize)
    for (let i = 0; i < firstSmaller.length; i++) {
        answer.push([firstSmaller[i], i + 1])
    }
    let secondSmaller = input.filter((values) => {
        console.log("Value is type : " + (typeof values))
        return values > 0;
    });
    let difference = secondSmaller.filter(x => !firstSmaller.includes(x));
    difference.reverse();
    difference.unshift(0)
    for (let i = 0; i < difference.length; i++) {
        answer.push([difference[i], i + difference.length + 1])
    }
    return answer;
}

export function clookFunction(starting, input, diskSize) {
    let answer = [];
    answer.push(['x', 'SCAN path'])
    answer.push([parseInt(starting), 0])
    let firstSmaller = input.filter((values) => {
        console.log("Value is type : " + (typeof values))
        return values < starting;
    });
    firstSmaller.sort(function (a, b) { return a - b });
    firstSmaller.reverse();
    for (let i = 0; i < firstSmaller.length; i++) {
        answer.push([firstSmaller[i], i + 1])
    }

    let secondSmaller = input.filter((values) => {
        console.log("Value is type : " + (typeof values))
        return values < diskSize;
    });
    let difference = secondSmaller.filter(x => !firstSmaller.includes(x));
    difference.sort(function (a, b) { return a - b }).reverse();
    difference.unshift(diskSize)
    for (let i = 0; i < difference.length; i++) {
        answer.push([difference[i], i + difference.length])
    }
    return answer;
}

export function clookOutwardsFunction(starting, input) {
    let answer = [];
    answer.push(['x', 'cLook path'])
    answer.push([parseInt(starting), 0])
    let firstSmaller = input.filter((values) => {
        console.log("Value is type : " + (typeof values))
        return values > starting;
    });
    firstSmaller.sort(function (a, b) { return a - b });
    //firstSmaller.reverse();
    for (let i = 0; i < firstSmaller.length; i++) {
        answer.push([firstSmaller[i], i + 1])
    }
    let secondSmaller = input.filter((values) => {
        console.log("Value is type : " + (typeof values))
        return values > 0;
    });
    let difference = secondSmaller.filter(x => !firstSmaller.includes(x));
    difference.sort(function (a, b) { return a - b });
    difference.unshift(0)
    for (let i = 0; i < difference.length; i++) {
        answer.push([difference[i], i + difference.length])
    }
    return answer;
}