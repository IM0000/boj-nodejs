const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '16940.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
let index = 0;
const N = +input[index++].trim();

const graph = Array.from(Array(N + 1), () => []);
const visited = Array(N + 1).fill(false);
for (let i = 0; i < N - 1; i++) {
  const [a, b] = input[index++].split(' ').map(Number);
  graph[a].push(b);
  graph[b].push(a);
}
let order = input[index++].split(' ').map(Number);

if (order[0] !== 1) {
  console.log(0);
  process.exit();
}

let cur = 0;
visited[1] = true;
for (let i = 0; i < N; i++) {
  let pos = order[i];
  let len = 0;

  for (let j = 0; j < graph[pos].length; j++) {
    if (!visited[graph[pos][j]]) {
      visited[graph[pos][j]] = true;
      len++;
    }
  }

  for (let j = 0; j < len; j++) {
    if (!visited[order[cur + j + 1]]) {
      console.log(0);
      process.exit();
    }
  }

  cur += len;

  if (cur >= N - 1) break;
}

console.log(1);
