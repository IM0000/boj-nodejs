const fs = require('fs');
const filePath = process.platform === 'linux' ?  '/dev/stdin' : '7576.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [M,N] = input.shift().split(' ').map(Number);

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

let queue = new Queue();
let map = [];
let check = false;

for(let i=0; i<N; i++) {
  map[i] = [];
  let rows = input[i].trim().split(' ').map(Number);
  
  for(let j=0; j<M; j++) {
    let data = rows[j];
    map[i][j] = data;
    
    if(data == 1) { // 익은 토마토 큐에 넣기
      queue.add({row:i, col:j});
    }
    
  }
}

// bfs
let level = -1;
const dy = [-1,1,0,0];
const dx = [0,0,-1,1];

while(!queue.isEmpty()) {
  let qSize = queue.size;
  
  for(let i=0; i<qSize; i++) {
    let {row,col} = queue.pop();
    
    for(var z=0; z<4; z++) {
      let nRow = row + dy[z];
      let nCol = col + dx[z];
      
      if(nRow<0||nRow>=N||nCol<0||nCol>=M) continue;
      if(map[nRow][nCol] == -1) continue;
      
      if(map[nRow][nCol] == 0) {
        map[nRow][nCol] = 1;
        queue.add({row:nRow, col:nCol});
      }
    }

  }
  level++;
}

// 익지 않은 토마토 있는지 체크
let zero = false;
for(var i=0; i<N; i++) {
  for(var j=0; j<M; j++) {
    if(map[i][j] == 0) {
      zero = true;
      break;
    }
  }
}

if(zero) {
  console.log(-1);
} else {
  console.log(level);
}