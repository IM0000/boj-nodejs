//MR.DR 문자열
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '31828.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const n = +input.shift();
const MOD = 1000000007;

const dp = Array.from({ length: n + 1 }, () => Array(5).fill(0));
//dp[i][j]를 현재 문자열의 길이가 𝑖일때 MRDR의 𝑗번째 문자까지 등장하는 문자열의 개수
dp[1][0] = 25;
dp[1][1] = 1;
for (let i = 2; i <= n; i++) {
  dp[i][0] = (dp[i - 1][0] * 25) % MOD;
}

for (let i = 2; i <= n; i++) {
  for (let j = 1; j < 5; j++) {
    if (j !== 4) {
      dp[i][j] = (dp[i - 1][j - 1] + ((dp[i - 1][j] * 25) % MOD)) % MOD;
    } else {
      dp[i][j] = (dp[i - 1][j - 1] + ((dp[i - 1][j] * 26) % MOD)) % MOD;
    }
  }
}
console.log(dp[n][4]);
