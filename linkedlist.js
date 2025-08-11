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
    size(){
        return this.size;
    }
    head(){
        return this.head;
    }
    tail(){
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
        
    }
}

class Node{
    constructor(value = null){
        this.value = value;
        this.nextNode = null;
    }
}

const list = new LinkedList();

list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.append("turtle");

console.log(list.at(3));