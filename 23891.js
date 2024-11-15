// 타이어 끌기
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '23891.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [n, m] = input[0].split(' ').map(Number);
let s1 = 0;
let s2 = 0;

const S = [0];
const P = [0];
for (let i = 1; i <= n; i++) {
  let [s, p] = input[i].split(' ').map(Number);
  S.push(s);
  P.push(p);
}

// dp[i][j] => i번째 타이어에서, j명 배정했을 떄 얻는 최대 점수
// 1. 2반보다 1명 더 많이 배정 => Sj 획득
// 2. 2반과 동일한 인원 배정 => 0점
// 3. 0명 배정 => Sj 잃음
const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(-Infinity));
dp[0][0] = 0;

for (let i = 1; i <= n; i++) {
  for (let j = m; j >= 0; j--) {
    if (j >= P[i] + 1 && dp[i - 1][j - (P[i] + 1)] !== -Infinity) {
      dp[i][j] = Math.max(dp[i][j], dp[i - 1][j - (P[i] + 1)] + S[i]);
    }
    if (j >= P[i] && dp[i - 1][j - P[i]] !== -Infinity) {
      dp[i][j] = Math.max(dp[i][j], dp[i - 1][j - P[i]]);
    }
    if (dp[i - 1][j] !== -Infinity) {
      dp[i][j] = Math.max(dp[i][j], dp[i - 1][j] - S[i]);
    }
  }
}

let sum = -Infinity;
for (let i = 0; i <= m; i++) {
  sum = Math.max(sum, dp[n][i]);
}

if (sum < 0) {
  console.log('L');
} else if (sum > 0) {
  console.log('W');
} else {
  console.log('D');
}
