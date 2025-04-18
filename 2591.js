// 숫자카드
const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '2591.txt';
const n = fs.readFileSync(filePath).toString().trim();
const len = n.length;
const dp = Array.from({ length: len }, () => Array(2).fill(0));
dp[0][0] = 1;
dp[0][1] = 0;
// dp[a][k] : 0~a까지 카드 경우의 수, k: 1=마지막 2글자인 경우? 0=마지막 1글자인 경우
for (let i = 1; i < len; i++) {
  let prev = n[i - 1];
  let curr = n[i];
  if (curr === '0') {
    dp[i][0] = 0;
    dp[i][1] = Number(prev + curr) <= 34 ? dp[i - 1][0] : 0;
  } else {
    if (Number(prev + curr) <= 34) {
      dp[i][0] = dp[i - 1][0] + dp[i - 1][1];
      dp[i][1] = dp[i - 1][0];
    } else {
      dp[i][0] = dp[i - 1][0] + dp[i - 1][1];
      dp[i][1] = 0;
    }
  }
}
let sum = dp[n.length - 1].reduce((prev, curr) => prev + curr, 0);
console.log(sum);

/* 
2 7 1
27 1

2 7 1 2
27 1 2
27 12
2 7 12
2 

*/
