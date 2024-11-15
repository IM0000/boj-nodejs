const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '10423.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [n, m, k] = input[0].split(' ').map(Number);
const krr = input[1].split(' ').map(Number);
const graph = input.slice(2).map((row) => row.split(' ').map(Number));
graph.sort((a, b) => a[2] - b[2]);

const parent = Array.from({ length: n + 1 }, (_, i) => i);
const rank = Array(n + 1).fill(0);

// 발전소
for (let i = 0; i < krr.length; i++) {
  parent[krr[i]] = -1;
}

let cost = 0;
for (let i = 0; i < graph.length; i++) {
  const [a, b, c] = graph[i];
  if (find(a) === find(b)) continue;
  union(a, b);
  cost += c;
  if (connectAll()) {
    break;
  }
}
console.log(cost);

function find(x) {
  if (parent[x] === -1) return -1;
  if (parent[x] === x) return x;
  return (parent[x] = find(parent[x]));
}

function union(x, y) {
  x = find(x);
  y = find(y);
  if (x === y) return;
  if (x === -1) parent[y] = -1;
  else if (y === -1) parent[x] = -1;
  else {
    parent[y] = x;
  }
}

function connectAll() {
  for (let i = 1; i < parent.length; i++) {
    if (parent[i] !== -1) {
      return false;
    }
  }
  return true;
}
