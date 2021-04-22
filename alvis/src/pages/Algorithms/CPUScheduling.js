/* fcfs - work through each process in the order which they arrive
 * @param process - an array containing the process name, arrival time, and burst time.
 * @return answer - an array containing the Task ID(string), Task Name(string), the Process number(string), the Start and end time (date values), the duration(integer), the percentage copmlete(double), and dependencies (string)
 * @return turnaroundTime - a double value that is the average time all process spent between first execution and completion
 * @return waitingTime - a double value that is the average time that all process spent waiting before first execution
 */
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
    //Sort the process list by arrival time
    let processList = processes;
    processList.sort((a, b) => {
        return (a.arrivalTime > b.arrivalTime) ? 1 : -1
    })
    //For each process do the following
    processList.forEach(function (i) {
        //Set the time counter to the arrival time if the time counter is currently less
        if (i.arrivalTime > timeCounter) {
            timeCounter = i.arrivalTime;
        }
        //Add the processes turnaround and waiting time to the total
        totalTat += timeCounter + i.burstTime - i.arrivalTime;
        totalWaiting += timeCounter - i.arrivalTime
        //add the processes's id,name,start and end date, and duration to the answer array
        answer.push([procId++, i.name, i.name, new Date(0, 0, 0, 0, 0, timeCounter), new Date(0, 0, 0, 0, 0, timeCounter + i.burstTime), null, 100, null])
        //add the the burst time of the current process to the total timeCounter
        timeCounter = timeCounter + i.burstTime;
    })
    console.log((totalWaiting / processList.length).toFixed(2))
    return {answer: answer, turnaroundTime: (totalTat / processList.length).toFixed(2), waitingTime: (totalWaiting / processList.length).toFixed(2)};
}

/* sjf - work through the list of processes in the order of shortest burst time first.
 * @param process - an array containing the process name(string), arrival time(integer), and burst time(integer).
 * @return answer - an array containing the Task ID(string), Task Name(string), the Process number(string), the Start and end time (date values), the duration(integer), the percentage copmlete(double), and dependencies (string)
 * @return turnaroundTime - a double value that is the average time all process spent between first execution and completion
 * @return waitingTime - a double value that is the average time that all process spent waiting before first execution
 */
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

    //Sort the process list by burst time
    processList.sort((a, b) => {
        return (a.burstTime > b.burstTime) ? 1 : -1
    })
    //For each process do the following
    processList.forEach(function (i) {
        //Set the time counter to the arrival time if the time counter is currently less
        if (i.arrivalTime > timeCounter) {
            timeCounter = i.arrivalTime;
        }
         //Add the processes turnaround and waiting time to the total
        totalTat += timeCounter + i.burstTime - i.arrivalTime;
        totalWaiting += timeCounter - i.arrivalTime
        //add the processes's id,name,start and end date, and duration to the answer array
        answer.push([procId++, i.name, i.name, new Date(0, 0, 0, 0, 0, timeCounter), new Date(0, 0, 0, 0, 0, timeCounter + i.burstTime), null, 100, null])
        //add the the burst time of the current process to the total timeCounter
        timeCounter = timeCounter + i.burstTime;
    })
    return {answer: answer, turnaroundTime: (totalTat / processList.length).toFixed(2),waitingTime: (totalWaiting / processList.length).toFixed(2)};
}

/* roundRobin - Each process is worked on for a specific amount of time (time designated by the quantum) in the order they arrived. Loop through the list of processes until all have been completed
 * @param process - an array containing the process name (string), arrival time(integer), and burst time (integer).
 * @param quantum - an integer value
 * @return answer - an array containing the Task ID(string), Task Name(string), the Process number(string), the Start and end time (date values), the duration(integer), the percentage copmlete(double), and dependencies (string)
 * @return turnaroundTime - a double value that is the average time all process spent between first execution and completion
 * @return waitingTime - a double value that is the average time that all process spent waiting before first execution
 */
