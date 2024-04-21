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
const filePath = process.platform === 'linux' ? 0 : '3055.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
let [R, C] = input[index++].split(' ').map(Number);
const board = Array.from({length:R}, ()=>[]);
const visited = Array.from({length:R}, ()=>Array(C).fill(false));
const water = [];
const s = [];
let bX, bY;

for(let i=0; i<R; i++) {
  let r = input[index++].split('');
  for(let j=0; j<C; j++) {
    board[i].push(r[j]);
    if(r[j] === '*') water.push([i, j, '*', 0]);
    if(r[j] === 'S') s.push([i, j, 'S', 0]);
    if(r[j] === 'D') {
      bX = i;
      bY = j;
    }
  }
}

const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];

let answer = 'KAKTUS';
let queue = new Queue();
water.forEach(w => {
  visited[w[0]][w[1]] = true;
  queue.add(w)
});
s.forEach(s => {
  visited[s[0]][s[1]] = true;
  queue.add(s)
});

while(queue.size > 0) {
  let [x, y, l, c] = queue.pop();
  if(l == 'S' && x === bX && y === bY) {
    answer = c;
    break;
  }
  for(let i=0; i<4; i++) {
    let nx = x + dx[i];
    let ny = y + dy[i];
    if(nx < 0 || ny < 0 || nx >= R || ny >= C) continue;
    if(board[nx][ny] === 'X') continue;
    if(board[nx][ny] === 'D' && l == 'S') {
      queue.add([nx, ny, l, c+1]);
      break;
    }
    if(!visited[nx][ny] && board[nx][ny] === '.' || board[nx][ny] === 'S') {
      if(l == '*') board[nx][ny] = '*';
      visited[nx][ny] = true;
      queue.add([nx, ny, l, c+1]);
    }
  }
}

console.log(answer);