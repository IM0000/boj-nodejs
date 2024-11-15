// 기업투자
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '2662.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [n, m] = input[0].split(' ').map(Number);
const arr = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

// arr[i][j] => i번째기업 j금액 투자시 얻는 이익
for (let i = 1; i <= n; i++) {
  let [a, ...list] = input[i].split(' ').map(Number);
  for (let j = 0; j < m; j++) {
    arr[j + 1][a] = list[j];
  }
}

// dp[i][j] : i번째 기업까지 j금액 투자시 얻을 수 있는 최대 이익금
const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
const history = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

for (let i = 0; i <= n; i++) {
  dp[1][i] = arr[1][i];
  history[1][i] = i; // 1번 기업에 i 금액 투자
}

for (let i = 1; i <= m; i++) {
  for (let j = 0; j <= n; j++) {
    for (let k = 0; k <= j; k++) {
      if (dp[i][j] < dp[i - 1][j - k] + arr[i][k]) {
        dp[i][j] = dp[i - 1][j - k] + arr[i][k];
        history[i][j] = k; // i번 기업에 k 금액 투자
      }
    }
  }
}
console.log(dp[m][n]);

// 투자 내역 복원
let answer = Array(m).fill(0);
let remaining = n;
for (let i = m; i >= 1; i--) {
  answer[i - 1] = history[i][remaining];
  remaining -= history[i][remaining];
}
console.log('🚀 ~ file: 2662.js:43 ~ history:', history);

console.log(answer.join(' '));
