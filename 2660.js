// 회장뽑기
const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '2660.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const n = +input[0].trim();
const board = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0));
const dist = Array.from({ length: n + 1 }, () => Array(n + 1).fill(9999));
for (let i = 1; i < input.length; i++) {
  const [a, b] = input[i].split(' ').map(Number);
  if (a === -1 && b === -1) break;
  board[a][b] = 1;
  board[b][a] = 1;
  dist[a][b] = 1;
  dist[b][a] = 1;
}

for (let i = 1; i <= n; i++) {
  dist[i][i] = 0;
}

for (let k = 1; k <= n; k++) {
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      if (i === j) continue;
      let d = dist[i][k] + dist[k][j];
      dist[i][j] = Math.min(dist[i][j], d);
    }
  }
}
const score = Array(n + 1);
for (let i = 1; i <= n; i++) {
  score[i] = Math.max(...dist[i].slice(1));
}
const minScore = Math.min(...score.slice(1));
let minScoreCount = 0;
const hubo = [];
for (let i = 1; i <= n; i++) {
  if (score[i] === minScore) {
    minScoreCount++;
    hubo.push(i);
  }
}
console.log(minScore, minScoreCount);
console.log(hubo.join(' '));
