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
    if (this.size === 0) {
      this.front = newNode;
      this.rear = newNode;
    } else {
      this.rear.next = newNode;
      this.rear = newNode;
    }
    this.size++;
  }

  pop() {
    if (this.size === 0) return null;

    const removedData = this.front.data;
    if (this.front === this.rear) {
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
const filePath = process.platform === 'linux' ? '/dev/stdin' : '2458.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
let [N, M] = input[index++].split(' ').map(Number);
let graph = Array.from(Array(N + 1), () => []);
let rGraph = Array.from({ length: N + 1 }, () => []);

for (let i = 0; i < M; i++) {
  let [a, b] = input[index++].split(' ').map(Number);
  graph[a].push(b);
  rGraph[b].push(a);
}

function bfs(start, graph) {
  let queue = new Queue();
  queue.add(start);
  let visited = Array(N + 1).fill(false);
  visited[start] = true;
  let count = 0;

  while (queue.size > 0) {
    let current = queue.pop();
    count++;
    for (let neighbor of graph[current]) {
      if (!visited[neighbor]) {
        visited[neighbor] = true;
        queue.add(neighbor);
      }
    }
  }

  return count - 1;
}

let knownOrderCount = 0;
for (let i = 1; i <= N; i++) {
  let smallerCount = bfs(i, rGraph);
  let largerCount = bfs(i, graph);

  if (smallerCount + largerCount === N - 1) {
    knownOrderCount++;
  }
}

console.log(knownOrderCount);
