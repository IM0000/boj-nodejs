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
const filePath = process.platform === 'linux' ? '/dev/stdin' : '2206.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
const [N, M] = input[index++].trim().split(' ').map(Number);

const map = [];
for(let i=0; i<N; i++) {
  map[i] = input[index++].split('').map(Number);
}
const visited = Array.from(Array(N), ()=>Array(M).fill(0));
const visitedB = Array.from(Array(N), ()=>Array(M).fill(0));

const dx = [0,0,-1,1];
const dy = [-1,1,0,0];

//bfs
const queue = new Queue();
visited[0][0] = 1;
queue.add({x:0, y:0, break: false, d:1})

let arrived = false;
let last;
while(!queue.isEmpty()) {
  const pop = queue.pop();
  const cx = pop.x;
  const cy = pop.y;

  if(cx === N-1 && cy === M-1) {
    arrived = true;
    last = pop;
    break;
  }

  for(let z=0; z<4; z++) {
    const nx = cx + dx[z];
    const ny = cy + dy[z];

    if(nx >= 0 && nx < N && ny >= 0 && ny < M) {
      if(!pop.break && !visited[nx][ny]) { // 부수기 찬스 o
        if(map[nx][ny]) {
          visited[nx][ny] = 1;
          visitedB[nx][ny] = 1;
          // print(visited);
          // console.log('\n');
          queue.add({x: nx, y: ny, break: true, d: pop.d+1});
        } else {
          visited[nx][ny] = 1;
          visitedB[nx][ny] = 1;
          // print(visited);
          // console.log('\n');
          queue.add({x: nx, y: ny, break: false, d: pop.d+1});
        }
      } else if(pop.break && !visitedB[nx][ny]){
        if(!map[nx][ny]) {
          visitedB[nx][ny] = 1;
          // print(visited);
          // console.log('\n');
          queue.add({x: nx, y: ny, break: true, d: pop.d+1});
        }
      }
    }
  }
}

console.log(arrived ? last.d : -1);

// function print(arr) {
//   for(let i=0; i<arr.length; i++) {
//     console.log(arr[i].join(' '));
//   }
// }