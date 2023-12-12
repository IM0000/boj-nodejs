
class minHeap {
  constructor() {
    this.heap = [];
  }

  // data = {v, w}
  enqueue(data) {
    this.heap.push(data);

    let cIdx = this.heap.length - 1;

    while(cIdx !== 0) {
      const pIdx = Math.floor((cIdx-1)/2);

      if(this.heap[cIdx].w > this.heap[pIdx].w) break;

      const temp = this.heap[cIdx];
      this.heap[cIdx] = this.heap[pIdx];
      this.heap[pIdx] = temp;
      cIdx = pIdx;
    }
  }

  dequeue() {
    if(this.heap.length === 1) return this.heap.pop();

    const removeData = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);

    return removeData;
  }

  heapifyDown(index = 0) {
    let leftIdx = index * 2 + 1;
    let rightIdx = leftIdx + 1;

    let cIdx = index;
    if(leftIdx < this.heap.length && this.heap[cIdx].w > this.heap[leftIdx]) cIdx = leftIdx; 
    if(rightIdx < this.heap.length && this.heap[cIdx].w > this.heap[rightIdx]) cIdx = rightIdx;

    if(cIdx !== index) {
      const temp = this.heap[index];
      this.heap[index] = this.heap[cIdx];
      this.heap[cIdx] = temp;
      this.heapifyDown(cIdx);
    }
  }
  
}

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '1916.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
const N = +input[index++].trim();
const M = +input[index++].trim();

const graph = [];
for(let i=0; i<M; i++) {
  const [S,E,W] = input[index++].trim().split(' ').map(Number);
  if(!graph[S]) graph[S] = [];
  graph[S].push({v: E, w: W});
}

const [start, end] = input[index].trim().split(' ').map(Number);

const dijkstra = (linkInfo, startV) => {
  // 최소비용 배열
  const d = Array(N + 1).fill(100000001);
  d[startV] = 0; // 시작점 0으로
  
  const heap = new minHeap();
  heap.enqueue({v: startV, w: 0});

  while(heap.heap.length !== 0) {
    const {v, w} = heap.dequeue();

    let link = linkInfo[v];

    if(!link) continue;
    if(d[v] < w) continue;

    for(let i = 0; i < link.length; i++) {
      let linkV = link[i].v;
      let linkW = link[i].w;

      if(w + linkW < d[linkV]) {
        d[linkV] = w + linkW;
        heap.enqueue({v: linkV, w: w + linkW});
      }
    }
  }

  return d;
}

let minArr = dijkstra(graph, start);

console.log(minArr[end]);