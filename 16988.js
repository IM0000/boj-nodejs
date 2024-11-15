const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '16988.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [N, M] = input.shift().split(' ').map(Number);
const board = input.map((line) => line.split(' ').map(Number));
let max = 0,
  empty = [],
  dx = [-1, 1, 0, 0],
  dy = [0, 0, -1, 1];

board.forEach((row, i) => row.forEach((v, j) => v === 0 && empty.push([i, j])));

for (let i = 0; i < empty.length; i++) {
  for (let j = i + 1; j < empty.length; j++) {
    const [[x1, y1], [x2, y2]] = [empty[i], empty[j]];
    board[x1][y1] = board[x2][y2] = 1;
    let captured = 0,
      visited = Array.from({ length: N }, () => Array(M).fill(false));

    const check = (x, y) => {
      let q = [[x, y]],
        size = 0,
        captured = true;

      visited[x][y] = true;

      while (q.length) {
        const [cx, cy] = q.shift();
        size++;
        for (let k = 0; k < 4; k++) {
          const [nx, ny] = [cx + dx[k], cy + dy[k]];

          // 범위 넘어가는 경우
          if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;

          if (board[nx][ny] === 0) {
            // 빈 공간이 있는 경우
            captured = false;
          } else if (board[nx][ny] === 2 && !visited[nx][ny]) {
            visited[nx][ny] = true;
            q.push([nx, ny]);
          }
        }
      }

      return captured ? size : 0;
    };

    for (let x = 0; x < N; x++) {
      for (let y = 0; y < M; y++) {
        if (board[x][y] === 2 && !visited[x][y]) {
          captured += check(x, y);
        }
      }
    }

    max = Math.max(max, captured);

    // 원래대로
    board[x1][y1] = 0;
    board[x2][y2] = 0;
  }
}

console.log(max);
