const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');

// n: 정점의 개수, m: 간선의 개수
const [n, m] = input[0].split(' ').map(Number);

// 그래프 구현
const graph = [];
for (let i = 0; i <= n; i++) graph.push([]);
for (let i = 1; i <= m; i++) {
  const [x, y] = input[i].split(' ').map(Number);
  graph[x].push(y);
  graph[y].push(x);
}

const visited = [true, ...new Array(n).fill(false)];

function dfs(x) {
  visited[x] = true;

  for (let y of graph[x]) {
    if (!visited[y]) dfs(y);
  }
}

let answer = 0;
while (visited.includes(false)) {
  let index = visited.indexOf(false);
  dfs(index);
  answer++;
}

console.log(answer);