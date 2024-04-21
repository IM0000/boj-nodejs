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

  add(data) {
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
    if(this.isEmpty()) return null;

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

  isEmpty() {
    return this.size === 0;
  }
}

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '2623.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
const [n,m] = input[index++].split(' ').map(Number);
const graph = Array.from(Array(n+1), () => []);
const preCnt = Array(n+1).fill(0);
for(let i=0; i<m; i++) {
  let [num, ...order] = input[index++].split(' ').map(Number);
  for(let j=0; j<num; j++) {
    preCnt[order[j]] += j;
    graph[order[j]].push(...order.slice(j+1));
  }
}

const queue = new Queue();
let answer = [];
for(let i=1; i<=n; i++) {
  if(preCnt[i] === 0) {
    queue.add(i);
    answer.push(i);
  }
}


while(!queue.isEmpty()) {
  let pop = queue.pop();
  let popGraph = graph[pop];

  for(let i=0; i<popGraph.length; i++) {
    if(--preCnt[popGraph[i]] === 0) {
      queue.add(popGraph[i]);
      answer.push(popGraph[i]);
    }
  }
}

let impossible = false;
for(let i=0; i<preCnt.length; i++) {
  if(preCnt[i] !== 0) {
    impossible = true;
    break;
  }
}

if(impossible) {
  console.log(0);
} else {
  console.log(answer.join('\n'));
}