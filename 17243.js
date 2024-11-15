// Almost-K Increasing Subsequence
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '17243.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [n, K] = input[0].split(' ').map(Number);
const arr = input[1].split(' ').map(Number);

console.log(longestAlmostKIncreasingSubsequence(n, K, arr));
// 가장 긴 Almost-K 증가 부분 수열의 길이를 찾는 함수
function longestAlmostKIncreasingSubsequence(n, k, arr) {
  // dp[i][j]: i번째 수까지 고려하고, j개의 감소가 허용된 부분 수열의 최대 길이
  const dp = Array.from({ length: n }, () => Array(k + 1).fill(0));
  let result = 0;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j <= k; j++) {
      dp[i][j] = 1; // 각 위치에서 최소 길이는 1 (자기 자신만 포함)
      for (let p = 0; p < i; p++) {
        // 증가할 때
        if (arr[p] <= arr[i]) {
          dp[i][j] = Math.max(dp[i][j], dp[p][j] + 1);
        }
        // 감소 허용할 때
        else if (j > 0) {
          dp[i][j] = Math.max(dp[i][j], dp[p][j - 1] + 1);
        }
      }
      // 최대 길이 갱신
      result = Math.max(result, dp[i][j]);
    }
  }
  return result;
}
