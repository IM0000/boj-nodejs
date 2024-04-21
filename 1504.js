class minHeap {
  constructor() {
    this.heap = [];
  }

  // data = {v:v, w:w}
  enqueue(data) {
    this.heap.push(data);

    let curIndex = this.heap.length - 1;

    while(curIndex !== 0) {
      let parIndex = Math.floor((curIndex-1)/2);

      if(this.heap[parIndex].w < this.heap[curIndex].w) break;

      let temp = this.heap[curIndex];
      this.heap[curIndex] = this.heap[parIndex];
      this.heap[parIndex] = temp;
      curIndex = parIndex;
    }
  }

  dequeue() {
    if(this.heap.length === 1) return this.heap.pop();

    let pop = this.heap[0];

    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);

    return pop;
  }

  heapifyDown(index) {
    let leftIndex = index*2 + 1;
    let rightIndex = leftIndex + 1;

    let curIndex = index;
    if(leftIndex < this.heap.length && this.heap[leftIndex].w < this.heap[curIndex].w) 
      curIndex = leftIndex;
    if(rightIndex < this.heap.length && this.heap[rightIndex].w < this.heap[curIndex].w)
      curIndex = rightIndex;

    if(curIndex !== index) {
      let temp = this.heap[curIndex];
      this.heap[curIndex] = this.heap[index];
      this.heap[index] = temp;
      this.heapifyDown(curIndex);
    }
  }

}

function dijkstra(N, linkInfo, startV) {
  const dist = Array(N+1).fill(200000001);
  dist[startV] = 0; // 시작점은 0
  
  const heap = new minHeap();
  heap.enqueue({v:startV, w:0})
  
  while(heap.heap.length !== 0) {
    let pop = heap.dequeue();
    
    let link = linkInfo[pop.v];

    if(!link) continue;
    if(dist[pop.v] < pop.w) continue;

    for(let i=0; i<link.length; i++) {
      let pp = link[i];

      if(dist[pp.v] > pop.w + pp.w) {
        dist[pp.v] = pop.w + pp.w;
        heap.enqueue({v: pp.v, w: pop.w + pp.w});
      }
    }
  }

  return dist;
}

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '1504.txt';
const input = fs.readFileSync(filePath).toString().split('\n');

const [N,E] = input[0].split(' ').map(Number);
const linkInfo = [];

for(let i=1; i<=E; i++) {
  let [a,b,c] = input[i].split(' ').map(Number);

  if(!linkInfo[a]) linkInfo[a] = [];
  if(!linkInfo[b]) linkInfo[b] = [];

  linkInfo[a].push({v:b, w:c});
  linkInfo[b].push({v:a, w:c});
}

const [v1,v2] = input[E+1].split(' ').map(Number);

const dist1 = dijkstra(N, linkInfo, 1);
const dist2 = dijkstra(N, linkInfo, v1);
const dist3 = dijkstra(N, linkInfo, v2);

const route1 = dist1[v1] + dist2[v2] + dist3[N];
const route2 = dist1[v2] + dist2[v2] + dist2[N];

let res = Math.min(route1, route2);
if(res >= 200000001) res = -1;
console.log(res);
