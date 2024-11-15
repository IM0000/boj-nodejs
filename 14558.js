const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '14558.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
const N = +input[index++];
let lines = [];
for (let i = 0; i < N; i++) {
  let [s, e] = input[index++].split(' ').map(Number);
  lines.push([i, s, e]);
}
lines.sort((a, b) => a[1] - b[1]);

let graph = Array.from({ length: N }, () => Array(N).fill(999));
for (let i = 0; i < N; i++) {
  for (let j = i; j < N; j++) {
    if (i == j) {
      graph[i][j] = 0;
      continue;
    }

    if (lines[i][2] >= lines[j][1]) {
      graph[lines[i][0]][lines[j][0]] = 1;
      graph[lines[j][0]][lines[i][0]] = 1;
    }
  }
}
// graph.forEach((row) => console.log(row.join(' ')));

for (let k = 0; k < N; k++) {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      graph[i][j] = Math.min(graph[i][j], graph[i][k] + graph[k][j]);
    }
  }
}
// graph.forEach((row) => console.log(row.join(' ')));

const Q = +input[index++];

let ans = [];
for (let i = 0; i < Q; i++) {
  let [s, e] = input[index++].split(' ').map(Number);
  if (graph[s - 1][e - 1] == 999) {
    ans.push(-1);
  } else {
    ans.push(graph[s - 1][e - 1]);
  }
}
console.log(ans.join('\n'));
