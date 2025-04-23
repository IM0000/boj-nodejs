// 농장 관리
const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '1245.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
let index = 0;
const [n, m] = input[index++].split(' ').map(Number);

const board = Array.from({ length: n }, () => 0);
const visited = Array.from({ length: n }, () => Array(m).fill(0));
for (let i = 0; i < n; i++) {
  board[i] = input[index++].split(' ').map(Number);
}

let peakCount = 0;

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (visited[i][j] === 0) {
      bfs(i, j);
    }
  }
}

console.log(peakCount);

function bfs(x, y) {
  const queue = [];
  let qIndex = 0;
  let sameHeight = [];

  const dx = [-1, -1, -1, 0, 1, 1, 1, 0];
  const dy = [-1, 0, 1, 1, 1, 0, -1, -1];

  visited[x][y] = 1;
  queue.push([x, y]);
  sameHeight.push([x, y]);

  let isPeak = true;
  while (qIndex < queue.length) {
    let [cx, cy] = queue[qIndex++];

    for (let i = 0; i < 8; i++) {
      let nx = cx + dx[i];
      let ny = cy + dy[i];

      if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
      if (board[cx][cy] < board[nx][ny]) {
        isPeak = false;
      }
      if (visited[nx][ny] === 1 || visited[nx][ny] === 2) continue;

      if (board[cx][cy] === board[nx][ny]) {
        queue.push([nx, ny]);
        sameHeight.push([nx, ny]);
        visited[nx][ny] = 1;
      }
    }
  }

  if (isPeak) {
    sameHeight.forEach((v) => (visited[v[0]][v[1]] = 2));
    peakCount++;
  }
}
