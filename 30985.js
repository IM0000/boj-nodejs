class minHeap {
  constructor() {
    this.heap = [];
  }

  // data: [v, time]
  enqueue(data) {
    this.heap.push(data);

    let cIdx = this.heap.length - 1;

    while (cIdx) {
      const pIdx = Math.floor((cIdx - 1) / 2);
      if (this.heap[pIdx][1] <= this.heap[cIdx][1]) break;

      let temp = this.heap[cIdx];
      this.heap[cIdx] = this.heap[pIdx];
      this.heap[pIdx] = temp;
      cIdx = pIdx;
    }
  }

  dequeue() {
    if (this.heap.length === 1) return this.heap.pop();

    const removed = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.down(0);

    return removed;
  }

  down(index) {
    let cIdx = index;
    const lIdx = 2 * index + 1;
    const rIdx = lIdx + 1;

    if (lIdx < this.heap.length && this.heap[cIdx][1] > this.heap[lIdx][1]) {
      cIdx = lIdx;
    }

    if (rIdx < this.heap.length && this.heap[cIdx][1] > this.heap[rIdx][1]) {
      cIdx = rIdx;
    }

    if (cIdx !== index) {
      const temp = this.heap[cIdx];
      this.heap[cIdx] = this.heap[index];
      this.heap[index] = temp;
      this.down(cIdx);
    }
  }
}

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '30985.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

// 파랭이 1층 1번방, 사장님 K층 N번방
let index = 0;
const [N, M, K] = input[index++].split(' ').map(Number);
const graph = Array.from({ length: N + 1 }, () => []);
for (let i = 0; i < M; i++) {
  const [u, v, c] = input[index++].split(' ').map(Number);
  graph[u].push([v, BigInt(c)]);
  graph[v].push([u, BigInt(c)]);
}
const evTime = [-1, ...input[index++].split(' ').map(Number)].map(BigInt);

// 엘베 없으면
const noEv = evTime.every((t) => t === -1);
if (noEv) {
  console.log(-1);
  process.exit(0);
}

// 엘베 있는 방이면 true
const evRooms = evTime.map((item) => {
  if (item !== -1n) return true;
});

const dist1 = dijkstra(1);
const distN = dijkstra(N);

let min = BigInt(Number.MAX_SAFE_INTEGER);
const minBigInt = (a, b) => (a < b ? a : b);
for (let i = 1; i <= N; i++) {
  if (evRooms[i]) {
    const time = dist1[i] + distN[i] + BigInt(K - 1) * evTime[i];
    min = minBigInt(min, time);
  }
}

console.log(min === BigInt(Number.MAX_SAFE_INTEGER) ? -1 : Number(min));

function dijkstra(start) {
  const pq = new minHeap();
  const dist = Array.from({ length: N + 1 }, () =>
    BigInt(Number.MAX_SAFE_INTEGER)
  );

  pq.enqueue([start, 0n]);
  dist[start] = 0n;

  while (pq.heap.length) {
    const [cur, time] = pq.dequeue();
    if (dist[cur] < time) continue;

    for (const [next, nextTime] of graph[cur]) {
      let cost = time + nextTime;

      if (cost < dist[next]) {
        dist[next] = cost;
        pq.enqueue([next, cost]);
      }
    }
  }

  return dist;
}
