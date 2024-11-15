const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '31871.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const n = +input[0].trim();
const m = +input[1].trim();
const visited = Array.from({ length: n + 1 }, () => false);
const board = Array.from({ length: n + 1 }, () => Array(n + 1));
for (let i = 2; i < 2 + m; i++) {
  const [a, b, c] = input[i].split(' ').map(Number);
  if (a == b) {
    continue;
  }
  if (!board[a][b]) {
    board[a][b] = c;
  } else {
    board[a][b] = Math.max(board[a][b], c);
  }
}

let max = 0;
visited[0] = true;
dfs(0, 0, 0);

console.log(max === 0 ? -1 : max);

function dfs(node, step, sum) {
  if (step == n) {
    if (board[node][0] && max < sum + board[node][0]) {
      max = sum + board[node][0];
    }
    return;
  }

  for (let i = 0; i < board[node].length; i++) {
    if (!visited[i] && board[node][i]) {
      visited[i] = true;
      sum += board[node][i];
      dfs(i, step + 1, sum);
      sum -= board[node][i];
      visited[i] = false;
    }
  }
}
