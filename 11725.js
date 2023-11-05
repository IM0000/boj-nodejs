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
    if (this.isEmpty()) {
      this.front = newNode;
      this.rear = newNode;
    } else {
      this.rear.next = newNode;
      this.rear = newNode;
    }
    this.size++;
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
    }
    this.size--;
    return removedData;
  }

  isEmpty() {
    return this.size === 0;
  }
}

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '11725.txt'
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const T = +input[0].trim();
const check = Array(T+1).fill(0);
const graph = [null];
for (let i = 1; i <= T; i++) graph.push([]);
for(let i=1; i<T; i++) {
  const [x, y] = input[i].split(' ').map(Number);
  graph[x].push(y);
  graph[y].push(x); 
}

//bfs
const queue = new Queue();
check[1] = 1;
queue.add(1);

while(!queue.isEmpty()) {
  const pop = queue.pop();

  const popArr = graph[pop];
  for(let i=0; i<popArr.length; i++) {
    const child = popArr[i];
    if(!check[child]) {
      check[child] = pop;
      queue.add(child);
    }
  }
}
// index 0,1 제외
check.splice(0,2);
console.log(check.join('\n'));