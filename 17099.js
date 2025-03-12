// contest
// const fs = require('fs');
// const filePath = process.platform === 'linux' ? '/dev/stdin' : '17099.txt';
// const input = fs.readFileSync(filePath).toString().trim().split('\n');
// let idx = 0;
// const n = +input[idx++].trim();
// const arr = [];
// let maxT = 0;
// for (let i = 0; i < n; i++) {
//   const [s, e, c] = input[idx++].trim().split(' ').map(Number);
//   arr.push([s, e, c]);
// }

// arr.sort((a, b) => {
//   if (a[1] === b[1]) {
//     return b[0] - a[0];
//   }
//   return a[1] - b[1];
// });
// console.log(arr);

// let max = 0;
// let s1 = -1;
// let e1 = -1;
// const map = { 0: 0 };
// for (let i = 0; i < arr.length; i++) {
//   const [s, e, c] = arr[i];
// }

// console.log(map);

// // console.log(max);

const fs = require('fs');

// Min-Heap 구현
class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(node) {
    this.heap.push(node);
    this._heapifyUp();
  }

  pop() {
    if (this.size() === 1) return this.heap.pop();
    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    this._heapifyDown();
    return top;
  }

  top() {
    return this.heap[0];
  }

  size() {
    return this.heap.length;
  }

  _heapifyUp() {
    let idx = this.heap.length - 1;
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      if (this.heap[idx][0] >= this.heap[parentIdx][0]) break;
      [this.heap[idx], this.heap[parentIdx]] = [
        this.heap[parentIdx],
        this.heap[idx],
      ];
      idx = parentIdx;
    }
  }

  _heapifyDown() {
    let idx = 0;
    const lastIdx = this.heap.length - 1;
    while (true) {
      const leftIdx = 2 * idx + 1;
      const rightIdx = 2 * idx + 2;
      let smallest = idx;

      if (
        leftIdx <= lastIdx &&
        this.heap[leftIdx][0] < this.heap[smallest][0]
      ) {
        smallest = leftIdx;
      }

      if (
        rightIdx <= lastIdx &&
        this.heap[rightIdx][0] < this.heap[smallest][0]
      ) {
        smallest = rightIdx;
      }

      if (smallest === idx) break;
      [this.heap[idx], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[idx],
      ];
      idx = smallest;
    }
  }
}

function main() {
  const filePath = process.platform === 'linux' ? '/dev/stdin' : '17099.txt';
  const input = fs.readFileSync(filePath).toString().trim().split('\n');
  const N = parseInt(input[0]);
  const contests = [];

  // 대회 정보 입력
  for (let i = 1; i <= N; i++) {
    const [S, E, C] = input[i].split(' ').map(Number);
    contests.push({ S, E, C });
  }

  // 대회 시작 시간 기준 정렬
  contests.sort((a, b) => a.S - b.S);

  const pq = new MinHeap(); // 우선순위 큐 (끝나는 시간 기준 최소 힙)
  let maxPrize = 0;

  for (let i = 0; i < N; i++) {
    const { S, E, C } = contests[i];

    // 현재 대회 시작 시간보다 끝나는 시간이 빠른 대회 제거
    while (pq.size() > 0 && pq.top()[0] < S) {
      maxPrize = Math.max(maxPrize, pq.pop()[1]); // 현재까지의 최대 상금 갱신
    }

    // 현재 대회 상금을 포함한 새로운 상금 계산
    const currentPrize = maxPrize + C;
    pq.push([E, currentPrize]); // 끝나는 시간과 누적 상금을 힙에 추가
  }

  // 힙에 남아있는 모든 대회 상금 중 최대값 계산
  while (pq.size() > 0) {
    maxPrize = Math.max(maxPrize, pq.pop()[1]);
  }

  console.log(maxPrize);
}

main();
