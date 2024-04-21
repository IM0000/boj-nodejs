class minHeap {
  constructor() {
    this.heap = [];
  }

  // data = {v, w}
  enqueue(data) {
    this.heap.push(data);

    let cIdx = this.heap.length - 1;

    while(cIdx !== 0) {
      let pIdx = Math.floor((cIdx-1)/2);

      if(this.heap[cIdx].w > this.heap[pIdx].w) break;

      let temp = this.heap[cIdx];
      this.heap[cIdx] = this.heap[pIdx];
      this.heap[pIdx] = temp;
      cIdx = pIdx;
    }
  }

  dequeue() {
    if(this.heap.length === 1) return this.heap.pop();

    let rData = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);

    return rData;
  }

  heapifyDown(index) {
    let cIdx = index;
    let lIdx = cIdx*2 + 1;
    let rIdx = lIdx + 1;

    if(lIdx < this.heap.length && this.heap[cIdx].w > this.heap[lIdx].w) cIdx = lIdx;
    if(rIdx < this.heap.length && this.heap[cIdx].w > this.heap[rIdx].w) cIdx = rIdx;

    if(cIdx !== index) {
      let temp = this.heap[index];
      this.heap[index] = this.heap[cIdx];
      this.heap[cIdx] = temp;
      this.heapifyDown(cIdx);
    }
  }
}

function dijkstra(linkInfo, start, nCity, pre) {
  const dist = Array(nCity+1).fill(10000000000);
  dist[start] = 0;

  const mh = new minHeap();
  mh.enqueue({v:start, w:0});

  while(mh.heap.length !== 0) {
    let deq = mh.dequeue();
    let cv = deq.v;
    let cw = deq.w;

    if(!linkInfo[cv]) continue;
    if(dist[cv] < cw) continue;

    for(let i=0; i<linkInfo[cv].length; i++) {
      let nv = linkInfo[cv][i].v;
      let nw = linkInfo[cv][i].w;

      if(dist[nv] > dist[cv] + nw) {
        dist[nv] = dist[cv] + nw;
        pre[nv] = cv;
        mh.enqueue({v:nv, w:dist[cv]+nw});
      }
    }
  }
  return dist;
}

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '11779.txt';
const input = fs.readFileSync(filePath).toString().split('\n');

const nCity = Number(input[0]);
const m = Number(input[1]);
let index = 2;
let linkInfo = [];
for(let i=0; i<m; i++) {
  let [st,ed,w] = input[index++].split(' ').map(Number);
  if(!linkInfo[st]) linkInfo[st] = [];
  if(!linkInfo[ed]) linkInfo[ed] = [];

  linkInfo[st].push({v:ed, w:w});
}

const [start, end] = input[index++].split(' ').map(Number);
const pre = Array(nCity+1);

let minDist = dijkstra(linkInfo, start, nCity, pre);
let cityPath = [];
let idx = end;
while(true) {
  let temp = pre[idx];
  cityPath.push(temp);
  if(temp === start) {
    break;
  }
  idx = temp;
}
cityPath.reverse();
cityPath.push(end);
let answer = [];
answer.push(minDist[end]);
answer.push(cityPath.length);
answer.push(cityPath.join(' '))
console.log(answer.join('\n'));