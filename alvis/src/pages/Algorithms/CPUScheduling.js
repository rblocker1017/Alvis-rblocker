export function fcfs(processes) {
    let timeCounter = 0;
    let totalWaiting = 0;
    let totalResponse = 0;
    let totalTat = 0;
    let procId = 0;
    let answer = [[
        { type: 'string', label: 'Task ID' },
        { type: 'string', label: 'Task Name' },
        { type: 'string', label: 'Process' },
        { type: 'date', label: 'Start Time' },
        { type: 'date', label: 'End Time' },
        { type: 'number', label: 'Duration' },
        { type: 'number', label: 'Percent Complete' },
        { type: 'string', label: 'Dependencies' },
    ],]
    let processList = processes;
    processList.sort((a, b) => {
        return (a.arrivalTime > b.arrivalTime) ? 1 : -1
    })
    processList.forEach(function (i) {
        if (i.arrivalTime > timeCounter) {
            timeCounter = i.arrivalTime;
        }
        totalResponse += timeCounter;
        totalTat += timeCounter + i.burstTime - i.arrivalTime;
        totalWaiting += timeCounter - i.arrivalTime
        answer.push([procId++, i.name, i.name, new Date(0, 0, 0, 0, 0, timeCounter), new Date(0, 0, 0, 0, 0, timeCounter + i.burstTime), null, 100, null])
        timeCounter = timeCounter + i.burstTime;
    })
    console.log((totalWaiting / processList.length).toFixed(2))
    return {answer: answer, turnaroundTime: (totalTat / processList.length).toFixed(2), waitingTime: (totalWaiting / processList.length).toFixed(2)};
}
export function sjf(processes) {
    let timeCounter = 0;
    let totalWaiting = 0;
    let totalTat = 0;
    let procId = 0;
    let answer = [[
        { type: 'string', label: 'Task ID' },
        { type: 'string', label: 'Task Name' },
        { type: 'string', label: 'Process' },
        { type: 'date', label: 'Start Time' },
        { type: 'date', label: 'End Time' },
        { type: 'number', label: 'Duration' },
        { type: 'number', label: 'Percent Complete' },
        { type: 'string', label: 'Dependencies' },
    ],]
    let processList = processes;
    processList.sort((a, b) => {
        return (a.burstTime > b.burstTime) ? 1 : -1
    })
    processList.forEach(function (i) {
        if (i.arrivalTime > timeCounter) {
            timeCounter = i.arrivalTime;
        }
        totalTat += timeCounter + i.burstTime - i.arrivalTime;
        totalWaiting += timeCounter - i.arrivalTime
        answer.push([procId++, i.name, i.name, new Date(0, 0, 0, 0, 0, timeCounter), new Date(0, 0, 0, 0, 0, timeCounter + i.burstTime), null, 100, null])
        timeCounter = timeCounter + i.burstTime;
    })
    return {answer: answer, turnaroundTime: (totalTat / processList.length).toFixed(2),waitingTime: (totalWaiting / processList.length).toFixed(2)};
}

