class HashMap{
    constructor(loadFactor = 0.75, capacity = 16){
        this.loadFactor = loadFactor;
        this.capacity = capacity;
        this.buckets = [];
    }
    hash(key){  
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
        return hashCode;
    } 
    set(key, value){
        this.capacity++;
        const index = this.buckets[hash(key)];
        if(index === undefined){
            index = new LinkedList;
        }
        if(index.contains(key)){
            const listIndex = index.find(key);
            index.updateValue(listIndex, value);
            return;
        }
        index.prepend(key, value);
    }
    get(key){   
        const index = this.buckets[hash(key)];
        if (index < 0 || index >= buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }
        if(index.contains(key)){
            const listIndex = index.find(key);
            const node = index.at(listIndex);
            return node.value;
        }
        return null;
    }
    has(key){
        const index = this.buckets[hash(key)];
        if(index.contains(key)){
            return true;
        }
        return false;
    }
    remove(key){
        const index = this.buckets[hash(key)];
        if(index.contains(key)){
            const listIndex = index.find(key);
            index.removeAt(listIndex);
            this.capacity--;
            return true;
        }
        return false;
    }
    length(){
        let totalKeys = 0;
        for(let i = 0; i < this.capacity; i++){
            let index = this.buckets[i]
            if(index === undefined){
                break;
            }
            totalKeys+=index.getSize();
        }
        return totalKeys;
    }
    clear(){

    }
    keys(){

    }
    values(){
        let valuesArray = [];
    }
    entries(){

    }
}

class LinkedList {
    constructor(){
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    prepend(key, value){
        const addNode = new Node(key, value);
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
    contains(key){
        let currentNode = this.head;
        while(currentNode !== null){
            if(currentNode.key === key){
                return true;
            }
            currentNode = currentNode.nextNode;
        }
        return false;
    }
    find(key){
        let currentNode = this.head;
        let index = 0;
        while(currentNode !== null){
            if(currentNode.key === key){
                return index;
            }
            currentNode = currentNode.nextNode;
            index++;
        }
        return null;
    }
    updateValue(index, value){
        let updateNode = this.at(index);
        updateNode.value = value;
    }
    removeAt(index){
        this.size--;
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
    constructor(key, value = null){
        this.value = value;
        this.key = key;
        this.nextNode = null;
    }
}
