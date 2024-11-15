const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '25195.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const graph = Array.from({ length: N + 1 }, () => []);
const visited = Array(N + 1).fill(false);
for (let i = 1; i <= M; i++) {
  const [a, b] = input[i].split(' ').map(Number);
  graph[a].push(b);
}

const S = +input[M + 1];
const srr = input[M + 2].split(' ').map(Number);

srr.forEach((v) => (visited[v] = true));

let safeArrival = false;
function dfs(v) {
  visited[v] = true;

  if (graph[v].length === 0) {
    safeArrival = true;
    return;
  }

  for (const next of graph[v]) {
    if (!visited[next]) dfs(next);
  }
}

if (!visited[1]) {
  dfs(1);
}
console.log(safeArrival ? 'yes' : 'Yes');
