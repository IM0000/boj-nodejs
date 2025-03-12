class PQ {
  constructor(isMin) {
    this.heap = [];
    this.compare = (a, b) => {
      return isMin ? a < b : a > b;
    };
  }

  // data : {x, y, d}
  push(data) {
    this.heap.push(data);
    let cIdx = this.heap.length - 1;

    while (cIdx) {
      let pIdx = Math.floor((cIdx - 1) / 2);

      if (this.compare(this.heap[pIdx].d, this.heap[cIdx].d)) {
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
    let rIdx = lIdx + 1;

    if (
      lIdx < this.heap.length &&
      this.compare(this.heap[lIdx].d, this.heap[cIdx].d)
    ) {
      cIdx = lIdx;
    }

    if (
      rIdx < this.heap.length &&
      this.compare(this.heap[rIdx].d, this.heap[cIdx].d)
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

// 등산
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '1486.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [n, m, t, d] = input[0].split(' ').map(Number);
const map = Array.from({ length: n }, () => Array(m).fill(0));
const minMap = Array.from({ length: n }, () => Array(m).fill(99999999999));
minMap[0][0] = 0;

for (let i = 0; i < n; i++) {
  const arr = input[i + 1].split('').map((item) => {
    if (/[a-z]/.test(item)) {
      return item.charCodeAt() - 97 + 26;
    }
    return item.charCodeAt() - 65;
  });
  for (let j = 0; j < m; j++) {
    map[i][j] = arr[j];
  }
}

// 0,0 에서 모든 점으로 다익스트라 결과 저장
const dx = [0, 0, 1, -1];
const dy = [1, -1, 0, 0];
const pq = new PQ(true);
pq.push({ x: 0, y: 0, d: 0 });

while (pq.heap.length !== 0) {
  const { x, y, d } = pq.pop();

  if (minMap[x][y] < d) continue;

  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];
    if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
    if (Math.abs(map[x][y] - map[nx][ny]) > t) continue;

    const nd =
      d + (map[x][y] >= map[nx][ny] ? 1 : (map[x][y] - map[nx][ny]) ** 2);
    if (nd < minMap[nx][ny]) {
      minMap[nx][ny] = nd;
      pq.push({ x: nx, y: ny, d: nd });
    }
  }
}

let maxHeight = 0;
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    minMap[i][j] += getDist({ x: i, y: j });
    if (minMap[i][j] <= d) maxHeight = Math.max(maxHeight, map[i][j]);
  }
}
console.log(maxHeight);

// 모든 점에서 0,0까지 최소거리 구함
function getDist(start) {
  const revMap = Array.from({ length: n }, () => Array(m).fill(99999999999));
  const pq = new PQ(true);
  pq.push({ x: start.x, y: start.y, d: 0 });
  revMap[start.x][start.y] = 0;

  while (pq.heap.length !== 0) {
    const { x, y, d } = pq.pop();

    if (revMap[x][y] < d) continue;

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];
      if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
      if (Math.abs(map[x][y] - map[nx][ny]) > t) continue;

      const nd =
        d + (map[x][y] >= map[nx][ny] ? 1 : (map[x][y] - map[nx][ny]) ** 2);
      if (nd < revMap[nx][ny]) {
        revMap[nx][ny] = nd;
        pq.push({ x: nx, y: ny, d: nd });
      }
    }
  }

  return revMap[0][0];
}
