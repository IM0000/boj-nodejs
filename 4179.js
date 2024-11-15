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
    if (this.size === 0) {
      return null;
    }
    const data = this.front.data;
    this.front = this.front.next;
    this.size--;
    return data;
  }
}

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '4179.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [n, m] = input[0].split(' ').map(Number);
const board = Array.from({ length: n }, () => Array(m).fill(0));
let jihun = [];
let fire = [];

for (let i = 0; i < n; i++) {
  const line = input[i + 1].split('');
  for (let j = 0; j < m; j++) {
    board[i][j] = line[j];
    if (line[j] === 'J') {
      jihun = [i, j];
    } else if (line[j] === 'F') {
      fire.push([i, j]);
    }
  }
}

const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];

const jihunQueue = new Queue();
const fireQueue = new Queue();
jihunQueue.push(jihun);
for (const f of fire) {
  fireQueue.push(f);
}
let time = 0;
let flag = false;

while (jihunQueue.size > 0) {
  time++;
  const jihunSize = jihunQueue.size;
  const fireSize = fireQueue.size;

  for (let i = 0; i < fireSize; i++) {
    const [x, y] = fireQueue.pop();
    for (let j = 0; j < 4; j++) {
      const nx = x + dx[j];
      const ny = y + dy[j];
      if (nx < 0 || nx >= n || ny < 0 || ny >= m) {
        continue;
      }
      if (board[nx][ny] === '.' || board[nx][ny] === 'J') {
        board[nx][ny] = 'F';
        fireQueue.push([nx, ny]);
      }
    }
  }

  for (let i = 0; i < jihunSize; i++) {
    const [x, y] = jihunQueue.pop();
    if (x === 0 || x === n - 1 || y === 0 || y === m - 1) {
      flag = true;
      break;
    }
    for (let j = 0; j < 4; j++) {
      const nx = x + dx[j];
      const ny = y + dy[j];
      if (nx < 0 || nx >= n || ny < 0 || ny >= m) {
        continue;
      }
      if (board[nx][ny] === '.') {
        board[nx][ny] = 'J';
        jihunQueue.push([nx, ny]);
      }
    }
  }

  if (flag) {
    break;
  }
}

if (flag) {
  console.log(time);
} else {
  console.log('IMPOSSIBLE');
}
