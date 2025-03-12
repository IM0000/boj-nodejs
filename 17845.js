// 수강 과목
const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '17845.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [t, n] = input.shift().split(' ').map(Number);
const arr = input.map((item) => item.split(' ').map(Number));

// dp[t] = t시간으로 얻을 수 있는 최대 중요도
const dp = Array(t + 1).fill(0);
for (let i = 0; i < arr.length; i++) {
  const [s, k] = arr[i];
  for (let a = t; a - k >= 0; a--) {
    dp[a] = Math.max(dp[a], dp[a - k] + s);
  }
}
console.log(dp[t]);
