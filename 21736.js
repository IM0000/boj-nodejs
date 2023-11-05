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
const filePath = process.platform === 'linux' ? '/dev/stdin' : '21736.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N,M] = input[0].split(' ').map(Number);
let map = Array.from(Array(N), ()=>Array(M));
let visit = Array.from(Array(N), ()=>Array(M).fill(false));
const queue = new Queue();

for(let i=0; i<N; i++) {
  map[i] = input[i+1].split('');

  for(let j=0; j<M; j++) {
    if(map[i][j] === 'I') {
      visit[i][j] = true;
      queue.add({x:i,y:j});
    }
  }
}

const dx = [0,0,-1,1];
const dy = [-1,1,0,0];
let count = 0;

while(!queue.isEmpty()) {
  const {x,y} = queue.pop();

  for(let z=0; z<4; z++) {
    const nx = x + dx[z];
    const ny = y + dy[z];

    if(nx<0 || nx>=N || ny<0 || ny>=M) continue;

    if(!visit[nx][ny] && map[nx][ny] !== 'X') {
      visit[nx][ny] = true;
      queue.add({x:nx, y:ny});

      if(map[nx][ny] === 'P') {
        count++;
      }
    }
  }
}

if(count === 0) {
  console.log('TT');
} else {
  console.log(count)
}