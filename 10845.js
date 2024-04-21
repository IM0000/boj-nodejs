class Queue {
  constructor() {
    this.queue = [];
  }

  push(value) {
    this.queue.push(value);
  }

  pop() {
    if(this.queue.length === 0) return -1;
    return this.queue.shift();
  }

  size() {
    return this.queue.length;
  }

  empty() {
    return this.queue.length === 0 ? 1 : 0;
  }

  front() {
    if(this.queue.length === 0) return -1;
    return this.queue[0];
  }

  back() {
    if(this.queue.length === 0) return -1;
    return this.queue[this.queue.length-1];
  }
}

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '10845.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
const N = +input[index++];

const q = new Queue();
const answer = [];
for(let i=0; i<N; i++) {
  const [command, num] = input[index++].split(' ');

  if(command === 'push') {
    q.push(num);
  } else if(command === 'pop') {
    answer.push(q.pop());
  } else if(command === 'size') {
    answer.push(q.size());
  } else if(command === 'empty') {
    answer.push(q.empty());
  } else if(command === 'front') {
    answer.push(q.front());
  } else if(command === 'back') {
    answer.push(q.back());
  }
}

console.log(answer.join('\n'));