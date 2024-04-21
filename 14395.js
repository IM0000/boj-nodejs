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
const filePath = process.platform === 'linux' ? 0 : '14395.txt';
const input = fs.readFileSync(filePath).toString().trim();

let [s,t] = input.split(' ').map(BigInt);

if(s === t) {
  console.log(0);
  process.exit();
}
let visited = new Set();
let answer = [];
let operate = ['*','+','-','/'];

const bfs = (s) => {
  let queue = new Queue();
  visited.add(s);
  queue.push([s,'']);

  while(queue.size) {
    let pop = queue.pop();
    let [x, op] = pop;
    
    if(x === t) {
      answer.push(op);
      return;
    }

    if(x === 0) {
      continue;
    }

    for(let i = 0; i < 4; i++) {
      let oo = operate[i];

      if(oo === '*') {
        if(visited.has(x*x) || x*x > 1000000000n) continue;
        visited.add(x*x);
        queue.push([x*x, op+oo]);
      } else if(oo === '+') {
        if(visited.has(x+x) || x+x > 1000000000n) continue;
        visited.add(x+x);
        queue.push([x+x, op+oo]);
      } else if(oo === '-') {
        if(visited.has(0n)) continue;
        visited.add(0n);
        queue.push([0n, op+oo]);
      } else if(oo === '/') {
        if(visited.has(1n)) continue;
        visited.add(1n);
        queue.push([1n, op+oo]);
      }
      
    }
  }
}

bfs(s);
console.log(answer.length !== 0 ? answer[0] : '-1');