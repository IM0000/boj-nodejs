// Guarding the Farm
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '6067.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
let idx = 0;
const [n, m] = input[idx++].split(' ').map(Number);
const board = [];
for (let i = 0; i < n; i++) {
  board.push(input[idx++].split(' ').map(Number));
}

// 상 하 좌 우 좌상 우상 좌하 우하
const dx = [-1, 1, 0, 0, -1, -1, 1, 1];
const dy = [0, 0, -1, 1, -1, 1, -1, 1];
const visited = Array.from(Array(n), () => Array(m).fill(0));
let answer = 0;

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (!visited[i][j]) {
      bfs(i, j);
    }
  }
}
console.log(answer);

function bfs(x, y) {
  visited[x][y] = 1;
  let queue = [[x, y]];
  let isHilltop = true;

  while (queue.length) {
    const [x, y] = queue.shift();
    for (let i = 0; i < 8; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];
      if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
      if (board[nx][ny] > board[x][y]) {
        isHilltop = false;
      }
      if (board[nx][ny] === board[x][y] && visited[nx][ny] === 0) {
        queue.push([nx, ny]);
        visited[nx][ny] = 1;
      }
    }
  }

  if (isHilltop) answer++;
}
