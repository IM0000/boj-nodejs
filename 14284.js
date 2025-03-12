class PQ {
  constructor(isMin = true) {
    this.heap = [];
    this.compare = (a, b) => {
      return isMin ? a < b : b < a;
    };
  }

  // data : [vertax, d]
  push(data) {
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

  pop() {
    if (this.heap.length === 1) return this.heap.pop();

    let removedData = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);

    return removedData;
  }

  heapifyDown(index) {
    let cIdx = index;
    let lIdx = cIdx * 2 + 1;
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

const input = require('fs')
  // .readFileSync(0, 'utf-8')
  .readFileSync('14284.txt', 'utf-8')
  .toString()
  .trim()
  .split('\n');

const [n, m] = input.shift().split(' ').map(Number);
const [s, t] = input.pop().split(' ').map(Number);

const linkInfo = Array.from({ length: n + 1 }, () => []);

for (let i = 0; i < input.length; i++) {
  let [a, b, c] = input[i].split(' ').map(Number);
  linkInfo[a].push([b, c]);
  linkInfo[b].push([a, c]);
}

const dist = dijkstra(linkInfo, s);
console.log(dist[t]);

function dijkstra(link, start) {
  const d = Array(n + 1).fill(Infinity);
  d[start] = 0;

  const q = new PQ(true);
  q.push([start, 0]);

  while (q.heap.length != 0) {
    let pop = q.pop();

    let nextInfo = link[pop[0]];

    if (!nextInfo) continue;
    if (d[pop[0]] < pop[1]) continue;

    for (let i = 0; i < nextInfo.length; i++) {
      let [vertax, cost] = nextInfo[i];
      if (d[vertax] <= d[pop[0]] + cost) continue;
      d[vertax] = d[pop[0]] + cost;
      q.push([vertax, d[pop[0]] + cost]);
    }
  }
  return d;
}
