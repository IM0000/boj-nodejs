// 문자열 자르기
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '23976.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [N, K] = input[0].split(' ').map(Number);
const S = ' ' + input[1].trim();

const MOD = 1000000007;

const dp = Array.from(Array(N + 1), () =>
  Array.from(Array(K + 1), () => Array(2).fill(0))
);
/* 
dp[n][k][0]은 길이 n의 문자열을 연속 부분 문자열 k개로 나누었을 때, 마지막 연속 부분 문자열이 0이 아닌 경우를 나타냅니다.
dp[n][k][1]은 길이 n의 문자열을 연속 부분 문자열 k개로 나누었을 때, 마지막 연속 부분 문자열이 0인 경우를 나타냅니다.
*/

if (S[1] == '0') {
  dp[1][1][1] = 1;
} else if (S[1] != '0') {
  dp[1][1][0] = 1;
}

for (let i = 2; i <= N; i++) {
  for (let j = 1; j <= i && j <= K; j++) {
    if (S[i] == '0') {
      dp[i][j][0] = dp[i - 1][j][0];
      dp[i][j][1] = (dp[i - 1][j - 1][0] + dp[i - 1][j - 1][1]) % MOD;
    } else if (S[i] != '0') {
      dp[i][j][0] =
        (((dp[i - 1][j - 1][0] + dp[i - 1][j - 1][1]) % MOD) +
          dp[i - 1][j][0]) %
        MOD;
    }
  }
}
console.log((dp[N][K][0] + dp[N][K][1]) % MOD);
