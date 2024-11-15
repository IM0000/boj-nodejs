// 속도 테스트입니다.
const input = require('fs')
  .readFileSync('15684.txt')
  .toString()
  .trim()
  .split('\n');
const [num, ...data] = input;
const [n, m, h] = num.split(' ').map(Number);

function solution(n, m, h, data) {
  let minCnt = 4;
  const board = Array.from({ length: h + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i < m; i++) {
    let [a, b] = data[i].split(' ').map(Number);
    board[a][b] = 1;
  }

  const playGame = () => {
    // player는 (1, i)에서 (h+1, i)로 이동 (1 <= i <= n)
    for (let i = 1; i < n + 1; i++) {
      let [y, x] = [1, i];
      while (y < h + 1) {
        // 오른쪽(y-1, x-1)에 사다리가 있다면 오른쪽 아래로 이동
        // 왼쪽(y-1, x-2)에 사다리가 있다면 왼쪽 아래로 이동
        if (board[y][x]) x++;
        else if (board[y][x - 1]) x--;
        y++;
      }
      if (x != i) return false;
    }

    return true;
  };

  // (y, x) : 사다리를 놓을 위치 (1 <= y <= h, 1 <= x < n)
  const dfs = (maxCnt, cnt) => {
    if (maxCnt >= minCnt) return;
    if (maxCnt === cnt) {
      if (playGame()) minCnt = Math.min(minCnt, cnt);
      return;
    }

    for (let x = 1; x < n; x++) {
      for (let y = 1; y <= h; y++) {
        if (board[y][x] || board[y][x - 1] || board[y][x + 1]) continue;
        console.log(y, x);
        board[y][x] = 1;
        dfs(maxCnt, cnt + 1);
        board[y][x] = 0;

        while (y <= h && !board[y][x - 1] && !board[y][x + 1]) y++;
      }
    }
  };

  for (let i = 0; i < 4; i++) dfs(i, 0);

  if (minCnt === 4) minCnt = -1;
  return minCnt;
}

console.log(solution(n, m, h, data));
