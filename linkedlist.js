export {LinkedList};

class LinkedList {
    constructor(){
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    append(value){  
        const addNode = new Node(value);
        this.size++;
        if(this.head === null){
            this.head = addNode;
            this.tail = addNode;
        }
        else{
            this.tail.nextNode = addNode;
            this.tail = addNode;
        }
    }
    prepend(value){
        const addNode = new Node(value);
        this.size++;
        if(this.head === null){
            this.head = addNode;
            this.tail = addNode;
        }
        else{
            addNode.nextNode = this.head;
            this.head = addNode;
        }
    }
    getSize(){
        return this.size;
    }
    getHead(){
        return this.head;
    }
    getTail(){
        return this.tail;
    }
    at(index){
        let currentNode = this.head;
        for(let i = 1; i <= index; i++){
            currentNode = currentNode.nextNode;
            if(currentNode === null){
                return null;
            }
            if(i === index){
                break;
            }
        }
        return currentNode;
    }
    pop(){
        let currentNode = this.head;
        let previousNode;
        while(currentNode !== this.tail){
            previousNode = currentNode;
            currentNode = currentNode.nextNode;
        }
        previousNode.nextNode = null;
        this.tail = previousNode;
        this.size--;
    }
    contains(value){
        let currentNode = this.head;
        while(currentNode !== null){
            if(currentNode.value === value){
                return true;
            }
            currentNode = currentNode.nextNode;
        }
        return false;
    }
    find(value){
        let currentNode = this.head;
        let index = 0;
        while(currentNode !== null){
            if(currentNode.value === value){
                return index;
            }
            currentNode = currentNode.nextNode;
            index++;
        }
        return null;
    }
    toString(){
        let currentNode = this.head;
        let printString = "";
        while(currentNode !== null){
            printString = printString.concat(`( ${currentNode.value} ) -> `)
            currentNode = currentNode.nextNode;
        }
        printString = printString.concat(`null`);
        return printString;
    }
    insertAt(value, index){
        let currentNode = this.head;
        let previousNode = null;
        const addNode = new Node(value);
        while(currentNode !== this.at(index)){
            previousNode = currentNode;
            currentNode = currentNode.nextNode;
        }
        previousNode.nextNode = addNode;
        addNode.nextNode = currentNode;
    }
    removeAt(index){
        let currentNode = this.head;
        let previousNode = null;
        let nextNode = null;
        while(currentNode !== this.at(index)){
            previousNode = currentNode;
            currentNode = currentNode.nextNode;
            nextNode = currentNode.nextNode;
        }
        previousNode.nextNode = nextNode;
    }
}

class Node{
    constructor(value = null){
        this.value = value;
        this.nextNode = null;
    }
}

