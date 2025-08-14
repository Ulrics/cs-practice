export { Tree }

class Node{
    constructor(data){
        this.data = data;
        this.leftChild = null;
        this.rightChild = null;
    }
}

class Tree{
    constructor(initArray){
        this.initArray = initArray;
        this.root = buildTree(initArray);
    }
}

function buildTree(array){
    const arrLength = array.length;

    if(arrLength === 0){
        throw new Error("array empty");
    }
    
    let mid = Math.floor((arrLength - 1) / 2);
    let root = new Node(array[mid]);

    let queue = [{ node: root, range: [0, arrLength - 1]}];
    let queueIndex = 0;

    while(queueIndex < queue.length){
        let currentQueueItem = queue[queueIndex];
        let currentNode = currentQueueItem.node;
        let [lower, upper] = currentQueueItem.range;
        let midIndex = lower + Math.floor((upper - lower) / 2);

        if(lower < midIndex){ //checks if there is a left branch
            let midLeftIndex = lower + Math.floor((midIndex - 1 - lower) / 2);
            Math.floor((lower + midIndex - 1) / 2)
            let leftNode = new Node(array[midLeftIndex]);
            currentNode.leftChild = leftNode;
            queue.push({ node: leftNode, range: [lower, (midLeftIndex - 1)]})
        }
        
        if(midIndex < upper){
            let midRightIndex = midIndex + Math.floor((upper - midIndex -1) / 2);
            let rightNode = new Node(array[midRightIndex]);
            currentNode.rightChild = rightNode;
            queue.push({ node: rightNode, range: [(midRightIndex + 1), upper]})
        }
        queueIndex++;
    }
    return root;//the level-0 root node.
}