const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '7511.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
let T = +input[index++].trim();

let ans = [];
let seq = 1;
while (T--) {
  ans.push(`Scenario ${seq++}:`);
  const n = +input[index++].trim();
  const k = +input[index++].trim();
  let parent = Array.from({ length: n + 1 }, (_, i) => i);
  let rank = Array.from({ length: n + 1 }, () => 0);

  for (let i = 0; i < k; i++) {
    let [a, b] = input[index++].trim().split(' ').map(Number);
    union(parent, rank, a, b);
  }

  const m = +input[index++].trim();
  for (let i = 0; i < m; i++) {
    let [a, b] = input[index++].trim().split(' ').map(Number);
    if (findParent(parent, a) === findParent(parent, b)) {
      ans.push(1);
    } else {
      ans.push(0);
    }
  }
  ans.push('');
}
console.log(ans.join('\n').trim());

function findParent(parent, x) {
  if (parent[x] !== x) {
    parent[x] = findParent(parent, parent[x]);
  }
  return parent[x];
}

function union(parent, rank, a, b) {
  a = findParent(parent, a);
  b = findParent(parent, b);

  if (a == b) return;
  if (rank[a] < rank[b]) {
    parent[a] = b;
  } else {
    parent[b] = a;
    if (rank[a] == rank[b]) rank[a]++;
  }
}
