class maxHeap {
  constructor() {
    this.heap = [];
  }

  // data = {v,w}
  enqueue(data) {
    this.heap.push(data);

    let cIndex = this.heap.length - 1;

    while (cIndex > 0) {
      let pIndex = Math.floor((cIndex - 1) / 2);

      if(this.heap[cIndex].w <= this.heap[pIndex].w) {
        break;
      }

      let temp = this.heap[cIndex];
      this.heap[cIndex] = this.heap[pIndex];
      this.heap[pIndex] = temp;
      cIndex = pIndex;
    }

  }

  dequeue() {
    if(this.heap.length === 1) return this.heap.pop();

    const rData = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);

    return rData;
  }

  heapifyDown(index) {
    let lIndex = index*2 + 1;
    let rIndex = lIndex + 1;

    let cIndex = index;
    if(lIndex < this.heap.length && this.heap[cIndex].w < this.heap[lIndex].w) cIndex = lIndex;
    if(rIndex < this.heap.length && this.heap[cIndex].w < this.heap[rIndex].w) cIndex = rIndex;

    if(cIndex !== index) {
      let temp = this.heap[cIndex];
      this.heap[cIndex] = this.heap[index];
      this.heap[index] = temp;
      this.heapifyDown(cIndex);
    }
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
  const D = input[index++].split(' ').map(Number);
  const linkInfo = Array.from({length: N+1}, ()=>[]);
  const linkInfoR = Array.from({length: N+1}, ()=>[]);

  for(let j=0; j<K; j++) {
    const [s,e] = input[index++].split(' ').map(Number);
    linkInfo[s].push({v:e, w:D[e-1]});
    linkInfoR[e].push(s); // 시작점 찾는 용도
  }

  const W = +input[index++];
  
  let startList = dfs(W, linkInfoR, N);
  let maxAnswer = Number.MIN_SAFE_INTEGER;

  for(let j=0; j<startList.length; j++) {
    let start = startList[j];
    let dist = dijkstra(linkInfo, start, N, D[start-1]);
    let time = dist[W];
    maxAnswer = Math.max(maxAnswer, time);
  }

  answer.push(maxAnswer);
}

console.log(answer.join('\n'));
let endTime = new Date().getTime();
console.log(endTime-sTime);
function dijkstra(linkInfo, startV, N, startD) {
  const dist = Array.from({length: N+1}, ()=>-1);
  dist[startV] = startD;
  const mH = new maxHeap();
  mH.enqueue({v:startV, w:startD});

  while(mH.heap.length !== 0) {
    let deq = mH.dequeue();
    let cv = deq.v;
    let cw = deq.w;

    if(!linkInfo[cv]) continue;
    if(dist[cv]<cw) continue;

    for(let i=0; i<linkInfo[cv].length; i++) {
      let lv = linkInfo[cv][i].v;
      let lw = linkInfo[cv][i].w;

      if(dist[lv] < cw + lw) {
        dist[lv] = cw + lw;
        mH.enqueue({v:lv, w: cw+lw});
      }
    }
  }

  return dist;
}

function dfs(endV, linkInfoR, N) {
  const visited = Array(N+1).fill(false);
  let stack = [];
  let startList = [];

  stack.push(endV);
  visited[endV] = true;

  while(stack.length !== 0) {
    let pop = stack.pop();

    let links = linkInfoR[pop];
    if(links.length === 0) startList.push(pop);

    for(let i=0; i<links.length; i++) {
      let nPop = links[i];

      if(!visited[nPop]) {
        visited[nPop] = true;
        stack.push(nPop);
      }
    }
  }

  return startList;
}