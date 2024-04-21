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
const filePath = process.platform === 'linux' ? '/dev/stdin' : '1005.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
let sTime = new Date().getTime();
let index = 0;
const T = Number(input[index++]);
const answer = [];

for(let i=0; i<T; i++) {
  const [N, K] = input[index++].split(' ').map(Number);
  const q = new Queue();
  const D = input[index++].split(' ').map(Number); // 건물 건설시간
  const preCnt = Array(N).fill(0); // 선행건물의 갯수
  const post = Array.from({length:N}, ()=>[]); // 후행건물 목록
  const startTime = Array(N).fill(-1); // 건설실행 시작시간

  for(let j=0; j<K; j++) {
    const [s,e] = input[index++].split(' ').map(Number);
    preCnt[e-1] += 1;
    post[s-1].push(e-1);
  }

  const W = +input[index++] - 1; // 최종 건물

  for(let j=0; j<N; j++) { // 선행건물 없으면 큐에 추가
    if(preCnt[j] === 0) {
      q.add(j);
      startTime[j] = 0;
    }
  }

  while(preCnt[W] > 0) { // 선행건물에 모두 방문하지 않으면
    let pop = q.pop();
    let postList = post[pop];

    for(let p=0; p<postList.length; p++) {
      let pN = postList[p];
      startTime[pN] = Math.max(startTime[pN], startTime[pop] + D[pop]);
      if(--preCnt[pN] === 0) q.add(pN);
    }
  }

  answer.push(D[W] + startTime[W]);
}

console.log(answer.join('\n'));
let endTime = new Date().getTime();
console.log(endTime-sTime);