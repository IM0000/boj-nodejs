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

  enqueue(data) {
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

  dequeue() {
    if(this.size === 0) {
      return null;
    } else {
      const deqNode = this.front;
      this.front = this.front.next;
      this.size--;
      return deqNode;
    }
  }

  isEmpty() {
    return this.size === 0;
  }
}

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '12851.txt';
const [N,K] = fs.readFileSync(filePath).toString().split(' ').map(Number);

const queue = new Queue();
const visit = Array(100001).fill(100000);
let minDepth = Math.abs(N-K);
let cnt = 0;

visit[N] = 0;
queue.enqueue({x:N, depth:0});
bfs(N);

console.log(`${minDepth}\n${cnt}`)

function bfs(x) {
  
  while(queue.size !== 0) {
    let deq = queue.dequeue();

    if(deq.data.depth > minDepth) continue;
    
    let tx = deq.data.x, td = deq.data.depth;
    
    if(tx === K) {
      cnt++;
      if(minDepth > td) {
        minDepth = td;
      }
    }
  
    if(visit[tx*2] >= td+1 && tx*2 <= 100000) {
      visit[tx*2] = td+1;
      queue.enqueue({x: tx*2, depth: td+1});
    }
    if(visit[tx+1] >= td+1 && tx+1 <= 100000) {
      visit[tx+1] = td+1;
      queue.enqueue({x: tx+1, depth: td+1});
    }
    if(visit[tx-1] >= td+1 && tx-1 >= 0) {
      visit[tx-1] = td+1;
      queue.enqueue({x: tx-1, depth: td+1});
    }
  }
}
