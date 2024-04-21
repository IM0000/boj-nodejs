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

    if(this.size === 0) {
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

    const rNode = this.front;

    if(this.front === this.rear) {
      this.front = null;
      this.rear = null;
    } else {
      this.front = this.front.next;
    }
    this.size--;
    return rNode;
  }
}

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '2638.txt';
const input = fs.readFileSync(filePath).toString().split('\n');
const dx = [0,0,-1,1];
const dy = [-1,1,0,0];

let index = 0;
const [N,M] = input[index++].split(' ').map(Number);
const map = Array(N);

for(let i=0; i<N; i++) {
  map[i] = input[index++].split(' ').map(Number);
}

let res = 0;
do {
  diffusion(0,0);
  melting();
  res++  
} while (!allMeltedCheck());

console.log(res);

function diffusion(n,m) {
  const queue = new Queue();
  map[n][m] = 2;
  queue.add({x:n,y:m});

  while(queue.size !== 0) {
    const pop = queue.pop();
    let cx = pop.data.x;
    let cy = pop.data.y;

    for(let z=0; z<4; z++) {
      let nx = cx + dx[z];
      let ny = cy + dy[z];

      if(nx>=0 && nx<N && ny>=0 && ny<M && (map[nx][ny] === 0)) {
        map[nx][ny] = 2;
        queue.add({x:nx,y:ny});
      }
    }
  }
}

function melting() {
  let meltingList = [];

  for(let i=0; i<N; i++) {
    for(let j=0; j<M; j++) {
      if(map[i][j] !== 1) continue;
      let temp = [];

      for(let z=0; z<4; z++) {
        let nx = i + dx[z];
        let ny = j + dy[z];
        if(nx>=0 && nx<N && ny>=0 && ny<M && map[nx][ny] === 2) {
          temp.push({x:nx,y:ny});
        }
      }

      if(temp.length >= 2) {
        meltingList.push({x:i,y:j});
      }
    }
  }

  for(let i=0; i<meltingList.length; i++) {
    let {x,y} = meltingList[i];
    map[x][y] = 2
    diffusion(x,y);
  }
}

function allMeltedCheck() {
  for(let i=0; i<N; i++) {
    for(let j=0; j<M; j++) {
      if(map[i][j] === 1) {
        return false;
      }
    }
  }
  return true;
}

// function print2DArray(arr) {
//   for (let i = 0; i < arr.length; i++) {
//     console.log(arr[i].join('  '));
//   }
// }