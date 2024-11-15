class PQ {
  constructor(isMin = true) {
    this.heap = [];
    this.compare = (a, b) => (isMin ? a < b : b < a);
  }

  // data = {node, value}
  enqueue(data) {
    this.heap.push(data);
    let cIdx = this.heap.length - 1;

    while (cIdx) {
      let pIdx = Math.floor((cIdx - 1) / 2);

      if (this.compare(this.heap[pIdx].value, this.heap[cIdx].value)) {
        break;
      }

      [this.heap[cIdx], this.heap[pIdx]] = [this.heap[pIdx], this.heap[cIdx]];
      cIdx = pIdx;
    }
  }

  dequeue() {
    if (this.heap.length === 1) return this.heap.pop();

    let removedData = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);

    return removedData;
  }

  heapifyDown(index) {
    let cIdx = index;
    let lIdx = 2 * cIdx + 1;
    let rIdx = lIdx + 1;

    if (
      lIdx < this.heap.length &&
      this.compare(this.heap[lIdx].value, this.heap[cIdx].value)
    ) {
      cIdx = lIdx;
    }

    if (
      rIdx < this.heap.length &&
      this.compare(this.heap[rIdx].value, this.heap[cIdx].value)
    ) {
      cIdx = rIdx;
    }

    if (cIdx !== index) {
      [this.heap[cIdx], this.heap[index]] = [this.heap[index], this.heap[cIdx]];
      this.heapifyDown(cIdx);
    }
  }
}

// Roadblock
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '9988.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
let idx = 0;
const [n, m] = input[idx++].split(' ').map(Number);
const board = Array.from({ length: n + 1 }, () => Array(n + 1).fill(Infinity));

for (let i = 0; i < m; i++) {
  const [a, b, c] = input[idx++].split(' ').map(Number);
  if (board[a][b] > c) {
    // 여러 간선 중 최소 비용 간선 선택
    board[a][b] = c;
    board[b][a] = c;
  }
}

// 다익스트라로 최단 거리 및 경로 구하기
const { dist, path } = dijkstra(board, 1);
let beforeMin = dist[n];
const minPath = getMinPath(path, n);

let maxIncrease = 0;

// 최단 경로에 있는 모든 간선을 하나씩 두 배로 늘려봄
for (let i = 0; i < minPath.length - 1; i++) {
  let s = minPath[i];
  let e = minPath[i + 1];

  // 원래 간선 비용 저장
  let originalCost = board[s][e];

  // 간선 비용을 두 배로 늘림
  board[s][e] *= 2;
  board[e][s] *= 2;

  // 새로운 최단 거리 계산
  const { dist: dist2 } = dijkstra(board, 1);
  let afterMin = dist2[n];

  // 증가량 계산 및 최대값 갱신
  let increase = afterMin - beforeMin;
  if (increase > maxIncrease) {
    maxIncrease = increase;
  }

  // 간선 비용을 원래대로 복원
  board[s][e] = originalCost;
  board[e][s] = originalCost;
}

console.log(maxIncrease);

// 다익스트라 알고리즘 함수
function dijkstra(board, start) {
  const dist = Array(n + 1).fill(Infinity);
  const path = Array(n + 1).fill(-1);
  const pq = new PQ();
  dist[start] = 0;
  pq.enqueue({ node: start, value: 0 });

  while (pq.heap.length) {
    const { node, value } = pq.dequeue();

    if (value > dist[node]) continue;

    for (let i = 1; i <= n; i++) {
      if (board[node][i] === Infinity) continue;

      const newValue = value + board[node][i];
      if (newValue < dist[i]) {
        dist[i] = newValue;
        path[i] = node;
        pq.enqueue({ node: i, value: newValue });
      }
    }
  }

  return { dist, path };
}

// 경로 재구성 함수
function getMinPath(path, end) {
  const result = [];
  let node = end;
  while (node !== -1) {
    result.push(node);
    node = path[node];
  }
  return result.reverse();
}
