class minHeap {
  constructor() {
    this.heap = [];
  }

  // data = {v, w}
  enqueue(data) {
    this.heap.push(data);
    let cIdx = this.heap.length - 1;

    while(cIdx !== 0) {
      let pIdx = parseInt((cIdx-1)/2);

      if(this.heap[cIdx].w > this.heap[pIdx].w) {
        break;
      }
      
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

  heapifyDown(index = 0) {
    let cIdx = index;
    let l = cIdx*2 + 1;
    let r = l + 1;
    
    if(l < this.heap.length && this.heap[cIdx].w < this.heap[l].w) cIdx = l;
    if(r < this.heap.length && this.heap[cIdx].w < this.heap[r].w) cIdx = r;

    if(cIdx !== index) {
      let temp = this.heap[cIdx];
      this.heap[cIdx] = this.heap[index];
      this.heap[index] = temp;
      this.heapifyDown(cIdx);
    }
  }
}

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '14938.txt';
const input = fs.readFileSync(filePath).toString().split('\n');

let index = 0;
const [n,m,r] = input[index++].split(' ').map(Number);
const numOfItems = input[index++].split(' ').map(Number);

let linkInfo = [];
for(let i=0; i<r; i++) {
  const [a,b,l] = input[index++].split(' ').map(Number);
  if(!linkInfo[a]) linkInfo[a] = [];
  if(!linkInfo[b]) linkInfo[b] = [];

  linkInfo[a].push({v:b,w:l});
  linkInfo[b].push({v:a,w:l});
}

// m: 반경, numOfItems[지역-1]: 지역별 아이템 갯수
let max = 0;
for(let i=1; i<=n; i++) {
  let dist = dijkstra(linkInfo, i);
  let temp = dist.map((d, index) => d <= m ? index : -1)
    .filter((index) => index !== -1)
    .reduce((acc, cur) => acc + numOfItems[cur-1], 0);
  max = Math.max(max, temp);
}

console.log(max);

function dijkstra(linkInfo, start) {
  const dist = Array(n+1).fill(10000);
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
        mh.enqueue({v: nv, w: dist[cv]+nw});
      }
    }
  }

  return dist;
}