export function roundRobin(processes, quantum) {
    
    let timeCounter = 0;
    let totalWaiting = 0;
    let totalTat = 0;
    let procId = 0;
    let oldBurst = [];
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
    //Sort the process list by arrival time
    processList.sort((a, b) => {
        return (a.arrivalTime > b.arrivalTime) ? 1 : -1
    });
    processList.forEach(function (i) {
        oldBurst[i.name] = i.burstTime 
    })
    console.log(oldBurst[0])

    while (true) {
        let breakFlag = true;
        let jobSet = new Set();
        //for each process do the following
        processList.forEach(function (i) {
            let randVal = Math.floor(Math.random() * 10000);
            if (i.arrivalTime <= timeCounter) {
                //If a process has arrived add the process to the job set of process that have not been completed
                jobSet.add(i.name);

                //If the remaining burst time for the process is GREATER THAN the time quantum:
                 //     add the processes's id,name,start and end date, and a duration equal to the time quantum to the answer array.
                if (i.burstTime > parseInt(quantum)) {
                    breakFlag = false;
                    answer.push([randVal, i.name, i.name, new Date(0, 0, 0, 0, 0, timeCounter), new Date(0, 0, 0, 0, 0, timeCounter + parseInt(quantum)), null, 100, null])
                    //Lower the burst time of that process by the time quantum value, and increase the time counter by the time quantum value
                    i.burstTime = i.burstTime - parseInt(quantum);
                    timeCounter = timeCounter + parseInt(quantum);
                
                //If the remaining burst time for the process is LESS THAN the time quantum and has time left in the burst time:
                 //     add the processes's id,name,start and end date, and duration answer array.
                } else if (i.burstTime <= parseInt(quantum) && i.burstTime > 0) {
                    console.log("the burst time is" + i.burstTime)
                    breakFlag = false;
                    console.log("Burst time <= quan: " + i.burstTime)
                    answer.push([randVal, i.name, i.name, new Date(0, 0, 0, 0, 0, timeCounter), new Date(0, 0, 0, 0, 0, timeCounter + i.burstTime), null, 100, null])
                    timeCounter = timeCounter + i.burstTime;
                    i.burstTime = 0;
                    //remove the process from the set of processes that have not completed
                    jobSet.delete(i.name);
                }
            //If there are no processes in the job set and all processes have arrived, we can break from the while loop
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
        // check if there are processes in the list that still haven't arrived, if so we must stay in the While loop
        let tempList = [...processes]
        let checkFuture = false;
        tempList.forEach(p => {
            if (p.arrivalTime > timeCounter) {
                checkFuture = true;
            }
        })
        //If we have completed the burst time for all the processes, we can break from the while loop
        if (breakFlag) {
            break;
        }
    }
    processList.forEach(function (i) {
         i.burstTime = oldBurst[i.name]
    })
    console.log("Proccess length is " + processList.length)
    console.log("turnaround time is " + totalTat)
    console.log("waiting time is" + totalWaiting)
    return {answer: answer, turnaroundTime: totalTat / processList.length, waitingTime: totalWaiting / processList.length};
}

/* priority - work through each process in the order of highest priority (lower priority value = higher priority)
 * @param process - an array containing the process name(string), arrival time(integer), burst time(integer), and priority value (integer).
 * @return answer - an array containing the Task ID(string), Task Name(string), the Process number(string), the Start and end time (date values), the duration(integer), the percentage copmlete(double), and dependencies (string)
 * @return turnaroundTime - a double value that is the average time all process spent between first execution and completion
 * @return waitingTime - a double value that is the average time that all process spent waiting before first execution
 */
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
    //sort the process list by priority
    processList.sort((a, b) => {
        return (a.priority > b.priority) ? 1 : -1
    })
    //For each process do the following
    processList.forEach(function (i) {
        //Set the time counter to the arrival time if the time counter is currently less
        if (i.arrivalTime > timeCounter) {
            timeCounter = i.arrivalTime;
        }
         //Add the processes turnaround and waiting time to the total
        totalTat += timeCounter + i.burstTime - i.arrivalTime;
        totalWaiting += timeCounter - i.arrivalTime
        //add the processes's id,name,start and end date, and duration to the answer array
        answer.push([procId++, i.name, i.name, new Date(0, 0, 0, 0, 0, timeCounter), new Date(0, 0, 0, 0, 0, timeCounter + i.burstTime), null, 100, null])
          //add the the burst time of the current process to the total timeCounter
        timeCounter = timeCounter + i.burstTime;
    })
    return {answer: answer, turnaroundTime: totalTat / processList.length, waitingTime: totalWaiting / processList.length};
}

/* PreemptivePriority - work through each process in the order of highest priority (lower priority value = higher priority), if a  process with the highest remaing priority appears during execution, switch to it immediatly
 * @param process - an array containing the process name(string), arrival time(integer), burst time(integer), and priority value (integer).
 * @return answer - an array containing the Task ID(string), Task Name(string), the Process number(string), the Start and end time (date values), the duration(integer), the percentage copmlete(double), and dependencies (string)
 * @return turnaroundTime - a double value that is the average time all process spent between first execution and completion
 * @return waitingTime - a double value that is the average time that all process spent waiting before first execution
 */
export function priorityFuncPreemptive(processes) {
    let timeCounter = 0;
    let totalWaiting = 0;
    let totalTat = 0;
    let procId = 0;
    let processList = [...processes];
    //Sort the process list by arrival time
    processList.sort((a, b) => {
        return (a.arrivalTime > b.arrivalTime) ? 1 : -1
    })
    let completed = 0;
    let usedProc = new Set();
    let startTime = 0
    let trackerArray = []
    let vizBuild = []
    //While the number of completed processes is less than the total amount of processes, do the following. The variable 'i' is also used as the Time Counter
    for (let i = 0; completed != processList.length; i++) {
        //create a filtered list of processes who have arrived and have burst time left
        let filteredList = processList.filter((proc) => {
            return (proc.arrivalTime <= i && proc.arrivalTime >= 0) && proc.burstTime > 0;
        })
        console.log('filteredList: ', filteredList)
        //create a new list which is the filtered list sorted by priority
        let priorSort = filteredList.sort((proc1, proc2) => {
            return proc1.priority - proc2.priority
        })
        console.log('Priority Sort: ', priorSort);
        //For this time step, lower the burst time of the currently highest priority process by one, then move to the next time step
        if (priorSort.length > 0) {
            //Create a tracker array to keep track of the order in which the processes executued
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
    //Using the tracker array, add the process names, starting times, and ending times, in the correct order to vizBuild so it can be returned.
    for (let i = 0; i <= trackerArray.length; i++) {
        //While we have values in the tracker array do the following
        if (trackerArray[i] != null) {
            //Set starting to the first process in the tracker array
            if (starting === null) {
                starting = trackerArray[i]
                startingTime = i;
            } else {
                console.log('current Item: ' + trackerArray[i] + ' Starting Item: ' + starting)
                //When the tracker array reaches a new processes, push the old process to vizBuild then change starting to the new process
                if (trackerArray[i] != starting) {
                    vizBuild.push({ name: starting, startTime: startingTime, endingTime: i });
                    starting = trackerArray[i];
                    startingTime = i;
                }
                //If we have reached the last value of the tracker array, we are done and push the last process to vizBuild
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

/* Shortest Remaining Time First - work through each process in order of shortest burst time to longest. Ff a process with a new shortest remaing burst time appears during execution, switch to it immediatly
 * @param process - an array containing the process name(string), arrival time(integer), and burst time(integer).
 * @return answer - an array containing the Task ID(string), Task Name(string), the Process number(string), the Start and end time (date values), the duration(integer), the percentage copmlete(double), and dependencies (string)
 * @return turnaroundTime - a double value that is the average time all process spent between first execution and completion
 * @return waitingTime - a double value that is the average time that all process spent waiting before first execution
 */
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
    //While the number of completed processes is less than the total amount of processes, do the following. The variable 'i' is also used as the Time Counter
    for (let i = 0; completed != processList.length; i++) {
        //create a filtered list of processes who have arrived and have burst time left
        let filteredList = processList.filter((proc) => {
            return (proc.arrivalTime <= i && proc.arrivalTime >= 0) && proc.burstTime > 0;
        })
        //create a new list which is the filtered list sorted by lowest burst time first
        let priorSort = filteredList.sort((proc1, proc2) => {
            return proc1.burstTime - proc2.burstTime
        })
        //For this time step, lower the burst time of the process with the lowest current burst time by one.
        if (priorSort.length > 0) {
             //Create a tracker array to keep track of the order in which the processes executued
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
    //Using the tracker array, add the process names, starting times, and ending times, in the correct order to vizBuild so it can be returned.
    for (let i = 0; i <= trackerArray.length; i++) {
        //While we have values in the tracker array do the following
        if (trackerArray[i] != null) {
            //Set starting to the first process in the tracker array
            if (starting === null) {
                starting = trackerArray[i]
                startingTime = i;
            } else {
                //When the tracker array reaches a new processes, push the old process to vizBuild then change starting to the new process
                if (trackerArray[i] != starting) {
                    vizBuild.push({ name: starting, startTime: startingTime, endingTime: i });
                    starting = trackerArray[i];
                    startingTime = i;
                }
                //If we have reached the last value of the tracker array, we are done and push the last process to vizBuild
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