export { HashMap }

class HashMap{
    constructor(loadFactor = 0.75, capacity = 16){
        this.loadFactor = loadFactor;
        this.capacity = capacity;
        this.buckets =  new Array(this.capacity);
        this.elements = 0;
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
        const hashIndex = this.hash(key);
        if(this.buckets[hashIndex] === undefined){
            this.buckets[hashIndex] = new LinkedList();
        }
        if(this.buckets[hashIndex].contains(key)){
            const listIndex = this.buckets[hashIndex].find(key);
            this.buckets[hashIndex].updateValue(listIndex, value);
            return;
        }
        this.buckets[hashIndex].prepend(key, value);
        this.elements++;
        if(this.isOverloaded()){
            this.resize();
        }
    }
    get(key){   
        const index = this.buckets[this.hash(key)];
        if (!index){
            return null;
        } 
        if(index.contains(key)){
            const listIndex = index.find(key);
            const node = index.at(listIndex);
            return node.value;
        }
        return null;
    }
    has(key){
        const index = this.buckets[this.hash(key)];
        if (!index){
            return false;
        } 
        if(index.contains(key)){
            return true;
        }
        return false;
    }
    remove(key){
        const hashIndex = this.hash(key);
        if(this.buckets[hashIndex] === undefined){
            return false;
        }
        if(this.buckets[hashIndex].contains(key)){
            const listIndex = this.buckets[hashIndex].find(key);
            this.buckets[hashIndex].removeAt(listIndex);
            this.elements--;
            return true;
        }
        return false;
    }
    length(){
        let totalKeys = 0;
        for(let i = 0; i < this.capacity; i++){
            let index = this.buckets[i]
            if(index === undefined){
                continue;
            }
            totalKeys+=index.getSize();
        }
        return totalKeys;
    }
    clear(){
        this.buckets =  new Array(this.capacity);
        this.elements = 0;
    }
    keys(){
        let keys = [];
        for(let i = 0; i < this.capacity; i++){
            let index = this.buckets[i]
            if(index === undefined){
                continue;
            }
            keys = keys.concat(index.crawlList("key"));
        }
        return keys;
    }
    values(){
        let values = [];
        for(let i = 0; i < this.capacity; i++){
            let index = this.buckets[i]
            if(index === undefined){
                continue;
            }
            values = values.concat(index.crawlList("value"));
        }
        return values;
    }
    entries(){
        let entries = [];
        for(let i = 0; i < this.capacity; i++){
            let index = this.buckets[i]
            if(index === undefined){
                continue;
            }
            entries = entries.concat(index.crawlAll());
        }
        return entries;
    }

    isOverloaded(){
       return (this.elements / this.capacity) > this.loadFactor;
    }
    resize(){
        const oldBuckets = this.buckets;
        this.buckets = new Array(this.capacity * 2);
        this.capacity = this.capacity * 2; 
        this.elements = 0
        for (const bucket of oldBuckets) {
            if (!bucket){
                continue;
            } 
            let currentNode = bucket.getHead();
            while (currentNode !== null) {
                this.set(currentNode.key, currentNode.value);
                currentNode = currentNode.nextNode;
            }
        }
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
    removeAt(index) {
        if (index < 0 || index >= this.size) return; 
        this.size--;
        if (index === 0) {
            this.head = this.head.nextNode;
            if (this.size === 0){
                this.tail = null; 
            } 
            return;
        }
        let currentNode = this.head;
        let previousNode = null;
        for (let i = 0; i < index; i++) {
            previousNode = currentNode;
            currentNode = currentNode.nextNode;
        }
        previousNode.nextNode = currentNode.nextNode;
        if (currentNode === this.tail) {
            this.tail = previousNode; 
        }
    }
    crawlList(property){
        let array = []
        let currentNode = this.head;
        while(currentNode !== null){
            array.push(currentNode[property])
            currentNode = currentNode.nextNode;
        }
        return array;
    }
    crawlAll(){
        let array = []
        let currentNode = this.head;
        while(currentNode !== null){
            array.push([currentNode.key, currentNode.value])
            currentNode = currentNode.nextNode;
        }
        return array;
    }

}

class Node{
    constructor(key, value = null){
        this.value = value;
        this.key = key;
        this.nextNode = null;
    }
}
