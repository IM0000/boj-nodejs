// 매직 스퀘어로 변경하기
const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '16945.txt';
const data = fs.readFileSync(filePath, 'utf-8').trim().split(/\s+/).map(Number);

const magicSquares = [];
const used = Array(10).fill(false);
const square = Array(9);

function dfs(pos) {
  if (pos === 9) {
    // 완전 채워졌으면 대각선만 한 번 더 검사
    if (
      square[0] + square[4] + square[8] === 15 &&
      square[2] + square[4] + square[6] === 15
    ) {
      magicSquares.push([...square]);
    }
    return;
  }

  if (pos === 4) {
    // 중앙은 반드시 5
    square[4] = 5;
    used[5] = true;
    dfs(pos + 1);
    used[5] = false;
    return;
  }

  for (let num = 1; num <= 9; num++) {
    if (used[num]) continue;
    square[pos] = num;
    used[num] = true;

    // 가로 합 검사: 행 끝(pos%3===2)일 때만
    if (pos % 3 === 2) {
      const rowStart = pos - 2;
      if (
        square[rowStart] + square[rowStart + 1] + square[rowStart + 2] !==
        15
      ) {
        used[num] = false;
        continue;
      }
    }
    // 세로 합 검사: pos가 6,7,8일 때 각 열이 채워짐
    if (pos === 6) {
      if (square[0] + square[3] + square[6] !== 15) {
        used[num] = false;
        continue;
      }
    }
    if (pos === 7) {
      if (square[1] + square[4] + square[7] !== 15) {
        used[num] = false;
        continue;
      }
    }
    if (pos === 8) {
      if (square[2] + square[5] + square[8] !== 15) {
        used[num] = false;
        continue;
      }
    }

    dfs(pos + 1);
    used[num] = false;
  }
}

dfs(0);

let answer = Infinity;
for (const ms of magicSquares) {
  const cost = ms
    .map((v, i) => Math.abs(v - data[i]))
    .reduce((a, b) => a + b, 0);
  answer = Math.min(answer, cost);
}

console.log(answer);