export function roundRobin(processes, quantum) {
    let timeCounter = 0;
    let totalWaiting = 0;
    let totalTat = 0;
    let procId = 0;
    let answer = [[
        { type: 'string', label: 'Task ID' },
        { type: 'string', label: 'Task Name' },
        { type: 'string', label: 'Process' },
        { type: 'date', label: 'Start Time' },
        { type: 'date', label: 'End Time' },
        { type: 'number', label: 'Duration' },
        { type: 'number', label: 'Percent Complete' },
        { type: 'string', label: 'Dependencies' },
    ],]
    let processList = [...processes];
    processList.sort((a, b) => {
        return (a.arrivalTime > b.arrivalTime) ? 1 : -1
    });
    while (true) {
        let breakFlag = true;
        let jobSet = new Set();
        processList.forEach(function (i) {
            //if (i.arrivalTime > timeCounter) {
            //  timeCounter = i.arrivalTime;
            //}
            let randVal = Math.floor(Math.random() * 10000);
            if (i.arrivalTime <= timeCounter) {
                jobSet.add(i.name);
                if (i.burstTime > parseInt(quantum)) {
                    breakFlag = false;
                    answer.push([randVal, i.name, i.name, new Date(0, 0, 0, 0, 0, timeCounter), new Date(0, 0, 0, 0, 0, timeCounter + parseInt(quantum)), null, 100, null])

                    i.burstTime = i.burstTime - parseInt(quantum);
                    timeCounter = timeCounter + parseInt(quantum);

                } else if (i.burstTime <= parseInt(quantum) && i.burstTime > 0) {
                    breakFlag = false;
                    console.log("Burst time <= quan: " + i.burstTime)
                    answer.push([randVal, i.name, i.name, new Date(0, 0, 0, 0, 0, timeCounter), new Date(0, 0, 0, 0, 0, timeCounter + i.burstTime), null, 100, null])
                    timeCounter = timeCounter + i.burstTime;
                    i.burstTime = 0;
                    jobSet.delete(i.name);
                }
            } else {
                if (jobSet.size === 0) {
                    let tempBool = false;
                    let checkList = [...processes]
                    checkList.forEach(p => {
                        if (p.arrivalTime <= timeCounter) {
                            tempBool = true
                        }
                    })
                    if (tempBool) {
                        breakFlag = false;
                    } else {
                        timeCounter += 1;
                    }
                }
            }
            totalTat += timeCounter + i.burstTime - i.arrivalTime;
            totalWaiting += timeCounter - i.arrivalTime
        })
        // check if proc in future exits. 
        let tempList = [...processes]
        let checkFuture = false;
        tempList.forEach(p => {
            if (p.arrivalTime > timeCounter) {
                checkFuture = true;
            }
        })
        if (breakFlag) {
            break;
        }
    }
    return {answer: answer, turnaroundTime: totalTat / processList.length, waitingTime: totalWaiting / processList.length};
}

export function priorityFunc(processes) {
    let timeCounter = 0;
    let totalWaiting = 0;
    let totalTat = 0;
    let procId = 0;
    let answer = [[
        { type: 'string', label: 'Task ID' },
        { type: 'string', label: 'Task Name' },
        { type: 'string', label: 'Process' },
        { type: 'date', label: 'Start Time' },
        { type: 'date', label: 'End Time' },
        { type: 'number', label: 'Duration' },
        { type: 'number', label: 'Percent Complete' },
        { type: 'string', label: 'Dependencies' },
    ],]
    let processList = processes;
    processList.sort((a, b) => {
        return (a.priority > b.priority) ? 1 : -1
    })
    processList.forEach(function (i) {
        if (i.arrivalTime > timeCounter) {
            timeCounter = i.arrivalTime;
        }
        totalTat += timeCounter + i.burstTime - i.arrivalTime;
        totalWaiting += timeCounter - i.arrivalTime
        answer.push([procId++, i.name, i.name, new Date(0, 0, 0, 0, 0, timeCounter), new Date(0, 0, 0, 0, 0, timeCounter + i.burstTime), null, 100, null])
        timeCounter = timeCounter + i.burstTime;
    })
    return {answer: answer, turnaroundTime: totalTat / processList.length, waitingTime: totalWaiting / processList.length};
}
export function priorityFuncPreemptive(processes) {
    let timeCounter = 0;
    let totalWaiting = 0;
    let totalTat = 0;
    let procId = 0;
    let processList = [...processes];
    processList.sort((a, b) => {
        return (a.arrivalTime > b.arrivalTime) ? 1 : -1
    })
    let completed = 0;
    let usedProc = new Set();
    let startTime = 0
    let trackerArray = []
    let vizBuild = []
    for (let i = 0; completed != processList.length; i++) {
        let filteredList = processList.filter((proc) => {
            return (proc.arrivalTime <= i && proc.arrivalTime >= 0) && proc.burstTime > 0;
        })
        console.log('filteredList: ', filteredList)
        let priorSort = filteredList.sort((proc1, proc2) => {
            return proc1.priority - proc2.priority
        })
        console.log('Priority Sort: ', priorSort);

        if (priorSort.length > 0) {
            trackerArray[i] = priorSort[0].name;
            let obj = processList.find((o, i) => {
                if (o.name === priorSort[0].name && o.burstTime > 0) {
                    console.log('O is : ', o)
                    processList[i].burstTime = processList[i].burstTime - 1;
                    if (processList[i].burstTime == 0) {
                        completed++;
                    }
                    return true; // stop searching
                }
            });

        }
    }
    let starting = null;
    let startingTime = null;
    for (let i = 0; i <= trackerArray.length; i++) {
        if (trackerArray[i] != null) {
            if (starting === null) {
                starting = trackerArray[i]
                startingTime = i;
            } else {
                console.log('current Item: ' + trackerArray[i] + ' Starting Item: ' + starting)
                if (trackerArray[i] != starting) {
                    vizBuild.push({ name: starting, startTime: startingTime, endingTime: i });
                    starting = trackerArray[i];
                    startingTime = i;
                }
                if (trackerArray[i + 1] == null) {
                    vizBuild.push({ name: starting, startTime: startingTime, endingTime: i });
                    break;
                }
            }
        }
    }
    let answer = [[
        { type: 'string', label: 'Task ID' },
        { type: 'string', label: 'Task Name' },
        { type: 'string', label: 'Process' },
        { type: 'date', label: 'Start Time' },
        { type: 'date', label: 'End Time' },
        { type: 'number', label: 'Duration' },
        { type: 'number', label: 'Percent Complete' },
        { type: 'string', label: 'Dependencies' },
    ],] // building answer so we can pass it to visualization code. 
    vizBuild.forEach((i) => {
        let randVal = Math.floor(Math.random() * 10000);
        answer.push([randVal, i.name, i.name, new Date(0, 0, 0, 0, 0, i.startTime), new Date(0, 0, 0, 0, 0, i.endingTime), null, 100, null])
    })
    return {answer: answer, turnaroundTime: totalTat / processList.length,waitingTime: totalWaiting / processList.length};
}

