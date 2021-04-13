export function fcfsPageReplacementFunc(pages, frames){
    console.log("FCFS ran.");
    let s = new Set()
    let answer = []
    let indexes = []
    let page_faults = 0;
    let prevStruct = []
    let filler = []
    for (let i = 0; i < pages.length; i++) {
        //prev struct keeps the order of the numbers correct. Set has unpredictable order.
        //console.log("For Loop");
        
        if (s.size < frames) { 
            if (!s.has(pages[i])) {    
                s.add(pages[i]);
                prevStruct = [...s] 
                page_faults += 1; // for the first x frame, where x is the maximum amount of frames, there will always be a page fault
                filler = [];
                for (let j = i; j < frames - 1; j++) {  // Pushes a set amount of blank text to filler, allows columns to become uniform in size
                    filler.push("");
                }
                let arr = {
                    column: [...s],
                    fault: "Fault"
                }
                answer.push({
                    column: [...s, ...filler],  // push both the set and the filler frame spaces to answer, along with a fault
                    fault: "❌"

                });
                //console.log("Set: " + arr.toString())
                indexes.push(pages[i]);
                continue;
            }
        } else {
            if (!s.has(pages[i])) {         // enter here if page is not loaded into memory and all frames have already been assigned
                let val = indexes.shift();  // removes the first element indexes and sets it equal to value

                s.delete(val);  // remove value from the set
                s.add(pages[i]) // add in new value to the set

                //console.log(prevStruct)
                const orderedAnswer = prevStruct.map(page => {  // orderAnswer is an Array with values from the previous column
                    if (s.has(page)) {                          // if the previous column is avaliable, grab it
                        return page;
                    } else {
                        return pages[i];                        // if previous column is not avaliable, return column at i position
                    }
                })
                prevStruct = orderedAnswer;
                answer.push({
                    column: orderedAnswer,
                    fault: "❌ "
                });
                indexes.push(pages[i])
                page_faults += 1;
                continue;
            }
        }
        answer.push({
            column: prevStruct,
            fault: "✔️"
        });
    }
    return {answer: answer, faults: page_faults};
}

export function lruPageReplacementFunc(pages ,frames){
    console.log("LRU ran.");
    let s = new Set()
    let answer = []
    let indexes = []
    let page_faults = 0;
    let lruArr = [];    // determines least recently used value
    let prevStruct = []
    let filler = []

    for (let i = 0; i < pages.length; i++) {    // loops through maximum amount of frames first, like FCFS and OPT
        if (s.size < frames) {
            if (!s.has(pages[i])) {
                s.add(pages[i]);
                prevStruct = [...s]
                page_faults += 1;
                filler = [];
                for (let j = i; j < frames - 1; j++) {
                    filler.push("");
                }
                let arr = {
                    column: [...s],
                    fault: "Fault"
                }
                answer.push({
                    column: [...s, ...filler],
                    fault: "❌"
                });

                //if(pages[i] !== lruArr[0])
                lruArr.unshift(pages[i])    // adds the value of reference string number to the head of the array

                //console.log("Set: " + arr.toString())
                indexes.push(pages[i]); 
                console.log("Getting value for lruArr " + lruArr)
                continue;
            }
        } else {
           // console.log("Getting val: for " + pages[i] + "---" + lruArr.toString())
            if (!s.has(pages[i])) { // enter here if page is not loaded into memory and all frames have already been assigned

                let val = lruArr.pop();   
                
                //let val = lruArr[1]
                lruArr.unshift(pages[i])

                //console.log("The value is " + val)

                s.delete(val);
                s.add(pages[i])
                const orderedAnswer = prevStruct.map(page => {
                    if (s.has(page)) {
                        return page;
                    } else {
                        return pages[i];
                    }
                })

                answer.push({
                    column: orderedAnswer,
                    fault: "❌ "
                });
                prevStruct = orderedAnswer;
                indexes.push(pages[i])
                page_faults += 1;
                continue;

                
            }
            let newVal = pages[i]   // get current value in our page array and set it to a temp var

            for(let k = 0; k < lruArr.length; k++){ // loop through the lruArr and see if a duplicate value exists
                if(newVal == lruArr[k]){            // if duplicate values exists, then remove it
                    lruArr.splice(k, 1)             // this allows lruArr to not double dip and add multiples values to the front
                }                                   // previously reference string of 1, 2, 3, 3, 3 would have a lruArr value of [3, 3, 3, 2, 1]
            }                                       // now lruArr should have the proper value of [3, 2, 1] for that string
            lruArr.unshift(pages[i]);
            
            
        }
        //lruArr.pop();
        console.log("Getting value for lruArr " + lruArr)
        answer.push({
            column: prevStruct,
            fault: "✔️"
        });
    }
    return {answer: answer, faults: page_faults};
}

export function optPageReplacementFunc(pages, frames){
    console.log("OPT ran.");
    let s = new Set()
    let answer = []
    let indexes = []
    let page_faults = 0;
    let prevStruct = []
    let filler = [];
    for (let i = 0; i < pages.length; i++) {
        //prev struct keeps the order of the numbers correct. Set has unpredictable order.
        //console.log("For Loop");
        if (s.size < frames) {

            if (!s.has(pages[i])) {
                s.add(pages[i]);
                prevStruct = [...s]
                page_faults += 1;
                filler = [];
                for (let j = i; j < frames - 1; j++) {
                    filler.push("");
                }
                let arr = {
                    column: [...s],
                    fault: "Fault"
                }
                answer.push({
                    column: [...s, ...filler],
                    fault: "❌"
                });
                //console.log("Set: " + arr.toString())
                indexes.push(pages[i]);
                continue;
            }
        } else {
            if (!s.has(pages[i])) {
                let val;
                let tempSet = new Set(s)
                if (!prevStruct.slice(i, pages.length).includes(pages[i])) {
                    let tempArr = [...prevStruct]
                    val = tempArr.shift();
                } else {
                    for (let j = i + 1; j < pages.length; j++) {
                        if (tempSet.has(pages[j])) {
                            //console.log("OPT " + pages[i])
                            val = pages[j]
                            tempSet.delete(pages[j]);
                            //console.log('Temp set: ', tempSet)
                        }
                    }
                }
               // console.log("VAL after for: " + val)
                s.delete(val);
                s.add(pages[i])
                //console.log(prevStruct)
                const orderedAnswer = prevStruct.map(page => {
                    if (s.has(page)) {
                        return page;
                    } else {
                        return pages[i];
                    }
                })
                prevStruct = orderedAnswer;
                answer.push({
                    column: orderedAnswer,
                    fault: "❌ "
                });
                indexes.push(pages[i])
                page_faults += 1;
                continue;
            }

        }
        answer.push({
            column: prevStruct,
            fault: "✔️"
        });
    }
    return {answer: answer, faults: page_faults};
}