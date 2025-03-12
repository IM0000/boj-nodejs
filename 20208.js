// 진우의 민트초코우유
const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '20208.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

// m: 초기체력, h: 증가체력
const [N, M, H] = input[0].split(' ').map(Number);
const arr = Array.from({ length: N }, () => Array(N));
let checkMint = Array.from({ length: N }, () => Array(N).fill(false));
let initXY = [];
let mint = [];
for (let i = 1; i <= N; i++) {
  let map = input[i].split(' ').map(Number);
  for (let j = 0; j < map.length; j++) {
    if (map[j] === 1) {
      initXY = [i - 1, j];
    }
    if (map[j] === 2) {
      mint.push([i - 1, j]);
    }
  }
  arr[i - 1] = map;
}
let max = 0;
dfs(initXY[0], initXY[1], 0, M);
console.log(max);

function dfs(x, y, depth, m) {
  let homeDist = Math.abs(initXY[0] - x) + Math.abs(initXY[1] - y);
  if (homeDist <= m) {
    max = Math.max(max, depth);
  }

  for (let i = 0; i < mint.length; i++) {
    let [nx, ny] = mint[i];
    let nextMintDist = Math.abs(nx - x) + Math.abs(ny - y);
    if (!checkMint[nx][ny] && m >= nextMintDist) {
      checkMint[nx][ny] = true;
      dfs(nx, ny, depth + 1, m - nextMintDist + H);
      checkMint[nx][ny] = false;
    }
  }
}
