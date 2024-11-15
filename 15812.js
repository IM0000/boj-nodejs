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
    if (this.size === 0) return null;
    const removedData = this.front.data;

    if (this.size === 1) {
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
const filePath = process.platform === 'linux' ? 0 : '15812.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
let index = 0;
const [N, M] = input[index++].split(' ').map(Number);
const board = [];
const houses = [];
const emptySpaces = [];

for (let i = 0; i < N; i++) {
  const row = input[index++].split('').map(Number);
  board.push(row);
  for (let j = 0; j < M; j++) {
    if (row[j] === 1) houses.push([i, j]);
    if (row[j] === 0) emptySpaces.push([i, j]);
  }
}

const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];
let minTime = Infinity;

const bfs = (start1, start2) => {
  const q = new Queue();
  const visited = Array.from({ length: N }, () => Array(M).fill(false));
  const dist = Array.from({ length: N }, () => Array(M).fill(Infinity));

  q.push([...start1, 0]);
  q.push([...start2, 0]);
  visited[start1[0]][start1[1]] = true;
  visited[start2[0]][start2[1]] = true;
  dist[start1[0]][start1[1]] = 0;
  dist[start2[0]][start2[1]] = 0;

  while (q.size !== 0) {
    const [x, y, time] = q.pop();

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx >= 0 && nx < N && ny >= 0 && ny < M && !visited[nx][ny]) {
        visited[nx][ny] = true;
        dist[nx][ny] = time + 1;
        q.push([nx, ny, time + 1]);
      }
    }
  }

  let maxDist = 0;
  for (const [hx, hy] of houses) {
    if (dist[hx][hy] === Infinity) return Infinity; // 모든 집이 감염되지 않으면 무한대 반환
    maxDist = Math.max(maxDist, dist[hx][hy]);
  }

  return maxDist;
};

for (let i = 0; i < emptySpaces.length; i++) {
  for (let j = i + 1; j < emptySpaces.length; j++) {
    const time = bfs(emptySpaces[i], emptySpaces[j]);
    minTime = Math.min(minTime, time);
  }
}

console.log(minTime);
