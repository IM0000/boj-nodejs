// 낚시
const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '30461.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
let index = 0;
const [n, m, q] = input[index++].split(' ').map(Number);
const board = [];
const points = [];
for (let i = 0; i < n; i++) {
  board.push(input[index++].split(' ').map(Number));
}
for (let i = 0; i < q; i++) {
  points.push(input[index++].split(' ').map(Number));
}

// 수직 / 대각
const sumBoard1 = Array.from({ length: n }, () => Array(m).fill(0));
const sumBoard2 = Array.from({ length: n }, () => Array(m).fill(0));

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (i === 0) {
      sumBoard1[i][j] = board[i][j];
      continue;
    }
    sumBoard1[i][j] += sumBoard1[i - 1][j] + board[i][j];
  }
}

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (i > 0 && j > 0)
      sumBoard2[i][j] = sumBoard2[i - 1][j - 1] + sumBoard1[i][j];
    else sumBoard2[i][j] = sumBoard1[i][j];
  }
}
const answer = [];
for (let i = 0; i < points.length; i++) {
  const [x, y] = points[i];
  answer.push(sumBoard2[x - 1][y - 1]);
}
console.log(answer.join('\n'));
