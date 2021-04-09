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
                page_faults += 1;
                filler = [];
                for (let j = i; j < frames - 1; j++) {  // Pushes a set amount of blank text to filler, allows columns to become uniform in size
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
                let val = indexes.shift();

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

export function lruPageReplacementFunc(pages ,frames){
    console.log("LRU ran.");
    let s = new Set()
    let answer = []
    let indexes = []
    let page_faults = 0;
    let lruArr = [];
    let prevStruct = []
    let filler = []

    for (let i = 0; i < pages.length; i++) {
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
                lruArr.unshift(pages[i])

                //console.log("Set: " + arr.toString())
                indexes.push(pages[i]);
                continue;
            }
        } else {
           // console.log("Getting val: for " + pages[i] + "---" + lruArr.toString())
            if (!s.has(pages[i])) {

                lruArr.pop();

                let val = lruArr[2]
                lruArr.unshift(pages[i])
               // console.log("val: " + val)

               // console.log("Lru arr Length: " + lruArr.length);


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
            lruArr.unshift(pages[i]);
        }
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