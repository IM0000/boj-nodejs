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
    if(this.isEmpty()) {
      this.front = newNode;
      this.rear = newNode;
    } else {
      this.rear.next = newNode;
      this.rear = newNode;
    }
    this.size++;
  }
  pop() {
    if(this.isEmpty()) {
      return null;
    }
    const popData = this.front.data;
    if(this.front === this.rear) {
      this.front = null;
      this.rear = null;
    } else {
      this.front = this.front.next;
    }
    this.size--;
    return popData;
  }
  isEmpty() {
    return this.size === 0;
  }
}

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '16928.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N,M] = input[0].trim().split(' ').map(Number);
const jump = [];

for(let i=0; i<N+M; i++) {
  const [s,e] = input[1+i].trim().split(' ').map(Number);
  jump[s-1] = e-1;
}

const visit = Array(100).fill(false);
const queue = new Queue();
queue.add({x:0, count:0}); // 0부터 시작
visit[0] = true; // 0 체크

// bfs
while(!queue.isEmpty()) {
  let pop = queue.pop();
  let preX = pop.x;
  
  for(let i=1; i<=6; i++) {
    let nextX = preX + i;
    nextX = jump[nextX] ? jump[nextX] : nextX;

    if(nextX >= 99) {
      console.log(pop.count + 1);
      return;
    }

    if(!visit[nextX]) {
      queue.add({x: nextX, count: pop.count + 1});
      visit[nextX] = true;
    }

    // if(!jump[preX+i] && !visit[preX+i]) { // 방문안했고, jump 없을때
    //   if(preX+i >= 99) { // 99 도착하면 종료
    //     console.log(pop.count + 1);
    //     return;
    //   }
    //   queue.add({x: preX + i, count: pop.count + 1});
    //   visit[preX+i] = true;
    // } else if(!visit[jump[preX+i]]){ // 방문 안했고, jump 있으면 jump 값으로 추가함
    //   queue.add({x: jump[preX+i], count: pop.count + 1});
    //   visit[jump[preX+i]] = true;
    // }
  }

}
