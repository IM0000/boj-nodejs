// 한글 LCS
const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '15482.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [s1, s2] = input.map((item) => item.trim());
const dp = Array.from({ length: s1.length + 1 }, () =>
  Array(s2.length + 1).fill(0)
);
for (let i = 1; i <= s1.length; i++) {
  let word1 = s1[i - 1];
  for (let j = 1; j <= s2.length; j++) {
    let word2 = s2[j - 1];

    if (word1 === word2) {
      dp[i][j] = Math.max(dp[i - 1][j - 1] + 1, dp[i - 1][j], dp[i][j - 1]);
    } else {
      dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
}
console.log(dp[s1.length][s2.length]);
