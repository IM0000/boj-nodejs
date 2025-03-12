class PQ {
  constructor(isMin) {
    this.heap = [];
    this.compare = (a, b) => {
      return isMin ? a < b : a > b;
    };
  }

  // data = {s,e}
  enqueue(data) {
    this.heap.push(data);
    let cIdx = this.heap.length - 1;

    while (cIdx) {
      let pIdx = Math.floor((cIdx - 1) / 2);

      if (this.compare(this.heap[pIdx].e, this.heap[cIdx].e)) {
        break;
      }

      let temp = this.heap[cIdx];
      this.heap[cIdx] = this.heap[pIdx];
      this.heap[pIdx] = temp;
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
    let left = index * 2 + 1;
    let right = index * 2 + 2;
    let cIdx = index;

    if (
      left < this.heap.length &&
      this.compare(this.heap[left].e, this.heap[cIdx].e)
    ) {
      cIdx = left;
    }

    if (
      right < this.heap.length &&
      this.compare(this.heap[right].e, this.heap[cIdx].e)
    ) {
      cIdx = right;
    }

    if (cIdx !== index) {
      let temp = this.heap[cIdx];
      this.heap[cIdx] = this.heap[index];
      this.heap[index] = temp;
      this.heapifyDown(cIdx);
    }
  }
}

// 최소 회의실 개수
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '19598.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
let n = +input[0].trim();

const arr = [];
for (let i = 1; i <= n; i++) {
  const [s, e] = input[i].trim().split(' ').map(Number);
  arr.push([s, e]);
}

arr.sort((a, b) => {
  if (a[0] === b[0]) return a[1] - b[1];
  return a[0] - b[0];
});

const pq = new PQ(true);
for (let i = 0; i < arr.length; i++) {
  const [s, e] = arr[i];
  if (pq.heap.length === 0) {
    pq.enqueue({ s, e });
    continue;
  }

  if (pq.heap[0].e <= s) {
    let dq = pq.dequeue();
    pq.enqueue({ s: dq.s, e });
  } else {
    pq.enqueue({ s, e });
  }
}

console.log(pq.heap.length);
