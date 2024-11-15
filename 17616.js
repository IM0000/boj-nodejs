const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '17616.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
const [N, M, X] = input[index++].split(' ').map(Number);
const graph = Array.from(Array(N + 1), () => []); // 뒷 사람 저장
const rGraph = Array.from(Array(N + 1), () => []); // 앞 사람 저장

for (let i = 0; i < M; i++) {
  const [f, b] = input[index++].split(' ').map(Number);
  graph[f].push(b);
  rGraph[b].push(f);
}

//dfs
const visited = Array(N + 1).fill(false);

const dfs = (grh, v) => {
  const stack = [v];
  let count = 0;

  while (stack.length > 0) {
    const node = stack.pop();
    if (!visited[node]) {
      visited[node] = true;
      count++;
      grh[node].forEach((next) => {
        if (!visited[next]) stack.push(next);
      });
    }
  }

  return count;
};

// 뒷사람
visited.fill(false);
const bCnt = dfs(graph, X) - 1; // 자기 자신 제외

// 앞사람
visited.fill(false);
const fCnt = dfs(rGraph, X) - 1; // 자기 자신 제외

console.log(1 + fCnt, N - bCnt);
