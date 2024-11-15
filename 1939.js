const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '1939.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
const [N, M] = input[index++].split(' ').map(Number);
const graph = Array.from(Array(N + 1), () => []);

for (let i = 0; i < M; i++) {
  const [a, b, m] = input[index++].split(' ').map(Number);
  graph[a].push([b, m]);
  graph[b].push([a, m]);
}

const [start, end] = input[index++].split(' ').map(Number);

function canCrossWithWeight(limit) {
  const visited = Array(N + 1).fill(false);
  const queue = [start];
  visited[start] = true;

  while (queue.length) {
    const current = queue.shift();
    if (current === end) return true;

    for (const [next, weight] of graph[current]) {
      if (!visited[next] && weight >= limit) {
        visited[next] = true;
        queue.push(next);
      }
    }
  }
  return false;
}

let low = 1;
let high = 1000000000;
let answer = 0;

while (low <= high) {
  const mid = Math.floor((low + high) / 2);
  if (canCrossWithWeight(mid)) {
    answer = mid;
    low = mid + 1;
  } else {
    high = mid - 1;
  }
}

console.log(answer);