export function sjfFuncPreemptive(processes) {
    let timeCounter = 0;
    let totalWaiting = 0;
    let totalTat = 0;
    let procId = 0;
    let processList = [...processes];
    processList.sort((a, b) => {
        return (a.arrivalTime > b.arrivalTime) ? 1 : -1
    })
    let completed = 0;
    let usedProc = new Set();
    let startTime = 0
    let trackerArray = []
    let vizBuild = []
    for (let i = 0; completed != processList.length; i++) {
        let filteredList = processList.filter((proc) => {
            return (proc.arrivalTime <= i && proc.arrivalTime >= 0) && proc.burstTime > 0;
        })
        let priorSort = filteredList.sort((proc1, proc2) => {
            return proc1.burstTime - proc2.burstTime
        })
        if (priorSort.length > 0) {
            trackerArray[i] = priorSort[0].name;
            let obj = processList.find((o, i) => {
                if (o.name === priorSort[0].name && o.burstTime > 0) {
                    processList[i].burstTime = processList[i].burstTime - 1;
                    if (processList[i].burstTime == 0) {
                        completed++;
                    }
                    return true; // stop searching
                }
            });

        }
    }
    let starting = null;
    let startingTime = null;
    for (let i = 0; i <= trackerArray.length; i++) {
        if (trackerArray[i] != null) {
            if (starting === null) {
                starting = trackerArray[i]
                startingTime = i;
            } else {
                if (trackerArray[i] != starting) {
                    vizBuild.push({ name: starting, startTime: startingTime, endingTime: i });
                    starting = trackerArray[i];
                    startingTime = i;
                }
                if (trackerArray[i + 1] == null) {
                    vizBuild.push({ name: starting, startTime: startingTime, endingTime: i });
                    break;
                }
            }
        }
    }
    let answer = [[
        { type: 'string', label: 'Task ID' },
        { type: 'string', label: 'Task Name' },
        { type: 'string', label: 'Process' },
        { type: 'date', label: 'Start Time' },
        { type: 'date', label: 'End Time' },
        { type: 'number', label: 'Duration' },
        { type: 'number', label: 'Percent Complete' },
        { type: 'string', label: 'Dependencies' },
    ],] // building answer so we can pass it to visualization code. 
    vizBuild.forEach((i) => {
        let randVal = Math.floor(Math.random() * 10000);
        answer.push([randVal, i.name, i.name, new Date(0, 0, 0, 0, 0, i.startTime), new Date(0, 0, 0, 0, 0, i.endingTime), null, 100, null])
    })
    return {answer: answer, turnaroundTime: totalTat / processList.length, waitingTime: totalWaiting / processList.length };
}