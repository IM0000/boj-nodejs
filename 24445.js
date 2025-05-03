// 알고리즘 수업 - 너비 우선 탐색 2
const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '24445.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
let index = 0;
const [n, m, r] = input[index++].split(' ').map(Number);
const graph = Array.from({ length: n + 1 }, () => []);
for (let i = 0; i < m; i++) {
  const [u, v] = input[index++].split(' ').map(Number);
  graph[u].push(v);
  graph[v].push(u);
}

const visited = Array(n + 1).fill(0);
bfs(r);
console.log(visited.slice(1).join('\n'));

function bfs(start) {
  const queue = [];
  let qIndex = 0;
  let order = 1;

  queue.push(start);
  visited[start] = order++;

  while (qIndex < queue.length) {
    let next = queue[qIndex++];
    graph[next].sort((a, b) => b - a);

    for (let i = 0; i < graph[next].length; i++) {
      const nextnext = graph[next][i];
      if (visited[nextnext] === 0) {
        queue.push(nextnext);
        visited[nextnext] = order++;
      }
    }
  }
}
