const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '16437.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
let N = +input[index++].trim();

const tl = Array(N + 1).fill('');
const al = Array(N + 1).fill(0);
const pl = Array.from({ length: N + 1 }, () => 0);
const graph = Array.from({ length: N + 1 }, () => []);

// i에서 1번으로 가는 길에 마주치는 늑대의 수 (i 포함)
const dp = Array.from({ length: N + 1 }, () => 0);

for (let i = 0; i < N - 1; i++) {
  const [t, a, p] = input[index++].trim().split(' ');
  tl[i + 2] = t;
  al[i + 2] = +a;
  pl[i + 2] = +p;
  graph[p].push(i + 2);
}

function dfs(node) {
  let totalSheep = 0;

  for (let next of graph[node]) {
    totalSheep += dfs(next);
  }

  if (tl[node] === 'S') {
    totalSheep += al[node];
  } else if (tl[node] === 'W') {
    totalSheep -= al[node];
    if (totalSheep < 0) {
      totalSheep = 0;
    }
  }

  return totalSheep;
}

console.log(dfs(1));
