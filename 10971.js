// 외판원 순회 2
const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '10971.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const n = +input[0].trim();
const w = [];
for (let i = 0; i < n; i++) {
  w.push(input[i + 1].split(' ').map(Number));
}
let min = Number.MAX_SAFE_INTEGER;
const visited = Array(n).fill(false);

for (let start = 0; start < n; start++) {
  visited[start] = true;
  recur(start, start, 1, 0);
  visited[start] = false;
}

console.log(min);

function recur(start, cur, depth, sum) {
  if (depth === n) {
    if (w[cur][start] !== 0) {
      min = Math.min(min, sum + w[cur][start]);
    }
    return;
  }

  for (let next = 0; next < n; next++) {
    if (!visited[next] && w[cur][next] !== 0) {
      visited[next] = true;
      recur(start, next, depth + 1, sum + w[cur][next]);
      visited[next] = false;
    }
  }
}
