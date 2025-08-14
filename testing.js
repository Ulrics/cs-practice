import { LinkedList } from "./linkedlist.js";
import { HashMap } from "./hashmap.js"
import { Tree } from "./binarytree.js";

const sortedTestArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

const testTree = new Tree(sortedTestArray);
console.log(prettyPrint(testTree.root));


function prettyPrint(node, prefix = '', isLeft = true){
        if (node === null) {
            return;
        }
        if (node.rightChild !== null) {
            prettyPrint(node.rightChild, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        if (node.leftChild !== null) {
            prettyPrint(node.leftChild, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    };
/*
LinkedList Testing
const list = new LinkedList();

list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.append("turtle");

list.insertAt("clown fish", 3);
list.removeAt(4);
console.log(list.toString());
*/

/*
HashMap Testing
const test = new HashMap()

test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');
test.set('moon', 'silver')

console.log(test.values());
*/