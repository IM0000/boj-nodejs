const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '18404.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const board = Array.from({ length: N + 1 }, () => Array(N + 1).fill(-9999));
const [X, Y] = input[1].split(' ').map(Number);

for (let i = 2; i < 2 + M; i++) {
  const [tx, ty] = input[i].split(' ').map(Number);
  board[tx][ty] = -(i - 1);
}
const answer = [];

const queue = [];
let qIdx = 0;
queue.push([X, Y, 0]);
board[X][Y] = 0;

// (X-2,Y-1), (X-2,Y+1), (X-1,Y-2), (X-1,Y+2), (X+1,Y-2), (X+1,Y+2), (X+2,Y-1), (X+2,Y+1)
const dx = [-2, -2, -1, -1, 1, 1, 2, 2];
const dy = [-1, 1, -2, 2, -2, 2, -1, 1];

while (qIdx != queue.length) {
  const [cx, cy, level] = queue[qIdx++];
  for (let i = 0; i < 8; i++) {
    const nx = cx + dx[i];
    const ny = cy + dy[i];

    if (nx < 1 || nx > N || ny < 1 || ny > N) continue;
    if (board[nx][ny] < 0) {
      if (board[nx][ny] !== -9999 && board[nx][ny] < 0) {
        let idx = -board[nx][ny];
        answer[idx - 1] = level + 1;
      }
      board[nx][ny] = level + 1;
      queue.push([nx, ny, level + 1]);
    }
  }
}

console.log(answer.join(' '));
