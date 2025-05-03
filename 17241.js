// Pineapple Advertising
const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '17241.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
let index = 0;
const [n, m, q] = input[index++].split(' ').map(Number);
const graph = Array.from({ length: n + 1 }, () => []);
for (let i = 0; i < m; i++) {
  let [a, b] = input[index++].split(' ').map(Number);
  graph[a].push(b);
  graph[b].push(a);
}

const visited = Array(n + 1).fill(0);
const answer = [];
for (let i = 0; i < q; i++) {
  let nq = +input[index++].trim();
  answer.push(delivery(nq));
}

console.log(answer.join('\n'));

function delivery(node) {
  let cnt = 0;
  if (visited[node] === 0) {
    // 미 방문 상태
    visited[node] = 1;
    cnt++;
  } else if (visited[node] === 1) {
    // 직접방문
    return cnt;
  } else if (visited[node] === 2) {
    // 옆집
    visited[node] = 1;
  }

  for (let i = 0; i < graph[node].length; i++) {
    let around = graph[node][i];
    if (visited[around] === 0) {
      cnt++;
      visited[around] = 2;
    }
  }
  return cnt;
}
