const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '1918.txt';
const input = fs.readFileSync(filePath).toString().trim();

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}
class Stack {
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
      newNode.next = this.rear;
      this.rear = newNode;
    }
    this.size++;
  }

  pop() {
    if(this.size === 0) {
      return null;
    }
    const popData = this.rear.data;
    if(this.front === this.rear) {
      this.front = null;
      this.rear = null;
    } else {
      this.rear = this.rear.next;
    }
    this.size--;
    return popData;
  }

  peek() {
    if(this.size === 0) {
      return null;
    }
    return this.rear.data;
  }
}

function priorityScore(char) {
  return {
    '+':1,
    '-':1,
    '*':2,
    '/':2
  }[char];
}

const stack = new Stack();

let ans = '';
for(let i=0; i<input.length; i++) {
  let char = input[i];
  
  if(/[A-Z]/.test(char)) {
    ans += char;
  } else if(char === '(') {
    stack.push(char);
  } else if(char === ')') {
    while(stack.size !== 0 && stack.peek() !== '(') {
      ans += stack.pop();
    }
    stack.pop(); // "(" 제거
  } else {
    while( stack.size !== 0 && priorityScore(stack.peek()) >= priorityScore(char) ) {
      ans += stack.pop();
    }
    stack.push(char);
  }
}

// 마지막 스택 비우기
while(stack.size !== 0) {
  ans += stack.pop();
}

console.log(ans);