// 최소편집
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '15483.txt';
const [s1, s2] = fs.readFileSync(filePath).toString().trim().split('\n');
const dp = Array.from(Array(s1.length + 1), () => Array(s2.length + 1).fill(0));

for (let i = 0; i <= s1.length; i++) {
  dp[i][0] = i;
}
for (let i = 0; i <= s2.length; i++) {
  dp[0][i] = i;
}

// dp[i][j] = i개의 이전문자열에서 j개의 이후문자열 만드는데에 필요한 최소횟수
// dp[i][j] = min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1
for (let i = 1; i <= s1.length; i++) {
  for (let j = 1; j <= s2.length; j++) {
    if (s1[i - 1] === s2[j - 1]) {
      dp[i][j] = dp[i - 1][j - 1];
    } else {
      dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
    }
  }
}
console.log(dp[s1.length][s2.length]);
