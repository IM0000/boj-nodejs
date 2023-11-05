class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

class Dequeue {
  constructor() {
    this.front = null;
    this.rear = null;
    this.size = 0;
  }

  add(data) {
    const newNode = new Node(data);
    if (this.isEmpty()) {
      this.front = newNode;
      this.rear = newNode;
    } else {
      newNode.prev = this.rear;
      this.rear.next = newNode;
      this.rear = newNode;
    }
    this.size++;
  }

  addFront(data) {
    const newNode = new Node(data);
    if (this.isEmpty()) {
      this.front = newNode;
      this.rear = newNode;
    } else {
      newNode.next = this.front;
      this.front.prev = newNode;
      this.front = newNode;
    }
    this.size++;
  }

  peek() {
    if (this.isEmpty()) {
      return null;
    }
    return this.front.data;
  }

  pop() {
    if (this.isEmpty()) {
      return null;
    }
    const removedData = this.front.data;
    if (this.front === this.rear) {
      this.front = null;
      this.rear = null;
    } else {
      this.front = this.front.next;
      this.front.prev = null;
    }
    this.size--;
    return removedData;
  }

  popRear() {
    if (this.isEmpty()) {
      return null;
    }
    const removedData = this.rear.data;
    if (this.front === this.rear) {
      this.front = null;
      this.rear = null;
    } else {
      this.rear = this.rear.prev;
      this.rear.next = null;
    }
    this.size--;
    return removedData;
  }

  isEmpty() {
    return this.size === 0;
  }
}

// 테스트
const deque = new Dequeue();
deque.add(1);
deque.add(2);
deque.addFront(3);

console.log(deque.peek()); // 출력: 3

console.log(deque.pop()); // 출력: 3
console.log(deque.popRear()); // 출력: 2
console.log(deque.peek()); // 출력: 1
