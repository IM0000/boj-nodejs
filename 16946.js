class Node {
  // value = {x,y}
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  enqueue(value) {
    const newNode = new Node(value);
    if (this.size === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.size++;
  }

  dequeue() {
    if (this.size === 0) return;
    const value = this.head.value;
    this.head = this.head.next;
    this.size--;
    return value;
  }
}

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '16946.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
let [N, M] = input[index++].split(' ').map(Number);
let map = [];
for (let i = 0; i < N; i++) {
  map.push(input[index++].split(''));
}

// 상 하 좌 우
const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];
let groupNum = 2;
const bfs = (x, y) => {
  const queue = new Queue();
  let cnt = 1;
  queue.enqueue({ x, y });

  while (queue.size !== 0) {
    const { x, y } = queue.dequeue();
    map[x][y] = groupNum;
    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];
      if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;
      if (map[nx][ny] != 0) continue;
      
      queue.enqueue({ x: nx, y: ny });
      cnt++;
    }
  }
  groupNum++;
  return [groupNum-1,cnt];
}

const count = Array(groupNum);

for(let i=0; i<N; i++) {
  for(let j=0; j<M; j++) {
    if(map[i][j] === '0') {
      let [g,cnt] = bfs(i, j);
      count[g] = cnt;
    }
  }
}
// console.log(map);
// console.log(count);

for(let i=0; i<N; i++) {
  for(let j=0; j<M; j++) {

    if(map[i][j] === '1') {
      let groupCheck = Array(groupNum+1).fill(false);
      let sum = 0;
      for(let k=0; k<4; k++) {
        const nx = i + dx[k];
        const ny = j + dy[k];
        if(nx < 0 || ny < 0 || nx >= N || ny >= M) continue;
        if(map[nx][ny] === '1') continue;
        if(typeof map[nx][ny] !== 'number') continue;
        if(groupCheck[map[nx][ny]]) continue;
        groupCheck[map[nx][ny]] = true;
        sum += count[map[nx][ny]];
      }
      map[i][j] = (sum + 1) % 10 + '';
    }
  }
}
// console.log("🚀 ~ map:", map)

for(let i=0; i<N; i++) {
  for(let j=0; j<M; j++) {
    if(typeof map[i][j] === 'number') map[i][j] = '0';
  }
}

console.log(map.map(item => item.join('')).join('\n'));
