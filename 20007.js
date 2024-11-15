class PQ {
  constructor(isMin = true) {
    this.heap = [];
    this.compare = (a, b) => {
      return isMin ? a < b : a > b;
    };
  }

  // data: [node, d]
  enqueue(data) {
    this.heap.push(data);
    let cIdx = this.heap.length - 1;

    while (cIdx) {
      let pIdx = Math.floor((cIdx - 1) / 2);

      if (this.compare(this.heap[pIdx][1], this.heap[cIdx][1])) {
        break;
      }

      let temp = this.heap[cIdx];
      this.heap[cIdx] = this.heap[pIdx];
      this.heap[pIdx] = temp;
      cIdx = pIdx;
    }
  }

  dequeue() {
    if (this.heap.length === 1) {
      return this.heap.pop();
    }

    let data = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);

    return data;
  }

  heapifyDown(index) {
    let cIdx = index;
    let lIdx = 2 * cIdx + 1;
    let rIdx = lIdx + 1;

    if (
      lIdx < this.heap.length &&
      this.compare(this.heap[lIdx][1], this.heap[cIdx][1])
    ) {
      cIdx = lIdx;
    }

    if (
      rIdx < this.heap.length &&
      this.compare(this.heap[rIdx][1], this.heap[cIdx][1])
    ) {
      cIdx = rIdx;
    }

    if (cIdx !== index) {
      let temp = this.heap[cIdx];
      this.heap[cIdx] = this.heap[index];
      this.heap[index] = temp;
      this.heapifyDown(cIdx);
    }
  }
}

// 떡 돌리기
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '20007.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
let idx = 0;
// N:집, M:도로, X:한도거리, Y:성현이의 집번호
const [N, M, X, Y] = input[idx++].split(' ').map(Number);
const graph = Array.from({ length: N }, () => []);

for (let i = 0; i < M; i++) {
  const [a, b, c] = input[idx++].split(' ').map(Number);
  graph[a].push([b, c]);
  graph[b].push([a, c]);
}

const [dist, path] = dijkstra(graph, Y);
for (let i = 0; i < N; i++) {
  if (dist[i] * 2 > X) {
    console.log(-1);
    process.exit(0);
  }
}
// const combine = [];

// for (let i = 0; i < N; i++) {
//   combine.push([i, dist[i] * 2, path[i]]);
// }

// const visited = Array(N).fill(false);
// visited[Y] = true;
// combine.sort((a, b) => {
//   if (b[2].length == a[2].length) {
//     return b[1] - a[1];
//   }
//   return b[2].length - a[2].length;
// });

dist.sort((a, b) => a - b);

let days = 1;
let hp = X;
for (let i = 0; i < N; i++) {
  hp -= dist[i] * 2;
  if (hp < 0) {
    hp = X;
    days++;
    i--;
  }
}

console.log(days);

function dijkstra(graph, start) {
  const dist = Array(N).fill(99999);
  const path = Array.from({ length: N }, () => []);

  const pq = new PQ();
  pq.enqueue([start, 0]);
  dist[start] = 0;

  while (pq.heap.length) {
    const [node, cost] = pq.dequeue();

    if (cost > dist[node]) continue;

    for (let i = 0; i < graph[node].length; i++) {
      const [nextNode, nextCost] = graph[node][i];
      const newCost = cost + nextCost;
      const nodePath = path[nextNode];

      if (newCost < dist[nextNode]) {
        dist[nextNode] = newCost;
        if (node !== start) nodePath.push(node);
        pq.enqueue([nextNode, newCost]);
      }
    }
  }

  return [dist, path];
}
