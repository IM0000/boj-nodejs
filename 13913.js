class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.front = null;
    this.rear = null;
    this.size = 0;
  }

  push(data) {
    const newNode = new Node(data);
    if(this.size === 0) {
      this.front = newNode;
      this.rear = newNode;
    } else {
      this.rear.next = newNode;
      this.rear = newNode;
    }
    this.size++;
  }

  pop() {
    if(this.size === 0) return null;
    const removedData = this.front.data;

    if(this.front === this.rear) {
      this.front = null;
      this.rear = null;
    } else {
      this.front = this.front.next;
    }
    this.size--;
    return removedData;
  }
}

const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '13913.txt';
const [N, K] = fs.readFileSync(filePath).toString().trim().split(' ').map(Number);

const queue = new Queue();
const visited = new Array(200001);

visited[N] = [null, 0]; // [이전위치, 이전시간]
queue.push(N);
let answer = 0;
while(queue.size > 0) {
  let popped = queue.pop();

  if(popped < 0 || popped > 100000) {
    continue;
  }

  if(popped === K) {
    break;
  }

  if(typeof visited[popped+1] === 'undefined') {
    visited[popped+1] = [popped, visited[popped][1]+1];
    queue.push(popped+1);
  }

  if(typeof visited[popped*2] === 'undefined') {
    visited[popped*2] = [popped, visited[popped][1]+1];
    queue.push(popped*2);
  }

  if(popped != 0 && typeof visited[popped-1] === 'undefined') {
    visited[popped-1] = [popped, visited[popped][1]+1];
    queue.push(popped-1);
  }
}

let path = [K];
let temp = K;
while(visited[temp][0] !== null) {
  path.push(visited[temp][0]);
  temp = visited[temp][0];
}
console.log(visited[K][1]);
console.log(path.reverse().join(' '));
