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

  isEmpty() {
    return this.size === 0;
  }

  add(data) {
    const newNode = new Node(data);
    if(this.isEmpty()) {
      this.front = newNode;
      this.rear = newNode;
    } else {
      this.rear.next = newNode;
      this.rear = newNode;
    }
    this.size++;
  }

  pop() {
    if(this.isEmpty()) {
      return null;
    }
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
const filePath = process.platform === 'linux' ? '/dev/stdin' : '16953.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
let [A,B] = input[0].split(' ').map(Number);
const check = [];

const double = (data) => {
  return data*2;
}

const addOne = (data) => {
  return +(data + '1');
}

//bfs
const queue = new Queue();
check[A] = true;
queue.add(A);

let answer = 0;
while(!queue.isEmpty()) {
  const size = queue.size;

  let out = true;
  for(let i=0; i<size; i++) {
    let pop = queue.pop();
    // console.log(pop, answer);
    
    if(out && pop <= 1000000000) {
      out = false;
    }

    if(pop === B) {
      console.log(answer + 1);
      return;
    }

    const d = double(pop);
    if(!check[d] && d <= B) { // 2배
      check[d] = true;
      queue.add(d);
    }

    const a = addOne(pop);
    if(!check[a] && a <= B) {
      check[a] = true;
      queue.add(a);
    }
  }

  // 안 되는 케이스
  if(out) {
    console.log(-1);
    return;
  }
  answer++;
}
console.log(-1);