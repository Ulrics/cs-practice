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
    insert(value){
        const newNode = new Node(value);

        if (this.root === null) {
            this.root = newNode;
            return;
        }

        let parent = null;
        let currentNode = this.root;
        while(currentNode !== null){
            if(currentNode.data === value){
                return;
            }
            if(currentNode.data > value){
                parent = currentNode
                currentNode = currentNode.leftChild;
            }
            else if(currentNode.data < value){
                parent = currentNode;
                currentNode = currentNode.rightChild;
            }
        }
        if(parent.data > value){
            parent.leftChild = newNode;
        }
        else{
            parent.rightChild = newNode;
        }
    }

    deleteItem(value, node = this.root){
        if (node === null) {
            return null; // Empty tree or value not found
        }

        if (value < node.data) {
            node.leftChild = this.deleteNode(node.leftChild, value); // Recurse left
        } else if (value > node.data) {
            node.rightChild = this.deleteNode(root.rightChild, value); // Recurse right
        } else {
            // Node to be deleted found

            // Case 1: Node has no left child (or no children)
            if (node.leftChild === null) {
                return node.rightChild;
            }
            // Case 2: Node has no right child
            else if (node.rightChild === null) {
                return node.leftChild;
            }
            // Case 3: Node has two children
            else {
                const temp = getSuccessor(node.right); // Find inorder successor
                node.data = temp.data; // Replace value
                node.right = this.deleteItem(node.right, temp.data); // Delete inorder successor
            }
        }
    }

    find(value){
        let currentNode = this.root;
        while(currentNode !== null){
            if(currentNode.data === value){
                return currentNode;
            }
            if(currentNode.data > value){
                currentNode = currentNode.leftChild;
            }
            else if(currentNode.data < value){
                currentNode = currentNode.rightChild;
            }
        }
        if(currentNode === null){
            return null;
        }
    }

    levelOrderForEach(callback){
        if(callback === undefined){
            throw new Error("Callback function required");
        }
        let queue = [];
        queue.push(this.root);
        let currentIndex = 0;

        while(currentIndex < queue.length){
            let currentNode = queue[currentIndex];
            if(currentNode.leftChild !== null){
                queue.push(currentNode.leftChild);
            }
            if(currentNode.rightChild !== null){
                queue.push(currentNode.rightChild);
            }
            callback(currentNode);
            currentIndex++;
        }
    }

    preOrderForEach(callback, node = this.root){
        if(callback === undefined){
            throw new Error("Callback function required");
        }
        if(node === null){
            return;
        }
        callback(node);
        this.preOrderForEach(callback, node.leftChild);
        this.preOrderForEach(callback, node.rightChild);
    }

    inOrderForEach(callback, node = this.root){
        if(callback === undefined){
            throw new Error("Callback function required");
        }
        if(node === null){
            return;
        }
        this.inOrderForEach(callback, node.leftChild);
        callback(node);
        this.inOrderForEach(callback, node.rightChild);
    }

    postOrderForEach(callback, node = this.root){
        if(callback === undefined){
            throw new Error("Callback function required");
        }
        if(node === null){
            return;
        }
        this.postOrderForEach(callback, node.leftChild);
        this.postOrderForEach(callback, node.rightChild);
        callback(node);
    }

    height(value){
        let node = this.find(value);
        if(node === null){
            return null;
        }
        let queue = [];
        queue.push({ node: node, level: 0 });

        let currentIndex = 0;
        let maxHeight = 0;

        while(currentIndex < queue.length){
            let currentNode = queue[currentIndex].node;
            let level = queue[currentIndex].level
            maxHeight = Math.max(maxHeight, level);

            if(currentNode.leftChild !== null){
                queue.push({ node: currentNode.leftChild, level: level + 1});
            }
            if(currentNode.rightChild !== null){
                queue.push({ node: currentNode.rightChild, level: level + 1});
            }
            currentIndex++;
        }
        return maxHeight;
    }

    depth(value, node = this.root){
        if(!this.find(value)){
            return null;
        }
        if(value === node.data){
            return 0;
        }
        if(node.data > value){
            return this.depth(value, node.leftChild) + 1;
        }
        else if(node.data < value){
            return this.depth(value, node.rightChild) + 1;
        }
    }

    isBalanced(){
        check(this.root).balanced;
    }
}

function getSuccessor(node) {
    node = node.right;
    while (node !== null && node.left !== null) {
        node = node.left;
    }
    return node;
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
            let midLeftIndex = Math.floor((lower + (midIndex - 1)) / 2);
            let leftNode = new Node(array[midLeftIndex]);
            currentNode.leftChild = leftNode;
            queue.push({ node: leftNode, range: [lower, midIndex - 1]})
        }
        
        if(midIndex < upper){
            let midRightIndex = Math.floor(((midIndex + 1) + upper) / 2);
            let rightNode = new Node(array[midRightIndex]);
            currentNode.rightChild = rightNode;
            queue.push({ node: rightNode, range: [midIndex + 1, upper]})
        }
        queueIndex++;
    }
    return root;//the level-0 root node.
}

 function check(node) {
        if (node === null){
            return { balanced: true, height: 0 };
        }

        const left = check(node.leftChild);
        if (!left.balanced){
            return { balanced: false, height: 0 };
        } 

        const right = check(node.rightChild);
        if (!right.balanced){
            return { balanced: false, height: 0 };
        } 
        const balanced = Math.abs(left.height - right.height) <= 1;
        const height = Math.max(left.height, right.height) + 1;

        return { balanced, height };
    }
