class PQ {
  constructor(isMin = true) {
    this.heap = [];
    this.compare = (a, b) => {
      return isMin ? a < b : b < a;
    };
  }

  // data : [s,e]
  push(data) {
    this.heap.push(data);

    let cIdx = this.heap.length - 1;

    while (cIdx) {
      let pIdx = Math.floor((cIdx - 1) / 2);

      if (this.compare(this.heap[pIdx][1], this.heap[cIdx][1])) break;

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

  heapifyDown(index = 0) {
    let cIdx = index;
    let lIdx = index * 2 + 1;
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
      let temp = this.heap[index];
      this.heap[index] = this.heap[cIdx];
      this.heap[cIdx] = temp;
      this.heapifyDown(cIdx);
    }
  }
}

// 강의실 배정
const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '11000.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const n = +input[0].trim();
const arr = [];
for (let i = 1; i <= n; i++) {
  arr.push(input[i].split(' ').map(Number));
}

arr.sort((a, b) => {
  if (a[0] === b[0]) return a[1] - b[1];
  return a[0] - b[0];
});

const pq = new PQ();

for (let i = 0; i < arr.length; i++) {
  let [s, t] = arr[i];
  if (pq.heap.length === 0) {
    pq.push([s, t]);
    continue;
  } else {
    let [cs, ct] = pq.pop();
    if (ct <= s) {
      pq.push([cs, t]);
    } else {
      pq.push([cs, ct]);
      pq.push([s, t]);
    }
  }
}
console.log(pq.heap.length);
