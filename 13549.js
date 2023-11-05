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

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '13549.txt';
const [N, K] = fs.readFileSync(filePath).toString().trim().split(' ').map(Number);

const dataMap = new Map();
const deq = new Dequeue();

dataMap.set(N, true);
deq.add({data: N, cnt: 0});

while(!deq.isEmpty()) {
  const pop = deq.pop();

  if(pop.data === K) {
    console.log(pop.cnt);
    break;
  }
  
  if(!dataMap.has(pop.data*2) && pop.data*2 <= 100000 && pop.data < K*2) {
    dataMap.set(pop.data*2, true);
    deq.addFront({data: pop.data*2, cnt: pop.cnt});
  }

  if(!dataMap.has(pop.data-1) && pop.data-1 >= 0) {
    dataMap.set(pop.data-1, true);
    deq.add({data: pop.data-1, cnt: pop.cnt+1});
  }

  if(!dataMap.has(pop.data+1) && pop.data+1 <= 100000) {
    dataMap.set(pop.data+1, true);
    deq.add({data: pop.data+1, cnt: pop.cnt+1});
  }

}
