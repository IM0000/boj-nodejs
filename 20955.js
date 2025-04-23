// 민서의 응급 수술
const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '20955.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
let index = 0;
const [n, m] = input[index++].split(' ').map(Number);

const parent = Array.from({ length: n + 1 }, (_, i) => i);
const rank = Array(n + 1).fill(0);
let cycleCount = 0;
for (let i = 0; i < m; i++) {
  const [a, b] = input[index++].split(' ').map(Number);
  if (find(a) === find(b)) {
    cycleCount++;
  }
  union(a, b);
}

const parentSet = new Set();
for (let i = 1; i <= n; i++) {
  parentSet.add(find(parent[i]));
}

let parentCount = parentSet.size;

console.log(parentCount + cycleCount - 1);

function find(x) {
  if (parent[x] === x) return x;
  return (parent[x] = find(parent[x]));
}

function union(a, b) {
  a = find(a);
  b = find(b);

  if (a === b) return;

  if (rank[a] > rank[b]) {
    parent[b] = a;
  } else {
    parent[a] = b;
  }

  if (rank[a] === rank[b]) rank[b]++;
}
