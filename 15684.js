const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '15684.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [n, m, h] = input.shift().split(' ').map(Number);
const arr = input;
let min = 4;

// 가로선 hLine[a][b] => a번째 가로선에서 [b - (b+1)]세로선을 잇는 선
const hLine = Array.from({ length: h + 1 }, () => Array(n + 1).fill(0));
for (let i = 0; i < m; i++) {
  const [a, b] = arr[i].split(' ').map(Number);
  hLine[a][b] = 1;
}
console.log(hLine);

for (let k = 0; k <= 3; k++) {
  dfs(0, k);
}

if (min === 4) min = -1;
console.log(min);

function dfs(count, maxCount) {
  if (min <= maxCount) return;
  if (count === maxCount) {
    if (isValid()) min = Math.min(min, count);
    return;
  }

  for (let i = 1; i < n; i++) {
    for (let j = 1; j <= h; j++) {
      if (hLine[j][i - 1] || hLine[j][i] || hLine[j][i + 1]) continue;
      console.log(j, i);
      hLine[j][i] = 1;
      dfs(count + 1, maxCount);
      hLine[j][i] = 0;

      while (j <= h && !hLine[j][i - 1] && !hLine[j][i + 1]) j++;
    }
  }
}

function isValid() {
  for (let start = 1; start <= n; start++) {
    let k = start;
    for (let i = 1; i <= h; i++) {
      if (hLine[i][k] === 1) {
        k++;
      } else if (hLine[i][k - 1] === 1) {
        k--;
      }
    }
    if (k !== start) {
      return false;
    }
  }
  return true;
}
