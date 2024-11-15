const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '17090.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [n, m] = input[0].split(' ').map(Number);
const board = input.slice(1).map((row) => row.split(''));
const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];
const dirList = ['U', 'D', 'L', 'R'];
const dp = Array.from({ length: n }, () => Array(m).fill(null));

let cnt = 0;
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (dp[i][j] === null) {
      if (dfs(i, j)) {
        cnt++;
      }
    } else if (dp[i][j]) {
      cnt++;
    }
  }
}
console.log(cnt);

function dfs(x, y) {
  dp[x][y] = false; // 방문 중임을 표시

  const dir = board[x][y];
  const nx = x + dx[dirList.indexOf(dir)];
  const ny = y + dy[dirList.indexOf(dir)];

  if (nx < 0 || ny < 0 || nx >= n || ny >= m) {
    dp[x][y] = true; // 경계를 벗어나면 탈출 가능
  } else if (dp[nx][ny] === null) {
    dp[x][y] = dfs(nx, ny);
  } else {
    dp[x][y] = dp[nx][ny];
  }

  return dp[x][y];
}
