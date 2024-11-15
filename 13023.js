const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '13023.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);
const graph = Array.from(Array(N), () => []);
let found = false;

for (let i = 1; i <= M; i++) {
  const [a, b] = input[i].split(' ').map(Number);
  graph[a].push(b);
  graph[b].push(a);
}

const visited = Array(N).fill(false);

const dfs = (node, depth) => {
  if (depth === 4) {
    found = true;
    return;
  }
  visited[node] = true;
  for (const next of graph[node]) {
    if (!visited[next]) {
      dfs(next, depth + 1);
      if (found) return;
    }
  }
  visited[node] = false;
};

for (let i = 0; i < N; i++) {
  dfs(i, 0);
  if (found) break;
}

console.log(found ? 1 : 0);
