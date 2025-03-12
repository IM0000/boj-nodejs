class PQ {
  constructor(isMin = true) {
    this.heap = [];
    this.compare = (a, b) => {
      return isMin ? a < b : a > b;
    };
  }

  // data = [p, d]
  push(data) {
    this.heap.push(data);

    if (this.heap.length === 1) return;
    let cIdx = this.heap.length - 1;

    while (cIdx > 0) {
      let pIdx = Math.floor((cIdx - 1) / 2);

      if (this.compare(this.heap[pIdx][0], this.heap[cIdx][0])) {
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
    let lIdx = index * 2 + 1;
    let rIdx = index * 2 + 2;

    if (
      lIdx < this.heap.length &&
      this.compare(this.heap[lIdx][0], this.heap[cIdx][0])
    ) {
      cIdx = lIdx;
    }

    if (
      rIdx < this.heap.length &&
      this.compare(this.heap[rIdx][0], this.heap[cIdx][0])
    ) {
      cIdx = rIdx;
    }

    if (index !== cIdx) {
      let temp = this.heap[index];
      this.heap[index] = this.heap[cIdx];
      this.heap[cIdx] = temp;

      this.heapifyDown(cIdx);
    }
  }
}

// 순회강연
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '2109.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let idx = 0;
const n = +input[idx++].trim();
const arr = [];
let maxD = 0;
for (let i = 0; i < n; i++) {
  const [p, d] = input[idx++].trim().split(' ').map(Number);
  if (d > maxD) maxD = d;
  arr.push([p, d]);
}
arr.sort((a, b) => {
  if (a[1] === b[1]) return b[0] - a[0];
  return a[1] - b[1];
});

const pq = new PQ();
for (let i = 0; i < arr.length; i++) {
  const [p, d] = arr[i];
  pq.push([p, d]);

  while (pq.heap.length > d) {
    if (pq.heap[0][0] <= p) {
      pq.pop();
    }
  }
}

let sum = 0;
pq.heap.reduce((acc, cur) => {
  sum += cur[0];
  return acc;
}, 0);
console.log(sum);
