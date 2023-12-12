class minHeap {
  constructor() {
    this.heap = [];
  }

  // data -> {v, w}
  enqueue(data) {
    this.heap.push(data);

    let cIndex = this.heap.length - 1;
    while(cIndex > 0) {
      const pIndex = Math.floor((cIndex-1)/2);

      if(this.heap[cIndex].w > this.heap[pIndex].w) break;

      // 현재가 더 작은 경우 swap
      const temp = this.heap[cIndex];
      this.heap[cIndex] = this.heap[pIndex];
      this.heap[pIndex] = temp;
      cIndex = pIndex;
    }
  }

  dequeue() {
    if(this.heap.length === 1) return this.heap.pop();

    const first = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);

    return first
  }

  heapifyDown(index = 0) {
    const left = index*2 + 1;
    const right = left + 1;
    let cIndex = index;

    if(left < this.heap.length && this.heap[cIndex].w > this.heap[left].w) {
      cIndex = left;
    }
    if(right < this.heap.length && this.heap[cIndex].w > this.heap[right].w) {
      cIndex = right;
    }

    if(cIndex !== index) { // 최소값 인덱스가 달라진 경우
      const temp = this.heap[cIndex];
      this.heap[cIndex] = this.heap[index];
      this.heap[index] = temp;
      this.heapifyDown(cIndex);
    }
  }
}

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '1753.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
let index = 0;

const [V,E] = input[index++].split(' ').map(Number);
const K = +input[index++].trim(); // 시작점

// 연결선 초기화
const linkInfo = [];
for(let i = 0; i < E; i++) {
  const [u,v,w] = input[index++].split(' ').map(Number);
  if(!linkInfo[u]) linkInfo[u] = [];
  linkInfo[u].push({v:v, w:w});
}

// 다익스트라
const dijkstra = (linkInfo, start) => {
  const d = Array(V + 1).fill(Infinity); // 시작점으로부터 최소거리 초기화
  d[start] = 0;

  const heap = new minHeap();
  heap.enqueue({v:start, w:0}); // 시작점 넣음

  while(heap.heap.length) {
    const deq = heap.dequeue();
    const deqVertex = deq.v, deqWeight = deq.w;
    
    if(!linkInfo[deqVertex]) continue;
    if(d[deqVertex] < deqWeight) continue;

    for(let i=0; i<linkInfo[deqVertex].length; i++) {
      const {v,w} = linkInfo[deqVertex][i];
      
      if(d[v] <= d[deqVertex] + w) continue;
      d[v] = d[deqVertex] + w;

      heap.enqueue({v: v, w: d[deqVertex] + w});
    }
  }
  return d;
}

// 최단경로 배열
const d = dijkstra(linkInfo, K);

// 출력
let ans = [];
for(let i=1; i<=V; i++) {
  ans.push(d[i] === Infinity ? 'INF' : d[i]);
}
console.log(ans.join('\n'));

// const graph = Array.from(Array(V+1), ()=>Array(V+1));
// const d = Array(V+1);
// const check = Array(V+1).fill(false);

// for(let i = 0; i < E; i++) {
//   const [u,v,w] = input[index++].split(' ').map(Number);
//   graph[u][v] = w;
// }

// // 시작점(K) 초기화
// for(let i = 1; i <= V; i++) {
//   d[i] = graph[K][i] || 99;
// }
// d[K] = 0;
// check[K] = true;

// var findMin = () => {
//   let min = 99;
//   let minIdx = -1;
  
//   for(let i=1; i<d.length; i++) {
//     if(check[i]) continue;
//     if(d[i] < min) {
//       min = d[i];
//       minIdx = i;
//     }
//   }
  
//   return minIdx;
// }

// var update = (idx) => {
//   for(let i=1; i<=d.length; i++) {
//     if(check[i]) continue;
//     // console.log(i)
//     if(graph[idx][i] && d[i] > d[idx] + graph[idx][i]) {
//       d[i] = d[idx] + graph[idx][i];
//     }
//   }
// }

// for(let i=1; i<d.length-1; i++) {
//   let minIdx = findMin();
//   // console.log("🚀 ~ file: 1753.js:51 ~ minIdx:", minIdx)
//   check[minIdx] = true;
//   if(minIdx !== -1){
//     update(minIdx);
//   }
// }

// // console.log(graph);
// // console.log(d);
// let ans = [];
// for(let i=1; i<=V; i++) {
//   ans.push(d[i] === 99 ? 'INF' : d[i]);
// }
// console.log(ans.join('\n'));