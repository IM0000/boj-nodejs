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
const filePath = process.platform === 'linux' ? '/dev/stdin' : '14502.txt';
const input = fs.readFileSync(filePath).toString().split('\n');

let index = 0;
const [N,M] = input[index++].split(' ').map(Number);

let map = [];
for(let i=0; i<N; i++) {
  map[i] = input[index++].split(' ').map(Number);
}

let res = 0;

makeWall(0);

function deepCopy2DArray(arr) {
  const copy = [];
  for (let i = 0; i < arr.length; i++) {
    const innerArr = arr[i];
    copy[i] = Array.isArray(innerArr) ? deepCopy2DArray(innerArr) : innerArr;
  }
  return copy;
}

function makeWall(cnt) {
  if(cnt === 3) {
    bfs();
    return;
  }

  for(let i=0; i<map.length; i++) {
    for(let j=0; j<map[i].length; j++) {
      if(map[i][j] === 0) {
        map[i][j] = 1;
        makeWall(cnt + 1);
        map[i][j] = 0;
      }
    }
  }
}

function bfs() {
  const queue = new Queue(); // {x:a, y:b}
  const dx = [0,0,-1,1];
  const dy = [-1,1,0,0];

  let tmp_map = deepCopy2DArray(map);

  for(let i=0; i<tmp_map.length; i++) {
    for(let j=0; j<tmp_map[i].length; j++) {
      if(tmp_map[i][j] === 2) {
        queue.add({x:i, y:j});
      }
    }
  }

  while(!queue.isEmpty()) {
    let pop = queue.pop();

    for(let i=0; i<4; i++) {
      let nx = pop.x + dx[i];
      let ny = pop.y + dy[i];

      if(nx>=0 && nx<N && ny>=0 && ny<M && tmp_map[nx][ny] !== 2 && tmp_map[nx][ny] !== 1) {
        tmp_map[nx][ny] = 2;
        queue.add({x:nx, y:ny});
      }
    }
  }

  let cnt = 0;
  for(let i=0; i<tmp_map.length; i++) {
    for(let j=0; j<tmp_map[i].length; j++) {
      if(tmp_map[i][j] === 0) {
        cnt += 1;
      }
    }
  }

  res = Math.max(res, cnt);

}

console.log(res);