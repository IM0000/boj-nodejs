// 넴모넴모(Easy)
const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '14712.txt';
const [n, m] = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split(' ')
  .map(Number);

if (n === 1 || m === 1) {
  let big = n > m ? n : m;
  console.log(Math.pow(2, big));
  process.exit(0);
}

let visited = Array.from({ length: n }, () => Array(m).fill(false));
let count = 0;

recursion(0, 0);
console.log(count);

function recursion(x, y) {
  if (y === m) {
    // 다음 행으로 이동
    x += 1;
    y = 0;
  }

  if (x === n) {
    // 마지막 행까지 도달했을 경우
    count++;
    return;
  }

  // 현재 칸을 선택하지 않는 경우
  recursion(x, y + 1);

  // 현재 칸을 선택하는 경우 (넴모넴모 조건 체크)
  if (!isSquare(x, y)) {
    visited[x][y] = true;
    recursion(x, y + 1);
    visited[x][y] = false; // 백트래킹 (상태 복구)
  }
}

function isSquare(x, y) {
  return (
    x > 0 &&
    y > 0 &&
    visited[x - 1][y] &&
    visited[x][y - 1] &&
    visited[x - 1][y - 1]
  );
}
