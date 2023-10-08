//queue
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
const filePath = process.platform === 'linux' ? '/dev/stdin' : '7569.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

// M:가로, N:세로
const [M,N,H] = input[0].split(' ').map(Number);

const cube = Array.from(Array(H), () => Array.from(Array(N), ()=>Array(M)));
// const visit = Array.from(Array(H), () => Array.from(Array(N), ()=>Array(M)));
const queue = new Queue();

let index = 1;
for(let i=0; i<H; i++){
  for(let j=0; j< N; j++) {
    const nArr = input[index].split(' ').map(Number);
    
    for(let k=0; k<nArr.length; k++) {
      // visit[i][j][k] = false;
      if(nArr[k] == 1) {
        // visit[i][j][k] = true;
        queue.add({h:i, n:j, m:k});
      }
    }
    
    cube[i][j] = nArr;
    index++;
  }
}
// console.log(queue.pop())
// console.log(visit)
//cube[h][n][m]
// console.log(cube[1][1][2])
let day = -1;
// 상, 하, 좌, 우, 위, 아래
const dh = [0,0,0,0,-1,1];
const dn = [-1,1,0,0,0,0];
const dm = [0,0,-1,1,0,0];

// 높이, 행, 열
function bfs() {
  
  while(!queue.isEmpty()) {
    let qSize = queue.size;

    for(let s=0; s<qSize; s++) {
      
      let {h,n,m} = queue.pop();
  
      for(let i=0; i<6; i++) {
        const nh = h + dh[i];
        const nn = n + dn[i];
        const nm = m + dm[i];

        if(nh<0 || nh>=H || nn<0 || nn>=N || nm<0 || nm>=M) continue; // 범위 벗어남
        
        if(cube[nh][nn][nm] === 0) {
          // visit[nh][nn][nm] = true;
          cube[nh][nn][nm] = 1;
          queue.add({h:nh, n:nn, m:nm});
        }
  
      }
    }

    day++;

  }

}

bfs();

for(var i=0; i<H; i++) {
  for(var j=0; j<N; j++) {
    for(var k=0; k<M; k++) {
      if(cube[i][j][k] === 0){
        day = -1;
        break;
      }
    }
  }
}

console.log(day);