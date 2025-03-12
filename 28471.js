// w키가 빠진 성원이
const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '28471.txt';
const input = fs.readFileSync(filePath).toString().split('\n');
const n = +input.shift();
const board = [];
let start;

for (let i = 0; i < n; i++) {
  board.push(input[i].split(''));
  for (let j = 0; j < board[i].length; j++) {
    if (board[i][j] === 'F') {
      start = [i, j];
    }
  }
}

const dx = [-1, -1, -1, 0, 0, 0, 1, 1];
const dy = [-1, 0, 1, -1, 0, 1, -1, 1];
const visited = Array.from({ length: n }, () => Array(n).fill(false));
const queue = [];

visited[start[0]][start[1]] = true;
queue.push(start);

let count = 0;

while (queue.length) {
  const [x, y] = queue.shift();
  for (let i = 0; i < 8; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];

    if (nx < 0 || nx >= n || ny < 0 || ny >= n) continue;
    if (visited[nx][ny]) continue;
    if (board[nx][ny] === '#') continue;

    visited[nx][ny] = true;
    queue.push([nx, ny]);

    if (board[nx][ny] === '.') {
      count++;
    }
  }
}

console.log(count);
