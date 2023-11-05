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
const filePath = process.platform === 'linux' ? '/dev/stdin' : '10026.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = +input[0].trim();
const print = Array(N);

for(let i=0; i<N; i++) {
  print[i] = input[1+i].split('');
}

const dx = [0,0,-1,1];
const dy = [-1,1,0,0];
const visit = Array.from(Array(N), ()=>Array(N).fill(false));
const visitB = Array.from(Array(N), ()=>Array(N).fill(false));

function bfs(x,y,visit,isBlind) {
  const queue = new Queue();
  visit[x][y] = true;
  queue.add({x,y});
  
  while(!queue.isEmpty()) {
    let element = queue.pop();
    let cx = element.x;
    let cy = element.y;

    for(let z=0; z<4; z++) {
      let nx = cx + dx[z];
      let ny = cy + dy[z];

      if(nx<0 || nx>=N || ny<0 || ny>=N) continue;

      if(!visit[nx][ny]) {
        if(isBlind && 
          (print[cx][cy] === print[nx][ny] 
            || (print[cx][cy] === 'R' && print[nx][ny] === 'G')
            || (print[cx][cy] === 'G' && print[nx][ny] === 'R'))) {
          visit[nx][ny] = true;
          queue.add({x:nx,y:ny});
        } else if(!isBlind && print[cx][cy] === print[nx][ny]) {
          visit[nx][ny] = true;
          queue.add({x:nx,y:ny});
        }
      }
    }
  }
}

let cnt1 = 0;
let cnt2 = 0;
for(let i=0; i<N; i++) {
  for(let j=0; j<N; j++) {
    // 적록색약 아닐 때
    if(!visit[i][j]) {
      cnt1+=1;
      bfs(i,j,visit,false);
    }
    // 적록색약일 때
    if(!visitB[i][j]) {
      cnt2+=1;
      bfs(i,j,visitB,true);
    }
  }
}


console.log(cnt1,cnt2);