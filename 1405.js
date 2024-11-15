const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '1405.txt';
const input = fs.readFileSync(filePath).toString().trim().split(' ');
let N = +input.shift();
let pb = input.map((x) => Number(x) / 100);

let visited = Array.from({ length: 2 * N + 1 }, () =>
  Array(2 * N + 1).fill(false)
);
let simple = 0;
let cur = [N, N];
visited[N][N] = true;
let dx = [1, -1, 0, 0];
let dy = [0, 0, -1, 1];

dfs(0, cur, 1);
console.log(simple);

function dfs(n, pos, probability) {
  if (n == N) {
    simple += probability;
    return;
  }

  for (let z = 0; z < 4; z++) {
    let nx = pos[0] + dx[z];
    let ny = pos[1] + dy[z];
    if (nx < 0 || ny < 0 || nx > 2 * N || ny > 2 * N) continue;
    if (visited[nx][ny]) continue;
    visited[nx][ny] = true;
    dfs(n + 1, [nx, ny], pb[z] * probability);
    visited[nx][ny] = false;
  }
}
