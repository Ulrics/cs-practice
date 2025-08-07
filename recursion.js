function fibs(num){
    let previous = 1;
    let preprevious = 0;
    let array = [0, 1];
    if(num == 1){
        return [0]
    }
    for(let i = 2; i < num; i++){
        let nextNum = previous + preprevious;
        array.push(nextNum);
        preprevious = previous;
        previous = nextNum;
    }
    return array;
}

function fibsRec(num){
    if(num == 1){
        return [0];
    }
    if(num <= 0){
        return [];
    }
    if (num === 2){
        return [0, 1];
    } 
    let prev = fibsRec(num - 1);
    let nextVal = prev[prev.length - 1] + prev[prev.length - 2];
    return prev.concat(nextVal);
}

function mergeSort(array){
    if (array.length === 0){
        return array;
    }
    if (array.length === 1){
        return array;
    }
    let middleIndex = Math.round(array.length / 2);
    let leftSide = array.slice(0, middleIndex);
    let rightSide = array.slice(middleIndex);
    let sortedLeft = mergeSort(leftSide);
    let sortedRight = mergeSort(rightSide);
    
    let sortedArray = []
    let leftPointer = 0;
    let rightPointer = 0;
    
    for(let i = 0; i < array.length; i++){
        if(leftPointer === sortedLeft.length){
            sortedArray = sortedArray.concat(sortedRight.slice(rightPointer));
            break;
        }  
        if(rightPointer === sortedRight.length){
            sortedArray = sortedArray.concat(sortedLeft.slice(leftPointer));
            break;
        }
        if(sortedLeft[leftPointer] > sortedRight[rightPointer]){
            sortedArray.push(sortedRight[rightPointer]);
            rightPointer++;
        }
        else if(sortedLeft[leftPointer] < sortedRight[rightPointer]){
            sortedArray.push(sortedLeft[leftPointer]);
            leftPointer++;
        }
        else{
            sortedArray.push(sortedLeft[leftPointer]);
            leftPointer++;
        }
    }
    return sortedArray;
}

//cleanest version of mergeSort according to GPT:

function mergeSortGPT(array) {
    if (array.length <= 1) return array;

    const middle = Math.floor(array.length / 2);
    const left = mergeSort(array.slice(0, middle));
    const right = mergeSort(array.slice(middle));

    const sorted = [];
    let i = 0, j = 0;

    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            sorted.push(left[i++]);
        } else {
            sorted.push(right[j++]);
        }
    }

    return sorted.concat(left.slice(i)).concat(right.slice(j));
}

console.log(mergeSort([3, 2, 1, 13, 8, 5, 0, 1]));

//codinggame problems:
var six = productOfArray([1,2,3]) // 6
var sixty = productOfArray([1,2,3,10]) // 60

function productOfArray(array){
    if(array.length == 0){
        return 1;
    }
    return array[0] * productOfArray(array.slice(1));
}


function replicate(numOfReplication, value){
    if(numOfReplication <= 0){
        return [];
    }
    return [value].concat(replicate(numOfReplication - 1, value));
}


