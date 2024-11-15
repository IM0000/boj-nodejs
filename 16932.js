// 모양 만들기
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '16932.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [N, M] = input.shift().split(' ').map(Number);
const board = input.map((row) => row.split(' ').map(Number));
const visited = Array.from({ length: N }, () => Array(M).fill(false));

const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];
const map = {};
let number = 2;

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (board[i][j] === 1 && !visited[i][j]) {
      let count = dfs(i, j);
      map[number] = count;
      number++;
    }
  }
}

let max = 0;

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (board[i][j] === 1) continue;

    let sum = 1;
    const set = new Set();
    for (let d = 0; d < 4; d++) {
      const nx = i + dx[d];
      const ny = j + dy[d];

      if (nx < 0 || nx >= N || ny < 0 || ny >= M || board[nx][ny] === 0)
        continue;
      set.add(board[nx][ny]);
    }
    set.forEach((item) => {
      sum += map[item];
    });
    max = Math.max(max, sum);
  }
}

console.log(max);

function dfs(x, y) {
  const stack = [];
  stack.push([x, y]);
  visited[x][y] = true;
  let count = 1;

  while (stack.length !== 0) {
    const [cx, cy] = stack.pop();
    board[cx][cy] = number;

    for (let d = 0; d < 4; d++) {
      const nx = cx + dx[d];
      const ny = cy + dy[d];

      if (
        nx < 0 ||
        nx >= N ||
        ny < 0 ||
        ny >= M ||
        visited[nx][ny] ||
        board[nx][ny] === 0
      )
        continue;

      visited[nx][ny] = true;
      stack.push([nx, ny]);
      count++;
    }
  }

  return count;
}
