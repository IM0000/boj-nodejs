class PriorityQueue {
  constructor(isMin = true) {
    this.heap = [];
    this.compare = (a, b) => {
      return isMin ? a > b : a < b;
    };
  }

  // data = [p, z]
  enqueue(data) {
    this.heap.push(data);
    let cIdx = this.heap.length - 1;

    while (cIdx) {
      let pIdx = Math.floor((cIdx - 1) / 2);
      if (this.compare(this.heap[cIdx][1], this.heap[pIdx][1])) {
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

  heapifyDown(index = 0) {
    let cIdx = index;
    let lIdx = 2 * cIdx + 1;
    let rIdx = lIdx + 1;

    if (
      lIdx < this.heap.length &&
      this.compare(this.heap[cIdx][1], this.heap[lIdx][1])
    ) {
      cIdx = lIdx;
    }

    if (
      rIdx < this.heap.length &&
      this.compare(this.heap[cIdx][1], this.heap[rIdx][1])
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

// 무엇을 아느냐가 아니라 누구를 아느냐가 문제다
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '9694.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
let index = 0;
let T = parseInt(input[index++]);

const answer = [];
let t = 1;
while (T-- > 0) {
  const [n, m] = input[index++].split(' ').map(Number);
  const graph = Array.from({ length: m }, () => []);
  const pathStore = Array.from({ length: m }, () => []);

  for (let i = 0; i < n; i++) {
    const [x, y, z] = input[index++].split(' ').map(Number);
    graph[x].push([y, z]);
    graph[y].push([x, z]);
  }

  // 0번(한신이)으로 부터 최소 거리
  const dist = dijkstra(graph, 0, pathStore);
  if (dist[m - 1] === 99999) {
    answer.push(`Case #${t++}: -1`);
  } else {
    const path = [...pathStore[m - 1], m - 1];
    answer.push(`Case #${t++}: ${path.join(' ')}`);
  }
}
console.log(answer.join('\n'));

function dijkstra(grp, start, store) {
  const dist = Array(grp.length).fill(99999);
  const pq = new PriorityQueue();
  dist[start] = 0;
  pq.enqueue([start, 0, []]);

  while (pq.heap.length) {
    const [p, z, arr] = pq.dequeue();

    if (dist[p] < z) {
      continue;
    }

    for ([np, nz] of grp[p]) {
      if (dist[p] + nz < dist[np]) {
        dist[np] = dist[p] + nz;
        pq.enqueue([np, dist[np], [...arr, p]]);
        store[np] = [...arr, p];
      }
    }
  }

  return dist;
}
