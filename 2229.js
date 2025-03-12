// 조짜기
const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '2229.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const n = +input[0].trim();
const arr = input[1].split(' ').map(Number);

const dp = Array.from({ length: n + 1 }, () => 0);

// dp[i] = i-1번째까지 고려했을때 최대점수합
for (let i = 1; i <= n; i++) {
  let maxVal = -Infinity;
  let minVal = Infinity;
  // j부터 i-1까지 하나의 그룹으로 묶는 경우를 고려
  // i-1부터 j까지 역순으로 보면서 그룹 내 최대/최소 갱신
  for (let j = i - 1; j >= 0; j--) {
    maxVal = Math.max(maxVal, arr[j]);
    minVal = Math.min(minVal, arr[j]);
    const groupCost = maxVal - minVal;
    dp[i] = Math.max(dp[i], dp[j] + groupCost);
  }
}
console.log(Math.max(...dp));
