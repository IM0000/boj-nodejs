// 알고리즘 수업 - 너비 우선 탐색 4
const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '24447.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
const [n, m, r] = input[index++].split(' ').map(Number);
const graph = Array.from({ length: n + 1 }, () => Array());

for (let i = 0; i < m; i++) {
  const [a, b] = input[index++].split(' ').map(Number);
  graph[a].push(b);
  graph[b].push(a);
}

const visited = Array(n + 1).fill(false);
const queue = [];
let qIndex = 0;
let answer = 0;

visited[r] = true;
queue.push([r, 0]);
while (qIndex < queue.length) {
  const [cur, d] = queue[qIndex++];
  answer += qIndex * d;

  for (let i = 0; i < graph[cur].length; i++) {
    const next = graph[cur][i];
    if (!visited[next]) {
      visited[next] = true;
      queue.push([next, d + 1]);
    }
  }
}
console.log(answer);
