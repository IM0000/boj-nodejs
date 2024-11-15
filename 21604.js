const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '21604.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [M, N] = input[0].split(' ').map(Number);
const answer = Array.from({ length: N }, () => Array(M));
const board = [];
for (let i = 0; i < N; i++) {
  board.push(input[i + 1].split(' ').map(Number));
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    answer[i][j] = board[(i + j) % N][j];
  }
}
console.log(N);
let ans = '';
for (let i = 0; i < N; i++) {
  ans += answer[i].join(' ') + '\n';
}
console.log(ans.trim());
