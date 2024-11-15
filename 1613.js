const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '1613.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
const [N, K] = input[index++].split(' ').map(Number);
const graph = Array.from({ length: N + 1 }, () => Array(N + 1).fill(99999));
for (let i = 0; i < K; i++) {
  let [a, b] = input[index++].split(' ').map(Number);
  graph[a][b] = 1;
}

for (let k = 1; k <= N; k++) {
  for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= N; j++) {
      graph[i][j] = Math.min(graph[i][j], graph[i][k] + graph[k][j]);
    }
  }
}

const M = +input[index++];
const ans = [];
for (let i = 0; i < M; i++) {
  let [a, b] = input[index++].split(' ').map(Number);
  if (graph[a][b] !== 99999) ans.push(-1);
  else if (graph[b][a] !== 99999) ans.push(1);
  else ans.push(0);
}
console.log(ans.join('\n'));
