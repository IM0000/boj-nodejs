class PriorityQueue {
  constructor(isMax = true) {
    this.heap = [];
    this.compare = (a, b) => {
      return isMax ? a < b : a > b;
    };
  }

  size() {
    return this.heap.length;
  }

  // data: {d(day): number, s(score): number}
  enqueue(data) {
    this.heap.push(data);
    let cIndex = this.heap.length - 1;

    while (cIndex) {
      let pIndex = Math.floor((cIndex - 1) / 2);

      if (this.compare(this.heap[cIndex].s, this.heap[pIndex].s)) break;

      let temp = this.heap[cIndex];
      this.heap[cIndex] = this.heap[pIndex];
      this.heap[pIndex] = temp;
      cIndex = pIndex;
    }
  }

  dequeue() {
    if (this.size() === 1) return this.heap.pop();

    let removeData = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);

    return removeData;
  }

  heapifyDown(index = 0) {
    let cIndex = index;
    let lIndex = index * 2 + 1;
    let rIndex = lIndex + 1;

    if (
      lIndex < this.size() &&
      this.compare(this.heap[cIndex].s, this.heap[lIndex].s)
    )
      cIndex = lIndex;
    if (
      rIndex < this.size() &&
      this.compare(this.heap[cIndex].s, this.heap[rIndex].s)
    )
      cIndex = rIndex;

    if (cIndex != index) {
      let temp = this.heap[cIndex];
      this.heap[cIndex] = this.heap[index];
      this.heap[index] = temp;
      this.heapifyDown(cIndex);
    }
  }
}

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '13904.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
let N = +input[index++].trim();
let work = [];
for (let i = 0; i < N; i++) {
  let [d, s] = input[index++].trim().split(' ').map(Number);
  work.push({ d, s });
}

work.sort((a, b) => {
  if (a.d === b.d) return b.s - a.s;
  return b.d - a.d;
});

let maxScore = 0;
let dl = work[0].d;
let pq = new PriorityQueue();

// 마지막 마감부터 넣기
for (let i = 0; i < N; i++) {
  if (work[i].d === dl) {
    pq.enqueue(work[i]);
  } else {
    dl--;
    i--;
    if (pq.size() > 0) {
      maxScore += pq.dequeue().s;
    }
  }
  if (i === N - 1 && pq.size() > 0) {
    while (dl > 0 && pq.size() > 0) {
      maxScore += pq.dequeue().s;
      dl--;
    }
  }
}
console.log(maxScore);
