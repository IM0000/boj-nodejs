class minHeap {
  constructor() {
    this.heap = [];
  }

  // data = {v, w}
  enqueue(data) {
    this.heap.push(data);

    let cIdx = this.heap.length - 1;

    while(cIdx) {
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

  heapifyDown(idx = 0) {
    let leftIdx = idx*2 + 1;
    let rightIdx = leftIdx + 1;

    let curIdx = idx;
    if(leftIdx < this.heap.length && this.heap[curIdx].w > this.heap[leftIdx].w) curIdx = leftIdx;
    if(rightIdx < this.heap.length && this.heap[curIdx].w > this.heap[rightIdx].w) curIdx = rightIdx;

    // swap
    if(curIdx !== idx) {
      const temp = this.heap[curIdx];
      this.heap[curIdx] = this.heap[idx];
      this.heap[idx] = temp;
  
      this.heapifyDown(curIdx); 
    }
  }
}

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '1238.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
const [N,M,X] = input[index++].trim().split(' ').map(Number);

const dijkstra = (linkInfo, startVertex) => {
  const d = Array(N + 1).fill(Infinity); // 시작점으로부터 최소거리 초기화
  d[startVertex] = 0;

  const heap = new minHeap();
  heap.enqueue({v: startVertex, w:0});

  while(heap.heap.length) {
    const deq = heap.dequeue();

    if(!linkInfo[deq.v]) continue;
    if(d[deq.v] < deq.w) continue;

    for(let i=0; i<linkInfo[deq.v].length; i++) {
      const {v,w} = linkInfo[deq.v][i];

      if(d[v] <= d[deq.v] + w) continue;
      d[v] = d[deq.v] + w;

      heap.enqueue({v: v, w: d[deq.v] + w});
    }
  }

  return d;
}

// linkInfo 만들기 (정방향, 역방향)
const fLink = [];
const rLink = [];
for(let i=0; i<M; i++) {
  let row = input[index++].trim().split(' ').map(Number);

  if(!fLink[row[0]]) fLink[row[0]] = [];
  fLink[row[0]].push({v: row[1], w: row[2]});

  if(!rLink[row[1]]) rLink[row[1]] = [];
  rLink[row[1]].push({v: row[0], w: row[2]});
}

// x로 가는 최단거리
const fDist = dijkstra(rLink, X);
// X에서 되돌아가는 최단거리
const rDist = dijkstra(fLink, X);

let max = 0;
for(let i=1; i<=N; i++) {
  max = Math.max(max, fDist[i]+rDist[i]);
}

console.log(max);
// 플로이드 워셜
// const d = Array.from(Array(N+1), ()=>Array(N+1).fill(Infinity));

// for(let i=0; i<M; i++) {
//   const [a,b,t] = input[index++].trim().split(' ').map(Number);
//   d[a][b] = t;
// }

// for(let i=0; i<=N; i++) {
//   d[i][i] = 0;
// }

// for(let k=1; k<=N; k++) {
//   for(let i=1; i<=N; i++) {
//     for(let j=1; j<=N; j++) {
//       if(d[i][j] > d[i][k] + d[k][j]) {
//         d[i][j] = d[i][k] + d[k][j];
//       }
//     }
//   }
// }

// let ans = 0;
// for(let i=1; i<=N; i++) {
//   ans = Math.max(ans, d[i][X] + d[X][i]);
// }

// console.log(ans);