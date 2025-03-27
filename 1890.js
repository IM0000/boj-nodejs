// 점프
const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '1890.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
const n = +input[index++].trim();
const board = [];
for (let i = 0; i < n; i++) {
  board.push(input[index++].split(' ').map(Number));
}
const answer = Array.from({ length: n }, () => Array(n).fill(0n));
answer[0][0] = 1n;
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (i == n - 1 && j == n - 1) {
      break;
    }
    let num = board[i][j];
    let [nx1, ny1] = [i + num, j];
    let [nx2, ny2] = [i, j + num];

    if (nx1 >= 0 && nx1 < n && ny1 >= 0 && ny1 < n) {
      answer[nx1][ny1] += answer[i][j];
    }
    if (nx2 >= 0 && nx2 < n && ny2 >= 0 && ny2 < n) {
      answer[nx2][ny2] += answer[i][j];
    }
  }
}
console.log(answer[n - 1][n - 1].toString());
/* console.log(bfs());

function bfs() {
  let count = 0;
  const check = Array.from({ length: n }, () => Array(n).fill(false));
  const q = [];
  q.push([0, 0]);
  check[0][0] = true;

  while (q.length) {
    let [px, py] = q.shift();
    let num = +board[px][py];
    let dx = [num, 0];
    let dy = [0, num];
    for (let z = 0; z < 2; z++) {
      let nx = px + dx[z];
      let ny = py + dy[z];
      if (nx < 0 || nx >= n || ny < 0 || ny >= n || check[nx][ny]) {
        continue;
      }
      if (nx === n - 1 && ny === n - 1) {
        count++;
        continue;
      }
      q.push([nx, ny]);
    }
  }
  return count;
} */
