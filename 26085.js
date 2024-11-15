const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '26085.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const board = input.slice(1).map((line) => line.split(' ').map(Number));

const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];

let one = 0;
let zero = 0;
let attached = false;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (board[i][j] === 1) one++;
    if (board[i][j] === 0) zero++;
    if (!attached) {
      for (let z = 0; z < 4; z++) {
        const nx = i + dx[z];
        const ny = j + dy[z];
        if (
          nx >= 0 &&
          nx < N &&
          ny >= 0 &&
          ny < M &&
          board[nx][ny] === board[i][j]
        ) {
          attached = true;
          break;
        }
      }
    }
  }
}

if (attached && one % 2 === 0 && zero % 2 === 0) console.log(1);
else console.log(-1);
