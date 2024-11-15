const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '21763.txt';
const [n, k] = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split(' ')
  .map(Number);

// 스킵 열 리스트를 생성하는 함수
function getSkipColumns(n) {
  let skipColumns = new Array(n).fill(-1);
  if (n % 2 === 1) {
    for (let i = 0; i < n; i++) {
      skipColumns[i] = i; // 주 대각선 스킵
    }
  } else {
    for (let i = 0; i < n; i++) {
      if (i === 0 || i === n - 1) {
        skipColumns[i] = i; // 첫 번째와 마지막 행은 주 대각선 스킵
      } else {
        skipColumns[i] = n - 1 - i; // 나머지 행은 부 대각선 스킵
      }
    }
  }
  return skipColumns;
}

// 격자 초기화 함수
function initializeGrid(n) {
  const grid = [];
  for (let i = 0; i < n; i++) {
    grid.push(new Array(n).fill('.'));
  }
  return grid;
}

// 격자를 채우는 함수
function fillGrid(n, k, skipColumns) {
  const grid = initializeGrid(n);
  let filled = 0;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (j === skipColumns[i]) continue; // 스킵 열은 채우지 않음
      if (filled < k) {
        grid[i][j] = '#';
        filled++;
      }
    }
  }

  if (filled === k) {
    // 추가로, 짝수 n에서 부 대각선이 완전히 채워지지 않았는지 확인
    if (n % 2 === 0) {
      let mainDiag = 0;
      let antiDiag = 0;
      for (let i = 0; i < n; i++) {
        if (grid[i][i] === '#') mainDiag++;
        if (grid[i][n - 1 - i] === '#') antiDiag++;
      }
      if (mainDiag === n || antiDiag === n) {
        return { possible: false };
      }
    }
    return { possible: true, grid };
  }

  // 채운 후, k이 0인지 확인
  return { possible: false };
}

function main() {
  // 특수 케이스 처리
  if (n === 1) {
    if (k === 0) {
      console.log('YES');
      console.log('.');
    } else if (k === 1) {
      // n=1, k=1은 빙고 라인이 완성됨
      console.log('NO');
    } else {
      console.log('NO');
    }
    return;
  }

  // 최대 채울 수 있는 칸 수 계산
  const maxPossible = n * (n - 1);
  if (k > maxPossible) {
    console.log('NO');
    return;
  }

  const skipColumns = getSkipColumns(n);

  const result = fillGrid(n, k, skipColumns);

  if (result.possible) {
    console.log('YES');
    for (let row of result.grid) {
      console.log(row.join(''));
    }
  } else {
    console.log('NO');
  }
}

main();
