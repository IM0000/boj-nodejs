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
const filePath = process.platform === 'linux' ? '/dev/stdin' : '2252.txt';
const input = fs.readFileSync(filePath).toString().split('\n');

let index = 0;
const [n,m] = input[index++].split(' ').map(Number);
const preCnt = Array(n).fill(0);
const post = Array.from({length:n}, ()=>[]);
let answer = [];

for(let i=0; i<m; i++) {
  let [s,l] = input[index++].split(' ').map(Number);
  preCnt[l-1] += 1;
  post[s-1].push(l-1);
}

const q = new Queue();
for(let i=0; i<n; i++) {
  if(preCnt[i] === 0) {
    q.add(i);
  }
}

while(!q.isEmpty()) {
  let pop = q.pop();
  answer.push(pop+1);
  let postList = post[pop];
  
  for(let i=0; i<postList.length; i++) {
    let pn = postList[i];
    if(--preCnt[pn] === 0) q.add(pn);
  }

}

console.log(answer.join(' '));