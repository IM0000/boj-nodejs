const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '17404.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
const N = +input[index++];
const rgb = input.slice(index, index+N).map(v=>v.split(' ').map(Number));

const dp = Array(3);
for(let i=0; i<3; i++) {
  dp[i] = Array.from({length: N}, ()=>Array(3).fill(1001));
}

// 1번 R, G, B 중 하나를 선택하여 반복
for(let c=0; c<3; c++) {
  dp[c][0][c] = rgb[0][c];
  for(let i=1; i<N; i++) {
    dp[c][i][0] = Math.min(dp[c][i-1][1], dp[c][i-1][2]) + rgb[i][0];
    dp[c][i][1] = Math.min(dp[c][i-1][0], dp[c][i-1][2]) + rgb[i][1];
    dp[c][i][2] = Math.min(dp[c][i-1][0], dp[c][i-1][1]) + rgb[i][2];
  }
}

let min = Number.MAX_SAFE_INTEGER;
for(let i=0; i<3; i++) {
  let lastMin = Math.min(dp[i][N-1][(i%3+1)%3], dp[i][N-1][(i%3+2)%3])
  min = Math.min(min, lastMin);
}
console.log(min);