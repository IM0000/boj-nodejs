class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}
class Queue {
  constructor() {
    this.front = null;
    this.rear = null;
    this.size = 0;
  }
  push(data) {
    const newNode = new Node(data);
    if (this.size === 0) {
      this.front = newNode;
      this.rear = newNode;
    } else {
      this.rear.next = newNode;
      this.rear = newNode;
    }
    this.size++;
  }
  pop() {
    if (this.size === 0) return null;

    const removedData = this.front.data;
    if (this.front === this.rear) {
      this.front = null;
      this.rear = null;
    } else {
      this.front = this.front.next;
    }
    this.size--;
    return removedData;
  }
}

// 화살표 미로(normal)
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '20420.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
let idx = 0;
const [r, c, k] = input[idx++].split(' ').map(Number);
const board = Array.from({ length: r }, () => []);
for (let i = 0; i < r; i++) {
  let arr = input[idx++].split('');
  for (let j = 0; j < c; j++) {
    let dir = arr[j];
    if (dir === 'U') dir = 0;
    else if (dir === 'R') dir = 1;
    else if (dir === 'D') dir = 2;
    else if (dir === 'L') dir = 3;
    board[i][j] = dir;
  }
}

const visited = Array.from({ length: r }, () =>
  Array.from({ length: c }, () =>
    Array.from({ length: k + 1 }, () => Array(k + 1).fill(false))
  )
);

const dx = [-1, 0, 1, 0];
const dy = [0, 1, 0, -1];
const queue = new Queue();
visited[0][0][k][k] = true;
queue.push([0, 0, k, k]);
let answer = 'No';
while (queue.size) {
  const [x, y, L, R] = queue.pop();
  if (x === r - 1 && y === c - 1) {
    answer = 'Yes';
    break;
  }

  let s = Math.max(-L, -3) - 1;
  let e = Math.min(R, 3);

  while (++s <= e) {
    let dir = board[x][y] + s;
    if (dir < 0) dir = 4 + dir;
    if (dir > 3) dir = dir - 4;

    const nx = x + dx[dir];
    const ny = y + dy[dir];

    if (nx < 0 || nx >= r || ny < 0 || ny >= c) continue;
    let ul = s < 0 ? Math.abs(s) : 0;
    let ur = s > 0 ? s : 0;
    const newL = L - ul;
    const newR = R - ur;

    if (visited[nx][ny][L - ul][R - ur]) continue;
    visited[nx][ny][L - ul][R - ur] = true;
    queue.push([nx, ny, L - ul, R - ur]);
  }
}

console.log(answer);

// 적은 시간, 적은 메모리 코드
// const fs = require('fs');
// const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
// const input = fs.readFileSync(filePath).toString().trim().split('\n');

// const dx = [-1, 0, 1, 0];
// const dy = [0, 1, 0, -1];
// const INF = Number.MAX_SAFE_INTEGER;

// let N, M, K;
// let arr = [];
// let dp = [];

// // MinHeap 구현
// class MinHeap {
//   constructor() {
//     this.heap = [];
//   }

//   push([x, y, lcnt, rcnt]) {
//     this.heap.push([x, y, lcnt, rcnt]);
//     this._heapifyUp();
//   }

//   pop() {
//     if (this.size() === 0) return null;
//     if (this.size() === 1) return this.heap.pop();
//     const top = this.heap[0];
//     this.heap[0] = this.heap.pop();
//     this._heapifyDown();
//     return top;
//   }

//   size() {
//     return this.heap.length;
//   }

//   _heapifyUp() {
//     let index = this.heap.length - 1;
//     while (index > 0) {
//       const parentIndex = Math.floor((index - 1) / 2);
//       if (this.heap[parentIndex][3] <= this.heap[index][3]) break;
//       [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
//       index = parentIndex;
//     }
//   }

//   _heapifyDown() {
//     let index = 0;
//     while (true) {
//       const leftIndex = 2 * index + 1;
//       const rightIndex = 2 * index + 2;
//       let smallest = index;

//       if (leftIndex < this.size() && this.heap[leftIndex][3] < this.heap[smallest][3]) {
//         smallest = leftIndex;
//       }
//       if (rightIndex < this.size() && this.heap[rightIndex][3] < this.heap[smallest][3]) {
//         smallest = rightIndex;
//       }
//       if (smallest === index) break;

//       [this.heap[smallest], this.heap[index]] = [this.heap[index], this.heap[smallest]];
//       index = smallest;
//     }
//   }
// }

// function inputProcessing() {
//   [N, M, K] = input[0].split(' ').map(Number);
//   for (let i = 1; i <= N; i++) {
//     const row = input[i].split('');
//     arr.push(row.map((char) => {
//       if (char === 'U') return 0;
//       if (char === 'R') return 1;
//       if (char === 'D') return 2;
//       if (char === 'L') return 3;
//     }));
//   }

//   dp = Array.from({ length: N }, () =>
//     Array.from({ length: M }, () => Array(K + 1).fill(INF))
//   );
// }

// function solve() {
//   dp[0][0][0] = 0;
//   const heap = new MinHeap();
//   heap.push([0, 0, 0, 0]);

//   while (heap.size() > 0) {
//     const [x, y, lcnt, rcnt] = heap.pop();

//     if (dp[x][y][lcnt] < rcnt) continue;

//     if (x === N - 1 && y === M - 1) {
//       console.log("Yes");
//       return;
//     }

//     for (let i = 0; i < 4; i++) {
//       const nx = x + dx[i];
//       const ny = y + dy[i];

//       if (nx < 0 || nx >= N || ny < 0 || ny >= M) continue;

//       // 왼쪽 회전
//       const nlcnt = lcnt + (4 + i - arr[x][y]) % 4;
//       if (nlcnt <= K && dp[nx][ny][nlcnt] > rcnt) {
//         dp[nx][ny][nlcnt] = rcnt;
//         heap.push([nx, ny, nlcnt, rcnt]);
//       }

//       // 오른쪽 회전
//       const nrcnt = rcnt + (4 + arr[x][y] - i) % 4;
//       if (nrcnt <= K && dp[nx][ny][lcnt] > nrcnt) {
//         dp[nx][ny][lcnt] = nrcnt;
//         heap.push([nx, ny, lcnt, nrcnt]);
//       }
//     }
//   }

//   console.log("No");
// }

// inputProcessing();
// solve();
