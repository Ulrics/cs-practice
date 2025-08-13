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

    prettyPrint(node, prefix = '', isLeft = true){
        if (node === null) {
            return;
        }
        if (node.rightChild !== null) {
            prettyPrint(node.rightChild, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.dataType}`);
        if (node.leftChild !== null) {
            prettyPrint(node.leftChild, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    };
}


function buildTree(array){
    const arrLength = array.length;

    if(arrLength === 0){
        throw new Error("array empty");
    }
    
    let midIndex = Math.floor((arrLength - 1) / 2);
    let root = new Node(array[midIndex]);

    let queue = { node: root, range: [0, arrLength - 1]};
    let queueIndex = 0;

    while(queueIndex < queue.length){
        let currentQueueItem = queue[queueIndex];
        let currentNode = currentQueueItem.node;
        let [lower, upper] = currentQueueItem.range;
        let midIndex = lower + Math.floor((upper - lower) / 2);

        if(lower < midIndex){ //checks if there is a left branch
            let midLeftIndex = lower + Math.floor((midIndex - 1 - lower) / 2);
            let leftNode = new Node(array[midLeftIndex]);
            currentNode.leftchild = leftNode;
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

function sortedArrayToBST(arr) {
    let n = arr.length;

    if (n === 0)
        return null;

    // Create the root node
    let mid = Math.floor((n - 1) / 2);
    let root = new Node(arr[mid]);

    let queue = [ {node : root, range : [ 0, n - 1 ]} ];
    let frontIndex = 0;

    while (frontIndex < queue.length) {
        let front = queue[frontIndex];
        let curr = front.node;
        let [s, e] = front.range;
        let index = s + Math.floor((e - s) / 2); //finds middle value 

        // If left subtree exists
        if (s < index) {
            let midLeft = s + Math.floor((index - 1 - s) / 2);
            let left = new Node(arr[midLeft]);
            curr.left = left;
            queue.push({node : left, range : [ s, index - 1 ]});
        }

        // If right subtree exists
        if (e > index) {
            let midRight = index + 1 + Math.floor((e - index - 1) / 2);
            let right = new Node(arr[midRight]);
            curr.right = right;
            queue.push(
                {node : right, range : [ index + 1, e ]});
        }

        frontIndex++;
    }

    return root;
}
