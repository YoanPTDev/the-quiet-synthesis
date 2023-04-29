class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  // Add a node to the end of the list
  append(data) {
    const newNode = new Node(data);

    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.size++;
  }

  // Insert a node at the given position
  insertAt(data, position) {
    if (position < 0 || position > this.size) {
      return false;
    }

    const newNode = new Node(data);
    let current = this.head;
    let previous;
    let index = 0;

    if (position === 0) {
      newNode.next = current;
      this.head = newNode;
    } else {
      while (index++ < position) {
        previous = current;
        current = current.next;
      }
      newNode.next = current;
      previous.next = newNode;
    }
    this.size++;
    return true;
  }

  // Remove a node with the given data
  remove(data) {
    let current = this.head;
    let previous = null;

    while (current !== null) {
      if (current.data === data) {
        if (!previous) {
          this.head = current.next;
        } else {
          previous.next = current.next;
        }
        this.size--;
        return current.data;
      }
      previous = current;
      current = current.next;
    }
    return null;
  }

  // Find the index of a node with the given data
  indexOf(data) {
    let current = this.head;
    let index = 0;

    while (current !== null) {
      if (current.data === data) {
        return index;
      }
      index++;
      current = current.next;
    }
    return -1;
  }

  // Check if the list is empty
  isEmpty() {
    return this.size === 0;
  }

  // Get the size of the list
  sizeOfList() {
    return this.size;
  }

  // Print the list
  printList() {
    let current = this.head;
    let listStr = '';

    while (current) {
      listStr += current.data + ' -> ';
      current = current.next;
    }
    listStr += 'null';
    console.log(listStr);
  }
}

// How to use it.
// const list = new SinglyLinkedList();
// list.append(10);
// list.append(20);
// list.append(30);
// list.printList(); // 10 -> 20 -> 30 -> null

// list.insertAt(15, 1);
// list.printList(); // 10 -> 15 -> 20 -> 30 -> null

// list.remove(20);
// list.printList(); // 10 -> 15 -> 30 -> null

// console.log('Index of 30:', list.indexOf(30)); // Index of 30: 2
// console.log('List is empty:', list.isEmpty()); // List is empty: false
// console.log('Size of list:', list.sizeOfList()); // Size of list: 3